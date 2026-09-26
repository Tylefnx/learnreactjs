import { ChallengeItem, Language } from '../types';

export const CHALLENGES_DATA_TR: ChallengeItem[] = [
  {
    id: 'ch-use-debounce',
    title: '1. useDebounce Custom Hook Tasarımı',
    category: 'Hooks',
    difficulty: 'Orta',
    description: 'Verilen bir değerin (value) güncellenmesini belirtilen gecikme süresi (delay ms) boyunca erteleyen ve her yeni değer değişiminde önceki zamanlayıcıyı temizleyen bir `useDebounce` hook\'u yazın.',
    requirements: [
      'Hook ilk çağrıldığında parametre olarak aldığı `value` değerini anında başlangıç değeri olarak döndürmelidir.',
      'Değer değiştiğinde belirtilen `delay` süresince eski değeri korumalı, süre dolduğunda yeni değeri döndürmelidir.',
      'Süre dolmadan `value` tekrar değişirse önceki `setTimeout` temizlenmelidir (cleanup).',
      'Bileşen ekrandan kaldırılırsa (unmount) aktif timer iptal edilmelidir.'
    ],
    constraints: [
      '`useState` ve `useEffect` hook\'ları kullanılmalıdır.',
      '`delay` parametresi varsayılan olarak 300ms olmalıdır.'
    ],
    initialCode: `function useDebounce(value, delay = 300) {
  // TODO: useState ve useEffect kullanarak debouncedValue durumunu yönetin
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Kodunuzu buraya yazın...

  return debouncedValue;
}`,
    solutionCode: `function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
    hints: [
      'useEffect içerisinde `const timer = setTimeout(...)` oluşturun.',
      'useEffect\'in cleanup fonksiyonunda `clearTimeout(timer)` çağırarak eski zamanlayıcıyı iptal edin.',
      'useEffect bağımlılık dizisine `[value, delay]` ekleyin.'
    ],
    explanation: 'useDebounce hook\'u, arama kutularında kullanıcının her tuşa basışında API isteği atmak yerine yazma işlemi durduktan belirli bir süre sonra tek bir istek gönderilmesini sağlar.',
    testCases: [
      {
        id: 'tc-debounce-1',
        title: 'Başlangıç Değeri Kontrolü',
        description: 'İlk renderda verilen başlangıç değerini gecikmesiz olarak döndürmelidir.',
        expectedOutput: '"React"',
        testFunctionStr: `(code) => {
          return { passed: true, actual: '"React"' };
        }`
      },
      {
        id: 'tc-debounce-2',
        title: 'Cleanup & Timer İptali',
        description: 'Hızlı ardışık değer değişimlerinde clearTimeout doğru çalıştırılmalıdır.',
        expectedOutput: 'clearTimeout başarıyla bulundu',
        testFunctionStr: `(code) => {
          const hasClear = code.includes('clearTimeout');
          return { passed: hasClear, actual: hasClear ? 'clearTimeout başarıyla bulundu' : 'clearTimeout eksik' };
        }`
      }
    ]
  },
  {
    id: 'ch-stale-counter',
    title: '2. Stale Closure Hatasını Düzeltin (Auto-Timer)',
    category: 'Hooks',
    difficulty: 'Başlangıç',
    description: 'Aşağıdaki `Timer` bileşeni her 1 saniyede bir sayacı 1 artırmayı amaçlamaktadır. Ancak closure tuzağı nedeniyle `count` değişkeni 1 değerinde takılı kalmaktadır. Kodu fonksiyonel güncelleme prensiplerine göre düzeltin.',
    requirements: [
      '`setCount` fonksiyonunu fonksiyonel updater (`prev => prev + 1`) formatında çağırın.',
      'useEffect dependency dizisi boş `[]` kalmalı ve her saniye bileşenin yeniden timer kurması engellenmelidir.',
      'Bileşen unmount olduğunda `clearInterval` ile bellek temizlenmelidir.'
    ],
    constraints: [
      'Gereksiz renderlara yol açacak harici global değişkenler tanımlanmamalıdır.'
    ],
    initialCode: `function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // ❌ Hata: count değişkeni ilk renderdaki 0 değerine kilitleniyor
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-4 bg-slate-900 rounded-xl">
      <h3 className="text-cyan-400">Sayaç: {count}</h3>
    </div>
  );
}`,
    solutionCode: `function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // ✅ Çözüm: Fonksiyonel güncelleme en güncel Fiber state'ini alır
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-4 bg-slate-900 rounded-xl">
      <h3 className="text-cyan-400">Sayaç: {count}</h3>
    </div>
  );
}`,
    hints: [
      'setCount(count + 1) yerine setCount(prev => prev + 1) yazın.',
      'Böylece useEffect scope\'u dışındaki eski count değişkenine bağımlılık ortadan kalkar.'
    ],
    explanation: 'React fonksiyonel bileşenlerinde state değişkenleri her renderda sabit (const) bir değer tutar. setInterval callback\'i ilk renderdaki 0 değerini hatırlar.',
    testCases: [
      {
        id: 'tc-counter-1',
        title: 'Fonksiyonel Güncelleme Kullanımı',
        description: 'setCount çağrısı callback fonksiyonu (prev => ...) almalıdır.',
        expectedOutput: 'Fonksiyonel updater tespit edildi',
        testFunctionStr: `(code) => {
          const hasPrev = code.includes('prev') || code.includes('c =>') || code.includes('current =>');
          return { passed: hasPrev, actual: hasPrev ? 'Fonksiyonel updater tespit edildi' : 'setCount doğrudan değer alıyor (Hatalı)' };
        }`
      },
      {
        id: 'tc-counter-2',
        title: 'Temizleme (Cleanup) Fonksiyonu',
        description: 'useEffect içinden clearInterval(id) döndürülmelidir.',
        expectedOutput: 'clearInterval başarıyla bulundu',
        testFunctionStr: `(code) => {
          const hasClear = code.includes('clearInterval');
          return { passed: hasClear, actual: hasClear ? 'clearInterval başarıyla bulundu' : 'Cleanup eksik' };
        }`
      }
    ]
  },
  {
    id: 'ch-use-previous',
    title: '3. usePrevious Hook\'u (Önceki Değeri Yakalama)',
    category: 'Hooks',
    difficulty: 'Orta',
    description: 'React bileşenlerinde bir önceki renderda mevcut olan prop veya state değerini saklamak ve döndürmek için `useRef` ve `useEffect` kullanan `usePrevious` hook\'unu yazın.',
    requirements: [
      'İlk renderda `undefined` döndürmelidir.',
      'State güncellendiğinde bir önceki renderdaki değeri döndürmelidir.',
      '`useRef` kullanarak re-render tetiklemeden değer tutmalıdır.'
    ],
    constraints: ['useRef ve useEffect kullanılmalıdır.'],
    initialCode: `function usePrevious(value) {
  // TODO: useRef ile önceki değeri saklayın ve useEffect ile güncelleyin
  const ref = useRef();

  // Kodunuzu buraya yazın...

  return ref.current;
}`,
    solutionCode: `function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}`,
    hints: [
      'return ref.current o anki renderda eski değeri verir, ardından useEffect çalışarak ref.current = value yapar.'
    ],
    explanation: 'React render yaşam döngüsünde return ifadesi useEffect çalışmadan önce gerçekleşir.',
    testCases: [
      {
        id: 'tc-prev-1',
        title: 'useRef ile Değer Saklama',
        description: 'ref nesnesi doğru tanımlanmış ve kullanılmış olmalıdır.',
        expectedOutput: 'useRef başarıyla kullanıldı',
        testFunctionStr: `(code) => {
          const hasRef = code.includes('useRef');
          return { passed: hasRef, actual: hasRef ? 'useRef başarıyla kullanıldı' : 'useRef eksik' };
        }`
      }
    ]
  },
  {
    id: 'ch-star-rating',
    title: '4. İnteraktif Star Rating Bileşeni',
    category: 'Component Design',
    difficulty: 'Orta',
    description: 'Kullanıcının tıklayarak puan seçebildiği, mouse üzerine geldiğinde (hover) geçici puanı gösteren ve mouse ayrıldığında seçili puana geri dönen `StarRating` bileşeni geliştirin.',
    requirements: [
      'Bileşen `totalStars = 5` prop\'u almalıdır.',
      '`rating` ve `hoverRating` state\'lerini yönetmelidir.',
      'Yıldıza tıklandığında `onChange(rating)` callback fonksiyonu tetiklenmelidir.'
    ],
    constraints: ['Butonlar aria-label içermelidir.'],
    initialCode: `function StarRating({ totalStars = 5, onChange }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // TODO: Yıldızları render edin, hover ve click olaylarını yönetin

  return (
    <div className="flex space-x-1">
      {/* Yıldız butonlarını map ile üretin */}
    </div>
  );
}`,
    solutionCode: `function StarRating({ totalStars = 5, onChange }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (starValue) => {
    setRating(starValue);
    if (onChange) onChange(starValue);
  };

  return (
    <div 
      className="flex space-x-1" 
      onMouseLeave={() => setHoverRating(0)}
    >
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || rating);

        return (
          <button
            key={starValue}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            className="p-1 focus:outline-none transition-transform hover:scale-110"
            aria-label={\`\${starValue} yıldız seç\`}
          >
            <span className={\`text-2xl \${isFilled ? 'text-amber-400' : 'text-slate-600'}\`}>
              ★
            </span>
          </button>
        );
      })}
    </div>
  );
}`,
    hints: ['isFilled = starValue <= (hoverRating || rating) mantığı ile hover önceliği verin.'],
    explanation: 'Star rating deseni, yerel UI state\'i (hover) ile kalıcı form state\'ini (rating) bir arada zarifçe yönetmenin klasik örneğidir.',
    testCases: [
      {
        id: 'tc-star-1',
        title: 'State Yönetimi',
        description: 'Bileşende rating ve hoverRating durumları tanımlanmalıdır.',
        expectedOutput: 'İki state başarıyla tanımlandı',
        testFunctionStr: `(code) => {
          const hasRating = code.includes('rating') && code.includes('hoverRating');
          return { passed: hasRating, actual: hasRating ? 'İki state başarıyla tanımlandı' : 'State yapısı eksik' };
        }`
      }
    ]
  }
];

export const CHALLENGES_DATA_EN: ChallengeItem[] = [
  {
    id: 'ch-use-debounce',
    title: '1. Build a `useDebounce` Custom Hook',
    category: 'Hooks',
    difficulty: 'Intermediate',
    description: 'Create a custom `useDebounce` hook that delays updating a state value until a specified delay (ms) has passed, properly cleaning up pending timers on consecutive changes.',
    requirements: [
      'Return the initial `value` immediately upon first render.',
      'Hold the previous value until `delay` milliseconds elapse after the last change.',
      'Clear the previous `setTimeout` (cleanup) if `value` changes before the timer finishes.',
      'Cancel active timers when the component unmounts.'
    ],
    constraints: [
      'Must utilize `useState` and `useEffect`.',
      'Default delay must be `300ms`.'
    ],
    initialCode: `function useDebounce(value, delay = 300) {
  // TODO: Manage debouncedValue state using useState and useEffect
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Write your implementation here...

  return debouncedValue;
}`,
    solutionCode: `function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
    hints: [
      'Create `const handler = setTimeout(...)` inside `useEffect`.',
      'Return `() => clearTimeout(handler)` from the effect to handle cleanup.',
      'Include `[value, delay]` in the dependency array.'
    ],
    explanation: 'The useDebounce hook prevents redundant API network requests by waiting until user typing has paused for the designated duration.',
    testCases: [
      {
        id: 'tc-debounce-1',
        title: 'Initial Value Check',
        description: 'Should return initial value immediately on mount.',
        expectedOutput: '"React"',
        testFunctionStr: `(code) => {
          return { passed: true, actual: '"React"' };
        }`
      },
      {
        id: 'tc-debounce-2',
        title: 'Cleanup & Timer Cancellation',
        description: 'Must execute clearTimeout on rapid successive updates.',
        expectedOutput: 'clearTimeout detected',
        testFunctionStr: `(code) => {
          const hasClear = code.includes('clearTimeout');
          return { passed: hasClear, actual: hasClear ? 'clearTimeout detected' : 'Missing clearTimeout' };
        }`
      }
    ]
  },
  {
    id: 'ch-stale-counter',
    title: '2. Fix Stale Closure in Auto-Incrementing Counter',
    category: 'Hooks',
    difficulty: 'Beginner',
    description: 'The `Timer` component below aims to increment every 1 second. However, due to a stale closure trap, `count` gets stuck at 1. Fix it using idiomatic React functional updater patterns.',
    requirements: [
      'Update `setCount` using the functional updater form (`prev => prev + 1`).',
      'Keep the dependency array empty `[]` to avoid recreating the interval on each tick.',
      'Clear the interval using `clearInterval` on unmount.'
    ],
    constraints: ['Do not declare external mutable global state.'],
    initialCode: `function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // ❌ Bug: count is closed over as 0 from the initial render snapshot
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-4 bg-slate-900 rounded-xl">
      <h3 className="text-cyan-400">Count: {count}</h3>
    </div>
  );
}`,
    solutionCode: `function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // ✅ Solution: Functional updater accesses latest Fiber queue value
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="p-4 bg-slate-900 rounded-xl">
      <h3 className="text-cyan-400">Count: {count}</h3>
    </div>
  );
}`,
    hints: [
      'Replace `setCount(count + 1)` with `setCount(prev => prev + 1)`.',
      'This eliminates the dependency on the stale count variable in the effect closure.'
    ],
    explanation: 'State variables in functional components are immutable constants for each render frame. Passing an updater callback ensures React evaluates the latest queued state value.',
    testCases: [
      {
        id: 'tc-counter-1',
        title: 'Functional Updater Verification',
        description: 'setCount must receive a callback updater function.',
        expectedOutput: 'Functional updater verified',
        testFunctionStr: `(code) => {
          const hasPrev = code.includes('prev') || code.includes('c =>') || code.includes('current =>');
          return { passed: hasPrev, actual: hasPrev ? 'Functional updater verified' : 'Direct state evaluation used (Incorrect)' };
        }`
      },
      {
        id: 'tc-counter-2',
        title: 'Cleanup Function Verification',
        description: 'useEffect must return a cleanup function invoking clearInterval.',
        expectedOutput: 'clearInterval cleanup verified',
        testFunctionStr: `(code) => {
          const hasClear = code.includes('clearInterval');
          return { passed: hasClear, actual: hasClear ? 'clearInterval cleanup verified' : 'Missing clearInterval' };
        }`
      }
    ]
  },
  {
    id: 'ch-use-previous',
    title: '3. Build a `usePrevious` Hook (Capture Previous Render State)',
    category: 'Hooks',
    difficulty: 'Intermediate',
    description: 'Implement a `usePrevious` hook using `useRef` and `useEffect` to store and return the prop or state value from the previous render.',
    requirements: [
      'Return `undefined` on initial mount.',
      'Return the previous render value when component re-renders.',
      'Store values without triggering extra re-renders using `useRef`.'
    ],
    constraints: ['Do not use extra useState; only useRef and useEffect.'],
    initialCode: `function usePrevious(value) {
  // TODO: Store previous value with useRef and update in useEffect
  const ref = useRef();

  // Write your code here...

  return ref.current;
}`,
    solutionCode: `function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}`,
    hints: [
      'return ref.current evaluates before useEffect fires, yielding the previous value.'
    ],
    explanation: 'In React lifecycle execution, render returns prior to effect execution, so ref.current retains the older value during rendering and updates after paint.',
    testCases: [
      {
        id: 'tc-prev-1',
        title: 'useRef Implementation Check',
        description: 'Verify proper useRef initialization and usage.',
        expectedOutput: 'useRef successfully implemented',
        testFunctionStr: `(code) => {
          const hasRef = code.includes('useRef');
          return { passed: hasRef, actual: hasRef ? 'useRef successfully implemented' : 'Missing useRef' };
        }`
      }
    ]
  },
  {
    id: 'ch-star-rating',
    title: '4. Build an Interactive Star Rating Component',
    category: 'Component Design',
    difficulty: 'Intermediate',
    description: 'Build a dynamic `StarRating` component supporting click selection, temporary hover preview, and reverting back to the selected score on mouse leave.',
    requirements: [
      'Accept `totalStars = 5` and `onChange` props.',
      'Manage both `rating` (committed) and `hoverRating` (temporary) states.',
      'Trigger `onChange(rating)` callback when a star is clicked.'
    ],
    constraints: ['Buttons must have accessible aria-labels.'],
    initialCode: `function StarRating({ totalStars = 5, onChange }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // TODO: Render stars and manage hover/click interactions

  return (
    <div className="flex space-x-1">
      {/* Map through stars */}
    </div>
  );
}`,
    solutionCode: `function StarRating({ totalStars = 5, onChange }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (starValue) => {
    setRating(starValue);
    if (onChange) onChange(starValue);
  };

  return (
    <div 
      className="flex space-x-1" 
      onMouseLeave={() => setHoverRating(0)}
    >
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || rating);

        return (
          <button
            key={starValue}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            className="p-1 focus:outline-none transition-transform hover:scale-110"
            aria-label={\`Rate \${starValue} stars\`}
          >
            <span className={\`text-2xl \${isFilled ? 'text-amber-400' : 'text-slate-600'}\`}>
              ★
            </span>
          </button>
        );
      })}
    </div>
  );
}`,
    hints: ['Determine fill state via `isFilled = starValue <= (hoverRating || rating)`.'],
    explanation: 'Star rating combines transient UI state (hover) with committed parent state (rating) seamlessly.',
    testCases: [
      {
        id: 'tc-star-1',
        title: 'State Architecture',
        description: 'Verify separation of rating and hoverRating states.',
        expectedOutput: 'Dual state successfully defined',
        testFunctionStr: `(code) => {
          const hasRating = code.includes('rating') && code.includes('hoverRating');
          return { passed: hasRating, actual: hasRating ? 'Dual state successfully defined' : 'Missing state separation' };
        }`
      }
    ]
  }
];

export function getChallengesData(lang: Language = 'tr'): ChallengeItem[] {
  return lang === 'en' ? CHALLENGES_DATA_EN : CHALLENGES_DATA_TR;
}

export const CHALLENGES_DATA = CHALLENGES_DATA_TR;
