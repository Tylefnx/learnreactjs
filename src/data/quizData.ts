import { QuizQuestion, Language } from '../types';

export const QUIZ_DATA_TR: QuizQuestion[] = [
  {
    id: 'q1-vdom-fiber',
    moduleId: 'module-1-react-basics',
    moduleTitle: 'React 19 & JSX Mimarisi',
    difficulty: 'Başlangıç',
    question: "React'ta Virtual DOM (Sanal DOM) kullanmanın temel amacı ve faydası nedir?",
    options: [
      "Tarayıcı DOM API'sini tamamen kaldırarak doğrudan grafik kartı (GPU) üzerinden render almak.",
      "Bileşen durumundaki değişiklikleri bellekte karşılaştırıp (diffing) gerçek DOM'a yalnızca değişen düğümleri minimum maliyetle yansıtmak (batch mutation).",
      "JavaScript dosyalarının boyutunu küçültmek ve CSS kodlarını sıkıştırmak.",
      "Tüm web sayfalarını sunucu tarafında HTML olarak derleyip istemciye JS göndermemek."
    ],
    correctIndex: 1,
    explanation: "Gerçek DOM manipülasyonu tarayıcıda Layout ve Repaint döngülerini tetiklediği için maliyetlidir. Virtual DOM, bellek üzerinde hafif bir kopya tutarak O(n) diffing ile sadece değişen kısımları gerçek DOM'a uygular.",
    reactConcept: 'Virtual DOM & Reconciliation'
  },
  {
    id: 'q2-stale-closure',
    moduleId: 'module-2-hooks-state',
    moduleTitle: 'Hook Mimarisi & State Yönetimi',
    difficulty: 'Orta',
    question: 'Aşağıdaki kod parçasında butona 3 kez ardışık basıldığında ekranda nihai olarak hangi değer görünür?',
    codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={handleClick}>Sayaç: {count}</button>;
}`,
    options: [
      'Sayaç: 3 (Her setCount anında çalışır ve state 3 artar)',
      'Sayaç: 1 (Tek bir render frame\'inde count değeri 0 olduğu için üç çağrı da setCount(0 + 1) yapar ve React 18+ automatic batching uygular)',
      'Sayaç: 0 (State güncellemeleri kuyruğa alınamadığı için sıfırlanır)',
      'Sonsuz döngü (Maximum update depth exceeded) hatası verir'
    ],
    correctIndex: 1,
    explanation: 'O render anında `count` sabiti 0\'dır. Dolayısıyla `setCount(0 + 1)` üç kez çağrılmış olur. Üstelik React 18+ ile event handler içindeki güncellemeler otomatik birleştirilir (batching). Değerin 3 artması için fonksiyonel güncelleme (`setCount(prev => prev + 1)`) kullanılmalıdır.',
    reactConcept: 'State Batching & Functional Updates'
  },
  {
    id: 'q3-use-effect-cleanup',
    moduleId: 'module-3-effects-lifecycle',
    moduleTitle: 'Efektler & Yaşam Döngüsü',
    difficulty: 'Orta',
    question: 'useEffect içerisinden döndürülen temizleme fonksiyonu (cleanup function) tam olarak ne zaman tetiklenir?',
    options: [
      'Yalnızca sayfa tamamen kapatıldığında (onbeforeunload).',
      'Bir sonraki efekt çalışmadan HEMEN ÖNCE ve bileşen ekrandan kaldırıldığında (unmount anında).',
      'Her render işleminden hemen önce (DOM güncellenmeden önce).',
      'Sadece bir JavaScript hatası (Error Boundary) meydana geldiğinde.'
    ],
    correctIndex: 1,
    explanation: 'React, efektin bir sonraki çalışmasından önce eski efektin yan etkilerini temizlemek için cleanup fonksiyonunu çağırır. Ayrıca bileşen DOM\'dan kaldırılırken (unmount) bellek sızıntılarını önlemek için de çalıştırılır.',
    reactConcept: 'useEffect Cleanup Phase'
  },
  {
    id: 'q4-use-ref-vs-state',
    moduleId: 'module-4-advanced-hooks',
    moduleTitle: 'İleri Seviye Hook\'lar & Referanslar',
    difficulty: 'Başlangıç',
    question: 'useRef ile useState arasındaki en temel mimari fark nedir?',
    options: [
      'useRef sadece string saklayabilir, useState ise nesneleri saklar.',
      'useRef değerinin güncellenmesi (ref.current = newValue) bileşenin YENİDEN RENDER EDİLMESİNE yol açmaz; useState ise yeni render tetikler.',
      'useRef yalnızca Next.js sunucu bileşenlerinde çalışır.',
      'useRef her renderda sıfırlanır, useState ise bellekte kalır.'
    ],
    correctIndex: 1,
    explanation: 'useRef, bileşenin yeniden render edilmesini tetiklemeden renderlar arasında değer saklamayı sağlar (`{ current: initialValue }`). DOM düğümlerine doğrudan erişmek veya render dışı mutable sayaçlar tutmak için idealdir.',
    reactConcept: 'useRef vs useState Re-render Behavior'
  },
  {
    id: 'q5-react-memo-deps',
    moduleId: 'module-5-performance-concurrency',
    moduleTitle: 'Performans & Concurrency',
    difficulty: 'İleri',
    question: 'React.memo ile sarmalanmış bir çocuk bileşen, ebeveyn (parent) bileşen re-render olduğunda hangi durumda YİNE DE gereksiz yere re-render olur?',
    options: [
      'Çocuk bileşene primitive (string, number, boolean) bir prop geçildiğinde.',
      'Ebeveyn bileşende useCallback veya useMemo ile sarılmamış inline fonksiyon veya yeni referanslı obje prop olarak geçildiğinde.',
      'Çocuk bileşen içinde hiçbir hook kullanılmadığında.',
      'Projede Tailwind CSS kullanıldığında.'
    ],
    correctIndex: 1,
    explanation: 'React.memo varsayılan olarak shallow comparison (`prevProps === nextProps`) yapar. Ebeveyn her render olduğunda inline fonksiyonlar (`() => {}`) ve objeler (`{}`) bellekte yeni bir referans aldığı için `===` kontrolü `false` döner ve memoization geçersiz kalır.',
    reactConcept: 'React.memo & Referential Equality'
  },
  {
    id: 'q6-use-transition',
    moduleId: 'module-5-performance-concurrency',
    moduleTitle: 'Performans & Concurrency',
    difficulty: 'İleri',
    question: 'React 18+ `useTransition` hook\'unun birincil kullanım amacı nedir?',
    options: [
      'CSS animasyonlarının ve geçiş efektlerinin süresini uzatmak.',
      'Kullanıcı etkileşimlerini (ör. input yazımı) acil (urgent) tutarken, ağır render gerektiren state güncellemelerini arka plana (transition) alarak arayüzün donmasını engellemek.',
      'Sayfalar arası router yönlendirmesini hızlandırmak.',
      'Sunucu yanıtlarını Service Worker önbelleğine kaydetmek.'
    ],
    correctIndex: 1,
    explanation: 'useTransition, React\'a "bu state güncellemesi acil değil, arka planda hesapla ve kullanıcı yeni bir tuşa basarsa bu işi iptal edip önceliği kullanıcıya ver" der. Böylece arayüz 60 FPS akıcı kalır.',
    reactConcept: 'Concurrent React & useTransition'
  },
  {
    id: 'q7-rsc-vs-client',
    moduleId: 'module-8-rsc-streaming',
    moduleTitle: 'React Server Components (RSC)',
    difficulty: 'İleri',
    question: 'React Server Components (RSC) ile Client Components arasındaki temel kural hangisidir?',
    options: [
      'Server Components içinde `useState`, `useEffect` ve `onClick` gibi tarayıcı etkileşimleri DOĞRUDAN kullanılamaz; sadece sunucu ortamında çalışırlar.',
      'Client Components veritabanına doğrudan SQL sorgusu atabilir.',
      'Server Components hiçbir şekilde CSS alamaz.',
      '"use client" yazılan dosyalarda hiçbir JavaScript çalıştırılamaz.'
    ],
    correctIndex: 0,
    explanation: 'Server Components istemciye JS bundle göndermez (0 KB) ve sadece sunucuda render olur. Bu sebeple browser lifecycle hook\'ları (`useState`, `useEffect`) veya event listener\'ları (`onClick`) içeremezler.',
    reactConcept: 'React Server Components Architecture'
  },
  {
    id: 'q8-custom-hook-rule',
    moduleId: 'module-4-advanced-hooks',
    moduleTitle: 'İleri Seviye Hook\'lar & Referanslar',
    difficulty: 'Başlangıç',
    question: 'Bir Custom Hook yazarken fonksiyon isminin "use" önekiyle başlamasının sebebi nedir?',
    options: [
      'Sadece bir stil kuralıdır, React bunu önemsemez.',
      'React ve ESLint (react-hooks linter) eklentisinin Hook Kurallarını (Rules of Hooks) otomatik denetleyebilmesi ve React iç dispatcher mekanizmasının doğru bağlanması için zorunlu bir kuraldır.',
      'Fonksiyonun asenkron çalışmasını sağlar.',
      'TypeScript tip kontrolünü devre dışı bırakır.'
    ],
    correctIndex: 1,
    explanation: '"use" öneki React linter\'ının bu fonksiyonun içinde başka hook\'lar çağrılabileceğini ve Hook Kurallarına (koşul içinde çağrılmama vb.) uyması gerektiğini anlamasını sağlar.',
    reactConcept: 'Custom Hook Conventions & Rules'
  },
  {
    id: 'q9-zustand-vs-context',
    moduleId: 'module-6-global-state',
    moduleTitle: 'Global State & Server Cache',
    difficulty: 'Orta',
    question: 'Büyük ölçekli uygulamalarda sık değişen state\'ler için React Context yerine Zustand veya Redux Toolkit tercih edilmesinin en kritik performans sebebi nedir?',
    options: [
      'Context API\'nin TypeScript desteğinin bulunmaması.',
      'Context\'te tek bir değer değiştiğinde o Context\'i kullanan TÜM tüketicilerin (consumers) gereksiz re-render olması; Zustand\'ın ise selector tabanlı hassas abonelik (fine-grained subscription) sunması.',
      'Zustand\'ın HTML içine otomatik render olması.',
      'Context API\'nin mobil cihazlarda çalışmaması.'
    ],
    correctIndex: 1,
    explanation: 'React Context bir "Dependency Injection" mekanizmasıdır. Provider değeri değiştiğinde Context\'i dinleyen tüm bileşenler render olur. Zustand ise `useStore(state => state.user)` gibi selector\'lar ile sadece ilgili alan değiştiğinde render tetikler.',
    reactConcept: 'Global State & Selector Subscriptions'
  },
  {
    id: 'q10-react-19-actions',
    moduleId: 'module-9-forms-validation',
    moduleTitle: 'Form Yönetimi & Validasyon',
    difficulty: 'Uzman',
    question: 'React 19 ile form işlemlerinde yerleşik hale gelen `useActionState` ne işe yarar?',
    options: [
      'CSS sınıflarını otomatik olarak Tailwind\'e dönüştürür.',
      'Asenkron form gönderme eylemlerini (Action), form durumunu (state, error, data) ve pending (yükleniyor) durumunu tek bir hook ile yönetmeyi sağlar.',
      'Form inputlarına otomatik yapay zeka doldurması ekler.',
      'Sayfayı yenilemeden tüm LocalStorage\'ı temizler.'
    ],
    correctIndex: 1,
    explanation: 'React 19 `useActionState`, asenkron bir action fonksiyonunu alır; güncel state\'i, formu tetikleyecek action handler\'ı ve `isPending` boolean durumunu otomatik yönetir.',
    reactConcept: 'React 19 Actions & useActionState'
  }
];

export const QUIZ_DATA_EN: QuizQuestion[] = [
  {
    id: 'q1-vdom-fiber',
    moduleId: 'module-1-react-basics',
    moduleTitle: 'React 19 & JSX Architecture',
    difficulty: 'Beginner',
    question: 'What is the primary purpose and architectural benefit of the Virtual DOM in React?',
    options: [
      'To completely eliminate the browser DOM API and render directly via the GPU hardware.',
      'To compare UI changes in memory (diffing) and apply only the minimal necessary mutations to the real DOM in a single batch.',
      'To automatically minify JavaScript bundle size and compress CSS assets.',
      'To compile all web pages into static HTML on the server without sending any client JavaScript.'
    ],
    correctIndex: 1,
    explanation: 'Direct DOM manipulation is computationally expensive because it triggers browser layout calculations and repaints. The Virtual DOM maintains a lightweight in-memory representation to compute O(n) diffs and batch updates.',
    reactConcept: 'Virtual DOM & Reconciliation'
  },
  {
    id: 'q2-stale-closure',
    moduleId: 'module-2-hooks-state',
    moduleTitle: 'Hooks Architecture & State Management',
    difficulty: 'Intermediate',
    question: 'In the code snippet below, what will be the final rendered count after clicking the button once?',
    codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}`,
    options: [
      'Count: 3 (Each setCount executes synchronously and increments state by 1)',
      'Count: 1 (During this render frame, count is closed over as 0, so all three calls execute setCount(0 + 1) and React batches them)',
      'Count: 0 (State updates are dropped due to race conditions)',
      'Throws a "Maximum update depth exceeded" infinite loop error'
    ],
    correctIndex: 1,
    explanation: 'Within that specific render snapshot, count is captured as 0. Therefore, setCount(0 + 1) is queued 3 times. React 18+ automatic batching resolves them to 1. To increment 3 times, use the functional updater form: setCount(prev => prev + 1).',
    reactConcept: 'State Batching & Functional Updates'
  },
  {
    id: 'q3-use-effect-cleanup',
    moduleId: 'module-3-effects-lifecycle',
    moduleTitle: 'Effects & Component Lifecycle',
    difficulty: 'Intermediate',
    question: 'When exactly does the cleanup function returned by useEffect execute?',
    options: [
      'Only when the browser window/tab is completely closed (onbeforeunload).',
      'Immediately BEFORE the effect re-runs on dependency changes, and when the component unmounts from the DOM.',
      'Immediately before every render phase prior to DOM mutations.',
      'Only when an uncaught JavaScript error triggers an Error Boundary.'
    ],
    correctIndex: 1,
    explanation: 'React invokes the cleanup function before executing the next scheduled effect to clean up previous subscriptions or timers, and also when the component unmounts to prevent memory leaks.',
    reactConcept: 'useEffect Cleanup Phase'
  },
  {
    id: 'q4-use-ref-vs-state',
    moduleId: 'module-4-advanced-hooks',
    moduleTitle: 'Advanced Hooks & References',
    difficulty: 'Beginner',
    question: 'What is the fundamental architectural difference between useRef and useState?',
    options: [
      'useRef can only hold strings, whereas useState can store complex objects.',
      'Mutating a ref (ref.current = value) does NOT trigger a component re-render, whereas calling setState queues a re-render.',
      'useRef can only be executed in React Server Components.',
      'useRef resets to initial value on every render, while useState persists.'
    ],
    correctIndex: 1,
    explanation: 'useRef creates a stable mutable object reference ({ current: val }) across renders without causing a re-render upon mutation. It is ideal for storing DOM node references or mutable timers.',
    reactConcept: 'useRef vs useState Re-render Behavior'
  },
  {
    id: 'q5-react-memo-deps',
    moduleId: 'module-5-performance-concurrency',
    moduleTitle: 'Performance & Concurrency',
    difficulty: 'Advanced',
    question: 'Under what condition will a child component wrapped in React.memo STILL unnecessarily re-render when its parent re-renders?',
    options: [
      'When primitive props (string, number, boolean) are passed to the child.',
      'When the parent passes an inline function () => {} or inline object literal {} as a prop without useCallback/useMemo.',
      'When no hooks are used inside the child component.',
      'When Tailwind CSS is used for styling.'
    ],
    correctIndex: 1,
    explanation: 'React.memo performs shallow prop comparison (prevProps[key] === nextProps[key]). Passing new inline object or function references creates different memory addresses on every parent render, causing === to evaluate to false.',
    reactConcept: 'React.memo & Referential Equality'
  },
  {
    id: 'q6-use-transition',
    moduleId: 'module-5-performance-concurrency',
    moduleTitle: 'Performance & Concurrency',
    difficulty: 'Advanced',
    question: 'What is the primary purpose of the React 18+ `useTransition` hook?',
    options: [
      'To manage and extend CSS animation durations.',
      'To mark expensive state updates as non-blocking transitions so urgent user interactions (typing, clicks) remain responsive at 60 FPS.',
      'To accelerate client-side router navigation.',
      'To automatically cache network fetch requests in Service Workers.'
    ],
    correctIndex: 1,
    explanation: 'useTransition instructs React that a state update is interruptible. If an urgent user interaction (such as key strokes in a search input) arrives while rendering a transition, React pauses/cancels the transition and prioritizes the urgent event.',
    reactConcept: 'Concurrent React & useTransition'
  },
  {
    id: 'q7-rsc-vs-client',
    moduleId: 'module-8-rsc-streaming',
    moduleTitle: 'React Server Components (RSC)',
    difficulty: 'Advanced',
    question: 'What is the fundamental architectural rule regarding React Server Components (RSC)?',
    options: [
      'Server Components CANNOT directly use browser interactive hooks (useState, useEffect) or DOM event listeners (onClick); they run exclusively on the server with 0 client JS bundle footprint.',
      'Client Components can query the database directly with raw SQL.',
      'Server Components cannot use CSS stylesheets.',
      'Files marked with "use client" cannot run any JavaScript code.'
    ],
    correctIndex: 0,
    explanation: 'Server Components execute only on the server and stream an RSC payload (0 KB client JavaScript). Because they do not hydrate in the browser, they cannot contain client lifecycle hooks or browser event listeners.',
    reactConcept: 'React Server Components Architecture'
  },
  {
    id: 'q8-custom-hook-rule',
    moduleId: 'module-4-advanced-hooks',
    moduleTitle: 'Advanced Hooks & References',
    difficulty: 'Beginner',
    question: 'Why must Custom Hook function names strictly begin with the "use" prefix (e.g., useWindowSize)?',
    options: [
      'It is merely an informal naming convention with no functional significance.',
      'It allows React and the ESLint react-hooks plugin to automatically enforce the Rules of Hooks and ensure the internal dispatcher linked-list order is maintained.',
      'It forces the function to execute asynchronously in a Web Worker.',
      'It disables TypeScript type checking for the function.'
    ],
    correctIndex: 1,
    explanation: 'The "use" prefix is a contract that informs linters and React internals that this function can call other hooks and must adhere to the Rules of Hooks (no conditions, loops, or nested functions).',
    reactConcept: 'Custom Hook Conventions & Rules'
  },
  {
    id: 'q9-zustand-vs-context',
    moduleId: 'module-6-global-state',
    moduleTitle: 'Global State & Server Cache',
    difficulty: 'Intermediate',
    question: 'What is the main performance reason for choosing Zustand or Redux Toolkit over React Context in large-scale apps with frequent state changes?',
    options: [
      'React Context lacks TypeScript support.',
      'When any value in a Context changes, ALL consuming components re-render by default; Zustand supports fine-grained selector subscriptions to avoid unnecessary re-renders.',
      'Zustand renders directly to native DOM bypassing React reconciliation.',
      'Context API is deprecated on mobile web browsers.'
    ],
    correctIndex: 1,
    explanation: 'React Context is a dependency injection mechanism, not a specialized state management library. Changing a Context value re-renders all subscribers. Zustand allows components to subscribe to slices (useStore(s => s.user)) and re-render only when that slice changes.',
    reactConcept: 'Global State & Selector Subscriptions'
  },
  {
    id: 'q10-react-19-actions',
    moduleId: 'module-9-forms-validation',
    moduleTitle: 'Form Management & Validation',
    difficulty: 'Expert',
    question: 'What does the built-in React 19 `useActionState` hook provide?',
    options: [
      'It converts CSS classes to Tailwind utility classes automatically.',
      'It manages asynchronous form action execution, returned state data/errors, and the pending status seamlessly in a single hook.',
      'It auto-populates form inputs using local machine learning models.',
      'It clears LocalStorage before each form submission.'
    ],
    correctIndex: 1,
    explanation: 'React 19 useActionState simplifies async form handling by returning [state, formAction, isPending], handling optimistic updates and server action transitions natively.',
    reactConcept: 'React 19 Actions & useActionState'
  }
];

export function getQuizData(lang: Language = 'tr'): QuizQuestion[] {
  return lang === 'en' ? QUIZ_DATA_EN : QUIZ_DATA_TR;
}
