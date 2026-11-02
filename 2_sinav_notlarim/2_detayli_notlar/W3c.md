# Hafta 3 (C): Styling, Forms, Routing ve W3 Genel Rehberi

> Kaynak: [`W3/12-styling.md`](../../1_hoca_notlari/W3/12-styling.md), [`W3/12-styling-example.jsx`](../../1_hoca_notlari/W3/12-styling-example.jsx), [`W3/styling-example.css`](../../1_hoca_notlari/W3/styling-example.css), [`W3/13-forms.md`](../../1_hoca_notlari/W3/13-forms.md), [`W3/13-forms-example.jsx`](../../1_hoca_notlari/W3/13-forms-example.jsx), [`W3/14-routing.md`](../../1_hoca_notlari/W3/14-routing.md), [`W3/14-routing-example.jsx`](../../1_hoca_notlari/W3/14-routing-example.jsx), [`W3/README.md`](../../1_hoca_notlari/W3/README.md)
>
> Not: Repoda **11 numaralı dosya yok**. Numaralandırma `10-data-sharing` dosyasından doğrudan `12-styling` dosyasına atlıyor (README'deki dosya ağacında da 11 yok: [`W3/README.md:126-127`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/README.md?plain=1#L126-L127)).

## İçindekiler

1. [12. Styling ([`W3/12-styling.md`](../../1_hoca_notlari/W3/12-styling.md))](#12-styling-w312-stylingmd)
2. [12. Styling örnek dosyaları ([`W3/12-styling-example.jsx`](../../1_hoca_notlari/W3/12-styling-example.jsx), [`W3/styling-example.css`](../../1_hoca_notlari/W3/styling-example.css))](#12-styling-örnek-dosyaları-w312-styling-examplejsx-w3styling-examplecss)
3. [13. Forms ([`W3/13-forms.md`](../../1_hoca_notlari/W3/13-forms.md))](#13-forms-w313-formsmd)
4. [13. Forms örnek dosyası ([`W3/13-forms-example.jsx`](../../1_hoca_notlari/W3/13-forms-example.jsx))](#13-forms-örnek-dosyası-w313-forms-examplejsx)
5. [14. Routing ([`W3/14-routing.md`](../../1_hoca_notlari/W3/14-routing.md))](#14-routing-w314-routingmd)
6. [14. Routing örnek dosyası ([`W3/14-routing-example.jsx`](../../1_hoca_notlari/W3/14-routing-example.jsx))](#14-routing-örnek-dosyası-w314-routing-examplejsx)
7. [W3 Genel Rehberi ([`W3/README.md`](../../1_hoca_notlari/W3/README.md))](#w3-genel-rehberi-w3readmemd)
8. [Olası sınav soruları ve kısa cevaplar](#olası-sınav-soruları-ve-kısa-cevaplar)
9. [Materyalde hata / eksik / güncel olmayan bilgi](#materyalde-hata--eksik--güncel-olmayan-bilgi)

---

## 12. Styling ([`W3/12-styling.md`](../../1_hoca_notlari/W3/12-styling.md))

**Ana fikir:** React'te bileşen stillemenin birden fazla yolu var; dosya 6 yöntemi anlatıp sonunda hangisinin ne zaman seçileceğini özetliyor ([`W3/12-styling.md:1-3`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L1-L3)).

### 12.1 Inline Styles (satır içi stil) [`W3/12-styling.md:5-37`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L5-L37)
- Stil, bir **JavaScript objesi** olarak tanımlanır ve elemanın `style` attribute'una verilir.
- İki yazım: objeyi değişkene koymak `style={divStyle}` (`:21`) ya da doğrudan yazmak `style={{ color: 'red', textAlign: 'center' }}` (`:30`). Çift süslü parantez: dıştaki JSX ifadesi, içteki obje literal.
- **CSS property adları camelCase** yazılır: `backgroundColor` (CSS'teki `background-color` değil) (`:37`).
- Değerler string: `'10px'`, `'16px'`.

### 12.2 CSS Stylesheets (harici CSS dosyası) [`W3/12-styling.md:39-86`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L39-L86)
- Geleneksel yol. `App.css` yazılır, bileşende `import './App.css';` ile dahil edilir (`:74`).
- JSX'te `class` yerine **`className`** kullanılır: `<div className="container">` (`:78`).
- `:hover` gibi pseudo-class'lar normal CSS'te yazılabilir (`:66`). (Inline style'da `:hover` yazılamaz: ders dışı ek bilgi.)
- Stiller **global**: aynı class adı başka yerde çakışabilir.

### 12.3 CSS Modules [`W3/12-styling.md:88-132`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L88-L132)
- CSS'i bileşene **yerel kapsamlı (locally scoped)** yapar; **isim çakışmalarını (naming conflicts) önler** (`:90`).
- Dosya adı kuralı: `Button.module.css` (`:93`).
- Import: `import styles from './Button.module.css';` (`:119`); kullanım `className={styles.button}`.
- Birden fazla class birleştirme (conditional className): `` primary ? `${styles.button} ${styles.primary}` : styles.button `` (`:122`).

### 12.4 Styled Components (CSS-in-JS) [`W3/12-styling.md:134-188`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L134-L188)
- Kütüphane; CSS'i JS dosyası içinde **tagged template literal** ile yazdırır (`:136`).
- Kurulum: `npm install styled-components` (`:141`).
- `import styled from 'styled-components';` (`:149`), `const Button = styled.button\`...\`` (`:152`).
- **Props'a göre dinamik stil:** `${props => props.primary ? '#007bff' : '#6c757d'}` (`:153`); kullanım `<Button primary>` (`:181`).
- İç içe seçici: `&:hover { ... }` (`:161`).
- (ders dışı ek bilgi) styled-components v6, `primary` gibi bilinmeyen prop'u DOM'a iletir ve React uyarı verir; önerilen transient prop: `<Button $primary>` + `props.$primary`.
- `Container` (`styled.div`), `Title` (`styled.h1`) gibi stilli bileşenler normal bileşen gibi kullanılır (`:166-183`).

### 12.5 Tailwind CSS [`W3/12-styling.md:190-243`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L190-L243)
- **Utility-first** CSS framework; hazır class'lar sunar (`:192`).
- Kurulum: `npm install -D tailwindcss postcss autoprefixer` ve `npx tailwindcss init -p` (`:197-198`).
- `tailwind.config.js` içinde `content: ["./src/**/*.{js,jsx,ts,tsx}"]` (`:205-213`).
- `src/index.css` içine `@tailwind base; @tailwind components; @tailwind utilities;` (`:218-220`).
- Örnek class'lar: `max-w-4xl mx-auto p-6`, `text-3xl font-bold`, `bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded` (`:231-235`).

### 12.6 Sass/SCSS [`W3/12-styling.md:245-301`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L245-L301)
- **CSS preprocessor**; değişken (variables), iç içe yazım (nesting), mixin ekler (`:247`). Not: örnekte mixin (`@mixin` / `@include`) hiç yok, sadece değişken ve nesting gösteriliyor.
- Kurulum: `npm install sass` (`:252`); dosya `App.scss`, `import './App.scss';` (`:289`).
- Değişken: `$primary-color: #007bff;` (`:259`); nesting: `.container { .title {...} }` (`:262-283`); `&:hover` ve `darken($primary-color, 10%)` (`:279-280`).

### 12.7 Choosing a Styling Approach [`W3/12-styling.md:303-312`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L303-L312)

| Yöntem | Nasıl yazılır | Kapsam (scope) | Kaynağa göre ne zaman | Kurulum |
|---|---|---|---|---|
| Inline Styles | `style={{ camelCase: 'değer' }}` | Sadece o eleman | Dinamik stiller, tek seferlik ihtiyaç (`:305`) | Yok |
| CSS Stylesheets | `import './App.css'` + `className` | Global | Geleneksel, basit projeler (`:306`) | Yok |
| CSS Modules | `import styles from './X.module.css'` + `styles.x` | Bileşene yerel | Çakışmayı önler, orta/büyük projeler (`:307`) | Yok (CRA/Vite destekler) |
| Styled Components | `styled.button\`...\`` | Bileşene yerel | JS gücüyle bileşen kapsamlı stil, modern uygulamalar (`:308`) | `npm install styled-components` |
| Tailwind CSS | Utility class'lar `className="p-6 ..."` | Utility (global class'lar) | Hızlı geliştirme, prototip, tutarlı tasarım (`:309`) | `tailwindcss postcss autoprefixer` |
| Sass/SCSS | `.scss` dosyası, değişken + nesting | Global (normal CSS gibi) | Karmaşık stil ihtiyacı (`:310`) | `npm install sass` |

Son cümle: projenin ihtiyacına ve ekibin tercihine göre seç (`:312`).

### Dikkat / tuzaklar (12)
- `style="color: red"` (string) React'te **çalışmaz**; obje gerekir.
- `background-color` yazmak yanlış; `backgroundColor`.
- `class=` değil `className=`.
- CSS Modules dosya adında `.module.css` uzantısı şart; aksi halde global CSS gibi davranır (ders dışı ek bilgi).
- Normal CSS dosyasını bileşene import etmek stili o bileşenle **sınırlamaz**, global olur.

---

## 12. Styling örnek dosyaları ([`W3/12-styling-example.jsx`](../../1_hoca_notlari/W3/12-styling-example.jsx), [`W3/styling-example.css`](../../1_hoca_notlari/W3/styling-example.css))

`12-styling-example.jsx` dosyası `import './styling-example.css';` ile CSS'i alır ([`W3/12-styling-example.jsx:2`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling-example.jsx#L2)). 8 bileşen + `App`:

| Bileşen | Satır | Ne gösteriyor | Kilit satır |
|---|---|---|---|
| `InlineStyles` | `:5-38` | State'e bağlı dinamik inline stil; tıklayınca renk değişir | `backgroundColor: isActive ? '#007bff' : '#6c757d'` (`:9`), `transition` (`:16`) |
| `CSSClasses` | `:41-58` | Template literal ile **conditional className**, light/dark tema | `` className={`css-classes-container ${theme}`} `` (`:45`), `className="btn btn-primary"` (`:50`) |
| `CSSModules` | `:61-72` | "Simulated": gerçek CSS Module değil, normal global class (`module-card`, `module-button`) | `:60` yorum satırı |
| `StyledComponents` | `:75-122` | "Simulated": styled-components kütüphanesi yok; `variant` prop'una göre stil objesi seçen bir buton | `style={{ ...baseStyle, ...variants[variant] }}` (`:104`), `{...props}` (`:105`) |
| `CSSInJS` | `:125-148` | `<style jsx>` ile bileşen içinde CSS (styled-jsx sözdizimi) | `:133-145` |
| `ResponsiveDesign` | `:151-208` | Butonla seçilen "ekran boyutuna" göre `flexDirection` değiştirme | `flexDirection: screenSize === 'mobile' ? 'column' : 'row'` (`:157`) |
| `AnimationExample` | `:211-241` | Inline `transition` + `transform` ile animasyon | `transform: isAnimated ? 'scale(1.1) rotate(5deg)' : ...` (`:225`) |
| `ThemeSystem` | `:244-319` | Tema objesi (`light`, `dark`, `blue`), `themes[theme]` ile seçim, `Object.keys(themes).map` ile buton listesi | `const currentTheme = themes[theme]` (`:268`), `:283-299` |
| `App` | `:322-360` | Hepsini alt alta render eder | |

`styling-example.css` içeriği:
- `.css-classes-container` + `.light` / `.dark` birleşik seçicileri ([`W3/styling-example.css:3-19`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/styling-example.css#L3-L19)): JSX'teki conditional className'in karşılığı.
- `.card`, `.btn`, `.btn-primary`, `.btn-primary:hover` (`:21-46`).
- "CSS Modules (Simulated)" class'ları: `.css-modules-container`, `.module-card`, `.module-button` (`:48-85`).
- `.styled-components-container` ve içindeki `button` (`:87-105`), `.css-in-js-container` (`:107-114`).
- **Media query:** `@media (max-width: 768px)` içinde `.responsive-container { flex-direction: column; }` (`:116-125`).
- **Keyframes:** `fadeIn`, `slideIn`, `pulse` (`:127-158`) ve utility class'lar `.fade-in`, `.slide-in`, `.pulse` (`:160-171`).
- **CSS custom properties (değişkenler):** `:root { --primary-color: ... }` (`:174-183`), `[data-theme="dark"]` ile override (`:186-191`), kullanım `var(--primary-color)` ve fallback'li `var(--text-color, #333)` (`:194-199`).

### Dikkat / tuzaklar (örnekler)
- Örnekteki "CSS Modules" ve "Styled Components" **gerçek değil, simülasyon** ([`W3/12-styling-example.jsx:60`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling-example.jsx#L60), `:74`). Gerçek kullanım `12-styling.md` içinde.
- `StyledButton` bileşeni `StyledComponents` fonksiyonunun **içinde** tanımlanmış (`:76`): her render'da yeni bileşen tipi oluşur (anti-pattern; ders dışı ek bilgi).
- CSS'teki `.responsive-container`, keyframes ve `.theme-aware` class'ları JSX'te **hiç kullanılmıyor**; responsive örnek media query değil, state ile çalışıyor.

---

## 13. Forms ([`W3/13-forms.md`](../../1_hoca_notlari/W3/13-forms.md))

**Ana fikir:** HTML'de form elemanları kendi state'ini tutar; React'te state'i **tek doğruluk kaynağı (single source of truth)** yaparak elemanı kontrol ederiz. Buna **controlled component** denir ([`W3/13-forms.md:3-7`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L3-L7)).

### 13.1 Controlled Components [`W3/13-forms.md:5-36`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L5-L36)
- `const [name, setName] = useState('');` (`:14`)
- `value={name}` + `onChange={handleChange}` (`:29`), `handleChange` içinde `setName(e.target.value)` (`:17`).
- **`onSubmit` + `e.preventDefault()`:** form gönderiminde sayfanın yenilenmesini engeller (`:20-22`, `:26`).
- `<button type="submit">` formu submit eder (`:31`).
- Ekran: `<p>Current value: {name}</p>` her tuşta güncellenir (`:32`); submit'te alert "Submitted name: ..." (`:22`).

### 13.2 Handling Multiple Inputs [`W3/13-forms.md:38-102`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L38-L102)
- Tek state objesi: `{ firstName, lastName, email }` (`:47-51`).
- Tek handler, input'un **`name` attribute'u** ile hangi alanın güncelleneceğini bulur: `const { name, value } = e.target;` (`:54`).
- **Computed property name** ve **functional update:** `setFormData(prevData => ({ ...prevData, [name]: value }))` (`:55-58`). Spread ile diğer alanlar korunur.

### 13.3 Textarea [`W3/13-forms.md:104-128`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L104-L128)
- React'te `<textarea>` içeriği **children yerine `value` attribute'u** ile verilir (`:106`, `:118`). Self-closing yazılır: `<textarea ... />`.
- `message.length` ile karakter sayacı (`:124`).

### 13.4 Select Dropdown [`W3/13-forms.md:130-154`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L130-L154)
- Seçili değer, `<option>` üzerinde `selected` yerine **kök `<select>` üzerindeki `value`** ile belirtilir (`:132`, `:143`).

### 13.5 Checkbox [`W3/13-forms.md:156-179`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L156-L179)
- `value` yerine **`checked`** kullanılır (`:158`, `:170`); handler'da `e.target.checked` okunur (`:171`).

### 13.6 Radio Buttons [`W3/13-forms.md:181-228`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L181-L228)
- Aynı **`name`** ile gruplanır (`:183`, `:195`), `checked={selectedOption === 'option1'}` ile seçili olan belirlenir (`:197`), `onChange` içinde `e.target.value` okunur (`:198`).

### 13.7 Form Validation [`W3/13-forms.md:230-295`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L230-L295)
- `errors` state'i bir obje (`:239`).
- `validate()` yeni bir hata objesi döndürür: email boş mu, regex `/\S+@\S+\.\S+/` uyuyor mu (`:244-248`); password boş mu, `length < 6` mı (`:250-254`).
- Submit'te: `Object.keys(validationErrors).length === 0` ise başarılı, değilse `setErrors(validationErrors)` (`:263-268`).
- Hata gösterimi conditional rendering ile: `{errors.email && <p style={{ color: 'red' }}>...}` (`:280`).

### 13.8 Uncontrolled Components [`W3/13-forms.md:297-325`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L297-L325)
- Veriyi **DOM tutar**; değere **ref** ile erişilir (`:299`).
- `const nameRef = useRef(null);` (`:306`), `<input ref={nameRef} defaultValue="John Doe" />` (`:317`), okuma `nameRef.current.value` (`:310`).
- Başlangıç değeri **`defaultValue`** ile (controlled'daki `value` değil). Ekranda input "John Doe" ile açılır, Submit alert'i "Submitted name: John Doe" (değiştirilmezse).
- Not: **Controlled components genelde önerilir** (veri ve validation üzerinde daha fazla kontrol) (`:325`).

### Controlled vs Uncontrolled

| Özellik | Controlled | Uncontrolled |
|---|---|---|
| Verinin sahibi | React state (single source of truth) | DOM |
| Değer bağlama | `value={state}` / `checked={state}` | `defaultValue` / `defaultChecked` (ders dışı) |
| Değişiklik | `onChange` ile `setState` şart | `onChange` gerekmez |
| Değeri okuma | Doğrudan state'ten | `ref.current.value` (`useRef`) ya da `new FormData(e.target)` (örnek dosya) |
| Anlık validation / koşullu UI | Kolay | Zor |
| Kaynağın önerisi | Genelde önerilen ([`W3/13-forms.md:325`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L325)) | Bazı durumlarda |

### Eleman başına özet

| Eleman | Bağlanan prop | Handler'da okunan |
|---|---|---|
| `input type="text"/"email"/"number"` | `value` | `e.target.value` |
| `textarea` | `value` (children değil) | `e.target.value` |
| `select` | `<select value>` (`selected` değil) | `e.target.value` |
| `input type="checkbox"` | `checked` | `e.target.checked` |
| `input type="radio"` | `checked={state === değer}`, ortak `name` | `e.target.value` |

### Dikkat / tuzaklar (13)
- `value` verip `onChange` vermemek input'u salt okunur yapar (React uyarı verir; ders dışı ek bilgi).
- `preventDefault()` unutulursa form sayfayı yeniler.
- Çok alanlı formda `[name]: value` için input'ta `name` attribute'u şart.
- Spread (`...prevData`) unutulursa diğer alanlar silinir.
- `useState('')` yerine `useState()` (undefined) ile başlamak input'u uncontrolled'dan controlled'a geçirir ve uyarı verir (ders dışı ek bilgi).

---

## 13. Forms örnek dosyası ([`W3/13-forms-example.jsx`](../../1_hoca_notlari/W3/13-forms-example.jsx))

3 form + `App` ([`W3/13-forms-example.jsx:561-579`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms-example.jsx#L561-L579)).

**1) `ControlledForm` (`:4-307`)**
- Tek state objesi: `name, email, age, gender, interests: [], newsletter: false, country, message` (`:5-14`).
- Tek ortak handler `handleInputChange` (`:18-49`): `type`, `checked` de okunur (`:19`).
  - Checkbox + `name === 'interests'` ise **dizi** yönetimi: işaretliyse ekle `[...prev.interests, value]`, değilse `filter` ile çıkar (`:22-28`).
  - Diğer checkbox (`newsletter`) için `[name]: checked` (`:30-33`); diğer input'lar için `[name]: value` (`:36-39`).
  - Kullanıcı yazınca o alanın hatası temizlenir (`:42-48`).
- `validateForm()` (`:51-84`): name (`trim`), email (regex), age (1-120), gender, interests (en az 1), country zorunlu; `setErrors` yapar ve boolean döner.
- `handleSubmit` (`:86-104`): `preventDefault`, geçerliyse `console.log` + `alert` + formu sıfırla.
- Hatalı alanın kenarlığı kırmızı: `border: errors.name ? '2px solid red' : '1px solid #ccc'` (`:122`).
- Checkbox listesi `.map` ile, `checked={formData.interests.includes(interest)}` (`:212-224`).
- Select'te boş ilk seçenek `<option value="">Select a country</option>` (`:244`).

**2) `UncontrolledForm` (`:310-390`)**
- State yok, ref yok; submit'te **`new FormData(e.target)`** ve `Object.fromEntries(formData.entries())` ile değerler toplanır (`:314-315`).
- Input'lar `defaultValue=""` kullanır (`:331`, `:349`). Checkbox `value="yes"` (`:366`): işaretli değilse veride hiç yer almaz.

**3) Custom hook: `useForm(initialValues, validate)` (`:393-463`) ve `CustomHookForm` (`:465-558`)**
- Hook üç state tutar: `values`, `errors`, `touched` (`:394-396`).
- `handleChange`: `type === 'checkbox' ? checked : value` (`:403`).
- `handleBlur`: alanı `touched` yapar ve **alan bazında (field-level) validation** çalıştırır (`:415-430`).
- `handleSubmit` bir **higher-order function**: `handleSubmit(onSubmit)` bir event handler döndürür (`:432`, kullanım `:494`). Tüm alanları doğrular, hepsini `touched` yapar, hata yoksa `onSubmit(values)` çağırır (`:435-452`).
- Hata yalnızca `errors.username && touched.username` ise gösterilir (`:513`).
- `validate(field, value)` bir `switch` ile username (min 3) ve password (min 6) kurallarını uygular (`:466-479`).

---

## 14. Routing ([`W3/14-routing.md`](../../1_hoca_notlari/W3/14-routing.md))

**Ana fikir:** **React Router**, React'in standart routing kütüphanesi; tek sayfa uygulamada (SPA) sayfa yenilemeden görünümler arası geçiş sağlar ([`W3/14-routing.md:3`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L3)).

**Versiyon:** Kaynak açıkça versiyon numarası yazmıyor (`npm install react-router-dom`, `:8`), ama kullanılan API **v6 tarzı**: `<Routes>`, `element={<X />}`, `useNavigate`, `<Navigate>`, NavLink'te `({ isActive }) =>` fonksiyonu. v5'teki `Switch`, `component=`, `exact`, `useHistory` yok. (v7'de de aynı API çalışıyor, paket adı `react-router` olarak birleşti: ders dışı ek bilgi.)

### 14.1 Installation `:5-9`
- `npm install react-router-dom`

### 14.2 Basic Setup `:11-54`
- `import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';` (`:18`)
- `<BrowserRouter>` tüm uygulamayı sarar (`:35`); `<Routes>` içinde `<Route path="/" element={<Home />} />` (`:44-48`).
- Menü `<Link to="/about">` ile (`:38-40`).

### 14.3 Link ve NavLink `:56-85`
- **`Link`**: sayfa yenilemeden temel navigasyon (`:58`).
- **`NavLink`**: `Link` gibi, ama **aktif link için stil** imkanı verir (`:59`).
- `style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}` (`:70-72`), `className={({ isActive }) => isActive ? 'active' : ''}` (`:78`): prop'a **fonksiyon** verilir.

### 14.4 Dynamic Routes (URL Parameters) `:87-111`
- Rota: `path="/user/:userId"` (`:104`); `:` ile başlayan parça parametredir.
- Okuma: `const { userId } = useParams();` (`:96`). `/user/123` için "User Profile: 123" (`:110`). Parametre değeri **string** gelir (ders dışı ek bilgi).

### 14.5 Nested Routes `:113-154`
- Üst `Route`'un içine alt `Route`'lar yazılır (`:146-149`); alt path'ler **göreli (relative)**: `path="profile"` (başta `/` yok).
- Üst bileşen alt rotanın nereye çizileceğini **`<Outlet />`** ile belirtir (`:129`).
- `<Link to="profile">` göreli link (`:126`): `/dashboard/profile` olur.
- Sadece `/dashboard` açılırsa "Dashboard" başlığı ve linkler görünür, `<Outlet />` boş kalır (index route tanımlı değil; `<Route index element={...} />` ile varsayılan alt sayfa verilir: ders dışı ek bilgi).

### 14.6 Programmatic Navigation `:156-180`
- `const navigate = useNavigate();` (`:165`), `navigate('/dashboard')` (`:170`): örneğin login sonrası yönlendirme.

### 14.7 404 Page `:182-203`
- **Catch-all route:** `<Route path="*" element={<NotFound />} />` (`:198`); hiçbir rota eşleşmezse.

### 14.8 Protected Routes `:205-239`
- Sarmalayıcı bileşen `ProtectedRoute({ isAuthenticated, children })` (`:213`): giriş yoksa `<Navigate to="/login" replace />` (`:215`), varsa `children` döner (`:217`).
- `replace`: geçmişe yeni kayıt eklemek yerine mevcut kaydı değiştirir (geri tuşuyla korumalı sayfaya dönülmez; ders dışı açıklama).
- Kullanım: `element={<ProtectedRoute isAuthenticated={...}><Dashboard /></ProtectedRoute>}` (`:229-233`).

### 14.9 Query Parameters `:241-266`
- `const [searchParams, setSearchParams] = useSearchParams();` (`:250`), `searchParams.get('q')` (`:251`), güncelleme `setSearchParams({ q: e.target.value })` (`:259`).
- `/search?q=react` için "Search Results for: react" (`:265`).

### Router bileşen / hook listesi

| Ad | Tür | Görevi | Kaynak |
|---|---|---|---|
| `BrowserRouter` | Bileşen | History API ile routing'i sağlar, en dışta sarar | `:35` |
| `Routes` | Bileşen | Route'ları gruplar, en uygun eşleşeni render eder | `:44` |
| `Route` | Bileşen | `path` + `element` eşlemesi | `:45` |
| `Link` | Bileşen | Sayfa yenilemeden link (`to`) | `:38`, `:58` |
| `NavLink` | Bileşen | Aktif durumu bilen link (`isActive`) | `:59`, `:68-81` |
| `Outlet` | Bileşen | Nested route'un çizileceği yer | `:119`, `:129` |
| `Navigate` | Bileşen | Render edilince yönlendirir (`to`, `replace`) | `:211`, `:215` |
| `useParams` | Hook | URL parametrelerini obje olarak verir | `:93`, `:96` |
| `useNavigate` | Hook | Kodla yönlendirme fonksiyonu | `:162`, `:165` |
| `useSearchParams` | Hook | Query string okuma/yazma | `:247`, `:250` |

### Dikkat / tuzaklar (14)
- Normal `<a href>` kullanmak tam sayfa yenilemesi yapar; SPA'da `Link` kullan.
- Hook'lar (`useParams`, `useNavigate`) ve `Link` sadece `BrowserRouter` içinde çalışır.
- Nested route'ta üst bileşende `<Outlet />` unutulursa alt sayfa görünmez.
- Nested alt path'leri `/` ile başlatmak onları mutlak (absolute) yapar.
- `path="*"` 404 rotası.

---

## 14. Routing örnek dosyası ([`W3/14-routing-example.jsx`](../../1_hoca_notlari/W3/14-routing-example.jsx))

**Önemli:** Bu dosya **react-router-dom kullanmıyor**; Context + History API ile **elle yazılmış basit bir router** ([`W3/14-routing-example.jsx:3`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing-example.jsx#L3)). API'si v5'e benziyor (`component=`, `exact`, `activeStyle`).

- `SimpleRouter` (`:4-27`): `currentPath` state'i `window.location.pathname` ile başlar (`:5`); `navigate(path)` = `window.history.pushState({}, '', path)` + `setCurrentPath(path)` (`:7-10`). `useEffect` ile **`popstate`** dinlenir (tarayıcı geri/ileri tuşları), cleanup'ta listener kaldırılır (`:13-20`). Değerler `RouterContext.Provider` ile verilir (`:23`).
- `RouterContext = React.createContext()` (`:29`), `useRouter()` custom hook'u, Provider dışında kullanılırsa hata fırlatır (`:31-37`).
- `Route({ path, component: Component, exact })` (`:40-48`): `exact` ise `===`, değilse `startsWith` ile eşleştirir; eşleşirse `<Component />`, yoksa `null`. (`component: Component` yeniden adlandırma: JSX'te büyük harf gerekir.)
- `Link` (`:51-72`): `<a href={to}>` render eder ama `onClick` içinde `e.preventDefault()` + `navigate(to)` ile yenilemeyi engeller.
- `NavLink` (`:75-101`): aynı mantık + `isActive` ise `activeStyle` uygulanır (`:95`).
- Sayfalar: `Home`, `About`, `Products` (liste + `/products/${id}` linkleri), `ProductDetail` (id'yi `currentPath.split('/').pop()` ile alır, `:166`), `Contact` (controlled form), `Users`, `UserProfile` (`:334`), `NotFound` (`:369-377`).
- `Navigation` (`:380-431`), `App` (`:434-455`) içinde Route listesi (`:443-450`).
- `RouterContext` `const` ile `SimpleRouter`'dan **sonra** tanımlanmış (`:29`) ama hata vermez: değişkene modül yüklenirken değil render sırasında erişilir, o an tanımlıdır (TDZ'ye takılmaz).
- NavLink'ler `exact` olmadan `startsWith` kullanır: `/products/1` adresinde "Products" linki aktif görünür ama içerik alanı boştur (bkz. hata 1). "Home" NavLink'i `exact` (`:392-394`), yoksa `/` her yolu kapsardı.

---

## W3 Genel Rehberi ([`W3/README.md`](../../1_hoca_notlari/W3/README.md))

**Ana fikir:** W3 klasörünün indeksi; kurulum, öğrenme yolu, dosya listesi, örneklerin nasıl çalıştırılacağı, ileri konular, best practices, araçlar ve kaynaklar.

### Quick Start [`W3/README.md:17-45`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/README.md?plain=1#L17-L45)
- `npx create-react-app my-react-learning`, `cd`, `npm start` (`:22-26`).
- Herhangi bir `.jsx` dosyasını `src/` içine kopyala, `App.js` içinde import et (`:30-45`).

### Learning Path `:47-69`
- **Phase 1: Fundamentals (Weeks 1-2):** 1 React Fundamentals, 2 Setup, 3 JavaScript Basics, 4 Components, 5 JSX, 6 Props, 7 State (`:49-56`).
- **Phase 2: Intermediate (Weeks 3-4):** 8 Lifecycle & Effects, 9 Event Handling, 10 Conditional Rendering, 11 List Rendering, 12 Hooks (`:58-63`).
- **Phase 3: Advanced (Weeks 5-6):** 13 Data Sharing, 14 Styling, 15 Forms, 16 Routing (`:65-69`).
- Dikkat: Learning Path sıra numaraları dosya numaralarıyla aynı değil (örn. Styling path'te 14, dosyada 12).

### Documentation Files `:71-107`
Dört tablo: Core React Concepts (00 dosyaları), Component Development (01-04), Advanced React Features (05-09), Application Architecture (10, 12, 13, 14). Bu bölüm için ilgili satırlar:
- `12-styling.md`: Inline styles, CSS modules, styled-components, Tailwind (`:105`)
- `13-forms.md`: Controlled components, validation, form libraries (`:106`)
- `14-routing.md`: React Router, routing patterns, protected routes (`:107`)

### Code Examples `:109-246`
- Dosya ağacı (`:114-131`); 11 numara yok.
- **Method 1** React uygulamasında (Recommended): CRA kur, dosyayı `src/` içine kopyala, `App.js` içinde import et, `npm start` (`:135-173`).
- **Method 2** Online editörler: CodeSandbox (Recommended), CodePen (React ve ReactDOM CDN'den) (`:175-187`).
- **Method 3** Basit HTML dosyası: unpkg'den `react@18` ve `react-dom@18` UMD, `@babel/standalone`, `<script type="text/babel">`, `ReactDOM.createRoot(...).render(...)` (`:189-218`). Dikkat: örnek `.jsx` dosyalarındaki `import` / `export` satırları bu script içinde çalışmaz, silinmeli; `useState` yerine `React.useState` yazılmalı (ders dışı ek bilgi). React 19'da UMD build kaldırıldı, bu yüzden `@18` sabitlemesi şart (ders dışı ek bilgi).
- Detailed walkthrough: `01-components-functional.jsx` neyi öğretir: import React, function declaration, props, JSX return, export (`:220-246`).

### Prerequisites `:248-255`
- HTML/CSS, JavaScript temelleri, **Node.js 14 veya üstü**, kod editörü (VS Code önerilir).

### Getting Started `:257-269`
- Ortam kurulumu, Fundamentals, örneklerle pratik, küçük projeler.

### How to Use This Guide `:271-289`
- Beginners: Phase 1'i bitir, örneklerle pratik, küçük proje, acele etme.
- Intermediate: temelleri gözden geçir, ileri konular (hooks, state management, routing), pattern'ler, karmaşık projeler.
- Advanced: referans olarak kullan, best practices, ekiple paylaş (onboarding), katkı.

### Advanced Topics `:291-311`

| Konu | Alt başlık ve araçlar |
|---|---|
| State Management | Local: `useState`, `useReducer`; Global: Context API, Redux, Zustand; Server State: React Query, SWR (`:293-296`) |
| Performance Optimization | Memoization: `React.memo`, `useMemo`, `useCallback`; Code Splitting: lazy loading, dynamic imports; Bundle: Webpack, Vite (`:298-301`) |
| Testing | Unit: Jest, React Testing Library; Integration: Cypress, Playwright; Visual: Storybook, Chromatic (`:303-306`) |
| Deployment | Static Hosting: Netlify, Vercel, GitHub Pages; Server: Docker, Kubernetes; CDN: CloudFlare, AWS CloudFront (`:308-311`) |

### Best Practices `:313-337`
- **Code Organization:** bileşenleri küçük ve odaklı tut; açıklayıcı, tutarlı dosya adları; klasörleri feature veya type'a göre düzenle; temiz import için **barrel exports** (`:315-319`).
- **Performance:** gereksiz render'dan kaçın (`React.memo`, `useMemo`); görselleri optimize et; code splitting; bundle boyutunu izle (`:321-325`).
- **Accessibility:** semantik HTML; ARIA label'ları; klavye ile gezinme; ekran okuyucu ile test (`:327-331`).
- **Security:** tüm kullanıcı girdisini doğrula (input validation); **XSS önleme** (kullanıcı içeriğini sanitize et); HTTPS; bağımlılıkları güncel tut (`:333-337`).

### Recommended Tools `:339-357`
- Development: VS Code, React Developer Tools, ESLint, Prettier.
- Testing: Jest, React Testing Library, Cypress, Storybook.
- Build Tools: Create React App (zero-config), Vite (hızlı build ve dev server), Next.js (SSR'li framework), Webpack (module bundler).

### Additional Resources `:359-380`
- Resmi: react.dev, react.dev/learn, react.dev/reference/react. Öğrenme: freeCodeCamp, React Patterns, React TypeScript Cheatsheet. Topluluk: React Community, Reddit, Discord. Kitaplar: "Learning React" (Banks, Porcello), "React Patterns" (Michael Chan), "Fullstack React" (Accomazzo).

---

## Olası sınav soruları ve kısa cevaplar

1. **React'te inline style nasıl yazılır?** `style` attribute'una bir JS objesi verilir, property adları camelCase: `style={{ backgroundColor: 'lightgray' }}`. Kaynak: [`W3/12-styling.md:30`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L30), [`W3/12-styling.md:37`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L37)

2. **Hatayı bul: `<div style="background-color: red" class="box">`** İki hata: style string değil obje olmalı ve `backgroundColor` yazılmalı; `class` yerine `className`. Doğrusu: `<div style={{ backgroundColor: 'red' }} className="box">`. Kaynak: [`W3/12-styling.md:37`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L37), [`W3/12-styling.md:78`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L78)

3. **CSS Modules hangi problemi çözer?** Class'ları bileşene yerel kapsamlı yapar, isim çakışmalarını önler; dosya `X.module.css`, import `import styles from ...`, kullanım `styles.button`. Kaynak: [`W3/12-styling.md:90`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L90), [`W3/12-styling.md:119`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L119)

4. **Bu kod ne yapar: `` primary ? `${styles.button} ${styles.primary}` : styles.button ``** `primary` prop'u true ise iki class'ı birleştirir (conditional className), değilse sadece `button` class'ı. Kaynak: [`W3/12-styling.md:122`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L122)

5. **styled-components props'a göre stili nasıl değiştirir?** Tagged template literal içinde fonksiyon: `${props => props.primary ? '#007bff' : '#6c757d'}`; `<Button primary>` ile kullanılır. Kaynak: [`W3/12-styling.md:153`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L153), [`W3/12-styling.md:181`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L181)

6. **Tailwind'in yaklaşımı nedir, kurulumda hangi 3 direktif eklenir?** Utility-first; `@tailwind base; @tailwind components; @tailwind utilities;`. Kaynak: [`W3/12-styling.md:192`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L192), [`W3/12-styling.md:218-220`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L218-L220)

7. **Kaynağa göre dinamik ve tek seferlik stil için hangi yöntem, isim çakışmasını önlemek için hangisi?** Inline styles; CSS Modules. Kaynak: [`W3/12-styling.md:305`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L305), [`W3/12-styling.md:307`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L307)

8. **Bu kod ne yapar: `` className={`css-classes-container ${theme}`} ``** State'teki `theme` (light/dark) değerini class olarak ekler; CSS'teki `.css-classes-container.dark` kuralı devreye girer. Kaynak: [`W3/12-styling-example.jsx:45`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling-example.jsx#L45), [`W3/styling-example.css:16`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/styling-example.css#L16)

9. **CSS'te `var(--text-color, #333)` ne demek?** CSS custom property kullanımı; `--text-color` tanımlı değilse `#333` fallback olur. Kaynak: [`W3/styling-example.css:196`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/styling-example.css#L196)

10. **Controlled component nedir?** Değeri React state'inde tutulan, `value` + `onChange` ile bağlanan form elemanı; state "single source of truth". Kaynak: [`W3/13-forms.md:7`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L7), [`W3/13-forms.md:29`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L29)

11. **Controlled ile uncontrolled farkı nedir?** Controlled'da veri React state'inde (`value`, `onChange`); uncontrolled'da DOM'da, `useRef` + `defaultValue` ile, `ref.current.value` okunur. Kaynak önerisi controlled. Kaynak: [`W3/13-forms.md:299`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L299), [`W3/13-forms.md:317`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L317), [`W3/13-forms.md:325`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L325)

12. **`e.preventDefault()` form submit'te ne işe yarar?** Tarayıcının varsayılan submit davranışını (sayfa yenileme) engeller. Kaynak: [`W3/13-forms.md:21`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L21)

13. **Çok sayıda input'u tek handler ile nasıl yönetirsin?** Input'lara `name` ver, `const { name, value } = e.target;` ve `setFormData(prev => ({ ...prev, [name]: value }))`. Kaynak: [`W3/13-forms.md:54-58`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L54-L58)

14. **Hatayı bul: `setFormData({ [name]: value })`** Spread yok; diğer alanlar state'ten silinir. `{ ...prev, [name]: value }` olmalı. Kaynak: [`W3/13-forms.md:55-58`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L55-L58)

15. **React'te textarea ve select'in HTML'den farkı?** `<textarea>` içeriği children değil `value` ile; `<select>` seçimi `option`'daki `selected` değil kök `select`'teki `value` ile. Kaynak: [`W3/13-forms.md:106`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L106), [`W3/13-forms.md:132`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L132)

16. **Checkbox'ta hangi prop ve hangi event alanı kullanılır?** `checked={isSubscribed}`, handler'da `e.target.checked`. Kaynak: [`W3/13-forms.md:158`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L158), [`W3/13-forms.md:171`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L171)

17. **Radio butonlar nasıl gruplanır ve seçili olan nasıl belirlenir?** Ortak `name`; `checked={selectedOption === 'option1'}`. Kaynak: [`W3/13-forms.md:183`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L183), [`W3/13-forms.md:197`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L197)

18. **Kaynaktaki email validation regex'i ve password kuralı nedir?** `/\S+@\S+\.\S+/`; şifre en az 6 karakter. Kaynak: [`W3/13-forms.md:246`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L246), [`W3/13-forms.md:252`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L252)

19. **Birden çok seçilebilen checkbox grubu (interests) state'te nasıl tutulur?** Dizi olarak; işaretlenince `[...prev.interests, value]`, kaldırılınca `prev.interests.filter(i => i !== value)`; `checked={formData.interests.includes(interest)}`. Kaynak: [`W3/13-forms-example.jsx:25-27`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms-example.jsx#L25-L27), [`W3/13-forms-example.jsx:218`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms-example.jsx#L218)

20. **`useForm` hook'undaki `touched` state'i ne işe yarar?** Kullanıcı alana dokunmadan (blur olmadan) hata göstermemek için; hata `errors.x && touched.x` ise görünür. `handleBlur` alanı touched yapıp validate eder. Kaynak: [`W3/13-forms-example.jsx:396`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms-example.jsx#L396), [`W3/13-forms-example.jsx:415-430`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms-example.jsx#L415-L430), [`W3/13-forms-example.jsx:513`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms-example.jsx#L513)

21. **React Router temel kurulumda hangi 4 bileşen kullanılır?** `BrowserRouter`, `Routes`, `Route`, `Link`. Kaynak: [`W3/14-routing.md:13`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L13), [`W3/14-routing.md:18`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L18)

22. **Link ile NavLink farkı?** İkisi de yenilemesiz navigasyon; NavLink aktif rotada stil verebilir (`style`/`className` prop'una `({ isActive }) => ...` fonksiyonu). Kaynak: [`W3/14-routing.md:58-59`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L58-L59), [`W3/14-routing.md:70`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L70)

23. **`/user/42` adresinde `42`'yi nasıl okursun?** Rota `path="/user/:userId"`, bileşende `const { userId } = useParams();`. Kaynak: [`W3/14-routing.md:96`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L96), [`W3/14-routing.md:104`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L104)

24. **Nested route'larda alt sayfa nereye çizilir?** Üst bileşendeki `<Outlet />` yerine; alt path'ler göreli (`path="profile"`). Kaynak: [`W3/14-routing.md:129`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L129), [`W3/14-routing.md:147`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L147)

25. **Login sonrası koddan yönlendirme nasıl yapılır?** `const navigate = useNavigate(); navigate('/dashboard');`. Kaynak: [`W3/14-routing.md:165`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L165), [`W3/14-routing.md:170`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L170)

26. **404 sayfası nasıl tanımlanır?** `<Route path="*" element={<NotFound />} />`. Kaynak: [`W3/14-routing.md:198`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L198)

27. **ProtectedRoute bu kodda ne yapar: `if (!isAuthenticated) return <Navigate to="/login" replace />; return children;`** Giriş yoksa `/login`'e yönlendirir (`replace` ile geçmiş kaydını değiştirir), varsa sarılı içeriği gösterir. Kaynak: [`W3/14-routing.md:213-218`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L213-L218)

28. **`/search?q=react` adresinden `q` nasıl okunur ve güncellenir?** `const [searchParams, setSearchParams] = useSearchParams(); searchParams.get('q'); setSearchParams({ q: ... })`. Kaynak: [`W3/14-routing.md:250-251`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L250-L251), [`W3/14-routing.md:259`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L259)

29. **Örnek dosyadaki SimpleRouter, tarayıcı geri tuşunu nasıl yakalar?** `useEffect` içinde `window.addEventListener('popstate', ...)`, cleanup'ta `removeEventListener`; `navigate` ise `history.pushState` kullanır. Kaynak: [`W3/14-routing-example.jsx:8`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing-example.jsx#L8), [`W3/14-routing-example.jsx:13-20`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing-example.jsx#L13-L20)

30. **README'ye göre Security best practices nelerdir?** Input validation, XSS prevention (sanitize), HTTPS, bağımlılıkları güncel tutmak. Kaynak: [`W3/README.md:333-337`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/README.md?plain=1#L333-L337)

31. **Kod: FormValidation örneğinde email "abc", şifre "123" girip Submit'e basınca ne olur?** Input `type="email"` ve form `noValidate` değil: tarayıcı kendi uyarısını gösterip submit'i durdurur, `handleSubmit` çalışmaz, kırmızı mesaj çıkmaz. Email "a@b.co", şifre "123" olsaydı: sadece "Password must be at least 6 characters" görünür. Kaynak: [`W3/13-forms.md:244-254`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L244-L254), [`W3/13-forms.md:276`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L276)

32. **Kod: Sadece `/dashboard` adresine gidilince nested route örneği ne gösterir?** "Dashboard" başlığı ve Profile / Settings linkleri; `<Outlet />` boş (index route yok). Kaynak: [`W3/14-routing.md:121-131`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L121-L131), [`W3/14-routing.md:146-149`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L146-L149)

33. **Kod: Routing örnek dosyasında `/products/2` adresinde ekranda ne var?** Başlık, menü ("Products" NavLink aktif renkte) ve boş içerik alanı: `ProductDetail` eşleşmez (`startsWith("/products/:id")` false), `Products` `exact` olduğu için de görünmez. Kaynak: [`W3/14-routing-example.jsx:43-45`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing-example.jsx#L43-L45), [`W3/14-routing-example.jsx:445-446`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing-example.jsx#L445-L446)

34. **Kod: Uncontrolled örnekte (`13-forms.md`) input değeri hangi ifadeyle okunur, başlangıç değeri nedir?** `nameRef.current.value`; `defaultValue="John Doe"`. Kaynak: [`W3/13-forms.md:310`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L310), [`W3/13-forms.md:317`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L317)

35. **Kod: `useForm` hook'unda `handleSubmit(onSubmit)` neden iki ok fonksiyonu?** `handleSubmit` önce `onSubmit` callback'ini alıp asıl event handler `(e) => {...}` fonksiyonunu döndürür (higher-order / currying); `onSubmit={handleSubmit(onSubmit)}` render'da çağrılır ama sadece handler üretir. Kaynak: [`W3/13-forms-example.jsx:432`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms-example.jsx#L432), [`W3/13-forms-example.jsx:494`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms-example.jsx#L494)

36. **CSS Modules ile normal CSS import farkı (aynı `.button` iki dosyada)?** Normal CSS global, son yüklenen kural kazanır/çakışır; CSS Modules class adını derleme sırasında benzersiz hale getirir (örn. `Button_button__x1y2`), çakışma olmaz (hash biçimi ders dışı ek bilgi). Kaynak: [`W3/12-styling.md:90`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L90)

---

## Materyalde hata / eksik / güncel olmayan bilgi

**Kod hataları (çalışmayan davranış):**
1. **Routing örneğinde dinamik rotalar hiç eşleşmiyor.** Özel `Route` `:id` parametresini anlamıyor; `startsWith` ile düz string karşılaştırıyor ([`W3/14-routing-example.jsx:43-45`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing-example.jsx#L43-L45)). `/products/1` için `"/products/1".startsWith("/products/:id")` false, `/products` rotası da `exact` (`:445-446`). Sonuç: `ProductDetail` ve `UserProfile` (`:446`, `:449`) **asla render edilmez**, "View Details" tıklanınca içerik alanı boş kalır.
2. **404 rotası da hiç çalışmıyor.** `path="*"` için `currentPath.startsWith("*")` hep false ([`W3/14-routing-example.jsx:45`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing-example.jsx#L45), `:450`). Ayrıca `Switch`/`Routes` benzeri "ilk eşleşen" mantığı yok; eşleşseydi diğer sayfalarla **birlikte** render olurdu.
3. **14-routing.md nested routes örneğinde `Link` import edilmemiş:** sadece `Outlet` import ediliyor ([`W3/14-routing.md:119`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L119)) ama `Link` kullanılıyor (`:126`). Ayrıca 14.8'de `Login` ve `Dashboard` tanımsız (`:226`, `:231`); parça kod olarak düşünülmüş.
4. **13-forms.md form validation'da eski hatalar temizlenmiyor:** başarılı submit dalında `setErrors({})` yok ([`W3/13-forms.md:263-265`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L263-L265)); önce hatalı sonra doğru gönderilirse eski hata mesajları ekranda kalır.
4b. **HTML5 yerleşik doğrulaması özel mesajları gölgeliyor.** `13-forms.md` validation örneğinde input `type="email"` ([`W3/13-forms.md:276`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms.md?plain=1#L276)), örnek dosyada `type="email"` ve `type="number" min="1" max="120"` ([`W3/13-forms-example.jsx:134`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms-example.jsx#L134), [`W3/13-forms-example.jsx:154-159`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/13-forms-example.jsx#L154-L159)); formda `noValidate` yok. Tarayıcı "abc" gibi geçersiz email ya da 150 yaş için submit'i kendisi durdurur, `onSubmit` hiç çalışmaz; "Email is invalid" ve "Age must be between 1 and 120" mesajları pratikte görünmez (sadece "a@b" gibi tarayıcının kabul edip regex'in reddettiği değerlerde görünür). Boş alan ise `required` olmadığı için geçer ve özel "required" mesajı görünür. Çözüm: `<form noValidate>`.
4c. **14-routing.md parça kodlarında importlar eksik:** 14.4, 14.5, 14.7, 14.8 örneklerinde `BrowserRouter`, `Routes`, `Route` import edilmeden kullanılıyor ([`W3/14-routing.md:93`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L93), [`W3/14-routing.md:102-104`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing.md?plain=1#L102-L104)); sadece 14.2'de tam import var (`:18`).
5. **Styling örneğinde dark temada kart yazısı görünmez:** `.css-classes-container.dark` `color: #fff` veriyor ([`W3/styling-example.css:16-19`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/styling-example.css#L16-L19)), içteki `.card` ise `background: white` ve kendi rengi yok (`:21-22`); kart metni beyaz zemin üstünde beyaz olur ([`W3/12-styling-example.jsx:47-48`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling-example.jsx#L47-L48)).
6. **`<style jsx>` düz React'te çalışmaz gibi davranır:** `styled-jsx` (Next.js / babel plugin) gerektirir; düz CRA'da `jsx` attribute'u için uyarı verir ve CSS **global** olur, kapsamlı değil ([`W3/12-styling-example.jsx:133`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling-example.jsx#L133)). Kod yorumu da "simulated" diyor (`:124`).
7. **"Responsive Design" örneğinde tablet görünümü desktop ile aynı:** sadece `'mobile'` kontrol ediliyor ([`W3/12-styling-example.jsx:157`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling-example.jsx#L157)). Gerçek responsive (media query) değil; CSS'teki `.responsive-container` media query'si ([`W3/styling-example.css:117-125`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/styling-example.css#L117-L125)) JSX'te kullanılmıyor. Keyframes, `.fade-in/.slide-in/.pulse` ve `.theme-aware` da kullanılmıyor (`:127-199`).

**Tutarsızlık / eksik:**
8. **11 numaralı dosya yok** ([`W3/README.md:126-127`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/README.md?plain=1#L126-L127)).
9. Örnek dosyalardaki "CSS Modules" ve "Styled Components" gerçek değil, simülasyon ([`W3/12-styling-example.jsx:60`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling-example.jsx#L60), `:74`); routing örneği de React Router değil, v5 tarzı API'li (`exact`, `component=`, `activeStyle`) kendi router'ı ([`W3/14-routing-example.jsx:40`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/14-routing-example.jsx#L40), `:75`). Doküman ise v6 API'si anlatıyor: karıştırmamak gerek.
10. README tablosu `13-forms.md` için "form libraries" diyor ([`W3/README.md:106`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/README.md?plain=1#L106)) ama dosyada form kütüphanesi (Formik, React Hook Form vb.) yok. Aynı tablo styling için Sass'tan bahsetmiyor (`:105`).
11. README İçindekiler listesinde "Recommended Tools" bölümü yok ([`W3/README.md:4-15`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/README.md?plain=1#L4-L15) ile `:339`); ayrıca sıra farklı: listede "How to Use This Guide" Prerequisites'ten önce, metinde sonra (`:248`, `:271`).
12. README Learning Path numaraları dosya numaralarıyla uyuşmuyor (Styling path'te 14, dosya 12) ([`W3/README.md:67`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/README.md?plain=1#L67)).

**Güncel olmayan bilgi (ders dışı ek bilgi, 2026 itibarıyla):**
13. `create-react-app` Şubat 2025'te resmi olarak deprecated edildi; README hala ana yöntem olarak öneriyor ([`W3/README.md:22`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/README.md?plain=1#L22), `:139`, `:354`). Güncel öneri Vite veya bir framework.
14. Node.js 14 alt sınırı ([`W3/README.md:254`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/README.md?plain=1#L254)) çok eski; güncel araçlar Node 18/20+ ister.
15. Sass `darken()` ([`W3/12-styling.md:280`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L280)) yeni Dart Sass'ta deprecated; yerine `color.adjust` / `color.scale`.
16. Tailwind kurulumu ([`W3/12-styling.md:197-220`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/12-styling.md?plain=1#L197-L220)) Tailwind v3 yöntemi; v4'te (2025) `npx tailwindcss init` ve `@tailwind` direktifleri yerine `@import "tailwindcss";` kullanılıyor.
17. React Community linki eski `reactjs.org` alan adında ([`W3/README.md:372`](https://github.com/zeki-ozen/MobileAppDevelopment/blob/7a13069/W3/README.md?plain=1#L372)).
