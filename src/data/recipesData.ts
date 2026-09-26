import { CodeRecipe, Language } from '../types';

export const RECIPES_DATA_TR: CodeRecipe[] = [
  {
    id: 'recipe-use-debounce',
    title: 'useDebounce & useDebouncedCallback Hook',
    category: 'Custom Hooks',
    complexity: 'Orta',
    description: 'Arama inputları, otomatik kaydetme veya resize olaylarında API isteklerini sınırlamak için TypeScript tipli, temizlenebilir debouncing hook\'u.',
    filename: 'useDebounce.ts',
    tags: ['Hooks', 'Performance', 'TypeScript', 'Event Limiting'],
    code: `import { useEffect, useState, useRef, useCallback } from 'react';\n\nexport function useDebounce<T>(value: T, delay: number = 300): T {\n  const [debouncedValue, setDebouncedValue] = useState<T>(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debouncedValue;\n}`
  },
  {
    id: 'recipe-zustand-store',
    title: 'Zustand ile Global Toast & Modal Yönetim Store\'u',
    category: 'State & Store',
    complexity: 'Orta',
    description: 'Gereksiz render oluşturmayan, selector destekli, tip güvenli global dialog ve bildirim yönetim mimarisi.',
    filename: 'useUIStore.ts',
    tags: ['Zustand', 'Global State', 'UI Management'],
    code: `import { create } from 'zustand';\n\nexport const useUIStore = create((set) => ({\n  toasts: [],\n  addToast: (t) => set((s) => ({ toasts: [...s.toasts, t] })),\n  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter(x => x.id !== id) }))\n}));`
  },
  {
    id: 'recipe-docker-nginx-spa',
    title: 'Production Multi-Stage Dockerfile & Nginx SPA Deployment',
    category: 'Next.js & Server Actions',
    complexity: 'Orta',
    description: 'Node.js veya yerel derleme araçları olmayan ortamlarda projeyi Git ile çekip tek komutla Nginx üzerinde host etmek için Docker şablonu.',
    filename: 'Dockerfile',
    tags: ['Docker', 'Nginx', 'DevOps', 'Multi-Stage Build'],
    code: `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]`
  }
];

export const RECIPES_DATA_EN: CodeRecipe[] = [
  {
    id: 'recipe-use-debounce',
    title: 'useDebounce & useDebouncedCallback Hook',
    category: 'Custom Hooks',
    complexity: 'Intermediate',
    description: 'Type-safe, cleanable debouncing hook for search inputs, auto-saving, and resize listeners to limit API calls.',
    filename: 'useDebounce.ts',
    tags: ['Hooks', 'Performance', 'TypeScript', 'Event Limiting'],
    code: `import { useEffect, useState, useRef, useCallback } from 'react';\n\nexport function useDebounce<T>(value: T, delay: number = 300): T {\n  const [debouncedValue, setDebouncedValue] = useState<T>(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebouncedValue(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debouncedValue;\n}`
  },
  {
    id: 'recipe-zustand-store',
    title: 'Global Toast & Modal Store with Zustand',
    category: 'State & Store',
    complexity: 'Intermediate',
    description: 'Fine-grained selector supported, type-safe global dialog and notification store without unnecessary consumer re-renders.',
    filename: 'useUIStore.ts',
    tags: ['Zustand', 'Global State', 'UI Management'],
    code: `import { create } from 'zustand';\n\nexport const useUIStore = create((set) => ({\n  toasts: [],\n  addToast: (t) => set((s) => ({ toasts: [...s.toasts, t] })),\n  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter(x => x.id !== id) }))\n}));`
  },
  {
    id: 'recipe-docker-nginx-spa',
    title: 'Production Multi-Stage Dockerfile & Nginx SPA Deployment',
    category: 'Next.js & Server Actions',
    complexity: 'Intermediate',
    description: 'Optimized Docker and Docker Compose setup for hosting Single Page Apps on Nginx with zero local toolchain dependencies.',
    filename: 'Dockerfile',
    tags: ['Docker', 'Nginx', 'DevOps', 'Multi-Stage Build'],
    code: `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]`
  }
];

export function getRecipesData(lang: Language = 'tr'): CodeRecipe[] {
  return lang === 'en' ? RECIPES_DATA_EN : RECIPES_DATA_TR;
}

export const RECIPES_DATA = RECIPES_DATA_TR;
