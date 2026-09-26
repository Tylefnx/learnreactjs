import { ArchitectureNode, Language } from '../types';

export const ARCHITECTURE_DATA_TR: ArchitectureNode[] = [
  {
    id: 'virtual-dom-fiber',
    title: 'Virtual DOM & React Fiber Tree',
    category: 'Fiber',
    description: 'React Fiber, React 16+ ile gelen ve React 19 ile optimize edilen çekirdek reconciliation (uzlaştırma) motorudur. UI güncellemelerini önceliklendirilebilir, duraklatılabilir ve iptal edilebilir iş parçacıklarına böler.',
    role: 'Arayüz hiyerarşisini doubly-linked list (child, sibling, return) yapısında bir Fiber ağacı olarak bellekte tutar ve concurrent rendering sağlar.',
    keyFeatures: [
      'İki Ağaç Modeli: Current Tree (aktif DOM) ve Work-In-Progress Tree (arka planda hesaplanan)',
      'Time-Slicing: Tarayıcının ana iş parçacığını kilitlemeden 16ms içinde render işleme',
      'Fiber Node Yapısı: stateNode, child, sibling, return, memoizedProps, memoizedState',
      'Interruptible Work: Yüksek öncelikli kullanıcı girdileri arka plan renderını kesebilir'
    ],
    codeExample: `// Fiber Node Yapısı (Basitleştirilmiş)\ninterface FiberNode {\n  tag: WorkTag;\n  key: null | string;\n  stateNode: any;\n  return: FiberNode | null;\n  child: FiberNode | null;\n  sibling: FiberNode | null;\n  memoizedState: any;\n  lanes: Lanes;\n}`,
    connections: ['hooks-dispatcher', 'reconciliation-diffing', 'concurrent-scheduler']
  },
  {
    id: 'reconciliation-diffing',
    title: 'Reconciliation & O(n) Diffing Algoritması',
    category: 'Core',
    description: 'React, iki Virtual DOM ağacını karşılaştırırken geleneksel O(n³) algoritması yerine 2 temel varsayıma dayanan O(n) doğrusal zamanlı diffing uygular.',
    role: 'Hangi DOM düğümlerinin güncelleneceğini, ekleneceğini veya silineceğini minimum DOM manipülasyonu ile hesaplar.',
    keyFeatures: [
      'Farklı Tip Kuralı: Element tipi değiştiğinde tüm alt ağaç yok edilir ve yeniden kurulur',
      'Key Prop Kuralı: Kararlı key\'ler sayesinde liste elemanlarının yeniden sıralanması DOM\'u yok etmeden taşınır',
      'Index as Key Tehlikesi: Sıralama veya silme işlemlerinde state karmaşasına yol açar',
      'Bailout Mekanizması: Props ve state değişmemişse alt ağacın diffing işlemi atlanır'
    ],
    codeExample: `// Doğru Key Kullanımı\n{items.map(item => <UserCard key={item.id} data={item} />)}`,
    connections: ['virtual-dom-fiber', 'performance-memo']
  },
  {
    id: 'nextjs-rsc',
    title: 'Next.js App Router & React Server Components (RSC)',
    category: 'Next.js RSC',
    description: 'React Server Components (RSC), bileşenlerin istemciye 0-bundle-size maliyetiyle sadece sunucuda çalışmasını sağlar.',
    role: 'Sunucu ve istemci arasındaki sınırları belirler, streaming SSR ve Server Actions ile veri iletişimini optimize eder.',
    keyFeatures: [
      'Sıfır JavaScript Bundle: Sunucu bileşenlerinin kodları istemci JS bundle\'ına dahil edilmez',
      'RSC Payload: HTML yerine sanal DOM ağacının JSON benzeri akış formatı istemciye gönderilir',
      '"use client" Direktifi: Sadece etkileşim gerektiren yerlerde istemci sınırını çizer',
      'Server Actions: Form submit ve RPC çağrılarını API route yazmadan güvenli çalıştırır'
    ],
    codeExample: `export default async function UsersPage() {\n  const users = await db.user.findMany();\n  return <div>{users.length} Users</div>;\n}`,
    connections: ['virtual-dom-fiber', 'concurrent-scheduler']
  }
];

