import express from 'express';
import cors from 'cors';
import * as esbuild from 'esbuild';
import vm from 'node:vm';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 1. Healthcheck Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    engine: 'esbuild + Node.js VM2 Sandbox',
    version: 'React 19 & TypeScript 5.7',
    uptimeSeconds: process.uptime()
  });
});

// 2. Real TSX/JSX Compilation Endpoint (esbuild engine)
app.post('/api/compile', async (req, res) => {
  const { code, filename = 'Solution.tsx' } = req.body;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ success: false, error: 'Code string is required' });
  }

  const startTime = performance.now();

  try {
    const result = await esbuild.transform(code, {
      loader: 'tsx',
      target: 'es2022',
      jsx: 'automatic',
      format: 'esm'
    });

    const durationMs = Math.round((performance.now() - startTime) * 100) / 100;

    res.json({
      success: true,
      compiledCode: result.code,
      warnings: result.warnings,
      durationMs,
      bundleSize: Buffer.byteLength(result.code, 'utf8')
    });
  } catch (err) {
    res.status(422).json({
      success: false,
      error: err.message,
      errors: err.errors || []
    });
  }
});

// 3. Real Server-side Isolated Test Execution Endpoint
app.post('/api/run-tests', async (req, res) => {
  const { code, testCases } = req.body;

  if (!code || !Array.isArray(testCases)) {
    return res.status(400).json({ success: false, error: 'code and testCases are required' });
  }

  const startTime = performance.now();
  let compiledCode = '';

  try {
    // Step 1: Real Compile with esbuild
    const transformRes = await esbuild.transform(code, {
      loader: 'tsx',
      target: 'es2022',
      jsx: 'transform',
      format: 'cjs'
    });
    compiledCode = transformRes.code;
  } catch (compileErr) {
    return res.status(422).json({
      success: false,
      compileError: true,
      error: `Derleme Hatası (Syntax/TSX): ${compileErr.message}`
    });
  }

  // Step 2: Isolated VM Sandbox Execution
  const testResults = [];
  const logs = [];

  const sandbox = {
    console: {
      log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
      warn: (...args) => logs.push('[WARN] ' + args.join(' ')),
      error: (...args) => logs.push('[ERROR] ' + args.join(' '))
    },
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    performance,
    Buffer
  };

  const context = vm.createContext(sandbox);

  for (const tc of testCases) {
    try {
      const runnerScript = `
        (function() {
          ${compiledCode}
          const testFn = ${tc.testFunctionStr};
          return testFn(${JSON.stringify(code)});
        })()
      `;

      const testRes = vm.runInContext(runnerScript, context, { timeout: 1500 });

      testResults.push({
        id: tc.id,
        passed: !!testRes.passed,
        actual: testRes.actual || 'Sonuç alındı',
        expected: tc.expectedOutput,
        message: testRes.message
      });
    } catch (testErr) {
      testResults.push({
        id: tc.id,
        passed: false,
        actual: `Çalışma Zamanı Hatası: ${testErr.message}`,
        expected: tc.expectedOutput
      });
    }
  }

  const durationMs = Math.round((performance.now() - startTime) * 100) / 100;
  const allPassed = testResults.every(r => r.passed);

  res.json({
    success: true,
    allPassed,
    testResults,
    durationMs,
    logs,
    serverEnvironment: 'Docker Node.js 20 Container'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[React Compiler Server] Running on http://0.0.0.0:${PORT}`);
});
