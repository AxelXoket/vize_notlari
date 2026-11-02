# Hafta 3 (B): Lifecycle & Effects, Events, Conditional/List Rendering, Hooks, Data Sharing

> Kaynak: [`W3/05-lifecycle-and-effects.md`](../../1_hoca_notlari/W3/05-lifecycle-and-effects.md), [`W3/05-lifecycle-and-effects-example.jsx`](../../1_hoca_notlari/W3/05-lifecycle-and-effects-example.jsx), [`W3/06-event-handling.md`](../../1_hoca_notlari/W3/06-event-handling.md), [`W3/06-event-handling-example.jsx`](../../1_hoca_notlari/W3/06-event-handling-example.jsx), [`W3/07-conditional-rendering.md`](../../1_hoca_notlari/W3/07-conditional-rendering.md), [`W3/07-conditional-rendering-example.jsx`](../../1_hoca_notlari/W3/07-conditional-rendering-example.jsx), [`W3/08-list-rendering.md`](../../1_hoca_notlari/W3/08-list-rendering.md), [`W3/08-list-rendering-example.jsx`](../../1_hoca_notlari/W3/08-list-rendering-example.jsx), [`W3/09-hooks.md`](../../1_hoca_notlari/W3/09-hooks.md), [`W3/09-hooks-example.jsx`](../../1_hoca_notlari/W3/09-hooks-example.jsx), [`W3/10-data-sharing.md`](../../1_hoca_notlari/W3/10-data-sharing.md), [`W3/10-data-sharing-example.jsx`](../../1_hoca_notlari/W3/10-data-sharing-example.jsx)
>
> Satır referansları `W3/dosya:SATIR` biçimindedir (repo köküne göre). "(ders dışı ek bilgi)" işaretli yerler materyalde yoktur.

## İçindekiler