export const ARCHITECTURE_DATA_EN: ArchitectureNode[] = [
  {
    id: 'virtual-dom-fiber',
    title: 'Virtual DOM & React Fiber Tree',
    category: 'Fiber',
    description: 'React Fiber is the core reconciliation engine introduced in React 16 and enhanced in React 19. It splits rendering work into chunked, interruptible units of work.',
    role: 'Maintains component hierarchies in memory as a doubly-linked list Fiber tree and coordinates concurrent rendering.',
    keyFeatures: [
      'Dual Tree Model: Current Tree (active DOM) and Work-In-Progress Tree (computed in background)',
      'Time-Slicing: Yields execution back to browser main thread within 16ms frames',
      'Fiber Node Structure: stateNode, child, sibling, return, memoizedProps, memoizedState',
      'Interruptible Work: Urgent user events can cancel background transition render passes'
    ],
    codeExample: `// Fiber Node Structure (Simplified)\ninterface FiberNode {\n  tag: WorkTag;\n  key: null | string;\n  stateNode: any;\n  return: FiberNode | null;\n  child: FiberNode | null;\n  sibling: FiberNode | null;\n  memoizedState: any;\n  lanes: Lanes;\n}`,
    connections: ['hooks-dispatcher', 'reconciliation-diffing', 'concurrent-scheduler']
  },
  {
    id: 'reconciliation-diffing',
    title: 'Reconciliation & O(n) Heuristic Diffing',
    category: 'Core',
    description: 'Instead of traditional O(n³) tree comparison algorithms, React applies an O(n) linear heuristic based on two assumptions.',
    role: 'Calculates which DOM nodes must be inserted, updated, or removed with minimal layout thrashing.',
    keyFeatures: [
      'Different Type Rule: Changing element types destroys and reconstructs the entire subtree',
      'Stable Keys Rule: Stable keys preserve identity across re-orders without destroying DOM nodes',
      'Index as Key Anti-pattern: Causes state corruption and unexpected DOM recycling on list mutations',
      'Bailout Optimization: Skips subtree diffing entirely if props and state are referentially equal'
    ],
    codeExample: `// Proper Key Usage\n{items.map(item => <UserCard key={item.id} data={item} />)}`,
    connections: ['virtual-dom-fiber', 'performance-memo']
  },
  {
    id: 'nextjs-rsc',
    title: 'Next.js App Router & React Server Components (RSC)',
    category: 'Next.js RSC',
    description: 'React Server Components (RSC) execute exclusively on the server with 0 KB client JavaScript bundle footprint.',
    role: 'Defines boundaries between server and client, powering Streaming SSR and secure Server Actions.',
    keyFeatures: [
      'Zero Client Bundle: Server component code is never bundled or shipped to the browser',
      'RSC Stream Payload: Streams virtual DOM tree representations in binary JSON format',
      '"use client" Directive: Explicitly marks the boundary for client interactivity',
      'Server Actions: Form submissions execute as type-safe POST endpoints without manual API boilerplate'
    ],
    codeExample: `export default async function UsersPage() {\n  const users = await db.user.findMany();\n  return <div>{users.length} Users</div>;\n}`,
    connections: ['virtual-dom-fiber', 'concurrent-scheduler']
  }
];

export function getArchitectureData(lang: Language = 'tr'): ArchitectureNode[] {
  return lang === 'en' ? ARCHITECTURE_DATA_EN : ARCHITECTURE_DATA_TR;
}

export const ARCHITECTURE_DATA = ARCHITECTURE_DATA_TR;
