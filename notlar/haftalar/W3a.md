# Hafta 3 (A): React Temelleri, Kurulum, Components, JSX, Props, State

> Kaynak: `W3/00-React-Fundamentals.md`, `W3/00-javascript-basics.md`, `W3/00-setup-and-installation.md`, `W3/01-components.md`, `W3/01-components-class.jsx`, `W3/01-components-functional.jsx`, `W3/02-jsx.md`, `W3/02-jsx-example.jsx`, `W3/03-props.md`, `W3/03-props-example.jsx`, `W3/04-state.md`, `W3/04-state-example.jsx`
>
> Satır referansları repo köküne göredir (`W3/dosya:SATIR`). "(ders dışı ek bilgi)" işaretli yerler kaynakta yoktur.

## İçindekiler

1. [00a. React Temelleri (W3/00-React-Fundamentals.md)](#00a-react-temelleri-w300-react-fundamentalsmd)
2. [00b. React için JavaScript Temelleri (W3/00-javascript-basics.md)](#00b-react-için-javascript-temelleri-w300-javascript-basicsmd)
3. [00c. Kurulum (W3/00-setup-and-installation.md)](#00c-kurulum-w300-setup-and-installationmd)
4. [01. Components (W3/01-components.md + .jsx)](#01-components-w301-componentsmd--jsx)
5. [02. JSX (W3/02-jsx.md + 02-jsx-example.jsx)](#02-jsx-w302-jsxmd--02-jsx-examplejsx)
6. [03. Props (W3/03-props.md + 03-props-example.jsx)](#03-props-w303-propsmd--03-props-examplejsx)
7. [04. State (W3/04-state.md + 04-state-example.jsx)](#04-state-w304-statemd--04-state-examplejsx)
8. [Hızlı karşılaştırma tabloları](#hızlı-karşılaştırma-tabloları)
9. [Olası sınav soruları ve kısa cevaplar](#olası-sınav-soruları-ve-kısa-cevaplar)
10. [Materyalde hata / eksik / güncel olmayan bilgi](#materyalde-hata--eksik--güncel-olmayan-bilgi)

---

## 00a. React Temelleri (W3/00-React-Fundamentals.md)

**Ana fikir:** React, kullanıcı arayüzü (UI) kurmak için bir JavaScript **kütüphanesidir** (library, framework değil). Facebook yaptı, şimdi Meta ve topluluk bakıyor. UI küçük, yeniden kullanılabilir **component**'lere bölünür (`:3`).

### 0.1 React nedir? (`:5-12`)
- Üç özellik: **Declarative**, **Component-Based**, **Learn Once, Write Anywhere** (`:7`).
  - **Declarative (bildirimsel):** Her state için UI'nin *nasıl görüneceğini* tarif edersin; veri değişince React doğru component'leri günceller/render eder (`:10`).
  - **Component-Based:** Kendi state'ini yöneten kapsüllenmiş (encapsulated) component'ler yazılır, birleştirilerek (compose) karmaşık UI kurulur (`:11`).
  - **Learn Once, Write Anywhere:** Materyaldeki tanım: mevcut kodu yeniden yazmadan React ile yeni özellik geliştirebilirsin (`:12`). (ders dışı ek bilgi: slogan genelde "aynı bilgiyle web, sunucu, React Native ile mobil" anlamında kullanılır.)

### 0.2 Neden React? (`:14-29`)
- Avantajlar (`:17-22`):
  - **Virtual DOM:** Doğrudan DOM manipülasyonunu azaltarak performansı artırır.
  - **Component Reusability:** Bir kez yaz, her yerde kullan.
  - **Unidirectional Data Flow (tek yönlü veri akışı):** Veri tek yönde akar (parent'tan child'a); anlamak ve debug etmek kolay.
  - **Rich Ecosystem**, **Developer Tools**, **Mobile Development** (React Native).
- Ne zaman kullanılır (`:25-29`): SPA (single-page application), yeniden kullanılabilir UI, karmaşık etkileşimli UI, sık veri güncellemesi, ölçeklenmesi gereken projeler.

### 0.3 İsimlendirme kuralları (Naming Conventions) (`:31-84`)
| Ne | Kural | Örnek |
|---|---|---|
| Component (function veya class) | **PascalCase**, büyük harfle başlar | `UserProfile` (`:38`, `:43`); `userProfile` YANLIŞ (`:50`) |
| Component dosyası | PascalCase | `UserProfile.js/.jsx/.tsx` (`:58-60`) |
| Hook dosyası | `use` ile başlar | `useUserData.js`, `useLocalStorage.js` (`:63-64`) |
| Utility dosyası | camelCase | `formatDate.js`, `apiClient.js` (`:67-68`) |
| Değişken / fonksiyon | camelCase | `userName`, `isLoggedIn`, `handleClick` (`:74-76`) |
| Component atanan değişken | PascalCase | `const UserCard = () => {}` (`:79`) |
| Sabit (constant) | UPPER_CASE | `API_BASE_URL`, `MAX_RETRY_ATTEMPTS` (`:82-83`) |

- (ders dışı ek bilgi) Neden büyük harf: JSX'te küçük harfli etiket (`<userProfile />`) HTML etiketi sanılır, component olarak çağrılmaz.

### 0.4 JSX söz dizimi kuralları (`:86-143`)
- JSX = **JavaScript XML**, JS içinde HTML benzeri kod yazmayı sağlayan söz dizimi uzantısı (syntax extension) (`:88`).
- **Self-closing** etiketlerde `/` zorunlu: `<img ... />`, `<br />`, `<input />` (`:92-95`); `<br>` YANLIŞ (`:97-100`).
- Attribute'lar **camelCase**: `className` (class değil), `htmlFor` (for değil), `tabIndex={1}`, `autoFocus={true}` (`:105-125`).
- JS ifadeleri **süslü parantez** `{}` içinde: `{name}`, `{age + 1}` (`:130-142`).

### 0.5 Component yapısı (sıralama) (`:145-198`)
Functional component dosyasında önerilen sıra:
1. Imports (`React`, `PropTypes`)
2. Component tanımı (`function UserCard({ user, onEdit, onDelete })`, props destructuring)
3. Hooks (`React.useState(false)`)
4. Event handlers (`handleEdit`, `handleDelete`)
5. Render (`return (...)`)
6. **PropTypes** (opsiyonel ama önerilir): `PropTypes.shape({...}).isRequired`, `PropTypes.func.isRequired` (`:180-188`)
7. **Default props** (opsiyonel): `UserCard.defaultProps = {...}` (`:191-194`)
8. Export: `export default UserCard;` (`:197`)

### 0.6 Props ve State (özet) (`:200-249`)
- **Props:** parent'tan child'a geçen, **read-only** veri (`:203`). Örnek: `<UserProfile user={user} />`, child `function UserProfile({ user })` (`:212`, `:219`).
- **State:** component'e ait, zamanla değişebilen veri (`:230`). `const [count, setCount] = useState(0);` ve `setCount(count + 1)` (`:236-239`).

### 0.7 Event Handling (`:251-275`)
- Event isimleri **camelCase** (`onClick`, `onMouseOver`), handler olarak **fonksiyon** verilir (`:253`, `:268-269`).
- `event.preventDefault()` ile varsayılan davranış engellenir (`:258`).
- Dikkat: `onClick={handleClick}` (referans) doğru; `onClick={handleClick()}` render sırasında çağırır (ders dışı ek bilgi).

### 0.8 Conditional Rendering (`:277-307`)
Üç yöntem:
1. **if** ile erken return (`:284-287`)
2. **Ternary** `{isLoggedIn ? 'Logout' : 'Login'}` (`:294`)
3. **Logical AND** `{message && <div>...</div>}` (`:303`)

### 0.9 Lists and Keys (`:309-335`)
- Liste render ederken her elemana benzersiz (unique) `key` prop ver (`:311`): `todos.map(todo => <li key={todo.id}>...)` (`:317-318`).
- Materyale göre **index'i key olarak kullanmak YANLIŞ**, benzersiz id kullan (`:326-334`).

### 0.10 React Developer Tools (`:337-349`)
- Chrome ve Firefox eklentisi. Özellikler: **Component Tree**, **Props and State** inceleme, **Profiler** (performans), **Hooks** debug (`:346-349`).

### 0.11 Yaygın kalıplar (Common Patterns) (`:351-396`)
- **Container vs Presentational:** Container mantığı yönetir (state, `useEffect` ile veri çekme); Presentational sadece UI çizer (`UserList({ users, loading })`) (`:355-381`).
- **Higher-Order Component (HOC):** Component alıp yeni component döndüren fonksiyon. `withLoading(WrappedComponent)` `isLoading` true ise "Loading..." gösterir, değilse `<WrappedComponent {...props} />` (`:386-395`).

### 0.12 Best Practices (`:398-462`)
1. Component'leri küçük ve tek işe odaklı tut (`UserAvatar` iyi, 200+ satırlık `UserDashboard` kötü) (`:400-417`).
2. Açıklayıcı isimler (`UserProfileCard`, `handleSubmitForm`, `isUserLoggedIn`; `Card`, `flag` kötü) (`:419-430`).
3. Sabitleri ayır (`API_ENDPOINTS`, `VALIDATION_RULES`) (`:432-444`).
4. **PropTypes veya TypeScript** kullan (`:446-462`).

### 0.13 Kaçınılacak hatalar (Common Mistakes) (`:464-525`)
1. **State'i doğrudan değiştirmek:** `users.push(newUser)` YANLIŞ; `setUsers([...users, newUser])` doğru (`:468-473`).
2. **Index'i key yapmak** (`:476-487`).
3. **Loading state'i unutmak:** `loading` state'i tut, `.finally(() => setLoading(false))`, `if (loading) return <div>Loading...</div>` (`:489-525`).

### 0.14 Proje yapısı (Project Structure) (`:527-825`)
**Root dizin** (`:533-539`):
- `package.json`: bağımlılıklar, script komutları, metadata
- `package-lock.json` / `yarn.lock`: sürümleri kilitler (deterministik kurulum)
- `node_modules/`: npm paketleri, genelde version control dışında
- `public/`: statik dosyalar (favicon, index.html). **CRA'da `index.html` burada** (`:538`)
- `src/`: tüm uygulama kodu

**src dizini** (`:543-554`):
- `index.js` (CRA) veya `main.jsx` (Vite): **entry point**, `ReactDOM.createRoot` / `createRoot` çağrısı burada (`:545`)
- `App.js`: ana component, route/diğer component'ler buraya bağlanır
- `App.css`, `index.css`: global/başlangıç stilleri
- `components/` (yeniden kullanılabilir UI), `pages/` veya `views/` (route sayfaları), `hooks/` (custom hooks), `context/` (Context API provider'ları), `assets/` (resim, ikon), `utils/` (yardımcı fonksiyon, sabit), `tests/` veya `__tests__/` (Jest / React Testing Library)

**Dosya uzantıları** (`:607-679`):
| Uzantı | Anlamı |
|---|---|
| `.jsx` | JSX içeren React component |
| `.js` | Düz JavaScript |
| `.tsx` | TypeScript React component (`interface UserProps`) |
| `.ts` | TypeScript dosyası |
| `.css` | Normal CSS |
| `.module.css` | **CSS Modules**, scoped (component'e özel) stil |
| `.scss` | Sass/SCSS (`$primary-color` değişkeni) |
| `package.json` | Proje config; örnekte `react ^18.2.0`, scripts `react-scripts start/build` (`:666-678`) |

**Alternatif yapılar** (`:681-711`):
- **Next.js:** `app/` = **App Router (Next.js 13+)**, `page.js` sayfa, `layout.js` root layout; `pages/` = **Pages Router (legacy)** (`:688-694`).
- **Remix:** `app/routes/` **file-based routing**, `_index.jsx` ana route (`:704-707`).

**Kendi yapını kurmak** (`:713-796`):
- Tek doğru yapı yok; proje boyutu ve ekip belirler (`:715`).
- Component klasörü: `Header/Header.jsx, Header.css, Header.test.js, index.js` (`:725-729`).
- **Barrel exports:** `components/index.js` içinde `export { default as Header } from './Header/Header';` sonra `import { Header, Button, Modal } from './components';` (`:744-750`).
- Klasör stratejileri: **Feature-based** (`features/auth`, `features/dashboard`, `shared/`) (`:755-774`) ve **Type-based** (`components/`, `pages/`, `hooks/`, `services/`...) (`:776-787`).
- Best practices (`:791-796`): ilişkili dosyaları birlikte tut, tutarlı isimlendirme, barrel exports, sorumlulukları ayır (UI, logic, data), yapıyı README'de belgele, basit başla gerekince refactor et.

**Dikkat / tuzaklar:**
- Materyal index'i key olarak kullanmayı kesin "yanlış" sayar; sınavda materyalin cevabını ver (`:326`, `:478`).
- Örnek ağaç (`:558-605`) CRA (`public/index.html`, `App.js`) ile Vite (`main.jsx`) öğelerini karıştırıyor.

---

## 00b. React için JavaScript Temelleri (W3/00-javascript-basics.md)

**Ana fikir:** React'e geçmeden gereken modern JS (ES6+) konuları: değişkenler, fonksiyonlar, array metotları, destructuring, spread/rest, modüller, immutability (`:3`).

- **0.1 Değişkenler** (`:5-22`):
  | | Scope | Yeniden atama |
  |---|---|---|
  | `var` | function-scoped | evet, modern JS'te kaçın |
  | `let` | block-scoped | evet |
  | `const` | block-scoped | hayır (`Assignment to constant variable` hatası) |
  - Best practice: varsayılan `const`, gerekiyorsa `let`, `var` kullanma (`:22`).
- **0.2 Veri tipleri** (`:24-41`): Primitive: String, Number, Boolean, Undefined, Null, **Symbol (ES6)**, **BigInt (ES2020, `123n`)**. Complex: Object; Array özel bir object türüdür (`:40`).
- **0.3 Fonksiyonlar** (`:43-68`): Function Declaration, Function Expression, **Arrow Function (React'te tercih edilen)**, tek ifadede **implicit return**: `const greetShort = (name) => \`Hello, ${name}!\`;` (`:64`).
- **0.4 Template literals** (`:70-85`): backtick ve `${}` ile string içine ifade gömme; eski yol `+` birleştirme.
- **0.5 Koşullar** (`:87-117`): if/else, else if, **ternary** `cond ? a : b` (`:115`).
- **0.6 Döngüler** (`:119-147`): `for`, `while`, `for...of` (array değerleri), `for...in` (object key'leri).
- **0.7 Array metotları** (`:149-174`): `map` (dönüştür, `[2,4,6,8,10]`), `filter` (süz, `[2,4]`), `reduce` (tek değer, `15`), `find` (ilk eşleşen, `4`), `forEach` (her eleman için çalıştır, yeni dizi döndürmez).
- **0.8 Object ve destructuring** (`:176-203`): `person.name`, `person['age']`; `const { name, age } = person;`; yeniden adlandırma `const { name: personName } = person;` (`:201`).
- **0.9 Spread ve Rest** (`:205-226`): ikisi de `...`. **Spread** açar/genişletir (`[...arr1, ...arr2]`, `{ ...obj1, ...obj2 }`); **Rest** kalanları toplar (`function sum(...numbers)`).
- **0.10 Modüller** (`:228-249`): **named export** `export const add` ve `import { add } from './math.js'`; **default export** `export default multiply` ve süslü parantezsiz `import multiply from './utils.js'`.
- **0.11 Template literal React'te** (`:251-265`): `<h1>{\`Welcome back, ${userName}!\`}</h1>` (`:264`).
- **0.12 React için array metotları** (`:267-292`): `map` liste render için en yaygın; `filter` koşullu render; `find` belirli eleman; `reduce` toplama (`totalActiveUsers`).
- **0.13 Object spread ve immutability** (`:294-326`): React **immutable update** ister (`:296`).
  - Ekleme: `{ ...user, email: '...' }`; güncelleme: `{ ...user, age: 26 }`; silme: `const { age, ...userWithoutAge } = user;` (`:309`).
  - İç içe (nested) güncellemede her seviye ayrı spread edilir (`:316-325`).

**Tuzaklar:** Spread sığ kopya (shallow copy) yapar; nested objede iç seviye de spread edilmezse eski referans paylaşılır (materyal bunu nested örnekle gösterir `:316`; "shallow" terimi ders dışı ek bilgi).
- `const { age, ...userWithoutAge } = user;` (`W3/00-javascript-basics.md:309`) materyalde "Object Spread" başlığı altında ama buradaki `...` **rest**'tir: eşittirin SOLUNDA (destructuring / parametre) toplar = rest; SAĞINDA (değer üretirken) açar = spread.
- Object spread'de aynı key varsa sonraki kazanır: `{ ...user, age: 26 }` eski `age`'i ezer; `{ age: 26, ...user }` ezmez, `age` 25 kalır (ders dışı ek bilgi).

---

## 00c. Kurulum (W3/00-setup-and-installation.md)

**Ana fikir:** React geliştirme ortamı kurmanın yolları: CRA, Vite, Next.js, CDN ile manuel; dev/prod build, env değişkenleri, deploy, performans, sorun giderme.

### Ön koşullar (`:5-17`)
- **Node.js (14 veya üstü)** ve **npm** (Node ile gelir) veya **yarn** (`:9-10`). Kontrol: `node --version`, `npm --version` (`:15-16`).

### Create React App (CRA) (`:19-73`)
- Materyal: "Create React App is the official tool" (`:21`), sıfır config.
- Kurulum (`:27-34`):
  ```bash
  npx create-react-app my-app          # önerilen, global kurulum yok
  npm install -g create-react-app      # global kurulum
  create-react-app my-app
  yarn create react-app my-app
  ```
- Oluşan yapı: `node_modules/`, `public/index.html`, `src/App.css, App.js, App.test.js, index.css, index.js`, `package.json`, `README.md` (`:42-55`).
- Çalıştırma: `cd my-app` + `npm start` sonra **`http://localhost:3000`**, değişince sayfa otomatik yenilenir (`:61-65`).
- Production: `npm run build` sonra **`build/`** klasörü (`:70-73`).

### Vite (başlık kaynakta eksik, bkz. hata bölümü) (`:76-90`)
- `cd my-react-app`, `npm install`, `npm run dev` sonra **`http://localhost:5173`** (`:79-84`). Build: `npm run build` (`:89`).
- (ders dışı ek bilgi) Oluşturma komutu: `npm create vite@latest my-react-app -- --template react`. Build çıktısı `dist/` klasörü. Vite'ta `index.html` proje kökündedir, entry `src/main.jsx`.

### Next.js (başlık kaynakta eksik) (`:92-99`)
- `cd my-next-app`, `npm run dev` sonra **`http://localhost:3000`** (`:95-99`).
- (ders dışı ek bilgi) Oluşturma: `npx create-next-app@latest my-next-app`.

### Manuel kurulum (CDN) (`:101-129`)
- `react@18` ve `react-dom@18` UMD script'leri + `@babel/standalone` (tarayıcıda JSX derler), `<script type="text/babel">` (`:110-117`).
- `ReactDOM.createRoot(document.getElementById('root'))` ve `root.render(<App />)` (`:122-123`).
- Production için önerilmez: yavaş, modern tooling yok (`:129`).

### Önerilen araçlar (`:131-136`)
VS Code, React Developer Tools, **ESLint** (linter, kod kalitesi), **Prettier** (formatter).

### İlk component (`:138-156`)
`src/App.js` içinde `function App()` `<div className="App">` döndürür, `export default App;`.

### Development vs Production build (`:158-174`)
| Development (`npm start`) | Production (`npm run build`) |
|---|---|
| Hot Reloading | Minified code |
| Source Maps | Tree Shaking (kullanılmayan kodu atar) |
| Detaylı hata mesajları | Optimize edilmiş asset'ler |
| Büyük bundle | Source map yok (materyale göre) |
| Yavaş | Daha hızlı |

### Environment Variables (`:176-208`)
- `.env.local` (yerel), `.env.production` (prod) (`:182-188`).
- Okuma: `process.env.REACT_APP_API_URL`; değerler **string** gelir, o yüzden `process.env.REACT_APP_DEBUG === 'true'` (`:195-196`).
- **Değişkenler `REACT_APP_` ile başlamalı** (`:208`). (ders dışı ek bilgi: bu CRA kuralıdır; Vite'ta önek `VITE_`, erişim `import.meta.env.VITE_...`.)

### Deployment (`:210-227`)
1. **Static hosting** (SPA için önerilen): Netlify, Vercel, GitHub Pages, AWS S3 + CloudFront.
2. **Geleneksel web sunucuları**: Apache (`mod_rewrite`), Nginx (`try_files`), IIS (URL Rewrite); amaç client-side routing.
3. **Container**: Docker, Kubernetes.

### Performance (`:229-257`)
- **Code splitting / lazy loading:** `const LazyComponent = lazy(() => import('./LazyComponent'));` ve `<Suspense fallback={<div>Loading...</div>}>` (`:236`, `:241`).
- **Bundle analysis:** `webpack-bundle-analyzer` (`:252-256`).

### Sorun giderme (`:259-287`)
- Port dolu: `npx kill-port 3000` veya `PORT=3001 npm start` (`:264-267`).
- Module not found: `npm cache clean --force`, `node_modules` + `package-lock.json` sil, `npm install` (`:273-277`).
- Build hatası: `npm run build 2>&1 | grep -i error`, `npm run lint` (`:283-286`).

---

## 01. Components (W3/01-components.md + .jsx)

**Ana fikir:** React uygulaması küçük, izole, yeniden kullanılabilir **component**'lerden kurulur; UI bağımsız parçalara bölünür ve her parça ayrı düşünülür (`:3`). İki ana tür var (`:5`).

- **1.1 Functional Component** (`:7-19`): JSX döndüren JS fonksiyonu; daha basit; **React 16.8** ile gelen **Hooks** sayesinde state de tutabilir (`:9`).
  ```jsx
  function Welcome(props) { return <h1>Hello, {props.name}</h1>; }
  ```
- **1.2 Class Component** (`:21-37`): `React.Component`'i **extend** eden ES6 class, JSX döndüren **`render()`** metodu zorunlu; props `this.props` ile okunur. Hooks öncesinde state ve **lifecycle** metotları için kullanılırdı (`:23`).
- **"When to use which?"** başlığı kaynakta boş (`:39`); cevap `:126`'da: yeni projelerde functional tercih edilir, class hâlâ geçerli ama daha az yaygın.
- **1.3 Component Composition** (`:41-80`): Component'leri birleştirerek karmaşık UI kurmak, "React's most powerful features"dan biri (`:43`). `Card` `{children}` render eder; içine `CardHeader title=...` ve `CardBody content=...` konur (`:47-78`).
- **1.4 Reusability** (`:82-116`): Aynı component farklı props ile. `Button({ text, onClick, variant = 'primary' })`: **default parameter** ile varsayılan değer; `variantClasses[variant]` ile Tailwind class seçimi; template literal ile `className` birleştirme (`:88-104`). `<Button text="Save" />` primary olur (`:110`).
- **1.5 Lifecycle özeti** (`:118-126`): **Mounting** (oluşturulup DOM'a eklenir), **Updating** (state/prop değişince re-render), **Unmounting** (DOM'dan kaldırılır).

### Örnek dosyalar
- `01-components-class.jsx`: `class WelcomeClass extends React.Component`, `render()` içinde `<h1>Hello, {this.props.name} from Class Component!</h1>` (`:4-6`), `export default WelcomeClass` (`:10`).
- `01-components-functional.jsx`: `function WelcomeFunctional(props)` `<h1>Hello, {props.name} from Functional Component!</h1>` döndürür (`:4-5`).
- İkisi aynı yapıda `<h1>` üretir ama metin FARKLI: `name="Ali"` ile class "Hello, Ali from Class Component!", functional "Hello, Ali from Functional Component!" yazar. Kod farkı: `this.props` vs `props` parametresi, `render()` metodu vs doğrudan `return`. İkisi de `export default` ile tek component dışa açar (`W3/01-components-functional.jsx:8`).

### Class vs Functional
| | Class Component | Functional Component |
|---|---|---|
| Tanım | `class X extends React.Component` | `function X(props)` veya arrow |
| JSX döndürme | `render()` metodu içinde | doğrudan `return` |
| Props | `this.props.name` | `props.name` veya `{ name }` |
| State | `this.state` + `this.setState()` (bkz. 04) | `useState` Hook |
| Lifecycle | lifecycle metotları | Hooks (`useEffect` vb.) |
| `this` binding | gerekli (`bind`) | yok |
| Günümüz | geçerli ama az kullanılıyor | tercih edilen (`:126`) |

**Tuzaklar:** Component adı büyük harfle başlamalı; class'ta `render()` unutulursa component çalışmaz; `this.` olmadan `props.name` class içinde tanımsızdır.

---

## 02. JSX (W3/02-jsx.md + 02-jsx-example.jsx)

**Ana fikir:** **JSX = JavaScript XML**; React'in önerdiği, JS dosyasında HTML benzeri kod yazmayı sağlayan söz dizimi uzantısı (`:3`).

- **2.1 Neden JSX?** (`:5-7`): Render mantığı, event'ler, state değişimi ve veri hazırlama birbirine bağlıdır. React, markup ve mantığı ayrı **dosyalara** (teknolojilere) bölmek yerine ikisini de içeren gevşek bağlı (loosely coupled) **component**'lerle **concern**'leri ayırır (`:7`).
- **2.2 Temel söz dizimi:** `const element = <h1>Hello, React!</h1>;` (`:13`).
- **2.3 İfade gömme (Embedding Expressions):** **Herhangi bir JS ifadesi (expression)** `{}` içine konabilir: `{name}`, `{formatUser(user)}` (`:18`, `:36`). (ders dışı ek bilgi: `if`, `for` gibi **statement**'lar `{}` içine konamaz; ternary ve `&&` kullanılır.)
- **2.4 JSX de bir ifadedir** (`:41-53`): Derlenince normal JS fonksiyon çağrısına dönüşür ve **JS nesnesi** üretir. Bu yüzden değişkene atanabilir, argüman olarak verilebilir, fonksiyondan döndürülebilir, `if`/`for` içinde kullanılabilir (`:43`). (ders dışı ek bilgi: derleme hedefi `React.createElement(...)` veya yeni JSX transform'da `_jsx(...)`.)
- **2.5 Attribute'lar** (`:55-65`): String için tırnak (`alt="Company Logo"`), JS ifadesi için tırnak yerine `{}` (`src={imageUrl}`). React DOM **camelCase** kullanır: `class` yerine **`className`**, `for` yerine **`htmlFor`** (`:65`).
- **2.6 JSX kuralları** (`:67-134`):
  1. **Tek root element döndür** (`:71`). Yan yana iki element hata verir; `<div>` ile sar veya **React Fragment** `<>...</>` kullan (`:91-99`).
  2. **`class` değil `className`** (`:102-108`).
  3. **Self-closing etiketlerde `/`**: `<img ... />` (`:111-117`).
  4. **JS ifadeleri `{}` içinde**: `{isAdult ? 'Adult' : 'Minor'}`, `{age + 1}` (`:120-133`).
- **2.7 Conditional rendering** (`:136-159`): `{showDetails && (...)}` ve `{user.isAdmin ? <button>Admin Panel</button> : <button>View Profile</button>}`.
- **2.8 Listeler** (`:161-177`): `todos.map(todo => <li key={todo.id}>{todo.text} - {todo.completed ? 'Done' : 'Pending'}</li>)`; benzersiz `key` şart.

### Örnek: `02-jsx-example.jsx`
- Component: `JsxExample`. Ekrana sırasıyla: `<h1>Hello, React!</h1>`, `<h2>Hello, World!</h2>`, `<h3>Hello, Harper Perez!</h3>`, 150x150 resim, `<p>This is the world!</p>` (`:19-29`).
- Kilit satırlar:
  - JSX içinde yorum: `{/* Basic JSX */}` (`:18`).
  - **Inline style** obje olarak verilir (çift süslü parantez): `style={{ width: '150px', height: '150px' }}` (`:26`). Dış `{}` = JS ifadesi, iç `{}` = obje.
  - `{name === 'World' && <p>This is the world!</p>}` koşul true olduğu için `<p>` render edilir (`:29`).

**Tuzaklar:** `class=` yazmak (React uyarı verir), `<br>` kapatmamak, iki kök element döndürmek, `style="width:150px"` gibi string style vermek (JSX'te obje olmalı, ders dışı ek bilgi), `{}` içine `if` yazmak.

---

## 03. Props (W3/03-props.md + 03-props-example.jsx)

**Ana fikir:** **Props (properties)** bir component'ten diğerine (parent'tan child'a) veri aktarır. **Read-only**: alan component değiştiremez; bu **unidirectional data flow** ve öngörülebilirlik sağlar (`:3`).

- **3.1 Props geçirmek** (`:5-19`): HTML attribute'u gibi: `<Welcome name="Alice" />`; child `props.name` okur.
- **3.2 Props okumak** (`:21-39`): Functional'da fonksiyonun **ilk argümanı** (`props`); class'ta **`this.props`** (`:23`).
- **3.3 Destructuring** (`:41-53`): `function Greeting({ userName })` daha kısa erişim.
- **3.4 Default Props** (`:55-71`): Prop verilmezse kullanılacak değer. Materyaldeki yöntem:
  ```jsx
  Button.defaultProps = { text: 'Click Me' };
  // <Button />              -> 'Click Me'
  // <Button text="Submit" /> -> 'Submit'
  ```
  Alternatif (materyalde `01-components.md:88` ve `00-React-Fundamentals.md:403`): destructuring'de default parameter `function Button({ text = 'Click Me' })`.
- **3.5 `children` prop** (`:73-91`): Açılış ve kapanış etiketi arasına yazılan içerik özel **`children`** prop'u olarak gelir: `{props.children}`.

### Örnek: `03-props-example.jsx`
- `App` render eder (`:7-14`):
  - `<Greeting userName="Alice" />` ve `"Bob"` → `<p>Welcome, Alice!</p>`, `<p>Welcome, Bob!</p>` (`:20-21`)
  - `<Button text="Submit" />` → "Submit"; `<Button />` → **"Click Me"** (`defaultProps`, `:29-31`)
  - `<Card>` içine `<h2>Card Title</h2>` ve `<p>` → `Card` bunları `props.children` ile inline style'lı div içinde gösterir (`:34-38`).
- Not: Component'ler (`Greeting`, `Button`, `Card`) `App`'ten sonra tanımlanmış; function declaration hoisting sayesinde sorun yok (ders dışı ek bilgi).

**Tuzaklar:**
- `props.name = 'x'` yazmak yanlış (props read-only).
- Class'ta `props.x` değil `this.props.x`.
- `defaultProps` function component'lerde güncel React'te çalışmaz (bkz. hata bölümü).

---

## 04. State (W3/04-state.md + 04-state-example.jsx)

**Ana fikir:** **State**, component'e ait, zamanla değişebilen veri; değişince React component'i **re-render** eder. Component'in kendi içinde yönetilir (`:3`).

- **4.1 `useState` Hook** (`:5-25`): Functional component'e state ekler; **bir çift (pair) döndürür**: mevcut değer + güncelleme fonksiyonu (`:7`).
  ```jsx
  const [count, setCount] = useState(0); // başlangıç 0
  <button onClick={() => setCount(count + 1)}>Click me</button>
  ```
  `import React, { useState } from 'react';` (`:11`).
- **4.2 Class component'te state** (`:27-57`):
  - `constructor(props)` içinde önce **`super(props)`**, sonra `this.state = { isToggleOn: true }` (`:36-38`).
  - Callback'te `this` çalışsın diye **`this.handleClick = this.handleClick.bind(this)`** (`:39-40`).
  - Güncelleme **`this.setState()`** ile, önceki state'e bağlı ise fonksiyon formu: `this.setState(prevState => ({ isToggleOn: !prevState.isToggleOn }))` (`:44-46`).
- **4.3 Immutability** (`:59-77`): Obje/dizi state'i doğrudan değiştirme; yeni obje/dizi oluştur.
  - YANLIŞ: `this.state.user.age = 31;` (`:65`)
  - DOĞRU: `this.setState(prevState => ({ user: { ...prevState.user, age: 31 } }))` (`:69-71`), dizi: `items: [...prevState.items, newItem]` (`:74-76`).
- **4.4 Güncelleme kalıpları** (`:79-124`):
  1. **Direct:** `setCount(count + 1)` basit değerler (`:87`)
  2. **Functional update:** `setCount(prevCount => prevCount + 1)` yeni state öncekine bağlıysa (`:94`)
  3. **Object:** `setUser(prev => ({ ...prev, name: 'John Doe' }))` (`:102-105`)
  4. **Array:** ekle `[...prev, newItem]`, sil `prev.filter(item => item.id !== itemId)`, güncelle `prev.map(item => item.id === itemId ? { ...item, completed: true } : item)` (`:113-123`)
- **4.5 State Lifting (Lifting State Up)** (`:126-176`): Birden çok component aynı state'i paylaşacaksa state **en yakın ortak ataya (closest common ancestor)** taşınır (`:128`). Örnek: `Calculator` `temperature` ve `scale` state'ini tutar, iki `TemperatureInput`'a değer ve `onTemperatureChange` callback'i props olarak verir; child, `onChange={(e) => onTemperatureChange(e.target.value)}` ile parent'ı günceller (`:138`). Dönüşüm: C = (F - 32) * 5 / 9, F = C * 9 / 5 + 32 (`:158-159`).
- **4.6 State vs Props** (`:178-204`): tablo aşağıda. Örnek `UserProfile({ userName, userAge })` props, `isOnline` state, `setIsOnline(!isOnline)` toggle (`:191-198`).

### Örnek: `04-state-example.jsx`
- `Counter` (functional, `:4-18`): `useState(0)`; "Click me" `setCount(count + 1)`, **"Reset"** `setCount(0)` (`:13`). Başta "You clicked 0 times".
- `Toggle` (class, `:21-41`): `isToggleOn: true` ile başlar, buton önce **"ON"** yazar; tıklayınca "OFF", tekrar "ON".
- `App` (`:44-53`): başlıklar "Functional Component Example" / "Class Component Example" altında ikisini render eder; `export default App`.

**Tuzaklar:**
- State'i doğrudan değiştirmek (`state.x = ...`, `users.push(...)`) re-render tetiklemez/hatalıdır.
- Arka arkaya `setCount(count + 1)` iki kez çağrılırsa aynı render'daki eski `count` kullanılır, sayı 1 artar; öncekine bağlıysa functional update kullan (ders dışı ek bilgi, materyal sadece "depends on previous state" der `:92`).
- Class'ta `bind` unutulursa handler içinde `this` `undefined` olur (`:39`).
- `setState` class'ta objeyi **birleştirir (merge)**, `useState` setter'ı ise **değiştirir (replace)**; bu yüzden object state'te `...prevUser` şart (ders dışı ek bilgi; materyal kalıbı `:102-105`).

---

## Hızlı karşılaştırma tabloları

### Props vs State (`W3/04-state.md:182-187`)
| State | Props |
|---|---|
| Component içinde yönetilir | Parent'tan gelir |
| Component değiştirebilir | Read-only |
| Değişince re-render | Değişince re-render |
| İç veri için | Component'ler arası iletişim için |

### CRA vs Vite vs Next.js (materyal + işaretli ek bilgi)
| | CRA | Vite | Next.js |
|---|---|---|---|
| Oluşturma | `npx create-react-app my-app` (`W3/00-setup-and-installation.md:27`) | kaynakta yok; `npm create vite@latest` (ders dışı) | kaynakta yok; `npx create-next-app@latest` (ders dışı) |
| Dev komutu | `npm start` (`W3/00-setup-and-installation.md:62`) | `npm run dev` (`W3/00-setup-and-installation.md:81`) | `npm run dev` (`W3/00-setup-and-installation.md:96`) |
| Port | 3000 (`W3/00-setup-and-installation.md:65`) | 5173 (`W3/00-setup-and-installation.md:84`) | 3000 (`W3/00-setup-and-installation.md:99`) |
| Build çıktısı | `build/` (`W3/00-setup-and-installation.md:73`) | `dist/` (ders dışı) | `.next/` (ders dışı) |
| Entry | `src/index.js` | `src/main.jsx` (`W3/00-React-Fundamentals.md:545`) | `app/page.js`, `app/layout.js` |
| index.html | `public/` (`W3/00-React-Fundamentals.md:538`) | proje kökü (ders dışı) | yok, framework üretir |
| Env öneki | `REACT_APP_` (`W3/00-setup-and-installation.md:208`) | `VITE_` (ders dışı) | `NEXT_PUBLIC_` (ders dışı) |
| Durum | materyal "official" der; resmi olarak deprecated (ders dışı) | aktif | aktif, App Router 13+ |

---

## Olası sınav soruları ve kısa cevaplar

1. **What is React? Library or framework?** UI kurmak için JavaScript kütüphanesi (library); Facebook yaptı, Meta ve topluluk bakıyor. Kaynak: `W3/00-React-Fundamentals.md:3`
2. **React'in üç temel özelliği?** Declarative, Component-Based, Learn Once Write Anywhere. Kaynak: `W3/00-React-Fundamentals.md:7`
3. **Virtual DOM'un faydası?** Doğrudan DOM manipülasyonunu azaltarak performansı artırır. Kaynak: `W3/00-React-Fundamentals.md:17`
4. **Unidirectional data flow nedir?** Veri tek yönde (parent'tan child'a, props ile) akar; anlamak/debug etmek kolaylaşır. Kaynak: `W3/00-React-Fundamentals.md:19`, `W3/03-props.md:3`
5. **Hatayı bul:** `function userProfile() { return <div/>; }` → Component adı küçük harfle başlıyor; PascalCase olmalı (`UserProfile`). Kaynak: `W3/00-React-Fundamentals.md:49-50`
6. **JSX ne demek, ne işe yarar?** JavaScript XML; JS içinde HTML benzeri kod yazmayı sağlayan syntax extension. Kaynak: `W3/02-jsx.md:3`
7. **Hatayı bul:** `return (<h1>Hello</h1><p>World</p>);` → Tek root element olmalı; `<div>` veya Fragment `<>...</>` ile sar. Kaynak: `W3/02-jsx.md:71-99`
8. **Hatayı bul:** `<label for="u" class="lbl">` → JSX'te `htmlFor` ve `className`. Kaynak: `W3/02-jsx.md:65`, `W3/00-React-Fundamentals.md:105-107`
9. **Hatayı bul:** `<img src="a.jpg">` → Self-closing etiket `/` ile kapanmalı: `<img src="a.jpg" />`. Kaynak: `W3/02-jsx.md:111-117`
10. **"JSX is an expression too" ne demek?** Derlenince JS fonksiyon çağrısı olur ve nesne üretir; değişkene atanır, argüman olur, fonksiyondan döner, if/for içinde kullanılır. Kaynak: `W3/02-jsx.md:43`
11. **Bu kod ne render eder?** `02-jsx-example.jsx` → "Hello, React!" (h1), "Hello, World!" (h2), "Hello, Harper Perez!" (h3), 150x150 resim, "This is the world!" (p). Kaynak: `W3/02-jsx-example.jsx:19-29`
12. **Functional ve class component farkı?** Functional: JSX döndüren fonksiyon, Hooks (16.8+) ile state; class: `React.Component` extend eder, `render()` zorunlu, `this.props`/`this.state`, lifecycle metotları. Kaynak: `W3/01-components.md:9`, `W3/01-components.md:23`
13. **Yeni projede hangisi tercih edilir?** Functional (Hooks ile state ve side effect yönetebilir); class geçerli ama az yaygın. Kaynak: `W3/01-components.md:126`
14. **Props değiştirilebilir mi?** Hayır, read-only; alan component değiştiremez. Kaynak: `W3/03-props.md:3`
15. **Functional ve class'ta props'a erişim?** Functional: fonksiyonun ilk argümanı `props` (veya destructuring); class: `this.props`. Kaynak: `W3/03-props.md:23`
16. **`<Button />` ne render eder (`03-props-example.jsx`)?** `defaultProps` sayesinde "Click Me" yazılı buton (React 18'de; React 19'da function component'te defaultProps kaldırıldı, boş buton olur, ders dışı ek bilgi). Kaynak: `W3/03-props-example.jsx:10`, `W3/03-props-example.jsx:29-31`
17. **`children` prop nedir?** Component'in açılış/kapanış etiketi arasına yazılan içerik; `props.children` ile okunur. Kaynak: `W3/03-props.md:75`, `W3/03-props.md:81`
18. **`useState` ne döndürür?** Bir çift (array): mevcut state değeri ve onu güncelleyen fonksiyon. Kaynak: `W3/04-state.md:7`
19. **Class component'te state nasıl tanımlanır ve güncellenir?** Constructor'da `super(props)` sonra `this.state = {...}`; güncelleme `this.setState(...)`. Kaynak: `W3/04-state.md:29`, `W3/04-state.md:36-38`
20. **Hatayı bul:** `users.push(newUser);` (state dizisi) → State doğrudan değiştirilmez; `setUsers([...users, newUser])`. Kaynak: `W3/00-React-Fundamentals.md:468-473`
21. **Functional update ne zaman kullanılır?** Yeni state önceki state'e bağlıysa: `setCount(prevCount => prevCount + 1)`. Kaynak: `W3/04-state.md:92-94`
22. **Dizi state'inden id'si `itemId` olan elemanı immutable sil/güncelle?** Sil: `prev.filter(item => item.id !== itemId)`; güncelle: `prev.map(item => item.id === itemId ? { ...item, completed: true } : item)`. Kaynak: `W3/04-state.md:116`, `W3/04-state.md:119-123`
23. **Lifting state up nedir?** Aynı state'i paylaşan component'ler için state en yakın ortak ataya taşınır, değer ve callback props ile iner. Kaynak: `W3/04-state.md:128`
24. **State vs props farkı?** State component içinde yönetilir ve değiştirilebilir, iç veri; props parent'tan gelir, read-only, iletişim için; ikisi de değişince re-render. Kaynak: `W3/04-state.md:182-187`
25. **`Toggle` ilk render'da ne yazar, bir tıklamadan sonra?** "ON", sonra "OFF". Kaynak: `W3/04-state-example.jsx:24`, `W3/04-state-example.jsx:37`
26. **CRA ile proje oluşturma ve çalıştırma komutları, port?** `npx create-react-app my-app`, `cd my-app`, `npm start`, `http://localhost:3000`. Kaynak: `W3/00-setup-and-installation.md:27`, `W3/00-setup-and-installation.md:61-65`
27. **CRA'da env değişkeni nasıl tanımlanır/okunur?** `REACT_APP_` önekiyle `.env` dosyasına, `process.env.REACT_APP_API_URL` ile okunur. Kaynak: `W3/00-setup-and-installation.md:183`, `W3/00-setup-and-installation.md:195`, `W3/00-setup-and-installation.md:208`
28. **Production build'in özellikleri?** Minified code, tree shaking, optimize asset'ler, source map yok, daha iyi performans; `npm run build`, çıktı `build/`. Kaynak: `W3/00-setup-and-installation.md:169-174`, `W3/00-setup-and-installation.md:73`
29. **Spread vs rest?** İkisi de `...`; spread açar (`[...a, ...b]`), rest kalanları toplar (`function sum(...numbers)`). Kaynak: `W3/00-javascript-basics.md:207-225`
30. **`let`, `const`, `var` farkı?** `var` function-scoped (kaçın), `let` block-scoped ve yeniden atanabilir, `const` block-scoped ve yeniden atanamaz. Kaynak: `W3/00-javascript-basics.md:10-19`
31. **Tek click handler'da `setCount(count + 1); setCount(count + 1);` (count = 0) sonra ekranda ne yazar? Functional form ile?** Direct form: **1** (iki çağrı da aynı render'ın `count = 0` değerini görür, ikisi de 1 ister; React ikisini tek render'da birleştirir, batching). Functional form `setCount(p => p + 1)` iki kez: **2** (her updater bir öncekinin sonucunu alır). Tek re-render olur. Kaynak: `W3/04-state.md:87`, `W3/04-state.md:92-94` (batching ve sayılar ders dışı trace)
32. **Handler içinde `setCount(count + 1); console.log(count);` ne loglar (count = 0)?** **0**. Setter state'i hemen değiştirmez; yeni değer bir sonraki render'da gelir (ders dışı ek bilgi). Kaynak: `W3/04-state.md:19`
33. **`Calculator` ilk render'da kutularda ne görünür? Fahrenheit kutusuna `212` yazılırsa Celsius?** İlk: Celsius boş, Fahrenheit **32** (`('' * 9) / 5 + 32`). `212` yazılınca `scale = 'f'`, Celsius `((212 - 32) * 5) / 9 = 100`. İki setState (`setScale`, `setTemperature`) aynı handler'da olduğu için tek render. Kaynak: `W3/04-state.md:145-159`
34. **Class `Toggle`'da constructor'daki `bind` satırı silinirse ne olur?** Tıklamada `handleClick` `this` olmadan çağrılır; class gövdesi strict mode olduğu için `this` `undefined`, `this.setState` **TypeError** verir. Çözüm: `bind`, class field arrow (`handleClick = () => {...}`) veya `onClick={() => this.handleClick()}`. Kaynak: `W3/04-state.md:39-40`, `W3/04-state-example.jsx:25`
35. **Class'ta `this.setState({ a: 1 })` ile hook'ta `setUser({ a: 1 })` farkı (state `{a, b}` iken)?** Class `setState` sığ **merge** eder, `b` kalır. `useState` setter **replace** eder, `b` kaybolur; bu yüzden `setUser(prev => ({ ...prev, a: 1 }))`. Kaynak: `W3/04-state.md:102-105` (merge/replace ders dışı)
36. **`01-components-class.jsx` ve `01-components-functional.jsx` `name="Ali"` ile ne render eder?** Class: `<h1>Hello, Ali from Class Component!</h1>`; functional: `<h1>Hello, Ali from Functional Component!</h1>`. Kaynak: `W3/01-components-class.jsx:6`, `W3/01-components-functional.jsx:5`
37. **`<Button text="Delete" variant="danger" />` hangi class'ları alır? `variant` verilmezse?** `"px-4 py-2 rounded font-medium bg-red-500 text-white hover:bg-red-600"`; verilmezse default parameter `'primary'` ile `bg-blue-500 ...`. Kaynak: `W3/01-components.md:88-98`
38. **Fragment `<>...</>` neden kullanılır?** Tek root zorunluluğunu DOM'a fazladan `<div>` eklemeden karşılamak için. Kaynak: `W3/02-jsx.md:91-99`
39. **Inline style JSX'te nasıl yazılır?** Obje olarak, camelCase property: `style={{ width: '150px', height: '150px' }}`; dış `{}` JS ifadesi, iç `{}` obje. Kaynak: `W3/02-jsx-example.jsx:26`
40. **HOC nedir? `withLoading` ne yapar?** Component alıp yeni component döndüren fonksiyon; `isLoading` true ise "Loading..." döner, değilse `<WrappedComponent {...props} />`. Kaynak: `W3/00-React-Fundamentals.md:386-395`
41. **Container vs Presentational farkı?** Container mantığı ve state'i yönetir (veri çekme); Presentational sadece props'la UI çizer. Kaynak: `W3/00-React-Fundamentals.md:355-381`
42. **Named ve default export import farkı?** Named: `import { add } from './math.js'` (süslü parantez, aynı isim). Default: `import multiply from './utils.js'` (süslü parantez yok, isim serbest). Kaynak: `W3/00-javascript-basics.md:228-249`

---

## Materyalde hata / eksik / güncel olmayan bilgi

1. **CRA "official tool" diyor, güncel değil.** `W3/00-setup-and-installation.md:21` "Create React App is the official tool for creating new React applications." (ders dışı ek bilgi) React ekibi 14 Şubat 2025'te CRA'yı resmi olarak deprecated ilan etti; react.dev artık bir framework (Next.js, React Router vb.) veya Vite gibi build tool öneriyor. Sınavda materyalin cümlesi sorulursa materyale göre cevap ver, ama gerçek durum budur.
2. **Vite ve Next.js bölümleri eksik / başlıksız.** `W3/00-setup-and-installation.md:76-99`: "Running the Development Server" başlığı üç kez tekrar ediyor (`:58`, `:76`, `:92`); `my-react-app` (Vite, port 5173) ve `my-next-app` (port 3000) hiç oluşturulmadan `cd` ediliyor. Oluşturma komutları ve "Vite"/"Next.js" başlıkları silinmiş görünüyor.
3. **Boş başlık.** `W3/01-components.md:39` "## When to use which?" altında içerik yok (cevap sadece `:126`'da).
4. **"State is mutable" ifadesi kendi içinde çelişkili.** `W3/04-state.md:3` state'i "mutable" diyor, aynı dosya `:61` state'i immutable kabul edip doğrudan değiştirmeyi yasaklıyor. Doğru anlam: state *değişebilir* (setter ile yeni değer verilir), ama *doğrudan mutasyona uğratılmaz*.
5. **`defaultProps` function component'te güncel değil.** `W3/03-props.md:64`, `W3/03-props-example.jsx:29`, `W3/00-React-Fundamentals.md:191`. (ders dışı ek bilgi) React 18.3'te function component için deprecation uyarısı, **React 19'da kaldırıldı**; önerilen: `function Button({ text = 'Click Me' })`. React 19 ile `03-props-example.jsx:10` boş buton render eder.
6. **PropTypes "recommended" güncel değil.** `W3/00-React-Fundamentals.md:179`, `:446`. (ders dışı ek bilgi) React 19 propTypes kontrolünü kaldırdı (sessizce yok sayılır); TypeScript önerilir.
7. **`isRequired` ile `defaultProps` çelişkisi.** `W3/00-React-Fundamentals.md:186-187` `onEdit`/`onDelete` `isRequired`, ama `:191-194` aynı prop'lara default veriyor; zorunlu prop'a default anlamsız.
8. **Lifting State örneğinde boş girdi hatası.** `W3/04-state.md:145` `temperature` başlangıçta `''`, `scale` `'c'`; `:159` `('' * 9) / 5 + 32` = **32** olur, yani boş sayfada Fahrenheit kutusunda "32" görünür. Ayrıca `scale === 'f'` iken Celsius kutusu boş girişte `-17.77...` gösterir (`:158`). (React'in eski resmi örneğindeki `tryConvert` boş/NaN kontrolü atlanmış.)
9. **Proje ağacı CRA ve Vite'ı karıştırıyor.** `W3/00-React-Fundamentals.md:562-568`: `public/index.html` + `App.js` (CRA) ile `main.jsx` (Vite) aynı ağaçta. (ders dışı ek bilgi) Vite'ta `index.html` proje kökündedir.
10. **Env değişkeni kuralı sadece CRA için.** `W3/00-setup-and-installation.md:208` "must start with `REACT_APP_`" genel kural gibi sunulmuş. (ders dışı ek bilgi) Vite'ta `VITE_` öneki ve `import.meta.env`, Next.js'te tarayıcıya açılacaklar `NEXT_PUBLIC_`.
11. **Node 14 şartı eski.** `W3/00-setup-and-installation.md:9`. (ders dışı ek bilgi) Node 14 2023'te EOL; güncel Vite sürümleri Node 18/20+ ister.
12. **Index'i key yapmak kesin "Incorrect" sayılmış.** `W3/00-React-Fundamentals.md:326`, `:478`. (ders dışı ek bilgi) React dokümanına göre sıralaması değişmeyen statik listelerde index kabul edilebilir; sorun ekleme/silme/sıralamada. Sınavda materyalin cevabı: index kullanma.
13. **Kırık Markdown.** `W3/00-React-Fundamentals.md:802-823` ` ```markdown ` bloğu içinde iç içe ` ``` ` kullanılmış; blok `:805`'te erken kapanıyor, render bozuk.
14. **Küçük tutarsızlıklar:**
    - `W3/00-setup-and-installation.md:65` "page will automatically reload" ile `:163` "without page refresh" (Hot Reloading) çelişiyor.
    - `W3/00-setup-and-installation.md:286` `npm run lint`: CRA şablonunda `lint` script'i yok (ders dışı ek bilgi).
    - `W3/00-React-Fundamentals.md:357`, `:360` `useState`/`useEffect` import edilmeden kullanılmış (snippet).
    - `W3/00-javascript-basics.md:70` ve `:251` Template Literals konusu iki kez anlatılmış.
    - `W3/00-React-Fundamentals.md:12` "Learn Once, Write Anywhere" açıklaması sloganın asıl anlamını (farklı platformlar, React Native) vermiyor.
    - `W3/00-React-Fundamentals.md:360-365` Container örneğinde `fetchUsers()` için `.catch` yok; istek hata verirse `setLoading(false)` hiç çağrılmaz, ekran sonsuza kadar "Loading..." kalır. Aynı dosya `:489-525` "loading state'i unutma" derken `.finally` kullanıyor; Container örneği buna uymuyor.
    - `W3/00-setup-and-installation.md:256` `npx webpack-bundle-analyzer build/static/js/*.js`: (ders dışı ek bilgi) bu araç ilk argüman olarak webpack **stats JSON** dosyası bekler, `.js` bundle değil; CRA'nın kendi dokümanı bunun için `source-map-explorer` önerir. Komut bu haliyle beklenen raporu üretmez.
15. **Emin olunamayan:** `W3/02-jsx-example.jsx:14` `via.placeholder.com` servisi (ders dışı ek bilgi) artık yanıt vermiyor olabilir; resim kırık görünebilir. `W3/00-setup-and-installation.md:173` "No Source Maps": CRA varsayılan olarak production'da da source map üretir (`GENERATE_SOURCEMAP`), materyal genelleme yapıyor (ders dışı ek bilgi).