1. [05. Lifecycle Methods ve useEffect](#05-lifecycle-methods-ve-useeffect-w305-lifecycle-and-effectsmd)
2. [06. Event Handling](#06-event-handling-w306-event-handlingmd)
3. [07. Conditional Rendering](#07-conditional-rendering-w307-conditional-renderingmd)
4. [08. List Rendering](#08-list-rendering-w308-list-renderingmd)
5. [09. Hooks](#09-hooks-w309-hooksmd)
6. [10. Data Sharing](#10-data-sharing-w310-data-sharingmd)
7. [Olası sınav soruları ve kısa cevaplar](#olası-sınav-soruları-ve-kısa-cevaplar)
8. [Materyalde hata / eksik / güncel olmayan bilgi](#materyalde-hata--eksik--güncel-olmayan-bilgi)

---

## 05. Lifecycle Methods ve useEffect ([`W3/05-lifecycle-and-effects.md`](../../1_hoca_notlari/W3/05-lifecycle-and-effects.md))

**Ana fikir:** Bir bileşenin (component) hayatı 3 evreden geçer: oluşturulma (mounting), güncellenme (updating), kaldırılma (unmounting). Class component'lerde her evre için override edilen lifecycle method'lar vardır; function component'lerde bunların hepsinin yerini `useEffect` alır (yan etkiler / side effects, veri çekme, temizlik). [`W3/05-lifecycle-and-effects.md:3`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L3), `:79`

### 5.1 Class lifecycle method'ları ([`W3/05-lifecycle-and-effects.md:5-23`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L5-L23))

**Mounting (oluşturma), sırasıyla:**
- `constructor(props)`: mount'tan önce çağrılır. State başlatma ve event handler `bind` etme yeri. `:10`
- `static getDerivedStateFromProps(props, state)`: hem ilk mount'ta hem her update'te `render()`'dan önce. Props'a göre state güncellemek için; `null` dönerse state değişmez. `:11`, `:36-39`
- `render()`: **zorunlu tek method**, JSX döndürür. `:12`
- `componentDidMount()`: bileşen DOM'a yerleştikten sonra. Veri çekme (data fetching), abonelik (subscription), doğrudan DOM işlemleri. `:13`

**Updating (yeniden render), sırasıyla:**
- `static getDerivedStateFromProps()` (mount ile aynı) `:16`
- `shouldComponentUpdate(nextProps, nextState)`: `false` dönerse gereksiz re-render engellenir (performans). `:17`, `:46-49`
- `render()` `:18`
- `getSnapshotBeforeUpdate()`: virtual DOM değişiklikleri gerçek DOM'a yansımadan hemen önce; örn. scroll pozisyonunu yakalamak. `:19`
- `componentDidUpdate(prevProps, prevState)`: update sonrası; state/prop değişince network isteği. `:20`, `:51-54`

**Unmounting (kaldırma):**
- `componentWillUnmount()`: yok edilmeden hemen önce. Temizlik (cleanup): timer temizleme, network isteği iptali. `:23`

**Class örneğindeki log sırası** (`:29-74`, yorumlardaki numaralar):
- Mount: `1. Constructor` -> `2. getDerivedStateFromProps` -> `3/6. Render` -> `4. componentDidMount`
- Update (butona tıklama): `2. getDerivedStateFromProps` -> `5. shouldComponentUpdate` -> `3/6. Render` -> `7. componentDidUpdate`
- Unmount: `8. componentWillUnmount`
- `handleClick` arrow function class field olarak tanımlı, bu yüzden `bind` gerekmez; `setState(prevState => ...)` functional update kullanır. `:61-63`

### 5.2 useEffect ([`W3/05-lifecycle-and-effects.md:77-118`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L77-L118))

- `useEffect`, `componentDidMount` + `componentDidUpdate` + `componentWillUnmount` karşılığı; function component'te side effect yapmayı sağlar. `:79`
- **Dependency array'in 3 hali:**

| Yazım | Ne zaman çalışır | Class karşılığı | Kaynak |
|---|---|---|---|
| `useEffect(fn)` (array yok) | Her render'dan sonra | `componentDidMount` + `componentDidUpdate` | `:88-97` |
| `useEffect(fn, [])` | Sadece ilk render'dan sonra bir kez | `componentDidMount` | `:99-102` |
| `useEffect(fn, [count])` | İlk render'da ve `count` değişince | belirli prop/state için `componentDidUpdate` | `:104-107` |

- **Cleanup function:** effect içinden döndürülen fonksiyon (`return () => {...}`). Materyal bunu `componentWillUnmount` ile eşler. `:93-96`. Not (ders dışı ek bilgi): array'siz veya dolu array'li effect'te cleanup, unmount'a ek olarak effect'in her yeniden çalışmasından **önce** de çalışır; sadece `[]` ile yazılmışsa yalnız unmount'ta çalışır.

### Tablo: Lifecycle method -> Hook karşılığı

| Class lifecycle | Hook karşılığı | Not |
|---|---|---|
| `constructor` (state init) | `useState(initial)` | [`W3/05-lifecycle-and-effects-example.jsx:51-52`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L51-L52) |
| `componentDidMount` | `useEffect(fn, [])` | [`W3/05-lifecycle-and-effects-example.jsx:54-58`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L54-L58) |
| `componentDidUpdate` | `useEffect(fn, [dep])` veya array'siz `useEffect(fn)` | [`W3/05-lifecycle-and-effects-example.jsx:60-63`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L60-L63) |
| `componentWillUnmount` | `useEffect(() => { return () => {...} }, [])` | [`W3/05-lifecycle-and-effects-example.jsx:65-70`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L65-L70) |
| `shouldComponentUpdate` | `React.memo` / `useMemo` (ders dışı ek bilgi) | materyalde eşleme yok |
| `getSnapshotBeforeUpdate` / DOM ölçme | `useLayoutEffect` yakın karşılık (ders dışı eşleme) | [`W3/09-hooks.md:222-224`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L222-L224) |

### Örnek dosya: [`W3/05-lifecycle-and-effects-example.jsx`](../../1_hoca_notlari/W3/05-lifecycle-and-effects-example.jsx)

- **`LifecycleClass`** (`:4-47`): state `{count, message}`; `componentDidMount` içinde `setState({message: 'Component mounted successfully'})` (`:16`) yapar, bu yüzden mount sonrası ikinci bir render + `componentDidUpdate` olur. `componentDidUpdate`, `prevState.count !== this.state.count` ise değişimi loglar (`:21-23`).
- **`LifecycleFunctional`** (`:50-84`): aynı davranışın hook'lu hali. `[]` effect mount mesajını set eder (`:55-58`), `[count]` effect sayaç değişimini loglar (`:61-63`), ayrı bir `[]` effect sadece cleanup döndürür (`:66-70`). `setCount(prevCount => prevCount + 1)` functional update (`:73`).
- **`DataFetching`** (`:87-120`): `data/loading/error` üçlü state; `useEffect` içinde `async` fonksiyon tanımlanıp çağrılır (effect callback'inin kendisi async yapılmaz) (`:94-108`); `try/catch/finally` ile `setLoading(false)`. Render'da **early return**: `if (loading) return ...; if (error) return ...` (`:111-112`); `data?.message` optional chaining (`:117`).
- **`Timer`** (`:123-141`): `setInterval` mount'ta kurulur, cleanup'ta `clearInterval(interval)` (`:127-132`). Kilit nokta: cleanup yoksa unmount sonrası interval çalışmaya devam eder (memory leak).
- **`App`** (`:144-183`): her bileşen için `show...` boolean state ve toggle butonu; `{showX && <X />}` ile mount/unmount tetiklenip konsoldan lifecycle izlenir.

### Dikkat / tuzaklar
- `[count]` effect'i "componentDidUpdate karşılığı" denmesine rağmen **ilk mount'ta da çalışır** (`componentDidUpdate` ilk render'da çalışmaz). [`W3/05-lifecycle-and-effects-example.jsx:60-63`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L60-L63)
- `[]` effect içinde set edilen state ek bir render üretir (`:57`).
- Interval/abonelik kuran her effect cleanup döndürmeli (`:132`).
- (ders dışı ek bilgi) React 18+ `StrictMode` development ortamında effect'leri mount'ta iki kez çalıştırır (mount, cleanup, mount); konsolda çift log görmek normaldir.
- (ders dışı ek bilgi) Zamanlama farkı: class'ta `componentDidMount` içindeki `setState` tarayıcı ekranı boyamadan (paint) önce işlenir, kullanıcı ilk mesajı hiç görmez. `useEffect` ise paint SONRASI çalışır; `LifecycleFunctional` "Component mounted" metnini bir an gösterip sonra "Component mounted successfully" yapabilir. [`W3/05-lifecycle-and-effects-example.jsx:16`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L16), `:57`
- **Stale closure:** `useEffect(() => { const id = setInterval(() => setSeconds(seconds + 1), 1000); return () => clearInterval(id); }, [])` sayaç **1'de takılır**: effect bir kez çalıştığı için callback hep ilk render'ın `seconds = 0` değerini görür. Materyal doğru yazımı kullanıyor: `setSeconds(prevSeconds => prevSeconds + 1)` ([`W3/05-lifecycle-and-effects-example.jsx:128`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L128)).
- `DataFetching` effect'inde cleanup yok; bileşen 1 saniye dolmadan unmount edilirse `setData`/`setLoading` unmount olmuş bileşene çağrılır (React 18'de uyarı yok, etkisiz; ama gerçek fetch'te `AbortController` veya `ignore` bayrağı gerekir, ders dışı ek bilgi). [`W3/05-lifecycle-and-effects-example.jsx:92-109`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L92-L109)

---

## 06. Event Handling ([`W3/06-event-handling.md`](../../1_hoca_notlari/W3/06-event-handling.md))

**Ana fikir:** React event sistemi DOM'a benzer ama event isimleri `camelCase` (`onClick`, `onChange`, `onSubmit`) ve handler'a string değil **fonksiyon** verilir. [`W3/06-event-handling.md:3`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/06-event-handling.md?plain=1#L3)

### Anahtar kavramlar
- **Function component'te handler** (6.1): bileşen içinde fonksiyon tanımlanıp `onClick={handleClick}` ile verilir. `:13-23`
- **Argüman geçirme**: arrow function ile sarmalanır: `onClick={() => greetUser('Alice')}`. `:31-33`
- **`onClick={fn}` vs `onClick={fn()}`** (ders dışı vurgu, materyaldeki örneklerden çıkar): `{fn}` referans verir, tıklamada çalışır. `{fn()}` render sırasında hemen çağırır ve dönüş değerini (genelde `undefined`) handler yapar; handler içinde setState varsa sonsuz re-render ("Too many re-renders") olur.
- **Class component'te handler** (6.2): handler class method'udur; `this` bağlamı kaybolmasın diye constructor'da `this.handleClick = this.handleClick.bind(this)` gerekir. `:41`, `:51-52`. Alternatifler: class field arrow function ([`W3/05-lifecycle-and-effects.md:61`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L61)) veya JSX'te arrow function.
- **Class'ta argüman + event objesi**: `onClick={(e) => this.handleDelete(123, e)}`. `:79`
- **Synthetic Events** (6.3): React tarayıcının native event'ini sarmalayan, tüm tarayıcılarda aynı API'yi veren `SyntheticEvent` objesi verir (cross-browser). `e.target` olayı tetikleyen DOM elemanıdır; `e.target.value` input değeri. `:89`, `:92-98`
- **Default davranışı engelleme** (6.4): `e.preventDefault()` (form submit sayfa yenileme, link navigasyonu). React'te `return false` ile engellenmez (ders dışı ek bilgi). `:103-113`

### Örnek dosya: [`W3/06-event-handling-example.jsx`](../../1_hoca_notlari/W3/06-event-handling-example.jsx)
- **`ButtonClicker`** (`:4-14`): `onClick={handleClick}` ile `alert`.
- **`FormExample`** (`:17-38`): **controlled input**: `value={name}` + `onChange={handleChange}` içinde `setName(e.target.value)` (`:25-27`, `:33`); `handleSubmit` içinde `e.preventDefault()` (`:21`); form `onSubmit`, buton `type="submit"` (`:30`, `:35`).
- **`GreetingButton`** (`:41-52`): aynı handler'a farklı argümanlar: `greetUser('Alice')`, `greetUser('Bob')` (`:48-49`).
- **`App`** (`:55-66`): üçünü başlıklarla render eder.

### Dikkat / tuzaklar
- Class'ta `bind` unutulursa handler içinde `this` `undefined` olur ve `this.setState` hata verir. [`W3/06-event-handling.md:51-52`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/06-event-handling.md?plain=1#L51-L52)
- `onSubmit` form'a verilir, butona değil. [`W3/06-event-handling-example.jsx:30`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/06-event-handling-example.jsx#L30)

---

## 07. Conditional Rendering ([`W3/07-conditional-rendering.md`](../../1_hoca_notlari/W3/07-conditional-rendering.md))

**Ana fikir:** Koşula göre farklı eleman/bileşen render etmek; React'te ayrı bir sözdizimi yoktur, düz JavaScript (`if`, ternary, `&&`) kullanılır. [`W3/07-conditional-rendering.md:3`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering.md?plain=1#L3)

### Teknikler
| Teknik | Ne zaman | Kaynak |
|---|---|---|
| `if` statement (JSX dışında) | Tamamen farklı bileşen döndürmek: `if (isLoggedIn) return <UserGreeting />; return <GuestGreeting />;` | `:5-30` |
| Element variables | Çıktının bir parçası değişir, gerisi aynı kalır: `let button; if (...) button = <LogoutButton/> else button = <LoginButton/>` sonra `{button}` | `:32-87` |
| Ternary `cond ? A : B` | JSX içinde iki seçenek | `:89-106` |
| Logical `&&` (short-circuit) | Koşul true ise render et, false ise hiçbir şey | `:108-131` |
| `return null` | Bileşen kendini gizler (rendered olsa bile) | `:133-176` |

- **Early return**: render başında koşullu `return` (örn. `if (!props.warn) return null;` `:140-142`; `if (loading) return <div>Loading...</div>` [`W3/05-lifecycle-and-effects-example.jsx:111`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L111)).
- `&&` neden çalışır: `true && expr` -> `expr`; `false && expr` -> `false`, React `false`'u render etmez. `:110`, `:119-123`
- `null` döndürmek bileşenin lifecycle'ını etkilemez (ders dışı ek bilgi: bileşen mount'lu kalır, sadece çıktı boştur).
- 7.2 `LoginControl` class'ı 7.1'deki `Greeting`'i kullanır, iki buton tipi `onClick` prop'u alır. `:54-86`
- 7.5 `Page` class'ı `showWarning` state'ini toggle eder; buton yazısı ternary ile `'Hide' : 'Show'`. `:152-175`

### Örnek dosya: [`W3/07-conditional-rendering-example.jsx`](../../1_hoca_notlari/W3/07-conditional-rendering-example.jsx)
- **`BasicConditional`** (`:4-28`): ternary ile buton yazısı (`:12`) ve iki farklı blok (`:15-25`).
- **`MultipleConditions`** (`:31-73`): `renderContent()` yardımcı fonksiyonunda `if / else if` zinciri: admin, user+verified, user+!verified, guest (`:35-45`); `<select>` ve checkbox controlled (`:53`, `:62-66`; checkbox için `e.target.checked`).
- **`LoadingStates`** (`:76-108`): async `fetchData`, `disabled={loading}` (`:99`), üç ayrı `&&`: loading, error, `data && !loading` (`:103-105`).
- **`ConditionalList`** (`:111-165`): `filter` ile süzme (`:121-125`), sonra ternary: liste boşsa "No items match..." (`:151-162`); her `<li key={item.id}>` (`:154`); stokta olup olmamaya göre ikon ternary (`:156`).
- **`ErrorBoundary` (Simplified)** (`:168-176`) + **`ErrorProneComponent`** (`:178-193`): render sırasında `throw new Error` (`:182`). Dikkat: aşağıdaki hata bölümüne bak, bu "boundary" hatayı yakalayamaz.
- **`ShortCircuitExample`** (`:196-224`): `&&` kombinasyonları (`:216-218`) ve `||` ile varsayılan değer: `user?.role || 'Unknown'` (`:221`).

### Dikkat / tuzaklar
- (ders dışı ek bilgi) `&&` solunda **sayı** varsa `0` ekrana basılır: `{list.length && <X/>}` boş listede "0" gösterir. Materyal doğru yazımı kullanıyor: `unreadMessages.length > 0 &&` (`:119`).
- `||` fallback, `0` veya `''` gibi falsy değerleri de değiştirir; sadece `null/undefined` için `??` (ders dışı ek bilgi). [`W3/07-conditional-rendering-example.jsx:221`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering-example.jsx#L221)
- Ternary dalları JSX içinde parantezle sarılır (`:15-25`).

---

## 08. List Rendering ([`W3/08-list-rendering.md`](../../1_hoca_notlari/W3/08-list-rendering.md))

**Ana fikir:** Dizi verisi `Array.prototype.map()` ile JSX eleman dizisine dönüştürülüp render edilir; her elemana kardeşleri arasında benzersiz ve kararlı bir `key` verilir. [`W3/08-list-rendering.md:3`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/08-list-rendering.md?plain=1#L3), `:7`

### Anahtar kavramlar
- **Basic list**: `const listItems = numbers.map(n => <li key={n.toString()}>{n}</li>)`, sonra `<ul>{listItems}</ul>`. `:11-21`
- **`key` neden gerekli**: React'in hangi elemanın değiştiğini, eklendiğini, silindiğini tanımasını sağlar; elemana kararlı kimlik (stable identity) verir. En iyi key: listedeki elemanı kardeşleri arasında benzersiz tanımlayan string (genelde veri `id`'si). `:30`, `:39`
- **Benzersizlik kapsamı**: key'ler **kardeşler (siblings) arasında** benzersiz olmalı, global olarak değil. `:56`
- **Index'i key yapmanın sakıncası**: elemanların sırası değişebiliyorsa (ekleme, silme, sıralama) kullanılmamalı; performansı olumsuz etkiler ve bileşen state'iyle ilgili sorunlara yol açar (state yanlış elemana kayar, örn. input değerleri karışır). `:56`
- **Bileşen çıkarınca key nereye** (8.3): key, `map()` içindeki **bileşen elemanına** konur (`<ListItem key=... />`), bileşenin içindeki root `<li>`'ye değil. Kural: "`map()` çağrısı içindeki elemanlar key ister". `:60`, `:63-87`
- **Inline map** (8.4): `map()` doğrudan JSX içinde `{numbers.map(...)}`. `:92-107`
- (ders dışı ek bilgi) `key` bir prop olarak alt bileşene iletilmez (`props.key` `undefined`); gerekirse ayrı prop (örn. `id`) olarak geçilmeli. Key eksikse console'da "Each child in a list should have a unique key prop" uyarısı çıkar.

### Örnek dosya: [`W3/08-list-rendering-example.jsx`](../../1_hoca_notlari/W3/08-list-rendering-example.jsx)
- **`NumberList`** (`:4-15`): sabit `[1..5]`, inline map, `key={number.toString()}`.
- **`TodoList`** (`:18-34`): obje dizisi, `key={todo.id}`, `completed` ise ternary ile `line-through` stili (`:28`).
- **`ListItem` + `ExtractedNumberList`** (`:37-47`): doğru kullanım, key `<ListItem key=... value=... />` üzerinde (`:44`), `ListItem` içinde key yok (`:38`).
- **`App`** (`:50-61`): üç listeyi başlıklarla render eder.

### Dikkat / tuzaklar
- `key={number.toString()}` yalnız sayılar tekrar etmiyorsa güvenli; tekrar eden değerlerde key çakışır (ders dışı ek bilgi). [`W3/08-list-rendering.md:14`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/08-list-rendering.md?plain=1#L14)
- 8.3 bloğunda `ListItem` ve `NumberList` "yanlış" ve "doğru" hali için aynı snippet'te iki kez tanımlanmış; bu karşılaştırma amaçlı, tek dosyada çalışmaz. `:64`, `:77`

---

## 09. Hooks ([`W3/09-hooks.md`](../../1_hoca_notlari/W3/09-hooks.md))

**Ana fikir:** Hook'lar function component'lerin React state ve lifecycle özelliklerine "hook into" olmasını sağlayan fonksiyonlardır; **React 16.8** ile geldi ve tercih edilen yazım biçimi oldu. [`W3/09-hooks.md:3`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L3)

### Tablo: Hook -> ne işe yarar -> imza

| Hook | Ne işe yarar | İmza | Kaynak |
|---|---|---|---|
| `useState` | Function component'e state ekler; `[değer, setter]` dizisi döner | `const [s, setS] = useState(initial)` | `:5-24` |
| `useEffect` | Side effect (DOM, fetch, abonelik); didMount/didUpdate/willUnmount yerine | `useEffect(() => { ...; return cleanup }, [deps])` | `:26-49` |
| `useContext` | Context değerini `Context.Consumer` sarmadan okur | `const v = useContext(MyContext)` | `:51-73` |
| `useReducer` | Karmaşık state mantığı için `useState` alternatifi; reducer + initial state alır, `[state, dispatch]` döner | `const [state, dispatch] = useReducer(reducer, initialState)` | `:75-110` |
| `useRef` | `.current`'i verilen değerle başlayan, bileşen ömrü boyunca kalıcı mutable obje; genelde DOM'a erişim | `const ref = useRef(null)`; `<input ref={ref}/>`; `ref.current.focus()` | `:112-135` |
| `useMemo` | Pahalı hesaplamayı memoize eder, sadece dependency değişince yeniden hesaplar | `const v = useMemo(() => compute(a), [a])` | `:137-153` |
| `useCallback` | Memoize edilmiş callback fonksiyonu döner (referans eşitliği için) | `const fn = useCallback(() => {...}, [deps])` | `:155-182` |
| Custom Hook | Bileşen mantığını tekrar kullanılabilir fonksiyona çıkarır; adı `use` ile başlar, başka hook çağırabilir | `function useCounter(init = 0) {...}` | `:189-220` |
| `useLayoutEffect` | `useEffect` gibi ama tüm DOM mutasyonlarından sonra **senkron** çalışır; DOM ölçme/mutasyon için | `useLayoutEffect(fn, [deps])` | `:222-263` |
| `useImperativeHandle` | `ref` kullanan parent'a açılan instance değerini özelleştirir (`forwardRef` ile) | `useImperativeHandle(ref, () => ({ focus, clear }))` | `:265-307` |

### Kavram detayları
- **useState** (9.1): `setCount(count + 1)` / `setCount(count - 1)`. `:14`, `:19-20`. Önceki değere dayalı güncellemede functional form: `setCount(prev => prev + 1)` (`:200`).
- **useEffect** (9.2): `document.title` güncelleme, `[count]` ile sadece count değişince. `:37-40`
- **useContext** (9.3): `React.createContext('light')` ile varsayılan `'light'`; Provider `value="dark"` verdiği için buton `'dark'` alır. Provider yoksa varsayılan değer okunur. `:59`, `:62`, `:68`
- **useReducer** (9.4): `reducer(state, action)` saf fonksiyon, `switch (action.type)`; `'reset'` -> `initialState`; bilinmeyen tip -> `throw new Error()`. `dispatch({ type: 'increment' })`. `:85-96`, `:104`
- **useRef** (9.5): ref değişince re-render olmaz (ders dışı ek bilgi). `:114`, `:121-125`
- **useMemo** (9.6): `console.log('Computing...')` sadece `num` değişince çalışır. `:146-149`
- **useCallback** (9.7): `[]` dependency ile fonksiyon bir kez oluşturulur; `memo`'lu ("optimized") çocuklara callback geçerken işe yarar. `:157`, `:166-168`
- **Rules of Hooks** (`:184-187`):
  1. Hook'ları sadece **top level**'da çağır: döngü, koşul, iç içe fonksiyon içinde değil.
  2. Hook'ları sadece **React fonksiyonlarından** çağır: function component veya custom hook; sıradan JS fonksiyonundan değil.
  - (ders dışı ek bilgi) Sebep: React hook'ları çağrılma **sırasına** göre eşler; koşullu çağrı sırayı bozar.
- **Custom Hook** (9.8): `useCounter` `{count, increment, decrement, reset}` objesi döner. Her bileşen kendi bağımsız state kopyasını alır (ders dışı ek bilgi). `:191`, `:197-205`
- **useLayoutEffect** (9.9): `Tooltip` örneği `getBoundingClientRect()` ile ölçüp pozisyon set eder, `[text]` dependency. `:234-242`. (ders dışı ek bilgi) Tarayıcı ekrana boyamadan (paint) önce çalıştığı için titreme (flicker) olmaz; ama ağır iş paint'i bloklar.
- **useImperativeHandle** (9.10): `FancyInput = forwardRef((props, ref) => ...)`; parent `fancyInputRef.current.focus()` / `.clear()` çağırır, gerçek DOM yerine sadece açılan method'lara erişir. `:273-286`, `:291-297`
- **Hook Dependencies and Optimization** (9.11): her effect yalnızca kullandığı değerleri dependency yapar: `[userId]`, `[userId, filter]`; `useMemo` ile `filteredPosts` (`[posts, filter]`), `useCallback` ile `handlePostClick`. `:320-337`
- **Common Hook Patterns** (9.12):
  - `useFetch(url)`: `{data, loading, error}` döner, `[url]` değişince yeniden fetch. `:358-377`
  - `useLocalStorage(key, initialValue)`: **lazy initial state** (`useState(() => ...)`) ile ilk değeri `localStorage`'dan okur, `JSON.parse`/`JSON.stringify`, `try/catch`; `[storedValue, setValue]` döner. `:382-402`

### Örnek dosya: [`W3/09-hooks-example.jsx`](../../1_hoca_notlari/W3/09-hooks-example.jsx)
- Tek satırda 5 hook import: `useState, useEffect, useContext, useReducer, useRef` (`:1`). `useMemo`/`useCallback` bu dosyada yok.
- `CounterWithState` (`:4-13`), `DocumentTitleUpdater` (`:16-29`, `[count]` effect `:19-21`), `ThemeContext` + `ThemedButton` (`:32-41`, tema `'dark'` ise koyu stil `:37`), `reducer` + `CounterWithReducer` (`:44-70`), `FocusInput` (`:73-86`).
- `App` (`:89-110`): `ThemedButton`'ı `<ThemeContext.Provider value="dark">` ile sarar (`:99-101`), böylece buton "Themed Button (dark)" gösterir.

### Dikkat / tuzaklar
- `useCallback` tek başına re-render'ı engellemez; çocuk `React.memo` ile sarılı olmalı (aşağıda hata bölümü). [`W3/09-hooks.md:157`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L157), `:179-181`
- Dependency array'den kullanılan bir değeri çıkarmak bayat değer (stale closure) hatası üretir (ders dışı ek bilgi; `eslint-plugin-react-hooks` `exhaustive-deps` kuralı uyarır).
- Custom hook adı `use` ile başlamazsa React/linter onu hook olarak tanımaz. `:191`

---

## 10. Data Sharing ([`W3/10-data-sharing.md`](../../1_hoca_notlari/W3/10-data-sharing.md))

**Ana fikir:** React'te veri **tek yönlü** akar: parent -> child, props ile. Doğrudan ilişkili olmayan bileşenler veri paylaşacaksa: lifting state up, Context API, (derin ağaçta kaçınılacak) prop drilling veya state management kütüphaneleri. [`W3/10-data-sharing.md:3`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing.md?plain=1#L3)

### Anahtar kavramlar
- **Lifting State Up** (10.1): Birden fazla bileşen aynı state'e ihtiyaç duyuyorsa state **en yakın ortak ataya** (closest common ancestor) taşınır; ata state'i props ile aşağı, değişiklik callback'lerini (`onTemperatureChange`) yine props ile verir. `:7`
  - Örnek `Calculator`: tek `temperature` + `scale` state'i; Celsius/Fahrenheit değerleri render sırasında hesaplanır (derived state). `:22-53`, `:36-37`
- **Context API** (10.2): Props'u her seviyeden elle geçirmeden veri aktarır; bir ağaç için "global" sayılabilecek veriler (tema, kullanıcı, dil). `:58`
  - Adımlar: `createContext()` -> Provider bileşeni `<UserContext.Provider value={{ user, setUser }}>` -> tüketici `useContext(UserContext)`. `:65`, `:72`, `:80`, `:91`
  - Setter'ı context'e koyarak alt bileşen state güncelleyebilir: `setUser(prevUser => ({ ...prevUser, name: 'Jane Smith' }))` (immutable güncelleme, spread). `:94`
- **Props (Prop) Drilling** (10.3): Veriyi birçok ara katmandan geçirerek aşağı indirme (`GrandParent -> Parent -> Child -> GrandChild`); ara katmanlar veriyi kullanmaz, sadece iletir. Geçerli ama derin ağaçta zahmetli; Context ile önlenir. `:113`, `:117-132`
- **State Management Libraries** (10.4): büyük uygulamalar için **Redux**, **MobX**, **Zustand**. `:137`
  - Redux kurulum: `npm install redux react-redux`. `:143`
  - **Action creator**: `increment = () => ({ type: 'INCREMENT' })`. `:146`
  - **Reducer**: `counterReducer(state = initialState, action)`, bilinmeyen action'da `return state`. `:152-161`
  - **Store**: `createStore(counterReducer)`. `:166-169`
  - **Provider**: `<Provider store={store}>`; okumak için `useSelector(state => state.count)`, değiştirmek için `useDispatch()` + `dispatch(increment())`. `:174`, `:179-180`, `:185`, `:193`

### Paylaşım yöntemleri karşılaştırma

| Yöntem | Ne zaman | Artı | Eksi |
|---|---|---|---|
| Props | Parent -> doğrudan child | Basit, açık | Kardeşler arası paylaşım yok |
| Lifting state up | Kardeşler aynı state'i paylaşıyor | Tek doğruluk kaynağı (single source of truth) | Ata büyür, callback'ler artar |
| Prop drilling | Az seviyeli ağaç | Ekstra API yok | Derin ağaçta zahmetli |
| Context API | Ağaç genelinde "global" veri | Ara katmanları atlar | Provider değeri değişince tüm consumer'lar re-render (ders dışı ek bilgi) |
| Redux/MobX/Zustand | Büyük, karmaşık global state | Merkezi store, araçlar | Ek bağımlılık ve boilerplate |

### Örnek dosya: [`W3/10-data-sharing-example.jsx`](../../1_hoca_notlari/W3/10-data-sharing-example.jsx)
- **`ThemeProvider` / `UserProvider`** (`:8-39`): `ThemeContext` değeri `{theme, toggleTheme}` (`:16`), `UserContext` değeri `{user, login, logout}` (`:35`). `toggleTheme` functional update kullanır (`:12`).
- **Custom context hook'ları `useTheme` / `useUser`** (`:42-56`): `createContext()` varsayılansız olduğundan Provider dışında `context` `undefined` olur, hook anlamlı bir hata fırlatır (`:44-46`, `:52-54`). İyi pratik.
- **`ThemeToggle`** (`:59-75`), **`UserProfile`** (`:77-91`, `user` yoksa early return "Please log in" `:80-82`), **`LoginForm`** (`:93-124`, obje state'i spread ile güncellenir `:110`, `:118`; submit'te `preventDefault` + `login(formData)` `:97-101`).
- **Lifting state up: `CounterApp`** (`:164-186`): state parent'ta, `CounterDisplay` (`:127-135`) ve `CounterControls` (`:137-162`) sadece props/callback alır. `CounterControls` kendi lokal `inputValue` state'ini tutar, `parseInt` + `isNaN` kontrolü (`:141-142`).
- **useReducer: `TodoApp`** (`:189-296`): `{todos, filter}` state; action'lar `ADD_TODO` (`id: Date.now()`), `TOGGLE_TODO`, `DELETE_TODO`, `SET_FILTER`, hepsi immutable (`...state`, `map`, `filter`) (`:194-227`); `filteredTodos` derived değer (`:253-257`); listede `key={todo.id}` (`:281`).
- **Prop drilling: `GrandParent -> Parent -> Child`** (`:299-328`): `onDataChange={setSharedData}` callback'i de aşağı iner, `Child` yukarıdaki state'i değiştirir (`:323`).
- **`App`** (`:331-360`): Provider'lar iç içe: `<ThemeProvider><UserProvider>...` (`:338-344`).

### Dikkat / tuzaklar
- `useContext` Provider dışında çağrılırsa `createContext`'e verilen varsayılanı alır; varsayılan yoksa `undefined` ve `const { user } = useContext(...)` patlar. [`W3/10-data-sharing.md:65`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing.md?plain=1#L65), `:80`
- Obje state'i güncellerken mutasyon değil spread kullan. [`W3/10-data-sharing-example.jsx:110`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing-example.jsx#L110)

---

## Olası sınav soruları ve kısa cevaplar

1. **Class component lifecycle'ının üç evresi nedir?** Mounting (constructor, getDerivedStateFromProps, render, componentDidMount), Updating (getDerivedStateFromProps, shouldComponentUpdate, render, getSnapshotBeforeUpdate, componentDidUpdate), Unmounting (componentWillUnmount). [`W3/05-lifecycle-and-effects.md:9-23`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L9-L23)

2. **Class component'te tek zorunlu method hangisi?** `render()`. [`W3/05-lifecycle-and-effects.md:12`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L12)

3. **Veri çekme (data fetching) için class'ta en uygun method?** `componentDidMount()` (DOM'a yerleştikten sonra). Hook karşılığı `useEffect(fn, [])`. [`W3/05-lifecycle-and-effects.md:13`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L13), [`W3/05-lifecycle-and-effects-example.jsx:92-109`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L92-L109)

4. **`shouldComponentUpdate` ne döndürürse re-render engellenir?** `false`. Örnekte `true` döner (izin ver). [`W3/05-lifecycle-and-effects.md:17`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L17), `:48`

5. **Scroll pozisyonunu DOM güncellenmeden hemen önce yakalamak için hangi method?** `getSnapshotBeforeUpdate()`. [`W3/05-lifecycle-and-effects.md:19`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L19)

6. **`useEffect(fn)`, `useEffect(fn, [])`, `useEffect(fn, [count])` farkı?** Array yok: her render sonrası. `[]`: sadece ilk render sonrası bir kez. `[count]`: ilk render'da ve count değiştikçe. [`W3/05-lifecycle-and-effects.md:88-107`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L88-L107)

7. **[`W3/05-lifecycle-and-effects.md`](../../1_hoca_notlari/W3/05-lifecycle-and-effects.md) içindeki `Timer` ilk mount'ta konsola ne yazar, butona bir kez basınca ne yazar?** Mount: `Effect ran`, `Effect ran only once`, `Count changed: 0`. Tık: `Cleanup ran`, `Effect ran`, `Count changed: 1` (`[]` effect tekrar çalışmaz). (StrictMode'da dev'de mount çift görünür, ders dışı.) [`W3/05-lifecycle-and-effects.md:89-107`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L89-L107)

8. **Cleanup function nedir, nasıl yazılır?** Effect callback'inin döndürdüğü fonksiyon; unmount'ta (ve deps'li effect yeniden çalışmadan önce) çalışır. Örn. `return () => clearInterval(interval);`. [`W3/05-lifecycle-and-effects-example.jsx:132`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L132)

9. **Hatayı bul:** `useEffect(() => { setInterval(() => setSeconds(s => s + 1), 1000); }, []);` Cleanup yok; bileşen unmount olunca interval çalışmaya devam eder (leak). `const id = setInterval(...); return () => clearInterval(id);` olmalı. [`W3/05-lifecycle-and-effects-example.jsx:126-133`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L126-L133)

10. **`LifecycleClass` mount olurken log sırası?** `Constructor called`, `Render called`, `Component did mount`, sonra `componentDidMount` içindeki `setState` nedeniyle `Render called`, `Component did update` (count değişmediği için "Count changed" yok). [`W3/05-lifecycle-and-effects-example.jsx:11-22`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L11-L22), `:37`

11. **`LifecycleFunctional` mount'ta kaç render olur?** İki: ilk render, sonra `[]` effect'teki `setMessage` ikinci render tetikler. `[count]` effect yalnız ilk render'da çalışır (`Count changed: 0`). [`W3/05-lifecycle-and-effects-example.jsx:55-63`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L55-L63)

12. **React event'leri DOM event'lerinden nasıl farklı yazılır?** Ad `camelCase` (`onClick`), handler string değil fonksiyon. [`W3/06-event-handling.md:3`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/06-event-handling.md?plain=1#L3)

13. **`onClick={handleClick}` ile `onClick={handleClick()}` farkı?** İlki referans verir, tıklayınca çalışır. İkincisi render sırasında hemen çağrılır; handler setState yapıyorsa sonsuz render döngüsü. Argüman için `onClick={() => handleClick(x)}`. [`W3/06-event-handling.md:19`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/06-event-handling.md?plain=1#L19), `:32`

14. **Class component'te `this.handleClick = this.handleClick.bind(this)` neden gerekir?** Method callback olarak verilince `this` bağlamı kaybolur; bind ile instance'a bağlanır. Alternatif: class field arrow function. [`W3/06-event-handling.md:51-52`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/06-event-handling.md?plain=1#L51-L52), [`W3/05-lifecycle-and-effects.md:61`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L61)

15. **Synthetic event nedir?** React'in native tarayıcı event'ini sarmalayan, tüm tarayıcılarda tutarlı API sunan event objesi (`SyntheticEvent`); `e.target` tetikleyen eleman. [`W3/06-event-handling.md:89`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/06-event-handling.md?plain=1#L89), `:92-95`

16. **Form submit edildiğinde sayfanın yenilenmesini nasıl engellersin?** Handler'da `e.preventDefault()`, form'da `onSubmit={handleSubmit}`. [`W3/06-event-handling.md:106-111`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/06-event-handling.md?plain=1#L106-L111)

17. **Controlled input nedir? Örnek göster.** Değeri React state'inden gelen input: `value={name}` + `onChange={e => setName(e.target.value)}`. [`W3/06-event-handling-example.jsx:25-27`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/06-event-handling-example.jsx#L25-L27), `:33`

18. **`<Mailbox unreadMessages={[]} />` ne render eder?** Yalnızca `<h1>Hello!</h1>`; `0 > 0` false olduğu için `&&` sağ tarafı render edilmez. [`W3/07-conditional-rendering.md:119-130`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering.md?plain=1#L119-L130)

19. **Conditional rendering yöntemlerini say.** `if` (JSX dışı, early return), element variables, ternary `? :`, logical `&&`, `return null`. [`W3/07-conditional-rendering.md:5`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering.md?plain=1#L5), `:32`, `:89`, `:108`, `:133`

20. **Bir bileşenin kendini gizlemesi için ne döndürülür?** `null` (class'ta `render`'dan, function component'te doğrudan). [`W3/07-conditional-rendering.md:135`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering.md?plain=1#L135), `:140-142`

21. **`user?.role || 'Unknown'` `user` null iken ne gösterir?** `User role: Unknown`; `?.` hata vermeden `undefined` döner, `||` fallback devreye girer. [`W3/07-conditional-rendering-example.jsx:221`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering-example.jsx#L221)

22. **`key` prop'u neden gerekli, nerede benzersiz olmalı?** React'in hangi elemanın değiştiğini/eklendiğini/silindiğini tanıması ve kararlı kimlik için; kardeşler arasında benzersiz olmalı, global değil. [`W3/08-list-rendering.md:30`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/08-list-rendering.md?plain=1#L30), `:56`

23. **Array index'ini key yapmanın sakıncası?** Sıra değişebiliyorsa (ekleme/silme/sıralama) performansı bozar ve bileşen state'i yanlış elemana kayabilir. [`W3/08-list-rendering.md:56`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/08-list-rendering.md?plain=1#L56)

24. **Hatayı bul:** `function ListItem(p){ return <li key={p.value}>{p.value}</li>; }` ve `numbers.map(n => <ListItem value={n} />)`. Key yanlış yerde; `map` içindeki `<ListItem key={n.toString()} value={n} />` elemanına konmalı. [`W3/08-list-rendering.md:60`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/08-list-rendering.md?plain=1#L60), `:63-87`

25. **Rules of Hooks nelerdir?** (1) Sadece top level'da çağır, döngü/koşul/iç içe fonksiyonda değil. (2) Sadece function component veya custom hook içinden çağır. [`W3/09-hooks.md:184-187`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L184-L187)

26. **Hatayı bul:** `if (isOpen) { const [x, setX] = useState(0); }` Hook koşul içinde çağrılmış; Rules of Hooks ihlali. Hook'u en üste al, koşulu içeride kullan. [`W3/09-hooks.md:186`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L186)

27. **`useState` ile `useReducer` farkı?** `useReducer` karmaşık state mantığı için alternatif; `(reducer, initialState)` alır, `[state, dispatch]` döner, güncelleme `dispatch({ type })` ile reducer'da yapılır. [`W3/09-hooks.md:77`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L77), `:99`, `:104`

28. **`useMemo` ile `useCallback` farkı?** `useMemo` hesaplanan **değeri** memoize eder; `useCallback` **fonksiyonun kendisini** memoize eder (referans eşitliği, optimize edilmiş çocuklara callback geçmek için). İkisi de dependency array alır. [`W3/09-hooks.md:139`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L139), `:157`

29. **`useRef` ne döndürür, re-render tetikler mi?** `.current`'i başlangıç değeriyle başlayan, bileşen ömrü boyunca kalıcı mutable obje; DOM'a erişim için `ref={inputEl}`. `.current` değişimi re-render tetiklemez (ders dışı). [`W3/09-hooks.md:114`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L114), `:121-130`

30. **`useEffect` ile `useLayoutEffect` farkı?** `useLayoutEffect` DOM mutasyonlarından sonra senkron çalışır (paint öncesi), DOM ölçümü için; `useEffect` paint sonrası asenkron (ders dışı ayrıntı). [`W3/09-hooks.md:224`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L224)

31. **Custom hook'un kuralı nedir?** Adı `use` ile başlar, içinde başka hook çağırabilir, mantığı tekrar kullanılabilir yapar. [`W3/09-hooks.md:191`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L191)

32. **Lifting state up nedir?** Paylaşılan state'i en yakın ortak ataya taşıyıp props ile aşağı, callback ile yukarı akıtmak. [`W3/10-data-sharing.md:7`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing.md?plain=1#L7), [`W3/10-data-sharing-example.jsx:164-186`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing-example.jsx#L164-L186)

33. **Prop drilling nedir, çözümü?** Veriyi kullanmayan ara katmanlardan props ile geçirmek; derin ağaçta zahmetli, Context API ile önlenir. [`W3/10-data-sharing.md:113`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing.md?plain=1#L113)

34. **Context API'nin 3 adımı?** `createContext()`, `<Ctx.Provider value={...}>` ile sarma, `useContext(Ctx)` ile okuma. [`W3/10-data-sharing.md:65`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing.md?plain=1#L65), `:72`, `:80`

35. **[`W3/10-data-sharing-example.jsx`](../../1_hoca_notlari/W3/10-data-sharing-example.jsx) içindeki `useTheme()` Provider dışında çağrılırsa ne olur?** `createContext()` varsayılansız olduğundan değer `undefined`; hook `Error('useTheme must be used within a ThemeProvider')` fırlatır. [`W3/10-data-sharing-example.jsx:4`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing-example.jsx#L4), `:42-47`

36. **Redux'ta okuma ve yazma için hangi react-redux hook'ları?** `useSelector(state => state.count)` okuma, `useDispatch()` + `dispatch(increment())` yazma; uygulama `<Provider store={store}>` ile sarılır. [`W3/10-data-sharing.md:179-185`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing.md?plain=1#L179-L185), `:193`

37. **`Calculator`'da Celsius kutusuna `100` yazılınca Fahrenheit kutusu ne gösterir?** `212` (`'100' * 9 / 5 + 32`, `*` string'i sayıya çevirir). [`W3/10-data-sharing.md:37`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing.md?plain=1#L37)

38. **[`W3/05-lifecycle-and-effects.md`](../../1_hoca_notlari/W3/05-lifecycle-and-effects.md) `Timer`, React 18 `StrictMode` + development'ta mount olunca konsol?** `Effect ran`, `Effect ran only once`, `Count changed: 0`, sonra simüle unmount: `Cleanup ran`, sonra tekrar mount: `Effect ran`, `Effect ran only once`, `Count changed: 0`. Production'da çift çalışma yok. Unmount olunca yalnız `Cleanup ran`. (StrictMode davranışı ders dışı) [`W3/05-lifecycle-and-effects.md:89-107`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L89-L107)

39. **`LifecycleClass`'ta Increment'e basınca ve bileşen Toggle ile kaldırılınca log?** Tık: `Render called`, `Component did update`, `Count changed from 0 to 1`. Kaldırma: `Component will unmount`. [`W3/05-lifecycle-and-effects-example.jsx:20-27`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L20-L27), `:37`

40. **`LifecycleFunctional`'da Increment ve unmount logu?** Tık: yalnız `Count changed: 1` (`[]` effect'ler tekrar çalışmaz). Unmount: `Component will unmount (useEffect cleanup)`. [`W3/05-lifecycle-and-effects-example.jsx:61-70`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L61-L70)

41. **Stale closure: `useEffect(() => { setInterval(() => setSeconds(seconds + 1), 1000) }, [])` ekranda ne gösterir?** 0, sonra **1'de takılır**; callback ilk render'ın `seconds = 0` değerini kapatır (closure). Çözüm: functional update `setSeconds(s => s + 1)` (materyaldeki yazım) veya `seconds`'ı dependency yapmak. [`W3/05-lifecycle-and-effects-example.jsx:126-133`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L126-L133)

42. **`DataFetching` ekranda sırasıyla ne gösterir?** Önce `Loading...` (`<h2>` dahil hiçbir şey yok, early return), ~1 sn sonra `<h2>Data Fetching Example</h2>` + "Data fetched successfully!". [`W3/05-lifecycle-and-effects-example.jsx:89`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L89), `:98-99`, `:111-118`

43. **`ShortCircuitExample` ilk render ve "Load User" sonrası çıktı? Kaç render?** İlk: "No user loaded", "User role: Unknown". Tık: buton "Loading..." (disabled) + "Loading user data..."; 1 sn sonra "Welcome, Jane Doe!", "User role: developer". `setTimeout` içindeki `setUser` + `setIsLoading(false)` React 18'de **automatic batching** ile tek render (React 17'de iki render; ders dışı). [`W3/07-conditional-rendering-example.jsx:200-221`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering-example.jsx#L200-L221)

44. **`LoadingStates`'te veri geldikten sonra tekrar "Fetch Data"ya basılırsa yükleme sırasında eski mesaj görünür mü?** Hayır; `data && !loading` (`:105`) loading true iken false olur, yalnız "Loading spinner..." görünür; buton `disabled`. [`W3/07-conditional-rendering-example.jsx:99-105`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering-example.jsx#L99-L105)

45. **`MultipleConditions`'ta `userType = 'user'`, checkbox işaretsiz: ne render edilir?** "Please verify your email". İşaretlenirse "User Dashboard"; `admin` seçilirse checkbox'tan bağımsız "Admin Panel". [`W3/07-conditional-rendering-example.jsx:35-45`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering-example.jsx#L35-L45)

46. **`ConditionalList`'te "Show only in stock" + Category "vegetable" seçilirse liste?** Yalnız "Broccoli (vegetable) ✅" (Carrot stokta değil). [`W3/07-conditional-rendering-example.jsx:113-125`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering-example.jsx#L113-L125)

47. **`ExpensiveCalculation` `num` aynı kalıp parent re-render olursa `Computing expensive result...` loglanır mı?** Hayır; `useMemo` `[num]` değişmedikçe önceki sonucu döndürür. İlk render'da bir kez loglanır. [`W3/09-hooks.md:145-151`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L145-L151)

48. **`useReducer` sayacında `+ + - Reset +` sırası sonrası `count`?** 1 (1, 2, 1, `initialState` ile 0, 1). Tanımsız `type` dispatch edilirse `throw new Error()`. [`W3/09-hooks.md:85-96`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L85-L96)

49. **`ThemedButton` Provider olmadan render edilirse ne yazar?** "Themed Button (light)" (createContext varsayılanı). Örnekte Provider `value="dark"` olduğu için "Themed Button (dark)". [`W3/09-hooks-example.jsx:32-39`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks-example.jsx#L32-L39), `:99-101`

50. **[`W3/10-data-sharing-example.jsx`](../../1_hoca_notlari/W3/10-data-sharing-example.jsx) Context bölümü ilk açılışta ne gösterir?** Buton "Switch to dark theme", "Please log in", boş Name/Email formu. Login sonrası "Welcome, {name}!" + Email + Logout; `LoginForm` görünmeye devam eder ve alanları sıfırlanır. [`W3/10-data-sharing-example.jsx:72`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing-example.jsx#L72), `:80-82`, `:97-101`

51. **`TodoApp`'te iki todo ekleyip birincisini işaretleyince "Active" filtresi neyi gösterir?** Yalnız ikinci todo; `filteredTodos` `!todo.completed` ile süzer, state'teki `todos` değişmez (derived değer). [`W3/10-data-sharing-example.jsx:253-257`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing-example.jsx#L253-L257)

52. **`CounterControls`'te input'a `abc` veya boş bırakıp "Set"e basılırsa?** Hiçbir şey olmaz: `parseInt` `NaN` döner, `!isNaN` kontrolü `onSetValue`'yu çağırmaz. `12.7` girilirse sayaç 12 olur. [`W3/10-data-sharing-example.jsx:140-146`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing-example.jsx#L140-L146)

53. **`useLayoutEffect` ne zaman `useEffect` yerine seçilir?** DOM ölçülüp aynı karede konum/boyut ayarlanacaksa (tooltip); paint öncesi senkron çalıştığı için titreme olmaz. Diğer tüm yan etkiler için `useEffect`. [`W3/09-hooks.md:224`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L224)

54. **`useImperativeHandle` örneğinde parent `fancyInputRef.current` ile ne yapabilir?** Yalnız açılan `focus()` ve `clear()` method'larını çağırabilir; gerçek `<input>` DOM node'una değil. [`W3/09-hooks.md:276-283`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L276-L283), `:291-297`

---

## Materyalde hata / eksik / güncel olmayan bilgi

1. **JSX sözdizimi hatası (derlenmez):** `WarningBanner` içinde fazladan kapanış etiketi `</div>` var; tek `<div>` açılmış, iki kez kapatılmış. [`W3/07-conditional-rendering.md:145-148`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering.md?plain=1#L145-L148)
2. **"ErrorBoundary" function component olarak yazılmış, hata yakalayamaz:** `hasError` hiçbir yerde `true` yapılmaz (`setHasError` kullanılmıyor). React'te error boundary yalnızca class component ile (`static getDerivedStateFromError` / `componentDidCatch`) yazılabilir. "Trigger Error"a basınca hata yakalanmaz, tüm uygulama ağacı unmount olur (beyaz ekran). [`W3/07-conditional-rendering-example.jsx:167-176`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering-example.jsx#L167-L176), `:182`, `:249-251`
3. **Cleanup "componentWillUnmount gibi" denmesi eksik:** dependency array'siz effect'teki cleanup her re-render'da (effect yeniden çalışmadan önce) de çalışır, sadece unmount'ta değil. [`W3/05-lifecycle-and-effects.md:93-96`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L93-L96)
4. **`[count]` effect'i "componentDidUpdate eşdeğeri" denmesi eksik:** bu effect ilk mount'ta da çalışır; `componentDidUpdate` ilk render'da çalışmaz. [`W3/05-lifecycle-and-effects-example.jsx:60-63`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects-example.jsx#L60-L63), [`W3/05-lifecycle-and-effects.md:104`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L104)
5. **Lifting state up örneğinde boş girdi hatası:** `temperature` `''` iken `scale === 'c'` için Fahrenheit `('' * 9) / 5 + 32 = 32`, `scale === 'f'` için Celsius `-17.77...` gösterir; geçersiz/boş girdi kontrolü ve yuvarlama yok. [`W3/10-data-sharing.md:36-37`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing.md?plain=1#L36-L37)
6. **`useCallback` örneği amacı göstermiyor:** `ChildComponent` `React.memo` ile sarılmadığı için memoize callback re-render'ı engellemez. 9.11'de de `onClick={() => handlePostClick(post.id)}` her render'da yeni fonksiyon üretir, kazanç yok. [`W3/09-hooks.md:157`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L157), `:179-181`, `:343`
7. **`useFetch` eksikleri:** `url` değişince `loading` tekrar `true` yapılmıyor (eski veri "yüklendi" görünür); `response.ok` kontrolü yok (404 hata sayılmaz); cleanup/abort yok (yarış durumu, race condition). [`W3/09-hooks.md:358-377`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L358-L377)
8. **Güncel olmayan: Redux `createStore`:** Redux 4.2'den beri `createStore` "deprecated" işaretli; resmi öneri Redux Toolkit `configureStore`. Kod hâlâ çalışır. (ders dışı bilgiye dayalı tespit) [`W3/10-data-sharing.md:166-169`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing.md?plain=1#L166-L169)
9. **Güncel olmayan sayılabilir: `forwardRef`:** React 19'da function component'ler `ref`'i normal prop olarak alır; `forwardRef` artık gerekmiyor (ileride kaldırılacağı duyuruldu). Kod çalışır. (ders dışı bilgiye dayalı) [`W3/09-hooks.md:271-273`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L271-L273)
10. **Eksik import / tanımsız fonksiyonlar (snippet olarak):** 9.11'de `useState/useEffect/useMemo/useCallback` import edilmemiş, `fetchUser`/`fetchPosts` tanımsız ([`W3/09-hooks.md:315-327`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L315-L327)); 9.12 pattern'lerinde import yok (`:358`, `:382`); 10.3'te `useState` import edilmemiş ([`W3/10-data-sharing.md:118`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing.md?plain=1#L118)); 7.2 ve 7.5'te `React` import edilmeden `React.Component` kullanılmış ([`W3/07-conditional-rendering.md:54`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering.md?plain=1#L54), `:152`).
11. **Küçük tutarsızlıklar:** "Rules of Hooks" başlığı numarasız ve 9.7 ile 9.8 arasına sıkışmış ([`W3/09-hooks.md:184`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L184)); 10.3 başlığı "Props Drilling", örnek dosya "Prop Drilling" diyor ([`W3/10-data-sharing.md:111`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing.md?plain=1#L111), [`W3/10-data-sharing-example.jsx:298`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing-example.jsx#L298)); `BasicConditional`'da `setUser` kullanılmıyor ([`W3/07-conditional-rendering-example.jsx:6`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/07-conditional-rendering-example.jsx#L6)); `parseInt` radix'siz ([`W3/10-data-sharing-example.jsx:141`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/10-data-sharing-example.jsx#L141)).
12. **`useLocalStorage` functional updater'ı bozar:** `setValue(value)` gelen değeri doğrudan `JSON.stringify(value)` ile yazar. `setValue(prev => prev + 1)` çağrılırsa state doğru güncellenir ama `JSON.stringify(fonksiyon)` `undefined` döner, localStorage'a `"undefined"` string'i yazılır; sonraki yüklemede `JSON.parse("undefined")` hata atar, `catch` `initialValue`'ya düşer, kaydedilen değer kaybolur. Düzeltme: `const v = value instanceof Function ? value(storedValue) : value;`. [`W3/09-hooks.md:392-399`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L392-L399)
13. **`Tooltip` koordinatları yanlış sistemde:** `getBoundingClientRect()` **viewport**'a göre koordinat verir (`:236-240`), ama tooltip `position: 'absolute'` ile `position: 'relative'` olan kendi kapsayıcısına göre konumlanıyor (`:245-251`). Kapsayıcı sayfanın sol üstünde değilse tooltip kayar. Ayrıca ölçülen eleman tooltip'i de içeren kapsayıcının kendisi. (Tespit ders dışı CSS bilgisine dayalı.) [`W3/09-hooks.md:234-251`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L234-L251)
14. **`useCallback` yorumu yanıltıcı:** `}, []); // The function is created only once` ([`W3/09-hooks.md:168`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/09-hooks.md?plain=1#L168)). Arrow function her render'da yeniden OLUŞTURULUR; `useCallback` sadece ilk oluşturulanı saklayıp aynı **referansı** döndürür. Doğru ifade: "aynı fonksiyon referansı döner".
15. **Lifecycle eksik konu:** error handling lifecycle method'ları (`getDerivedStateFromError`, `componentDidCatch`) 5.1 listesinde yok; 07 örneğindeki ErrorBoundary hatası bununla bağlantılı. [`W3/05-lifecycle-and-effects.md:5-23`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/05-lifecycle-and-effects.md?plain=1#L5-L23)
