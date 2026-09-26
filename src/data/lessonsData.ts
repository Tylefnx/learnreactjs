import { LessonModule, Language } from '../types';

export const LESSONS_DATA_TR: LessonModule[] = [
  {
    id: 'module-1-react-basics',
    number: 1,
    title: 'React 19 Giriş & Modern JSX Mimarisi',
    subtitle: 'Virtual DOM, React Fiber Ağacı, Component vs Element ayrımı ve Derleyici Mimarisi',
    icon: 'Layers',
    category: 'Temel Mimari',
    difficulty: 'Başlangıç',
    durationMinutes: 40,
    overview: 'React, deklaratif ve bileşen tabanlı modern web kullanıcı arayüzleri inşa etmek için geliştirilmiş dünyanın en popüler kütüphanesidir. Bu modülde React 19 yeniliklerini, JSX\'in JavaScript nesnelerine derlenme sürecini, Virtual DOM ve React Fiber reconciliation motorunun çalışma prensiplerini derinlemesine inceleyeceğiz.',
    sections: [
      {
        id: 'declarative-ui-and-jsx',
        title: '1. Deklaratif UI Felsefesi & JSX Derleme Aşamaları',
        content: `Geleneksel Imperative yaklaşımda geliştirici tarayıcıya adım adım ne yapacağını söyler. React ise Deklaratif bir paradigma sunar: UI = fn(state).\n\nJSX, HTML gibi görünen ancak derleme aşamasında saf JavaScript fonksiyon çağrılarına dönüştürülen bir sözdizimi uzantısıdır.`,
        codeSnippets: [
          {
            title: 'JSX ve Derlenmiş JavaScript Çıktısı',
            language: 'tsx',
            filename: 'UserCard.tsx',
            description: 'JSX sözdizimi derleyici tarafından React Element nesnelerine dönüştürülür.',
            code: `export function UserCard({ name, role }: { name: string; role: string }) {\n  return (\n    <div className="card p-4">\n      <h2 className="title">{name}</h2>\n      <p className="text-muted">{role}</p>\n    </div>\n  );\n}`
          }
        ]
      }
    ],
    bestPractices: [
      'Bileşenleri saf fonksiyonlar (pure functions) olarak tutun.',
      'Döngülerde her zaman kararlı ve benzersiz bir key prop kullanın.'
    ],
    commonPitfalls: ['Liste elemanlarına index değerini key olarak vermek.'],
    keyTakeaways: ['Virtual DOM maliyetli DOM işlemlerini minimuma indirir.', 'Fiber mimarisi kesintisiz render sağlar.']
  },
  {
    id: 'module-2-hooks-state',
    number: 2,
    title: 'Hook Mimarisi & Modern State Yönetimi',
    subtitle: 'useState, useReducer, Automatic Batching, Closure tuzağı ve İmmutability',
    icon: 'Cpu',
    category: 'State & Logic',
    difficulty: 'Başlangıç',
    durationMinutes: 45,
    overview: 'Hook\'lar fonksiyonel bileşenlerin state ve yaşam döngüsü özelliklerine erişmesini sağlar. useState ve useReducer mekanizmalarını derinlemesine ele alıyoruz.',
    sections: [
      {
        id: 'use-state-batching',
        title: '1. useState ve Automatic Batching Mekanizması',
        content: 'React 18 ile birlikte gelen Automatic Batching, ardışık yapılan tüm setState çağrılarını tek bir render işleminde birleştirir.',
        codeSnippets: [
          {
            title: 'Fonksiyonel Güncelleme (Functional Updater)',
            language: 'tsx',
            filename: 'CounterExample.tsx',
            description: 'Önceki duruma bağımlı güncellemelerde callback formatı kullanılmalıdır.',
            code: `setCount(prev => prev + 1);`
          }
        ]
      }
    ],
    bestPractices: ['State\'i her zaman sade tutun ve türetilebilir değerleri state yapmayın.'],
    commonPitfalls: ['State nesnesini doğrudan mutasyona uğratmak.'],
    keyTakeaways: ['React 18+ tüm event handler\'larda automatic batching uygular.']
  },
  {
    id: 'module-3-effects-lifecycle',
    number: 3,
    title: 'Efektler & Yaşam Döngüsü (useEffect Mimarisi)',
    subtitle: 'useEffect vs useLayoutEffect, Cleanup fonksiyonları, Render Loops ve Yan Etki Yönetimi',
    icon: 'RefreshCw',
    category: 'Lifecycle & Side-Effects',
    difficulty: 'Orta',
    durationMinutes: 45,
    overview: 'Efektler, React bileşenini harici bir sistemle senkronize etmek için kullanılır.',
    sections: [
      {
        id: 'use-effect-lifecycle',
        title: '1. useEffect Yaşam Döngüsü ve Cleanup Mantığı',
        content: 'useEffect pasif bir efekttir: Tarayıcı DOM\'u güncelleyip ekrana çizim yaptıktan sonra asenkron çalışır.',
        codeSnippets: [
          {
            title: 'WebSocket & Event Listener Temizliği',
            language: 'tsx',
            filename: 'ChatRoom.tsx',
            description: 'Cleanup fonksiyonu bellek sızıntılarını önler.',
            code: `useEffect(() => {\n  const ws = new WebSocket(url);\n  return () => ws.close();\n}, [url]);`
          }
        ]
      }
    ],
    bestPractices: ['Veri dönüşümü için useEffect kullanmayın.'],
    commonPitfalls: ['Dependency dizisini eksik bırakmak veya nesne referansı geçip sonsuz döngüye girmek.'],
    keyTakeaways: ['useEffect Paint sonrasında asenkron çalışır.']
  },
  {
    id: 'module-4-advanced-hooks',
    number: 4,
    title: 'İleri Seviye Hook\'lar & Custom Hook Mimarisi',
    subtitle: 'useRef, useImperativeHandle, useId ve Modüler Hook Yazımı',
    icon: 'Wrench',
    category: 'Advanced Logic',
    difficulty: 'Orta',
    durationMinutes: 50,
    overview: 'Gelişmiş hook\'lar ile DOM düğümlerine erişebilir ve özel Custom Hook\'lar oluşturabilirsiniz.',
    sections: [
      {
        id: 'use-ref-basics',
        title: '1. useRef Kullanımı',
        content: 'useRef güncellemeleri bileşenin yeniden render edilmesine yol açmaz.',
        codeSnippets: [
          {
            title: 'DOM Referansı',
            language: 'tsx',
            filename: 'FocusInput.tsx',
            description: 'İnput elemanına odaklanma.',
            code: `const inputRef = useRef<HTMLInputElement>(null);\ninputRef.current?.focus();`
          }
        ]
      }
    ],
    bestPractices: ['Custom hook\'lar ile iş mantığını UI\'dan ayırın.'],
    commonPitfalls: ['Render gövdesinde ref.current yazmak.'],
    keyTakeaways: ['useRef render tetiklemeden mutable değer tutar.']
  },
  {
    id: 'module-5-performance-concurrency',
    number: 5,
    title: 'Performans Optimizasyonu & Concurrency Mimarisi',
    subtitle: 'useMemo, useCallback, React.memo, useTransition, useDeferredValue',
    icon: 'Zap',
    category: 'Performance',
    difficulty: 'İleri',
    durationMinutes: 55,
    overview: 'Concurrent Rendering yetenekleri, büyük veri setlerinde 60 FPS akıcılık sağlar.',
    sections: [
      {
        id: 'memo-callback',
        title: '1. useMemo ve useCallback',
        content: 'React.memo, useCallback ve useMemo kombinasyonu ile referans kararlılığı sağlanır.',
        codeSnippets: [
          {
            title: 'useTransition Kullanımı',
            language: 'tsx',
            filename: 'SearchTransition.tsx',
            description: 'Non-blocking render.',
            code: `const [isPending, startTransition] = useTransition();\nstartTransition(() => setList(heavyFilter(q)));`
          }
        ]
      }
    ],
    bestPractices: ['Gereksiz her fonksiyona useCallback koymayın, ölçüm yapın.'],
    commonPitfalls: ['Inline nesneler ile React.memo\'yu geçersiz kılmak.'],
    keyTakeaways: ['useTransition kullanıcı girişini acil tutar.']
  },
  {
    id: 'module-6-global-state',
    number: 6,
    title: 'Global State & Server Cache Mimarisi',
    subtitle: 'Context API vs Zustand, Redux Toolkit ve TanStack Query',
    icon: 'Database',
    category: 'State Management',
    difficulty: 'Orta',
    durationMinutes: 50,
    overview: 'İstemci durumu (Zustand) ile sunucu durumu (TanStack Query) ayrımı.',
    sections: [
      {
        id: 'zustand-store',
        title: '1. Zustand Store Tanımı',
        content: 'Zustand selector yapısıyla minimum render üretir.',
        codeSnippets: [
          {
            title: 'Zustand Store',
            language: 'typescript',
            filename: 'useStore.ts',
            description: 'Basit ve güçlü durum yönetimi.',
            code: `export const useStore = create((set) => ({ count: 0, inc: () => set(s => ({ count: s.count + 1 })) }));`
          }
        ]
      }
    ],
    bestPractices: ['API verilerini manuel global state yerine TanStack Query\'ye bırakın.'],
    commonPitfalls: ['Context API\'yi yüksek frekanslı sayaçlar için kullanmak.'],
    keyTakeaways: ['Zustand selector\'ları fine-grained subscription sağlar.']
  },
  {
    id: 'module-7-nextjs-routing',
    number: 7,
    title: 'Modern Routing & Next.js App Router',
    subtitle: 'Nested Layouts, Parallel Routes, Intercepting Routes ve Server Components',
    icon: 'Compass',
    category: 'Routing & Architecture',
    difficulty: 'İleri',
    durationMinutes: 45,
    overview: 'Next.js 15 App Router dosya tabanlı yönlendirme sistemi.',
    sections: [
      {
        id: 'nested-layouts',
        title: '1. Nested Layouts',
        content: 'Layouts sayfa geçişlerinde unmount olmadan durumu korur.',
        codeSnippets: [
          {
            title: 'Dashboard Layout',
            language: 'tsx',
            filename: 'app/dashboard/layout.tsx',
            description: 'Ortak yerleşim.',
            code: `export default function Layout({ children }) { return <div><Sidebar />{children}</div>; }`
          }
        ]
      }
    ],
    bestPractices: ['Kök bileşenleri daima Server Component olarak tutun.'],
    commonPitfalls: ['Her dosyaya gereksiz "use client" yazmak.'],
    keyTakeaways: ['App Router varsayılan olarak Server Components mimarisine dayanır.']
  },
  {
    id: 'module-8-rsc-streaming',
    number: 8,
    title: 'React Server Components (RSC) & Streaming SSR',
    subtitle: 'Server vs Client Components, Suspense, Server Actions ve 0 KB Bundle',
    icon: 'Server',
    category: 'Server Architecture',
    difficulty: 'İleri',
    durationMinutes: 50,
    overview: '0-bundle-size maliyetiyle sunucuda doğrudan veritabanı erişimi sağlayan RSC mimarisi.',
    sections: [
      {
        id: 'rsc-db-access',
        title: '1. Async Server Components',
        content: 'Server Components doğrudan async/await ile DB sorgulayabilir.',
        codeSnippets: [
          {
            title: 'Server Component DB Query',
            language: 'tsx',
            filename: 'app/products/page.tsx',
            description: 'Doğrudan DB erişimi.',
            code: `export default async function Products() { const p = await db.products.findMany(); return <div>{p.length}</div>; }`
          }
        ]
      }
    ],
    bestPractices: ['Server Actions ile Zod validasyonu kullanın.'],
    commonPitfalls: ['Server Component içinde window veya document\'a erişmeye çalışmak.'],
    keyTakeaways: ['RSC istemci JS bundle boyutunu sıfıra indirir.']
  },
  {
    id: 'module-9-forms-validation',
    number: 9,
    title: 'Form Yönetimi, Validasyon & Güvenlik',
    subtitle: 'React Hook Form, Zod Şemaları, XSS Koruması ve useActionState',
    icon: 'ShieldCheck',
    category: 'Forms & Security',
    difficulty: 'Orta',
    durationMinutes: 45,
    overview: 'React Hook Form ve Zod ile tip güvenli, performanslı form yönetimi.',
    sections: [
      {
        id: 'hook-form-zod',
        title: '1. Hook Form + Zod',
        content: 'Uncontrolled refs sayesinde sıfır render ile maksimum form hızı.',
        codeSnippets: [
          {
            title: 'Zod Form',
            language: 'tsx',
            filename: 'Form.tsx',
            description: 'Zod şema doğrulaması.',
            code: `const schema = z.object({ email: z.string().email() });`
          }
        ]
      }
    ],
    bestPractices: ['Girdileri hem istemcide hem sunucuda doğrulayın.'],
    commonPitfalls: ['Her form inputu için ayrı useState açarak arayüzü yavaşlatmak.'],
    keyTakeaways: ['React Hook Form minimum re-render ile maksimum performans sunar.']
  },
  {
    id: 'module-10-testing-production',
    number: 10,
    title: 'Test Stratejileri, CI/CD & Production Mimarisi',
    subtitle: 'Vitest, React Testing Library, Mock Service Worker ve Code Splitting',
    icon: 'CheckCircle',
    category: 'Testing & DevOps',
    difficulty: 'İleri',
    durationMinutes: 50,
    overview: 'Bileşen entegrasyon testleri ve üretim derleme optimizasyonu.',
    sections: [
      {
        id: 'rtl-testing',
        title: '1. React Testing Library',
        content: 'Kullanıcının gördüğü ve etkileşime girdiği arayüzü test edin.',
        codeSnippets: [
          {
            title: 'Vitest RTL Testi',
            language: 'tsx',
            filename: 'Button.test.tsx',
            description: 'Kullanıcı etkileşim testi.',
            code: `expect(screen.getByRole('button')).toBeInTheDocument();`
          }
        ]
      }
    ],
    bestPractices: ['Test seçimlerinde erişilebilirlik rolleri (getByRole) kullanın.'],
    commonPitfalls: ['Bileşenin iç state değişkenlerini doğrudan test etmeye çalışmak.'],
    keyTakeaways: ['Kullanıcı odaklı testler yüksek güvenilirlik sağlar.']
  },
  {
    id: 'module-11-ai-vibe-coding-risks',
    number: 11,
    title: 'Yapay Zekâ Destekli React, "Vibe Coding" Riskleri & Ajan Rehberi',
    subtitle: 'LLM Hata Modelleri, Stale Closure, State Soup, Slopsquatting, Paket Halüsinasyonu ve Anti-Doom Loop Protokolü',
    icon: 'Sparkles',
    category: 'AI & Architecture',
    difficulty: 'İleri',
    durationMinutes: 60,
    overview: 'Geniş dil modellerinin (LLM) yazılım geliştirme süreçlerine entegrasyonu "vibe coding" akımını hızlandırmıştır. Ancak yüzeysel çalışan prototipler ile üretim standartlarında (production-ready) güvenilir sistemler arasında yapısal bir uçurum vardır. Bu modülde yapay zekânın React ekosisteminde en sık düştüğü kavramsal ve pratik hata kalıplarını, literatür vakalarını (FreeCodeCamp, React Foundation), güvenlik risklerini (Slopsquatting) ve otonom kodlama ajanları için Anti-Doom Loop kılavuzunu inceliyoruz.',
    sections: [
      {
        id: 'llm-error-dynamics-stale-closures',
        title: '1. Render Zamanlaması Körlüğü & Stale Closure Hataları',
        content: `Yapay zekâ modelleri token tahminine dayalı olasılıksal doğaları gereği statik sözdizimini (syntax) başarıyla üretirken, React'ın zamana yayılan reaktif render döngüsünü ve bellek referanslarını modellemekte zorlanır (Cross-render context blindness).\n\nEn sık karşılaşılan tuzaklar:\n- **Zamanlayıcı ve Olay Dinleyicilerinde Bayat Durum:** \`setInterval\`, \`setTimeout\` veya \`addEventListener\` içinde durum değişkenlerinin doğrudan okunması ve bağımlılık dizisinin boş (\`[]\`) bırakılması sonucu ilk render değerinin hapsedilmesi.\n- **Fonksiyonel Güncelleyici İhmali:** \`setCount(count + 1)\` kullanımı nedeniyle asenkron ve art arda gelen event'lerde (automatic batching) durum kayıpları.`,
        codeSnippets: [
          {
            title: 'Stale Closure Hatası ve Düzeltmesi',
            language: 'tsx',
            filename: 'StaleClosureFix.tsx',
            description: 'AI tarafından sık üretilen bayat closure hatası vs Fonksiyonel Güncelleyici çözümü.',
            code: `// ❌ YAPAY ZEKÂ HATASI (Stale Closure - Sayaç 1'de takılır)
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(seconds + 1); // 'seconds' ilk renderdaki 0 değerine kilitlenir
  }, 1000);
  return () => clearInterval(timer);
}, []); // Boş bağımlılık dizisi closure'ı bayatlatır

// ✅ DOĞRU MÜHENDİSLİK (Fonksiyonel Güncelleyici)
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds((prev) => prev + 1); // Güncel bellek referansı üzerinden artar
  }, 1000);
  return () => clearInterval(timer);
}, []);`
          }
        ],
        notes: [
          'Evelyn Taylor teknik incelemesi: AI hataları rastgele değil; render zamanlaması körlüğünden kaynaklanan sistematik modellerdir.'
        ]
      },
      {
        id: 'use-effect-abuse-state-soup',
        title: '2. useEffect Kötüye Kullanımı, State Soup & God Component Sendromu',
        content: `Yapay zekâ modelleri durum senkronizasyonunu yönetmek için aşırı derecede \`useEffect\` kancasına yaslanarak "You Might Not Need an Effect" kuralını ihlal eder:\n\n- **Türetilmiş Durumun (Derived State) Depolanması:** Bir prop veya mevcut durumdan doğrudan hesaplanabilecek bir değer için ayrı \`useState\` açıp \`useEffect\` ile senkronize etmeye çalışmak (Gereksiz cascading render).\n- **Kararsız Bağımlılık Dizileri:** Render sırasında satır içi oluşturulan nesne veya fonksiyon referanslarının bağımlılığa eklenmesi sonucu sonsuz render döngüsü (\`Maximum update depth exceeded\`).\n- **Eksik Temizleme (Cleanup):** WebSocket, abonelik veya fetch isteklerinde \`AbortController\` temizleme bloklarının yazılmaması.\n- **State Soup (Durum Çorbası):** Birbirine bağımlı 10-15 durumun (\`isLoading\`, \`data\`, \`error\`, \`filter\`) normalize edilmeden yan yana açılması.\n- **God Component (Tanrı Bileşen):** Veri çekme, yetkilendirme, iş mantığı ve UI'ın 800+ satırlık tek bir devasa bileşende toplanması.`,
        codeSnippets: [
          {
            title: 'Türetilmiş Durum Refactoring & Reducer Normalizasyonu',
            language: 'tsx',
            filename: 'DerivedStateFix.tsx',
            description: 'Gereksiz useEffect/useState yerine doğrudan hesaplama ve useReducer kullanımı.',
            code: `// ❌ YAPAY ZEKÂ HATASI (Gereksiz State & Effect - Cascading Render)
const [items, setItems] = useState<Item[]>([]);
const [filteredItems, setFilteredItems] = useState<Item[]>([]);
useEffect(() => {
  setFilteredItems(items.filter(i => i.active));
}, [items]); // Ekstra re-render ve senkron kayması!

// ✅ DOĞRU MÜHENDİSLİK (Inline Hesaplanmış / useMemo Türetilmiş Durum)
const [items, setItems] = useState<Item[]>([]);
const filteredItems = useMemo(() => items.filter(i => i.active), [items]);`
          }
        ]
      },
      {
        id: 'ssr-hydration-react19',
        title: '3. SSR Hidrasyon Uyuşmazlıkları & React 19 Uyumsuzluğu',
        content: `Next.js App Router ve SSR ortamlarında LLM'ler sunucu/istemci sınırlarını ayırt edememektedir:\n\n- **Tembel "use client" Enjeksiyonu:** Derleme hatası alındığı anda en tepe bileşenin başına \`"use client"\` ekleyerek Server Components (RSC) mimarisini ve sıfır bundle avantajını yok etmek.\n- **Deterministik Olmayan İlk Render:** Tarayıcı API'lerinin (\`window\`, \`localStorage\`) veya \`Date.now()\`, \`Math.random()\` gibi dinamik değerlerin doğrudan render gövdesinde çağrılması sonucu oluşan \`Hydration failed\` hatası.\n- **Ezber Memoization:** Basit hesaplamalara dahi \`useMemo\`/\`useCallback\` serpiştirerek React Compiler'ın otomatik optimizasyonunu bozmak.\n- **Eski Kalıplara Saplanma:** React 19 doğrudan \`ref\` geçirme desteği varken gereksiz \`forwardRef\` yazmak; \`useActionState\` yerine eski karmaşık form state mekanizmalarına başvurmak.`,
        codeSnippets: [
          {
            title: 'SSR Güvenli Mount & LocalStorage Erişimi',
            language: 'tsx',
            filename: 'SSRSafeStorage.tsx',
            description: 'Hidrasyon hatasını önleyen iki aşamalı mount paterni.',
            code: `// ✅ SSR Güvenli LocalStorage Okuma
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function ThemeDisplay() {
  const isMounted = useMounted();
  if (!isMounted) return <div className="skeleton-placeholder" />;
  const theme = localStorage.getItem('theme') || 'dark';
  return <span>Tema: {theme}</span>;
}`
          }
        ]
      },
      {
        id: 'slopsquatting-package-hallucinations',
        title: '4. Güvenlik Zafiyetleri, Paket Halüsinasyonu & "Slopsquatting"',
        content: `Yapay zekâ tabanlı kod üretiminin en tehlikeli boyutu siber güvenlik ve yazılım tedarik zinciri güvenliğidir:\n\n- **Paket Halüsinasyonu (Hallucinated Dependencies):** LLM'ler var olmayan npm paket isimleri uydurur (Örn: \`react-modal-safe\`).\n- **Slopsquatting Saldırısı:** Siber saldırganlar, popüler LLM'lerin sıkça uydurduğu hayali paket isimlerini tespit edip npm kayıt defterine zararlı kod (malware) olarak yükler. Geliştirici \`npm install <uydurma-paket>\` çalıştırdığında sisteme doğrudan arka kapı açılır (Aikido Security & Trend AI araştırmaları).\n- **İstemci Paketine Sızan Sırlar:** Gizli API anahtarlarının istemci tarafı koduna (\`NEXT_PUBLIC_\`, \`REACT_APP_\`) doğrudan gömülmesi.\n- **XSS Açıkları:** \`dangerouslySetInnerHTML\` kullanımının kontrolsüz önerilmesi ve Zod şema doğrulamasının atlanması.`,
        codeSnippets: [
          {
            title: 'Güvenli API İletişimi & Next.js Server Actions',
            language: 'tsx',
            filename: 'SecureServerAction.ts',
            description: 'Hassas anahtarları istemciye sızdırmayan Server Action mimarisi.',
            code: `'use server';
import { z } from 'zod';

const Schema = z.object({ query: z.string().min(2).max(100) });

export async function secureSearchAction(formData: FormData) {
  // Gizli API anahtarı sadece sunucuda yaşar (process.env.SECRET_API_KEY)
  const parsed = Schema.parse({ query: formData.get('query') });
  const res = await fetch(\`https://api.enterprise.internal/search?q=\${parsed.query}\`, {
    headers: { Authorization: \`Bearer \${process.env.INTERNAL_SECRET_KEY}\` }
  });
  return res.json();
}`
          }
        ]
      },
      {
        id: 'anti-doom-loop-agent-guide',
        title: '5. Sektör Vakaları & Anti-Doom Loop Ajan Protokolü',
        content: `**Gerçek Sektör Vakaları:**\n1. **FreeCodeCamp Refactoring (Tapas Adhikary):** AI tarafından üretilen tek parça devasa analitik panosunun parçalanarak Custom Hook ve TypeScript ile temizlenmesi.\n2. **React Foundation "En Düşük Ortak Payda React" (Seth Webster):** Modeller internetteki milyonlarca amatör kod üzerinde eğitildiği için yanlış kalıpları (ör. state için useRef) meşrulaştırmaktadır.\n3. **Vibe Coding Doom Loop (Mike Creighton & Base44):** Kök neden analizi yapılmadan ajana aktarılan hataların yamalarla kapatılmaya çalışılması sonucu dosya boyutunun katlanması ve projenin kilitlenmesi.\n\n**Otonom Ajan İçin Anti-Doom Loop Protokolü:**\n- **Şartname Odaklı Geliştirme (Spec-First):** Kod yazmadan önce Bileşen Ağacı ve TypeScript arayüzleri/Zod şemaları belirlenmelidir.\n- **Kırmızı Çizgi Kuralları:** \`useEffect\` asla türetilmiş durum için kullanılmaz; veri çekme TanStack Query veya Server Actions ile yapılır; doğrulanmamış npm paketleri projeye eklenemez.\n- **3 Adımlı Hata Ayıklama:**\n  1. *Diagnosis First:* Koda dokunmadan önce hatanın render döngüsü kök nedeni metin olarak açıklanmalıdır.\n  2. *Maksimum 2 Düzeltme Denemesi:* 2 denemede çözülmezse bileşen mimarisi sıfırlanıp basitleştirilmelidir.\n  3. *Katı Linter Denetimi:* \`eslint-plugin-react-hooks\` kuralları error seviyesinde çalıştırılmalıdır.`,
        codeSnippets: [
          {
            title: 'Spec-First TypeScript Mimari Sözleşmesi',
            language: 'tsx',
            filename: 'DashboardContract.ts',
            description: 'Kod üretiminden önce ajan tarafından tanımlanması zorunlu mimari sözleşme.',
            code: `// 1. Durum Makinesi Tipi (State Soup Önleyici)
export type AsyncState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string };

// 2. Modüler Bileşen Props Sözleşmesi
export interface MetricCardProps {
  title: string;
  value: number;
  trend: 'up' | 'down' | 'neutral';
  isLoading: boolean;
}`
          }
        ]
      }
    ],
    bestPractices: [
      'Spec-First: Kod üretiminden önce TypeScript arayüzlerini ve bileşen hiyerarşisini belirleyin.',
      'Bağımsız veri istemcisi (TanStack Query, SWR veya Server Actions) kullanarak useEffect veri çekme kaosunu önleyin.',
      'Paket güvenliği: package-lock.json ve doğrulanmış npm kayıtları ile Slopsquatting tuzaklarına karşı korunun.',
      'Tanı Öncelikli Protokol: Bir hata oluştuğunda yamalamak yerine kök neden (render/closure) analizi yapın.'
    ],
    commonPitfalls: [
      'Türetilmiş durumu ayrı bir useState ve useEffect ile senkronize etmeye çalışmak.',
      'Bağımlılık dizisine render sırasında oluşturulan inline nesneleri koyarak sonsuz render döngüsü yaratmak.',
      'Var olmayan hayali npm paketlerini (hallucinated dependencies) sorgulamadan sisteme yüklemek.',
      'Ajanın körlemesine geçici yamalar (monkey patches) üretmesine izin verip Doom Loop döngüsüne girmek.'
    ],
    keyTakeaways: [
      'Yapay zekâ modelleri sözdizimini bilir ancak render döngüsü ve asenkron kapanış dinamiklerinde körlük yaşar.',
      'Sürdürülebilir vibe coding, ajanın katı TypeScript şemaları, linter kuralları ve mimari sözleşmelerle çerçevelenmesine bağlıdır.'
    ]
  }
];

export const LESSONS_DATA_EN: LessonModule[] = [
  {
    id: 'module-1-react-basics',
    number: 1,
    title: 'React 19 Overview & Modern JSX Architecture',
    subtitle: 'Virtual DOM, React Fiber Tree, Component vs Element, and Compiler Internals',
    icon: 'Layers',
    category: 'Core Architecture',
    difficulty: 'Beginner',
    durationMinutes: 40,
    overview: 'React is the world-leading library for building declarative component-driven user interfaces. In this module, we explore React 19 compiler features, JSX compilation, Virtual DOM, and Fiber reconciliation.',
    sections: [
      {
        id: 'declarative-ui-and-jsx',
        title: '1. Declarative UI Paradigm & JSX Compilation',
        content: 'Traditional imperative approaches require step-by-step DOM manipulation. React introduces a declarative paradigm: UI = fn(state).\n\nJSX compiles down to optimized JavaScript element object calls.',
        codeSnippets: [
          {
            title: 'JSX and Compiled Output',
            language: 'tsx',
            filename: 'UserCard.tsx',
            description: 'JSX transformed into React Element objects.',
            code: `export function UserCard({ name, role }: { name: string; role: string }) {\n  return (\n    <div className="card p-4">\n      <h2 className="title">{name}</h2>\n      <p className="text-muted">{role}</p>\n    </div>\n  );\n}`
          }
        ]
      }
    ],
    bestPractices: ['Keep components as pure functions.', 'Always use unique, stable keys in iterable lists.'],
    commonPitfalls: ['Using array index as key in dynamic lists.'],
    keyTakeaways: ['Virtual DOM minimizes expensive browser DOM reflows.', 'Fiber provides interruptible concurrent rendering.']
  },
  {
    id: 'module-2-hooks-state',
    number: 2,
    title: 'Hooks Architecture & Modern State Management',
    subtitle: 'useState, useReducer, Automatic Batching, Closure Traps, and Immutability',
    icon: 'Cpu',
    category: 'State & Logic',
    difficulty: 'Beginner',
    durationMinutes: 45,
    overview: 'Hooks enable functional components to encapsulate state and lifecycle behaviors. We analyze useState, useReducer, and batching.',
    sections: [
      {
        id: 'use-state-batching',
        title: '1. useState and Automatic Batching',
        content: 'React 18+ automatic batching coalesces multiple setState calls into a single unified render frame.',
        codeSnippets: [
          {
            title: 'Functional Updater Form',
            language: 'tsx',
            filename: 'Counter.tsx',
            description: 'Safely queue updates depending on previous state.',
            code: `setCount(prev => prev + 1);`
          }
        ]
      }
    ],
    bestPractices: ['Avoid keeping redundant derivable values in state.'],
    commonPitfalls: ['Directly mutating state objects.'],
    keyTakeaways: ['React 18+ batches state updates across async events.']
  },
  {
    id: 'module-3-effects-lifecycle',
    number: 3,
    title: 'Effects & Component Lifecycle (useEffect Architecture)',
    subtitle: 'useEffect vs useLayoutEffect, Cleanup Cycles, Render Loops, and Side-Effects',
    icon: 'RefreshCw',
    category: 'Lifecycle & Side-Effects',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    overview: 'Effects synchronize React components with external systems like browser APIs and networks.',
    sections: [
      {
        id: 'use-effect-lifecycle',
        title: '1. useEffect Lifecycle & Cleanup Phase',
        content: 'useEffect executes asynchronously after browser paint to avoid blocking the main UI thread.',
        codeSnippets: [
          {
            title: 'Subscription Cleanup',
            language: 'tsx',
            filename: 'Chat.tsx',
            description: 'Prevent memory leaks using cleanup callbacks.',
            code: `useEffect(() => {\n  const ws = new WebSocket(url);\n  return () => ws.close();\n}, [url]);`
          }
        ]
      }
    ],
    bestPractices: ['Do not use useEffect for simple data transformations.'],
    commonPitfalls: ['Omitting dependencies leading to stale closures.'],
    keyTakeaways: ['useEffect runs asynchronously after paint.']
  },
  {
    id: 'module-4-advanced-hooks',
    number: 4,
    title: 'Advanced Hooks & Custom Hook Architecture',
    subtitle: 'useRef, useImperativeHandle, useId, and Modular Custom Hooks',
    icon: 'Wrench',
    category: 'Advanced Logic',
    difficulty: 'Intermediate',
    durationMinutes: 50,
    overview: 'Explore mutable references without re-renders and create reusable Custom Hook logic.',
    sections: [
      {
        id: 'use-ref-guide',
        title: '1. useRef Mechanics',
        content: 'Mutating ref.current does not trigger component re-renders.',
        codeSnippets: [
          {
            title: 'DOM Reference',
            language: 'tsx',
            filename: 'Focus.tsx',
            description: 'Focusing DOM inputs.',
            code: `const ref = useRef<HTMLInputElement>(null);\nref.current?.focus();`
          }
        ]
      }
    ],
    bestPractices: ['Encapsulate side-effects in single-responsibility Custom Hooks.'],
    commonPitfalls: ['Reading or writing ref.current during rendering.'],
    keyTakeaways: ['useRef stores mutable data across renders without triggering UI updates.']
  },
  {
    id: 'module-5-performance-concurrency',
    number: 5,
    title: 'Performance Optimization & Concurrency',
    subtitle: 'useMemo, useCallback, React.memo, useTransition, useDeferredValue',
    icon: 'Zap',
    category: 'Performance',
    difficulty: 'Advanced',
    durationMinutes: 55,
    overview: 'Master Concurrent React features to maintain 60 FPS under heavy data sets.',
    sections: [
      {
        id: 'memo-optimization',
        title: '1. Memoization & Transitions',
        content: 'Preserve referential equality and prioritize urgent user actions using useTransition.',
        codeSnippets: [
          {
            title: 'useTransition Search',
            language: 'tsx',
            filename: 'Search.tsx',
            description: 'Non-blocking heavy filtering.',
            code: `const [isPending, startTransition] = useTransition();\nstartTransition(() => setResults(heavyFilter(val)));`
          }
        ]
      }
    ],
    bestPractices: ['Profile before wrapping components in React.memo.'],
    commonPitfalls: ['Breaking memoization with inline anonymous functions or objects.'],
    keyTakeaways: ['useTransition marks state updates as non-blocking.']
  },
  {
    id: 'module-6-global-state',
    number: 6,
    title: 'Global State & Server Cache Architecture',
    subtitle: 'Context API vs Zustand, Redux Toolkit, and TanStack Query Cache',
    icon: 'Database',
    category: 'State Management',
    difficulty: 'Intermediate',
    durationMinutes: 50,
    overview: 'Distinguishing Client State (Zustand) from Server State (TanStack Query).',
    sections: [
      {
        id: 'zustand-patterns',
        title: '1. Zustand Store Creation',
        content: 'Zustand provides fine-grained selector subscriptions with 0 boilerplate.',
        codeSnippets: [
          {
            title: 'Zustand Store',
            language: 'typescript',
            filename: 'store.ts',
            description: 'Lightweight global store.',
            code: `export const useStore = create((set) => ({ count: 0, inc: () => set(s => ({ count: s.count + 1 })) }));`
          }
        ]
      }
    ],
    bestPractices: ['Let TanStack Query handle server cache and background refetching.'],
    commonPitfalls: ['Using Context API for high-frequency updates.'],
    keyTakeaways: ['Zustand selectors prevent unnecessary consumer re-renders.']
  },
  {
    id: 'module-7-nextjs-routing',
    number: 7,
    title: 'Modern Routing & Next.js App Router',
    subtitle: 'Nested Layouts, Parallel Routes, Intercepting Routes, and Server Components',
    icon: 'Compass',
    category: 'Routing & Architecture',
    difficulty: 'Advanced',
    durationMinutes: 45,
    overview: 'Next.js 15 App Router file-system routing system with nested layouts.',
    sections: [
      {
        id: 'nested-layout-guide',
        title: '1. Nested Layouts',
        content: 'Layouts preserve client state across page transitions without unmounting.',
        codeSnippets: [
          {
            title: 'Dashboard Layout',
            language: 'tsx',
            filename: 'app/dashboard/layout.tsx',
            description: 'Shared layout.',
            code: `export default function Layout({ children }: { children: React.ReactNode }) { return <div><Sidebar />{children}</div>; }`
          }
        ]
      }
    ],
    bestPractices: ['Default to Server Components and add "use client" only at leaves.'],
    commonPitfalls: ['Wrapping entire pages in "use client".'],
    keyTakeaways: ['App Router defaults to React Server Components.']
  },
  {
    id: 'module-8-rsc-streaming',
    number: 8,
    title: 'React Server Components (RSC) & Streaming SSR',
    subtitle: 'Server vs Client Components, Suspense Streaming, Server Actions, 0 KB Bundle',
    icon: 'Server',
    category: 'Server Architecture',
    difficulty: 'Advanced',
    durationMinutes: 50,
    overview: 'Server Components execute with 0 client JavaScript bundle overhead and direct DB access.',
    sections: [
      {
        id: 'rsc-queries',
        title: '1. Async Server Components',
        content: 'Fetch data directly in components using async/await.',
        codeSnippets: [
          {
            title: 'Server Component Query',
            language: 'tsx',
            filename: 'app/products/page.tsx',
            description: 'Direct server database call.',
            code: `export default async function Products() { const items = await db.product.findMany(); return <div>{items.length}</div>; }`
          }
        ]
      }
    ],
    bestPractices: ['Colocate data fetching at component leaves with Suspense boundaries.'],
    commonPitfalls: ['Accessing browser APIs (window, localStorage) in Server Components.'],
    keyTakeaways: ['RSC delivers 0 KB client JavaScript overhead.']
  },
  {
    id: 'module-9-forms-validation',
    number: 9,
    title: 'Form Management, Validation & Security',
    subtitle: 'React Hook Form, Zod Schemas, XSS Protection, and useActionState',
    icon: 'ShieldCheck',
    category: 'Forms & Security',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    overview: 'Type-safe, high-performance form architecture with React Hook Form and Zod.',
    sections: [
      {
        id: 'hook-form-integration',
        title: '1. React Hook Form + Zod',
        content: 'Uncontrolled ref architecture minimizes re-renders during user typing.',
        codeSnippets: [
          {
            title: 'Zod Validation Schema',
            language: 'tsx',
            filename: 'Register.tsx',
            description: 'Type-safe schema validation.',
            code: `const schema = z.object({ email: z.string().email() });`
          }
        ]
      }
    ],
    bestPractices: ['Validate form data on both client and server.'],
    commonPitfalls: ['Opening separate state variables for every input in large forms.'],
    keyTakeaways: ['React Hook Form achieves maximum performance via uncontrolled inputs.']
  },
  {
    id: 'module-10-testing-production',
    number: 10,
    title: 'Testing Strategies, CI/CD & Production Architecture',
    subtitle: 'Vitest, React Testing Library, Mock Service Worker, and Code Splitting',
    icon: 'CheckCircle',
    category: 'Testing & DevOps',
    difficulty: 'Advanced',
    durationMinutes: 50,
    overview: 'Component testing pyramid and production build optimization.',
    sections: [
      {
        id: 'rtl-tests',
        title: '1. React Testing Library',
        content: 'Test components from the user perspective instead of internal state.',
        codeSnippets: [
          {
            title: 'Vitest RTL Test',
            language: 'tsx',
            filename: 'Button.test.tsx',
            description: 'User interaction assertion.',
            code: `expect(screen.getByRole('button')).toBeInTheDocument();`
          }
        ]
      }
    ],
    bestPractices: ['Use accessibility queries (getByRole, getByLabelText).'],
    commonPitfalls: ['Testing internal implementation details and component state.'],
    keyTakeaways: ['User-centric testing yields high confidence.']
  },
  {
    id: 'module-11-ai-vibe-coding-risks',
    number: 11,
    title: 'AI-Assisted React, "Vibe Coding" Risks & Autonomous Agent Guide',
    subtitle: 'LLM Error Patterns, Stale Closures, State Soup, Slopsquatting, Package Hallucination & Anti-Doom Loop Protocol',
    icon: 'Sparkles',
    category: 'AI & Architecture',
    difficulty: 'Advanced',
    durationMinutes: 60,
    overview: 'Integrating Large Language Models (LLMs) into frontend workflows has popularized "vibe coding". However, a structural gulf exists between superficial prototypes and production-ready, resilient software. This module explores recurrent LLM error dynamics in React (cross-render context blindness, stale closures, state soup), industry case studies (FreeCodeCamp, React Foundation), supply chain vulnerabilities (Slopsquatting), and the actionable Anti-Doom Loop specification for autonomous coding agents.',
    sections: [
      {
        id: 'llm-error-dynamics-stale-closures',
        title: '1. Cross-Render Context Blindness & Stale Closure Pitfalls',
        content: `Because LLMs are probabilistic token predictors, they excel at generating static syntax but struggle to model React's reactive render snapshots over time.\n\nKey Failure Modes:\n- **Stale State in Timers & Listeners:** Inside \`setInterval\`, \`setTimeout\`, or \`addEventListener\` hooks, LLMs frequently reference state variables directly while passing an empty dependency array (\`[]\`), permanently trapping the initial render value.\n- **Omitting Functional Updaters:** Using \`setCount(count + 1)\` instead of \`setCount(prev => prev + 1)\`, causing state dropped updates during automatic batching and asynchronous event streams.`,
        codeSnippets: [
          {
            title: 'Stale Closure Error & Functional Fix',
            language: 'tsx',
            filename: 'StaleClosureFix.tsx',
            description: 'Common AI stale closure bug vs Functional Updater solution.',
            code: `// ❌ AI CODE BUG (Stale Closure - Timer stuck at 1)
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(seconds + 1); // Trapped at initial seconds = 0
  }, 1000);
  return () => clearInterval(timer);
}, []); // Empty deps permanently closes over initial render frame

// ✅ ENGINEERING FIX (Functional Updater)
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds((prev) => prev + 1); // Reads fresh value from state memory
  }, 1000);
  return () => clearInterval(timer);
}, []);`
          }
        ],
        notes: [
          'Evelyn Taylor Technical Review: AI coding mistakes are non-random; they stem systematically from cross-render context blindness.'
        ]
      },
      {
        id: 'use-effect-abuse-state-soup',
        title: '2. useEffect Abuse, State Soup & God Component Syndrome',
        content: `AI models excessively lean on \`useEffect\` for state synchronization, systematically violating "You Might Not Need an Effect":\n\n- **Storing Derived State:** Creating a separate \`useState\` and \`useEffect\` for values directly computable from props or state (triggering cascading re-renders and desync bugs).\n- **Unstable Dependency Arrays:** Passing inline object or function references created during render into \`useEffect\` deps, causing infinite render loops (\`Maximum update depth exceeded\`).\n- **Missing Cleanup Blocks:** Neglecting \`AbortController\` or unsubscribes in WebSockets and async fetch effects.\n- **State Soup:** Defining 10-15 independent, un-normalized \`useState\` variables (\`isLoading\`, \`data\`, \`error\`, \`filter\`) leading to impossible state combinations.\n- **God Component Syndrome:** Dumping 800+ lines of data fetching, authentication, business logic, and UI trees into a single monolithic file.`,
        codeSnippets: [
          {
            title: 'Derived State Refactoring & Reducer Normalization',
            language: 'tsx',
            filename: 'DerivedStateFix.tsx',
            description: 'Replacing redundant useEffect/useState with inline computation and useMemo.',
            code: `// ❌ AI CODE BUG (Redundant State & Effect - Cascading Render)
const [items, setItems] = useState<Item[]>([]);
const [filteredItems, setFilteredItems] = useState<Item[]>([]);
useEffect(() => {
  setFilteredItems(items.filter(i => i.active));
}, [items]); // Extra render pass and potential race condition!

// ✅ ENGINEERING FIX (Inline / useMemo Derived State)
const [items, setItems] = useState<Item[]>([]);
const filteredItems = useMemo(() => items.filter(i => i.active), [items]);`
          }
        ]
      },
      {
        id: 'ssr-hydration-react19',
        title: '3. SSR Hydration Mismatches & React 19 Incompatibilities',
        content: `In Next.js App Router and SSR architectures, LLMs fail to respect client/server boundaries:\n\n- **Lazy "use client" Injection:** Adding \`"use client"\` to top-level pages as a knee-jerk fix for build errors, discarding Server Components (RSC) performance and zero-bundle benefits.\n- **Non-Deterministic Hydration Errors:** Accessing browser-only APIs (\`window\`, \`localStorage\`) or dynamic values (\`Date.now()\`, \`Math.random()\`) in render bodies, resulting in \`Hydration failed\` mismatch errors.\n- **Cargo-Cult Memoization:** Sprinkling unnecessary \`useMemo\` and \`useCallback\` over cheap calculations, creating memory overhead and interfering with React Compiler auto-memoization.\n- **Stuck in Legacy Patterns:** Wrapping components in \`forwardRef\` despite React 19 direct \`ref\` prop support, or ignoring \`useActionState\` in favor of legacy multi-state form handlers.`,
        codeSnippets: [
          {
            title: 'SSR-Safe Mount & LocalStorage Guard',
            language: 'tsx',
            filename: 'SSRSafeStorage.tsx',
            description: 'Two-phase mount pattern to prevent hydration mismatches.',
            code: `// ✅ SSR-Safe LocalStorage Access
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function ThemeDisplay() {
  const isMounted = useMounted();
  if (!isMounted) return <div className="skeleton-placeholder" />;
  const theme = localStorage.getItem('theme') || 'dark';
  return <span>Theme: {theme}</span>;
}`
          }
        ]
      },
      {
        id: 'slopsquatting-package-hallucinations',
        title: '4. Security Vulnerabilities, Package Hallucination & "Slopsquatting"',
        content: `The most hazardous dimension of AI code generation is cyber security and software supply chain integrity:\n\n- **Package Hallucination:** LLMs frequently invent non-existent npm package names (e.g. \`react-modal-safe\`).\n- **Slopsquatting Attacks:** Threat actors identify hallucinated package names favored by LLMs and publish malware under those exact names to npm. Developers running \`npm install <hallucinated-package>\` unknowingly infect their project (Aikido Security & Trend AI Research).\n- **Unvetted npx Commands:** Autonomous agent skills executing hallucinated \`npx\` commands creating arbitrary system execution vectors.\n- **Secrets in Client Bundles:** Exposing private API credentials by proposing client-side environment prefixes (\`NEXT_PUBLIC_\`, \`REACT_APP_\`).\n- **XSS Flaws:** Recommending unchecked \`dangerouslySetInnerHTML\` and skipping schema validations (Zod).`,
        codeSnippets: [
          {
            title: 'Secure API Communication & Server Actions',
            language: 'tsx',
            filename: 'SecureServerAction.ts',
            description: 'Next.js Server Action pattern shielding sensitive credentials from the browser.',
            code: `'use server';
import { z } from 'zod';

const Schema = z.object({ query: z.string().min(2).max(100) });

export async function secureSearchAction(formData: FormData) {
  // Secret API keys remain strictly on the server (process.env.INTERNAL_SECRET_KEY)
  const parsed = Schema.parse({ query: formData.get('query') });
  const res = await fetch(\`https://api.enterprise.internal/search?q=\${parsed.query}\`, {
    headers: { Authorization: \`Bearer \${process.env.INTERNAL_SECRET_KEY}\` }
  });
  return res.json();
}`
          }
        ]
      },
      {
        id: 'anti-doom-loop-agent-guide',
        title: '5. Industry Case Studies & Anti-Doom Loop Agent Protocol',
        content: `**Real-World Case Studies:**\n1. **FreeCodeCamp Refactoring (Tapas Adhikary):** Deconstructing an AI-generated monolithic dashboard into modular custom hooks and typed interfaces.\n2. **React Foundation "Lowest Common Denominator React" (Seth Webster):** Explaining how models trained on millions of amateur repositories legitimize anti-patterns (e.g. using useRef for state).\n3. **Vibe Coding Doom Loop (Mike Creighton & Base44):** The trap where devs pass errors back to the agent without root-cause diagnosis, causing recursive monkey-patches and codebase lockup.\n\n**Actionable Anti-Doom Loop Protocol for Autonomous Coding Agents:**\n- **Spec-First Development:** Require the agent to draft the Component Tree & TypeScript interfaces/Zod schemas before writing implementation code.\n- **Strict Red-Line Rules:** \`useEffect\` is prohibited for derived state; data fetching must use TanStack Query or Server Actions; unverified npm packages are blocked.\n- **3-Step Debugging Protocol:**\n  1. *Diagnosis First:* The agent must explain the root-cause render/closure mechanism in text before editing code.\n  2. *Max 2 Fix Attempts:* If unresolved in 2 tries, reset the component context and simplify architecture.\n  3. *Error-Level Linters:* Configure \`eslint-plugin-react-hooks\` rules at error level, never warning.`,
        codeSnippets: [
          {
            title: 'Spec-First TypeScript Architecture Contract',
            language: 'tsx',
            filename: 'DashboardContract.ts',
            description: 'Architectural contract required before AI code generation.',
            code: `// 1. State Machine Type (Prevents State Soup)
export type AsyncState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: string };

// 2. Modular Component Props Contract
export interface MetricCardProps {
  title: string;
  value: number;
  trend: 'up' | 'down' | 'neutral';
  isLoading: boolean;
}`
          }
        ]
      }
    ],
    bestPractices: [
      'Spec-First: Define TypeScript interfaces and component boundaries prior to code generation.',
      'Use dedicated data clients (TanStack Query, SWR, Server Actions) to prevent useEffect data-fetching chaos.',
      'Package Integrity: Rely on package-lock.json and verified npm packages to prevent Slopsquatting.',
      'Diagnosis-First Protocol: Analyze the render cycle and closure dynamics before applying code changes.'
    ],
    commonPitfalls: [
      'Synchronizing derived state with a separate useState and useEffect.',
      'Passing inline objects or functions to dependency arrays causing infinite render cycles.',
      'Blindly installing hallucinated npm packages suggested by AI assistants.',
      'Allowing an AI agent to enter a Vibe Coding Doom Loop through ungrounded monkey patches.'
    ],
    keyTakeaways: [
      'LLMs generate syntactically convincing code while remaining blind to reactive render timelines and async closures.',
      'Sustainable vibe coding demands strict TypeScript boundaries, error-level linter rules, and architectural contracts.'
    ]
  }
];

export function getLessonsData(lang: Language = 'tr'): LessonModule[] {
  return lang === 'en' ? LESSONS_DATA_EN : LESSONS_DATA_TR;
}

export const LESSONS_DATA = LESSONS_DATA_TR;
