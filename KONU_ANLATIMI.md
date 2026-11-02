# Mobil Uygulama Geliştirme: Konu Anlatımı (W2, W3, W4, W6)

Hocanın materyaline (`zeki-ozen/MobileAppDevelopment`, commit `7a13069`) dayanan kısa anlatım.
Detaylı notlar ve soru-cevaplar: [notlar/haftalar/](notlar/haftalar/).

- [Hafta 2: JavaScript & ES6](#hafta-2-javascript--es6)
- [Hafta 3: React (web)](#hafta-3-react-web)
- [Hafta 4: React Native'e Giriş](#hafta-4-react-nativee-giriş)
- [Hafta 6: React Native Core Components](#hafta-6-react-native-core-components)

---

# Hafta 2: JavaScript & ES6

## 2.0 JavaScript'in temelleri
Kaynak: `W2/topics/00_Fundamentals_of_JavaScript.html`

JavaScript (JS), Brendan Eich'in 1995'te Netscape'te yazdığı high-level (yüksek seviyeli), interpreted (yorumlanan) bir dildir. Web sayfalarına etkileşim katmak için doğdu; bugün web, mobil, masaüstü ve sunucuda çalışıyor.

- Standart: TC39 komitesi (ECMA International) dili **ECMAScript** spesifikasyonu olarak yayınlar.
- Engine (motor): V8, SpiderMonkey, JavaScriptCore, Chakra. Runtime (çalışma ortamı): tarayıcı, Node.js, Deno, Bun. (Chakra artık güncel değil, Edge 2020'den beri V8 kullanıyor.)
- Nerede çalışır: tarayıcı (client-side), Node.js (server-side), mobil (React Native, Ionic, NativeScript), masaüstü (Electron, Tauri), embedded/IoT, otomasyon (Deno, Bun).
- Tarihçe: **1995** LiveScript çıktı, adı JavaScript oldu. **1997** ECMAScript 1. **2009** ES5: JSON, strict mode, array helpers. **2015** ES2015 (ES6): classes, modules, arrow functions, promises. **2017 ve sonrası** her yıl sürüm: async/await, optional chaining, top-level await.
- Dilin karakteri:
  - **Case sensitive** (büyük/küçük harf duyarlı): `total` ile `Total` farklı. Değişken/fonksiyon camelCase, class PascalCase, sabit ALL_CAPS.
  - **Dynamic typing** (dinamik tipleme): tip runtime'da belirlenir; `typeof` ve `===` ile sürprizlerden kaçın.
  - **Prototype-based**: nesne doğrudan başka nesneden kalıtım alır; `class` sadece prototip üzerine syntactic sugar (sözdizimi şekeri).
  - **Single-threaded event loop**: tek thread; asenkron işler runtime'ın event loop'una devredilir.
  - **First-class functions**: fonksiyon değişkene atanır, argüman geçilir, döndürülür.
  - **Interpreted/JIT-compiled**: motor kodu just-in-time makine koduna derler.
- Yazım kuralları: `const`/`let` kullan, `var`'dan kaçın; ekipte noktalı virgül koy (ASI, automatic semicolon insertion tuzakları); `==` yerine `===`; yorum `//` ve `/* */`, "ne" değil "neden" yaz; kodu fonksiyon/modüllere grupla.

```js
const total = 42;
const Total = 7;
console.log(total, Total); // 42 7
const whereAmI = typeof window !== "undefined" ? "browser" : "Node.js";
console.log(whereAmI);     // tarayıcıda "browser", Node'da "Node.js"
```

Dikkat: `window` sadece tarayıcıda vardır; ortam tespiti `typeof window` ile yapılır. Demo `00_fundamentals.js` bilgileri `Object.entries(obj).forEach(([key, value]) => ...)` ile gezip `console.group` / `console.groupEnd` içinde basar, `console.info` ile ipucu verir; `latestSpec` gerçek spesifikasyon değil, `new Date().getFullYear()` yani o anki yıldır.

## 2.1 JavaScript'i HTML içinde kullanmak
Kaynak: `W2/topics/01_Using_JS_in_HTML.html`

Tarayıcıda JS'i sayfaya `<script>` etiketiyle bağlarız. Kodun nerede durduğu, ne zaman çalışacağını belirler.

- **Inline script**: `<script>...</script>` arasında; tarayıcı HTML'i parse ederken o satıra gelince hemen çalışır.
- **External script**: `<script src="dosya.js">`. `defer` eklenirse dosya HTML parse bitince, DOM hazırken çalışır.
- **Inline event handler**: `onclick="..."` gibi attribute'lar; çalışır ama yapı ile davranışı karıştırır. Tercih: `addEventListener` (separation of concerns, sorumlulukların ayrılması).
- `<script type="module">`: ES modüllerini (`import`/`export`) açar.
- Yerleşim: engelleyen (blocking) script'leri `<body>` sonuna koy ya da `<head>` içinde `defer` kullan. `<head>`'de inline script sadece kritik ayar veya feature detection (özellik tespiti) için.

```html
<head>
  <script src="app.js" defer></script>  <!-- DOM hazır olunca çalışır -->
</head>
<button id="btn">Tıkla</button>
<!-- app.js: document.getElementById("btn").addEventListener("click", () => alert("Hi")); -->
```

Dikkat: `defer` olmadan `<head>`'deki script, henüz oluşmamış elemanı bulamaz (`null`). Demo `01_using_js_in_html.js` `button?.addEventListener` ile optional chaining kullanır ve her tıkta `highlighted = !highlighted` ile rengi değiştirir. (Materyalde `<head>`'deki inline örneğin açılış etiketi `<script>` yerine `<p>` yazılmış; bu yüzden "Hello from inline JavaScript!" konsola düşmez, kod metni sayfanın üstünde düz paragraf olarak görünür. Doğrusu `<script>console.log(...)</script>`.)

## 2.2 JavaScript'i tek başına çalıştırmak
Kaynak: `W2/topics/02_Running_JS_Standalone.html`

JS sadece tarayıcıya bağlı değildir: Node.js, Deno ve Bun ile komut satırında da çalışır. Bu, otomasyon, prototipleme, unit test ve build araçları için idealdir.

- Node ile: nodejs.org'dan kur, terminali aç, `node 02_standalone.js` (proje kökündeysen `node topics/02_standalone.js`).
- Tarayıcı konsolu: DevTools'u aç (macOS'ta Option+Cmd+I, Windows'ta F12), snippet'i yapıştır.
- Chrome, güvenlik için konsola yapıştırmayı engeller; oturumda bir kez `allow pasting` yazıp Enter'a bas.
- Node'da ES modules: `package.json` içinde `"type": "module"` ya da `.mjs` uzantısı. CommonJS ise `require` kullanır.
- `02_standalone.js` aynı dosyayı iki ortamda çalıştırır: bir IIFE içinde `typeof window === "undefined"` ise Node'dayız, konsola yazar; değilse DOM'a `<section>` ekler (metin sabit olduğu için tarayıcıda da "Hello from Node.js! (executed in the browser)" yazar).

```js
const sum = (a, b) => a + b;
if (typeof window === "undefined") {
  console.log(`Sum (2 + 3): ${sum(2, 3)}`); // Sum (2 + 3): 5
}
```

Dikkat: `alert` ve `document` Node'da yoktur; `process` tarayıcıda yoktur.

## 2.3 Değişkenler ve sabitler
Kaynak: `W2/topics/03_Variables_and_Constants.html`

Değişken, bir değere verilen isimdir. Modern JS'te `let` ve `const` block-scoped (blok kapsamlı) çalışır; `var` function-scoped (fonksiyon kapsamlı) olup eski kod uyumluluğu için durur.

- **`let`**: block-scoped, yeniden atanabilir, aynı scope'ta yeniden bildirilemez.
- **`const`**: block-scoped, binding (bağ) kilitlidir, yeniden atanamaz (`TypeError: Assignment to constant variable`). Ama nesne/dizi içeriği değişebilir: `person.age = 26`, `numbers.push(4)` serbest.
- **`var`**: function-scoped, hoist edilir, yeniden bildirilebilir. `if` bloğunda tanımlanan `var` fonksiyonun her yerinden görünür.
- **Hoisting (yukarı taşınma)**: bildirimler scope'un başına taşınır. `var` taşınır ve `undefined` ile başlatılır; bu yüzden tanımdan önce okununca `undefined` verir.
- **TDZ, temporal dead zone (geçici ölü bölge)**: `let`/`const` da hoist edilir ama başlatılmaz; bildirim satırına kadar erişim `ReferenceError` atar. `typeof` bile kurtarmaz. (Materyalde "let ... are not hoisted" yazıyor; doğrusu: hoist edilir ama initialize edilmez, TDZ bundan doğar.)
- **Global scope**: en dışta tanımlanan `let`/`const`/`var` script'in her yerinden erişilir.
- Strict mode (modüllerde varsayılan) kazara global değişken oluşmasını engeller. Her zaman kullanmadan önce bildir.
- İyi pratik: varsayılan `const`, sadece yeniden atama gerekiyorsa `let`, `var` yok. İsimler camelCase ve anlamlı (`userCount`, `x` değil), sabitler `MAX_USERS`, değişkeni kullanıldığı yere yakın tanımla.

| Keyword | Scope | Yeniden atanır? | Yeniden bildirilir? |
|---|---|---|---|
| `let` | Block | Evet | Hayır |
| `const` | Block | Hayır | Hayır |
| `var` | Function | Evet | Evet |

```js
console.log(a);  // undefined (var hoist + undefined)
var a = 1;
if (true) { let b = 2; var c = 3; }
console.log(c);  // 3 (var bloğu dinlemez)
// console.log(b); // ReferenceError
// console.log(d); let d = 4; // ReferenceError (TDZ)
const arr = [1]; arr.push(2); // [1, 2], içerik değişebilir
```

Dikkat: `const` "değer sabit" değil "bağ sabit" demektir. TDZ'de `typeof myVar` (var) `"undefined"` döner ama `typeof myLet` `ReferenceError` atar. Demo `03_variables_constants.js`: bloktaki `var legacy` dıştakini **ezer** (bloktan sonra da yeni değer), bloktaki `let modern` dıştakini sadece **gölgeler** (shadowing; bloktan çıkınca eski değer döner). Demodaki "global" etiketli değişkenler aslında click handler fonksiyonunun içindedir.

## 2.4 Veri tipleri
Kaynak: `W2/topics/04_Data_Types.html`

JS'te 7 primitive (ilkel) tip ve bir de reference (referans) tipler ailesi vardır. Ayrım önemlidir çünkü kopyalama davranışı farklıdır.

- **Primitive**: immutable (değiştirilemez), by value kopyalanır.
  - `string`: tek tırnak, çift tırnak veya backtick; backtick template literal'dır: `` `Hello ${name}` ``.
  - `number`: tam sayı ve ondalık tek tip (double-precision floating point). `1.23e4` = 12300, `Infinity`, `NaN` de number.
  - `boolean`: `true` / `false`.
  - `null`: bilinçli "boş/yok" değeri.
  - `undefined`: bildirilmiş ama atanmamış değişken; olmayan property de `undefined` döner.
  - `symbol`: benzersiz kimlik; `Symbol('id') === Symbol('id')` → `false`.
  - `bigint`: keyfi büyüklükte tam sayı; sona `n` (`123n`) ya da `BigInt(...)`.
- **Reference**: object, array, function, Date (ayrıca Map, Set). Mutable; kopyalanan şey referanstır, birinden yapılan değişiklik hepsine yansır.
- **Implicit coercion (örtük tip dönüşümü)**: `"5" + 3` → `"53"`, `"5" - 3` → `2`, `true + 1` → `2`, `"" + 0` → `"0"`.
- **Explicit coercion (açık dönüşüm)**: `Number("123")` 123, `String(456)` "456", `Boolean(1)` true, `parseInt("123px")` 123, `parseFloat("3.14")` 3.14. Gerektiğinde JSON serileştirme ve BigInt.
- **Tip kontrolü**: `typeof` çoğu tipi verir ama `typeof null` → `"object"` (tarihî hata), `typeof []` → `"object"`, `typeof function(){}` → `"function"`. Dizi için `Array.isArray([])`, nesne sınıfı için `value instanceof Date`, kesin etiket için `Object.prototype.toString.call([])` → `"[object Array]"`.

```js
let a = 5; let b = a; b = 9;
console.log(a);            // 5 (primitive, değer kopyası)
let o = { n: 1 }; let p = o; p.n = 2;
console.log(o.n);          // 2 (reference, aynı nesne)
console.log(typeof null, Array.isArray([])); // object true
```

Dikkat: `typeof null === "object"` ve `typeof [] === "object"`; diziyi `Array.isArray`, null'ı `value === null` ile ayırt et. Demo `04_data_types.js` girilen değeri `json` (`JSON.parse`), `string` veya `auto` (`eval`, dikkatli kullan) modunda çözüp typeof, Array?, Null?, Constructor raporlar; `0`, `""`, `false`, `NaN` için Constructor `N/A` çıkar çünkü `value && value.constructor` falsy'de kısa devre yapar. (Materyalde `instanceof Date;` sol tarafı olmadan yazılmış, geçersiz; doğrusu `value instanceof Date`.)

### Sınıf alıştırması
Kaynak: `W2/topics/deneme.html`, `W2/topics/first.js`

Derste yazılan küçük deneme: `deneme.html` önce external `first.js`'i yükler, sonra inline script çalıştırır.

- `var x = "zeki"; var x = 15;` geçerlidir (var yeniden bildirilebilir). `let sayi` ise ikinci kez bildirilemez ama `sayi = "Uğur"` ile tipi bile değişebilir (dynamic typing).
- `const pi = 3.14; pi = 9.8;` hata verir (yorum satırında bırakılmış).
- Bildirim ile atama ayrı olabilir: `let sayi2; sayi2 = 45;`.
- `first.js` her primitive ve reference tipten birer örnek tanımlar, sonra `while` ile diziyi `shift()` ederek (baştan çıkararak) boşaltır.

```js
let numbers = [10, 20, 30];
let devam = true;
while (devam) {
  console.log(numbers.shift()); // 10, 20, 30
  if (numbers.length === 0) devam = false;
}
```

Dikkat: Log metni "Popped number" diyor ama `shift()` baştan çıkarır; `pop()` sondan çıkarır.

## 2.5 Operatörler ve ifadeler
Kaynak: `W2/topics/05_Operators_and_Expressions.html`

Operatör, değerler üzerinde işlem yapıp yeni bir değer üreten semboldür; operatörlerle kurulmuş her parça bir expression (ifade) olur.

- **Aritmetik**: `+ - * / % **` (`%` kalan, `**` üs: `10 ** 3` = 1000). `+` string'le karşılaşırsa birleştirir: `"5" + 3` ve `5 + "3"` → `"53"`; `-` ise sayıya çevirir: `"5" - 3` → 2.
- **Karşılaştırma**: strict `===` / `!==` tip dönüşümü yapmaz (`5 === "5"` false); loose `==` / `!=` yapar (`5 == "5"` true), kaçın. Ayrıca `> < >= <=`.
- Özel durumlar: `NaN === NaN` false (kontrol için `isNaN`), `null === undefined` false, `null == undefined` true.
- **Mantıksal**: `&&` ilk falsy değerde, `||` ilk truthy değerde durur (short-circuit, kısa devre) ve o değeri döndürür; `!` tersler.
- **`??` nullish coalescing**: sadece `null`/`undefined` ise sağ tarafı verir. `||` ise tüm falsy değerlerde (0, "") devreye girer.
- **Atama**: `= += -= *= /= %= **=`. Artırma/azaltma: `x++` önce eski değeri döndürür sonra artırır (post), `++x` önce artırır sonra döndürür (pre).
- **Özel**: ternary `koşul ? a : b` (iç içe zincir okunurluğu bozar), `typeof`, `instanceof` (`date instanceof Date` ve `instanceof Object` ikisi de true), `in` (`"name" in person`).
- **Öncelik (precedence)**, yüksekten düşüğe: `() [] .` → `! typeof ++ --` → `* / %` → `+ -` → `< > <= >=` → `=== !==` → `&&` → `||` → `?:` → `= += ...`. Emin değilsen parantez kullan. Atama sağdan sola: `a = b = 5` ikisini de 5 yapar. (Materyalin listesinde `**`, `??`, `==`/`!=` yok: `**` tekli operatörlerle `* / %` arasındadır (çarpmadan önce yapılır), `==`/`!=` `===` ile aynı seviyededir, `??` `||` seviyesindedir ve `&&`/`||` ile parantezsiz karıştırılamaz.)

```js
console.log(2 + 3 * 4);              // 14
console.log(true || false && false); // true (&& önce)
let c = 0;
console.log(c++, c, ++c);            // 0 1 2
console.log(0 || 5, 0 ?? 5);         // 5 0
```

Dikkat: `||` 0 ve `""` gibi geçerli değerleri de ezer; varsayılan değer için `??` kullan. `NaN` kendine eşit değildir. `&&`/`||` boolean değil operand döndürür: demo `05_operators.js` 12 ve 5 ile `12 && 5` → 5, `12 || 5` → 12, `12 ** 5` → 248832, `12 % 5` → 2 verir; `Number(input.value)` hiç null/undefined üretmediği için demodaki `??` asla "default"a düşmez.

## 2.6 Kontrol akışı: koşullar
Kaynak: `W2/topics/06_Control_Flow.html`

Control flow (kontrol akışı), komutların hangi sırayla çalışacağını belirler; koşullu ifadeler programın karar vermesini sağlar.

- **`if / else if / else`**: karmaşık, aralık içeren boolean koşullar için (`score = 85` → "Grade: B"; `temperature = 25` → "Warm weather").
- İç içe `if` yerine **guard clause** (erken çıkış, early return): olumsuz durumları başta `return` ile ele, ana yol düz kalsın.
- **`switch`**: aynı değeri birçok sabitle karşılaştırırken (gün, rol, not). Strict (`===`) karşılaştırır. Her `case` sonunda `break`; birden çok `case` alt alta yazılarak gruplanır (fall-through), `default` hiçbiri tutmazsa çalışır.
- **Ternary**: basit tek satırlık atamalar için; çok koşullu mantıkta `if/else` daha okunur.
- **Falsy değerler**: `false, 0, -0, 0n, "", null, undefined, NaN`. Gerisi truthy: `"0"`, `"false"`, `[]`, `{}` dahil.
- Pratik: feature flag, kullanıcı rolü, doğrulama. Karmaşık dallanmadan önce flowchart çiz.

```js
function canDrive(user) {
  if (user.age < 18) return "Too young";
  if (!user.hasLicense) return "Need a license";
  return "You can drive";
}
console.log(canDrive({ age: 25, hasLicense: true })); // You can drive
console.log(Boolean([]), Boolean("0"));              // true true
```

Dikkat: `if (count)` 0 için false olur; sayı için `count > 0` yaz, varlık için `value !== undefined && value !== null` ya da `??`. `break` unutulursa sonraki `case`'e düşer; `case` içinde `return` varsa `break` gerekmez (demo `06_control_flow.js` hava durumuna göre kıyafeti `if/else`, aktiviteyi `switch` + `return` ile seçer). Teaching Notes'taki falsy listesi `-0` ve `0n`'ı atlıyor; tam liste 8 değerdir.

## 2.7 Döngüler ve yineleme
Kaynak: `W2/topics/07_Loops_and_Iteration.html`

Döngü, bir kod parçasını tekrar tekrar çalıştırır. Tekrar sayısı biliniyor mu, neyin üzerinde dönülüyor; döngü seçimini bu belirler.

- **`for`**: tekrar sayısı biliniyorsa. Diziyi baştan/sondan (`i--`) gezme, adım atlama (`i += 2`), iç içe döngü (2D matris, çarpım tablosu).
- **`while`**: koşul değişene kadar. **`do...while`**: gövde en az bir kez çalışır, koşul sonda.
- **Infinite loop (sonsuz döngü)**: sayacı artırmayı unutma; ya da `while (true)` içinde `break` ile çık.
- **`for...of`**: iterable'ın **değerlerini** gezer: dizi, string, Set, Map. İndeks de lazımsa `arr.entries()` ile `[index, value]`.
- **`for...in`**: nesnenin **key'lerini** gezer. Dizide kullanma (key'ler string indeks gelir). Nesnelerde `Object.keys / values / entries` + `for...of` tercih edilir.
- **Array metotları** (deklaratif): `forEach`, `map`, `filter`, `reduce`, `find`, `some`, `every` (detay 2.9). Zincirlenebilir.
- **Kontrol**: `break` döngüden çıkar, `continue` o turu atlar, **label** (etiket) ile dış döngü kırılır: `break outerLoop`.

```js
const p = { name: "John", age: 30 };
for (const k in p) console.log(k);                 // name, age
for (const v of ["a", "b"]) console.log(v);        // a, b
outer: for (let i = 0; i < 3; i++)
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outer;
    console.log(i, j);                             // 0 0, 0 1, 0 2, 1 0
  }
```

Dikkat: "for...of değer, for...in key" ayrımı sık sorulur. `do...while` koşul yanlış olsa bile bir kez çalışır. `new Set([1, 2, 2, 3])` for...of ile 1, 2, 3 verir (tekrar atılır); Map'te `for (const [k, v] of map)`. Demo `07_loops.js` aynı listeyi for...of, Map, while, do...while (3, 2, 1 geri sayım) ve forEach ile yazdırır.

## 2.8 Fonksiyonlar ve arrow function'lar
Kaynak: `W2/topics/08_Functions_and_Arrow_Functions.html`

Fonksiyon, parametre alıp çağrılabilen yeniden kullanılabilir kod bloğudur. JS'te birden çok tanım şekli var ve her birinin hoisting ile `this` davranışı farklıdır.

- **Function declaration**: `function greet(name) {...}`. Hoist edilir, tanımdan önce çağrılabilir.
- **Default parameter**: `function f(name = "World")`.
- **Rest parameter**: `function sum(...numbers)` tüm argümanları diziye toplar.
- **Destructuring parameter**: `function show({ name, age })`; varsayılanlarla: `function f(name, { age = 18, city = "Unknown" } = {})`.
- **Function expression**: `const multiply = function(a, b) {...}`. Hoist edilmez. Named function expression (`function fact(n)`) kendi içinden recursion yapabilir. Nesne metodu olarak veya koşula göre fonksiyon seçmek için kullanılır.
- **IIFE** (Immediately Invoked Function Expression, hemen çağrılan fonksiyon): `(function(){...})();` Kendi scope'unu açar; module pattern ile private değişken saklar.
- **Arrow function**: `(a, b) => a + b`. Tek parametrede parantez opsiyonel (`x => x * x`), parametresizde `() =>`. Tek ifade gövdesi otomatik return eder; süslü parantezli gövdede `return` şart.
- Arrow farkları: kendi `this`'i yoktur (dış scope'tan alır), kendi `arguments` nesnesi yoktur. Callback'ler (`map`, `filter`, `addEventListener`, `setTimeout`) için ideal; **nesne metodu için kullanma**.
- **Higher-order function**: fonksiyon alan veya döndüren fonksiyon (`createMultiplier(2)`).
- **Closure (kapanış)**: iç fonksiyon, dış fonksiyon bittikten sonra da onun değişkenlerini hatırlar (`createCounter`).
- **Pure function (saf fonksiyon)**: aynı girdi, aynı çıktı, side effect (yan etki) yok. Dış değişkeni değiştiren fonksiyon impure'dur.
- **Composition (bileşim)**: `square(multiplyByTwo(addOne(3)))` = 64; genel hali `compose(...fns)` `reduceRight` ile sağdan sola uygular.
- Büyük fonksiyonu küçük yardımcı fonksiyonlara böl. Demo `08_functions.js` üç stili birlikte kullanır (`calculateTax` declaration, `formatCurrency` expression, `buildResultMessage` arrow): 10000 gelir, %18 → vergi 1800.

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}
const counter = createCounter();
console.log(counter(), counter()); // 1 2
const obj = { name: "X", f() { return this.name; }, g: () => this?.name };
console.log(obj.f());              // "X"; obj.g() obj'yi görmez
```

Dikkat: Function expression ve arrow hoist edilmez, tanımdan önce çağırmak hata verir. (Materyalde `obj.arrowFunction()` için `undefined` yazıyor; aslında sonuç ortama bağlı: tarayıcı script'inde boş string, ES module'de `TypeError`. Kesin olan: arrow'un `this`'i `obj` değildir. Ayrıca `arrowFunc(1, 2, 3); // Error` denmiş ama `arguments` satırı yorumda olduğu için hata atmaz; satır açılsaydı `arguments` tanımsız olurdu.)

## 2.9 Diziler ve iterasyon metotları
Kaynak: `W2/topics/09_Arrays_and_Iteration_Methods.html`

Array (dizi), her tipten değeri tutabilen, sıfırdan indekslenen, mutable sıralı koleksiyondur. Hangi metodun diziyi değiştirdiğini (mutate) bilmek en önemli noktadır.

- **Oluşturma**: literal `[1, 2]`; `new Array(3)` 3 **boş** slot, `new Array(1, 2, 3)` [1,2,3]; `Array.of(3)` → [3]; `Array.from("hello")` → harfler, `Array.from({ length: 5 }, (_, i) => i * 2)` → [0,2,4,6,8].
- **Erişim**: `arr[0]`, son eleman `arr[arr.length - 1]`; atama ile değiştir; `length` küçültülürse dizi kesilir. `includes` true/false, `indexOf` indeks ya da -1.
- **Destructuring**: `const [a, , c] = arr` (atla), `[head, ...tail]` (rest), `[x, y, z = 10] = [1, 2]` (default), `[a, b] = [b, a]` (swap).
- **Değiştiren (mutating)**: `push` sona ekler, `unshift` başa ekler, `pop` sondan çıkarır, `shift` baştan çıkarır, `splice(start, silSayısı, ...ekle)` silinenleri döndürür, `sort` ve `reverse` yerinde çalışır.
- **Kopya döndüren**: `slice(start, end)` (end hariç), `concat`, spread `[...a, ...b]`, `map`, `filter`. `[...arr]` klon; `klon === arr` false. `[...arr].reverse()` orijinali korur.
- **Spread vs rest**: aynı `...`; spread açar (`[...arr]`, birleştirme), rest toplar (`function f(...args)`, `[first, ...rest]`).
- **Iterasyon**: `forEach` (döndürmez), `map` (dönüştürür), `filter` (seçer), `reduce((acc, x) => ..., başlangıç)` (tek değere indirger), `find` (ilk eşleşen eleman), `some` (en az biri), `every` (hepsi).
- **Zincirleme**: `.filter(...).map(...).sort()`.
- **İleri**: `sort()` varsayılan string sıralar; sayı için `sort((a, b) => a - b)` artan, `b - a` azalan. `flat()` bir seviye, `flat(2)` iki seviye düzleştirir; `flatMap` = map + flat.
- **Arama**: `indexOf` ilk, `lastIndexOf` son konum; `findIndex` koşulu sağlayan ilk indeks; `Array.isArray`.

```js
const n = [10, 5, 40, 1];
console.log([...n].sort());                 // [1, 10, 40, 5] (string sırası)
console.log(n.sort((a, b) => a - b));       // [1, 5, 10, 40]
const total = n.reduce((acc, x) => acc + x, 0); // 56
const [first, ...rest] = n;                 // 1, [5, 10, 40]
console.log(n.splice(1, 1), n);             // [5] [1, 10, 40]
```

Dikkat: `slice` kopya, `splice` mutasyon; karıştırma. `reduce`'a başlangıç değeri ver. Demo `09_arrays.js` "şarkı,dakika" satırlarını `split` + `filter(Boolean)` + `map` + destructuring ile işler; varsayılan veriyle `totalSongs: 3`, `totalDurationMinutes: 15`, `hasLongSongs: true`. (Materyalde 19 yaş üstü ortalaması `87.5` yazıyor; doğrusu (85 + 78 + 96) / 3 = 86.33. Aynı örnek blokta `let a` iki kez bildirildiği için birlikte çalıştırılırsa `SyntaxError` verir.)

## 2.10 ES6 modülleri ve import
Kaynak: `W2/topics/10_Modules_and_Imports.html`

Module (modül), kodu dosyalara bölüp sadece gerekeni dışarı açmanın standart yoludur: encapsulation (kapsülleme), bağımlılık yönetimi ve bundler'larda tree shaking sağlar.

- Modül özellikleri: otomatik strict mode; kendi scope'u var (değişkenler global'e, `window`'a sızmaz, `var` bile); **sadece bir kez çalışır**, sonraki import'lar cache'lenmiş örneği kullanır; sadece export edilen dışarıdan görünür.
- **Named export**: `export const PI`, `export function add`, ya da sonda `export { a, b }`. Import süslü parantezle ve aynı isimle: `import { PI, add } from './math.js'`.
- Yeniden adlandırma: `import { square as sq }`. Hepsini nesne olarak: `import * as MathUtils from './math.js'`.
- **Default export**: modül başına tek; `export default Calculator`. Import süslüsüz ve istenen isimle: `import Calc from './calculator.js'`.
- Karışık: `import logger, { VERSION, formatDate } from './utils.js'` (default önce).
- **Re-export (aggregating)**: `export { add } from './basic.js'`, `export { add as plus } from ...`, `export * from ...` (default hariç), `export { default as Calculator } from ...`, `export { X as default } from ...`.
- Tarayıcıda yerel dosyayı **göreli yol** (`./`, `../`) ve `.js` uzantısıyla import et; `<script type="module">` gerekir ve sayfa HTTP sunucusundan açılmalı (`file://` değil).
- Kalıplar: config modülü (default nesne), utility modülü (birden çok named fonksiyon), data modülü (dışarı kopya veren `getUsers() { return [...users] }`), class-based modül (`ApiClient` default export).
- **Dynamic import**: `await import('./x.js')` bir Promise döndürür; code splitting ve koşullu yükleme için. Default export'a `module.default` ile erişilir.
- **Tree shaking**: bundler (Vite, Webpack) kullanılmayan export'ları pakete koymaz. Sadece yan etki için import: `import './side-effects.js'`. Node ESM ve bundler'lar tarayıcının yerel modül sistemiyle uyumludur.
- Best practice: tek sorumluluk; her şeyi tek `utils.js`'e yığma, odaklı dosyalara böl.

```js
// math.js
export const PI = 3.14;
export default function area(r) { return PI * r * r; }
// main.js
import area, { PI as P } from "./math.js";
console.log(P, area(1)); // 3.14 3.14
```

Dikkat: default import'ta süslü parantez yok, named'de var ve isim birebir aynı olmalı. Demo `10_module_main.js`, `10_math_utils.js`'ten default mesajı ve `compoundInterest`, `formatCurrency` (Intl.NumberFormat) fonksiyonlarını alır; 10000, %15, 3 yıl için ham sonuç 15208.749999999998 (floating point), ekranda `$15,208.75`. (Materyalde regex `/\\s+/g` görünüyor, doğrusu `/\s+/g`; `import * as Math` global `Math`'i gölgeler; `export { Calculator as default }` named `Calculator` export'u olmayan dosyada hata verir; config örneğindeki `process.env` tarayıcıda yoktur.)

## Hafta 2 özeti
- JS: 1995, Brendan Eich, Netscape; standart ECMAScript (TC39); ES6 = 2015 (class, module, arrow, promise).
- Dil: case sensitive, dynamic typing, prototype-based, single-threaded event loop, first-class functions, JIT.
- `<script>`: inline hemen çalışır; external + `defer` DOM hazır olunca; `type="module"` import/export açar; `addEventListener` > `onclick`. Node'da `node dosya.js`, ortam tespiti `typeof window`.
- `let` block + atanır, `const` block + atanamaz (içerik değişebilir), `var` function + redeclare + `undefined` hoisting; `let`/`const` için TDZ.
- 7 primitive: string, number, boolean, null, undefined, symbol, bigint; primitive by value, object by reference. `typeof null` ve `typeof []` → "object"; dizi için `Array.isArray`.
- `"5" + 3` = "53", `"5" - 3` = 2; `===` kullan; `NaN !== NaN`; `null == undefined` true ama `===` false.
- `||` falsy'de, `??` sadece null/undefined'da devreye girer; falsy: false, 0, -0, 0n, "", null, undefined, NaN.
- `switch` `===` ile karşılaştırır, `break` yoksa fall-through; guard clause ile iç içe if azalt.
- `for...of` değer, `for...in` key; `break`, `continue`, label.
- Declaration hoist edilir, expression/arrow edilmez; arrow'da kendi `this` ve `arguments` yok; closure dış değişkeni hatırlar.
- Mutating: push, pop, shift, unshift, splice, sort, reverse; kopya: slice, concat, spread, map, filter; sayı sıralamada `(a, b) => a - b`.
- Modül: tek default, çok named; default süslüsüz, named süslülü; modül bir kez çalışır ve cache'lenir; dynamic `import()` Promise döner.

---

# Hafta 3: React (web)

## 3.1 React Temelleri
Kaynak: `W3/00-React-Fundamentals.md`

React, kullanıcı arayüzü (UI) kurmak için bir JavaScript **kütüphanesidir** (library, framework değil). Facebook yazdı, bugün Meta ve topluluk geliştiriyor. Ana fikir: ekranı küçük, yeniden kullanılabilir parçalara, yani **component**'lere bölmek.

**Üç temel özellik:**
- **Declarative (bildirimsel):** "Şu state'te ekran böyle görünsün" diye tarif edersin; veri değişince React hangi component'in yeniden çizileceğini kendisi bulur. DOM'u adım adım sen değiştirmezsin.
- **Component-Based:** Kendi state'ini yöneten kapsüllenmiş (encapsulated) parçalar yazılır, bunlar birleştirilerek (compose) büyük UI kurulur.
- **Learn Once, Write Anywhere:** Materyalin tanımı: mevcut kodu yeniden yazmadan React ile yeni özellik eklenebilir. Sloganın yaygın anlamı ise aynı bilgiyle web, sunucu ve React Native ile mobil yazabilmektir.

**Neden React?**
- **Virtual DOM (sanal DOM):** React, gerçek DOM'un bellekte hafif bir kopyasını tutar; değişiklikte yeni kopyayı eskisiyle karşılaştırır ve gerçek DOM'a yalnız farkı uygular. Doğrudan DOM manipülasyonu azaldığı için hızlıdır.
- **Component Reusability:** bir kez yaz, her yerde kullan.
- **Unidirectional Data Flow (tek yönlü veri akışı):** veri parent'tan child'a akar; izlemek ve debug etmek kolaydır.
- Zengin ekosistem, iyi geliştirici araçları, **React Native** ile mobil.
- Ne zaman: SPA (single-page application, tek sayfalık uygulama), yeniden kullanılabilir UI, sık veri güncellenen etkileşimli ekranlar, büyüyecek projeler.

**İsimlendirme kuralları (naming conventions):**

| Ne | Kural | Örnek |
|---|---|---|
| Component (function veya class) | PascalCase, büyük harfle başlar | `UserProfile` (`userProfile` yanlış) |
| Component dosyası | PascalCase | `UserProfile.jsx` / `.js` / `.tsx` |
| Hook dosyası | `use` ile başlar | `useUserData.js` |
| Utility dosyası | camelCase | `formatDate.js`, `apiClient.js` |
| Değişken, fonksiyon | camelCase | `isLoggedIn`, `handleClick` |
| Component atanan değişken | PascalCase | `const UserCard = () => {}` |
| Sabit (constant) | UPPER_CASE | `API_BASE_URL`, `MAX_RETRY_ATTEMPTS` |

Büyük harf neden şart: JSX küçük harfli etiketi (`<userProfile />`) HTML etiketi sanar, component'i çağırmaz.

**Function component içinde sıralama:** 1) import'lar, 2) component tanımı, 3) Hook'lar, 4) event handler'lar, 5) `return` (render), 6) `propTypes`, 7) `defaultProps`, 8) `export default`.

```jsx
function UserCard({ user, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);       // Hook
  const handleEdit = () => { setIsEditing(true); onEdit(user.id); }; // handler
  return <button onClick={handleEdit}>{user.name}</button>; // render
}
export default UserCard;
```

**Araçlar ve kalıplar:**
- **React Developer Tools** (Chrome/Firefox eklentisi): component ağacı, props ve state inceleme, **Profiler** (performans), Hook'ları debug etme.
- **Container / Presentational:** container mantığı yapar (veri çeker, state tutar), presentational sadece gelen props'u çizer.
- **HOC (Higher-Order Component, üst düzey component):** component alıp yeni component döndüren fonksiyon. Örn. `withLoading(UserList)` önce `isLoading`'e bakar, değilse asıl component'i `{...props}` ile çizer.
- Best practices: component'leri küçük ve tek işli tut, açıklayıcı isim ver (`UserProfileCard`, `handleSubmitForm`), sabitleri dışarı çıkar (`API_ENDPOINTS`), tip kontrolü için PropTypes veya TypeScript kullan.
- Sık hatalar: state'i doğrudan değiştirmek (`users.push(x)` yerine `setUsers([...users, x])`), index'i key yapmak, loading durumunu unutmak (veri gelene kadar "Loading..." göster, `.finally(() => setLoading(false))`).

**Proje yapısı (project structure):**
- Kök: `package.json` (bağımlılıklar, script'ler, metadata), `package-lock.json` / `yarn.lock` (sürümleri kilitler), `node_modules/` (paketler, git'e girmez), `public/` (statik dosyalar; CRA'da `index.html` burada), `src/` (tüm uygulama kodu).
- `src/` içi: `index.js` (CRA) veya `main.jsx` (Vite) giriş noktasıdır ve `createRoot` çağrısını içerir; `App.js` ana component; `App.css`, `index.css` global stiller. İsteğe bağlı klasörler: `components/` (tekrar kullanılan UI), `pages/` veya `views/` (route sayfaları), `hooks/` (custom hook'lar), `context/` (Context API provider'ları), `assets/` (resim, ikon), `utils/` (yardımcı fonksiyon, sabit), `styles/`, `__tests__/` (Jest, React Testing Library).
- Dosya türleri: `.jsx` (JSX içeren component), `.js` (düz JS), `.tsx` / `.ts` (TypeScript), `.css`, `.module.css` (**CSS Modules**, stil sadece o component'e kapsamlı), `.scss` (Sass, değişken destekli).
- **Next.js** (13+): `app/` klasörü (App Router; `page.js` sayfa, `layout.js` kök düzen), eski `pages/` Router. **Remix:** `app/routes/` ile dosya tabanlı routing.
- Düzenleme stratejileri: **feature-based** (`features/auth/`, `features/dashboard/` gibi özelliğe göre) veya **type-based** (`components/`, `hooks/`, `utils/` gibi türe göre). Tek doğru yok; benzerleri bir arada tut, isimlendirmede tutarlı ol, basit başla.
- **Barrel export:** `components/index.js` içinde `export { default as Header } from './Header/Header';` yazılır, kullanımda `import { Header, Button } from './components';` olur.

> **Dikkat:** Materyaldeki ağaç `public/index.html` + `App.js` (CRA) ile `main.jsx` (Vite) yapısını karıştırıyor; Vite'ta `index.html` proje kökündedir. PropTypes'ı "önerilir" diye anlatıyor, oysa React 19 PropTypes kontrolünü kaldırdı, TypeScript önerilir. Örnekte `isRequired` prop'a `defaultProps` verilmiş; zorunlu prop'a varsayılan değer anlamsızdır.

## 3.2 React için JavaScript Temelleri
Kaynak: `W3/00-javascript-basics.md`

React yazmak aslında modern JavaScript yazmaktır; aşağıdakiler React kodunun her satırında karşına çıkar.

- **Değişkenler:** `var` fonksiyon kapsamlı (function-scoped), kullanma. `let` blok kapsamlı (block-scoped), yeniden atanabilir. `const` blok kapsamlı, yeniden atanamaz. Kural: varsayılan `const`, gerekirse `let`.
- **Veri tipleri:** primitive'ler `string`, `number`, `boolean`, `undefined`, `null`, `Symbol` (ES6), `BigInt` (ES2020, sonu `n`); karmaşık tip `object` (dizi de özel bir object'tir).
- **Fonksiyonlar:** declaration (`function greet(){}`), expression (`const g = function(){}`), **arrow function** (`const g = (n) => {...}`, React'te tercih edilir), tek ifadede implicit return (`(n) => \`Hi ${n}\``).
- **Template literal:** backtick içinde `${ifade}`; `'a ' + b` birleştirmesinin yerine geçer. JSX'te `{\`Welcome, ${name}\`}` diye kullanılır.
- **Koşullar ve döngüler:** `if / else if / else`, ternary `kosul ? a : b`; `for`, `while`, `for...of` (dizi elemanları), `for...in` (object anahtarları).
- **Dizi metotları:** `map` (dönüştür, React'te liste çizmenin yolu), `filter` (süz), `reduce` (tek değere indir), `find` (ilk eşleşeni bul), `forEach` (her eleman için çalıştır, yeni dizi döndürmez).
- **Destructuring:** `const { name, age } = person;`, yeniden adlandırma `const { name: personName } = person;`.
- **Spread / rest (`...`):** spread açar (`[...a, ...b]`, `{...o1, ...o2}`), rest toplar (`function sum(...nums)`).
- **Modules:** named export `export const add = ...` ve `import { add } from './math.js'`; default export `export default multiply` ve `import multiply from './utils.js'` (süslü parantez yok, isim serbest).
- **Immutable güncelleme:** React state'i kopyalanarak güncellenir.

```js
const user = { name: 'Alice', age: 25 };
const older = { ...user, age: 26 };              // güncelle
const withMail = { ...user, email: 'a@x.com' };  // ekle
const { age, ...noAge } = user;                  // çıkar
const s2 = { ...s, user: { ...s.user, profile: { ...s.user.profile, theme: 'light' } } }; // iç içe
```

> **Dikkat:** spread **sığ kopya** (shallow copy) yapar; iç içe object'te her seviyeyi ayrı ayrı yaymak gerekir. `const { age, ...noAge } = user` içindeki `...` spread değil **rest**'tir: eşittirin solunda toplar, sağında açar. Aynı anahtarda sonraki kazanır: `{ ...user, age: 26 }` yaşı ezer, `{ age: 26, ...user }` ezmez. Default import'ta `{}` kullanılmaz, named import'ta kullanılır.

## 3.3 Kurulum (Setup and Installation)
Kaynak: `W3/00-setup-and-installation.md`

React kodu (JSX) tarayıcıda doğrudan çalışmaz; derleyen ve paketleyen bir araç zinciri gerekir. Bu araçları **Node.js** üzerinden kurarız.

- **Ön koşul:** Node.js (materyal "14 veya üstü" der; güncel araçlar 18/20+ ister) ve **npm** (Node ile gelir) ya da **yarn**. Kontrol: `node --version`, `npm --version`.
- **CRA (Create React App):** `npx create-react-app my-app` (önerilen, global kurulum yok), alternatif `npm install -g create-react-app` sonra `create-react-app my-app`, veya `yarn create react-app my-app`. Çalıştır: `cd my-app` ve `npm start`, adres `http://localhost:3000`. Production: `npm run build`, çıktı `build/` klasörü. Oluşan yapı: `public/index.html`, `src/App.js`, `App.css`, `App.test.js`, `index.js`, `index.css`.
- **Vite:** `npm install` sonra `npm run dev`, adres `http://localhost:5173`; build `npm run build` (çıktı `dist/`). Oluşturma komutu `npm create vite@latest my-react-app -- --template react`.
- **Next.js:** `npm run dev`, adres `http://localhost:3000`. Oluşturma `npx create-next-app@latest my-next-app`.
- **Manuel (CDN):** HTML'e `react`, `react-dom` ve `@babel/standalone` script'leri eklenir, kod `<script type="text/babel">` içine yazılır, `ReactDOM.createRoot(document.getElementById('root')).render(<App />)`. Sadece öğrenme için; yavaş, production'a uygun değil.
- **Önerilen araçlar:** VS Code, React Developer Tools, **ESLint** (linter, kod kalitesi hatalarını bulur), **Prettier** (formatter, kod biçimini tutarlı yapar).

| | Development (`npm start`) | Production (`npm run build`) |
|---|---|---|
| Amaç | geliştirirken hızlı geri bildirim | kullanıcıya hızlı yükleme |
| Özellik | Hot Reloading, source map, detaylı hata mesajı | minified kod, **tree shaking** (kullanılmayan kodu atar), optimize asset |
| Boyut / hız | büyük bundle, yavaş | küçük bundle, hızlı |

- **Environment variables (ortam değişkenleri):** `.env.local` (yerel), `.env.production` (prod). CRA'da ad `REACT_APP_` ile başlamalı, `process.env.REACT_APP_API_URL` ile okunur. Değerler hep **string** gelir: `process.env.REACT_APP_DEBUG === 'true'`.
- **Deployment (yayınlama):** static hosting (Netlify, Vercel, GitHub Pages, AWS S3 + CloudFront; SPA için önerilen), klasik sunucu (Apache `mod_rewrite`, Nginx `try_files`, IIS URL Rewrite; amaç client-side routing'i `index.html`'e yönlendirmek), container (Docker, Kubernetes).
- **Performans:** **code splitting** ile component'i ihtiyaç anında yükle: `const Lazy = lazy(() => import('./Lazy'))` ve `<Suspense fallback={<div>Loading...</div>}>`. Bundle boyutunu analiz için `webpack-bundle-analyzer`.
- **Sorun giderme:** port dolu ise `npx kill-port 3000` veya `PORT=3001 npm start`; module not found ise `npm cache clean --force`, `node_modules` ve `package-lock.json` silinip `npm install`; build hatası için `npm run build` çıktısında error ara, `npm run lint`.

```jsx
// src/App.js: ilk component
function App() {
  return <div className="App"><h1>Welcome to React!</h1></div>;
}
export default App;
```

> **Dikkat:** (Materyalde "CRA is the official tool" yazıyor, doğrusu: React ekibi CRA'yı Şubat 2025'te deprecated ilan etti; Vite veya Next.js gibi framework öneriliyor. Sınavda materyal sorulursa materyalin cevabı CRA'dır.) Materyalde Vite ve Next.js başlıkları ve oluşturma komutları eksik, yukarıdaki komutlar tamamlamadır. `REACT_APP_` kuralı sadece CRA içindir; Vite'ta `VITE_` ve `import.meta.env`, Next.js'te tarayıcıya açılacaklar `NEXT_PUBLIC_`. Materyal `npm start` için hem "sayfa otomatik yenilenir" hem "Hot Reloading, sayfa yenilemeden" diyor; ikisi de "kaydedince ekran güncellenir" demektir. CRA şablonunda `npm run lint` script'i yoktur.

## 3.4 Components
Kaynak: `W3/01-components.md`, `W3/01-components-class.jsx`, `W3/01-components-functional.jsx`

Component, UI'nin bağımsız ve yeniden kullanılabilir bir parçasıdır; her parçayı ayrı düşünmeni sağlar. İki türü vardır.

- **Function component:** JSX döndüren düz JavaScript fonksiyonu. React 16.8'de **Hooks** gelince state ve yan etkiyi de yönetebilir hale geldi.
- **Class component:** `React.Component`'i extend eden ES6 class; JSX'i zorunlu `render()` metodu döndürür, props `this.props` ile okunur. Hooks öncesinde state ve lifecycle için gerekliydi.
- **Composition (birleştirme):** küçük component'ler iç içe konarak büyük UI kurulur (`Card` içinde `CardHeader` ve `CardBody`).
- **Reusability:** aynı component farklı props ile farklı yerlerde kullanılır (`<Button variant="danger" />`).
- **Yaşam aşamaları:** **Mounting** (oluşup DOM'a eklenme), **Updating** (state veya props değişince yeniden render), **Unmounting** (DOM'dan kaldırılma). Ayrıntısı 3.8'de.

```jsx
function WelcomeFunctional(props) {
  return <h1>Hello, {props.name}</h1>;
}
class WelcomeClass extends React.Component {
  render() { return <h1>Hello, {this.props.name}</h1>; }
}
// Kullanım ikisinde de aynı: <Welcome name="Sara" />
```

| | Function component | Class component |
|---|---|---|
| Tanım | JSX döndüren fonksiyon | `extends React.Component` + `render()` |
| Props | parametre: `props` veya `{ name }` | `this.props` |
| State | `useState` | `this.state` + `this.setState()` |
| Yan etki / lifecycle | `useEffect` | `componentDidMount` vb. metotlar |
| `this` / bind | yok | handler'larda `bind` gerekebilir |
| Bugün | yeni projelerde tercih edilen | geçerli ama daha az kullanılıyor |

> **Dikkat:** Component adı büyük harfle başlamalı. Materyalde "When to use which?" başlığı boş kalmış; cevabı dosyanın sonunda: yeni kodda function component + Hooks tercih edilir.

## 3.5 JSX
Kaynak: `W3/02-jsx.md`, `W3/02-jsx-example.jsx`

**JSX (JavaScript XML)**, JavaScript içinde HTML'e benzeyen kod yazmanı sağlayan söz dizimi uzantısıdır (syntax extension). React, markup ile mantığı ayrı dosyalara bölmek yerine ikisini aynı component'te birleştirir; JSX bunun aracıdır.

- **İfade gömme:** her JavaScript **ifadesi** (expression) `{}` içine yazılır: `{name}`, `{age + 1}`, `{formatUser(user)}`, `{isAdult ? 'Adult' : 'Minor'}`.
- **JSX de bir ifadedir:** derlenince normal fonksiyon çağrısına (`React.createElement`) dönüşür ve bir JavaScript object'i üretir. Bu yüzden değişkene atanabilir, `if` içinde döndürülebilir, fonksiyona argüman verilebilir.
- **Attribute:** sabit değer tırnakla (`alt="Logo"`), dinamik değer süslü parantezle (`src={imageUrl}`). İkisini birlikte yazma.
- **camelCase attribute:** `class` yerine `className`, `for` yerine `htmlFor`, `tabIndex={1}`, `autoFocus={true}`.
- **Tek kök eleman:** `return` tek bir kök döndürür; ekstra `<div>` istemiyorsan **Fragment** `<>...</>` kullan.
- **Self-closing etiketlerde `/` zorunlu:** `<img />`, `<br />`, `<input />`.
- **Inline style** bir object'tir: `style={{ width: '150px' }}` (dış parantez JSX ifadesi, iç parantez object).
- JSX yorum satırı: `{/* yorum */}`.

```jsx
function Greeting({ name, age }) {
  return (
    <>
      <h1 className="title">Hello, {name}!</h1>
      <p>Next year you will be {age + 1}.</p>
      <img src={avatarUrl} alt="avatar" style={{ width: '50px' }} />
    </>
  );
}
```

> **Dikkat:** `{}` içine `if` veya `for` gibi **deyim** (statement) yazılamaz, sadece ifade; koşul için ternary veya `&&`, döngü için `map` kullanılır. İki kardeş kök elemanı sarmadan döndürmek derleme hatasıdır.

## 3.6 Props
Kaynak: `W3/03-props.md`, `W3/03-props-example.jsx`

**Props** (properties, özellikler), parent component'in child'a veri geçirme yoludur. HTML attribute'u gibi yazılır ve **read-only**'dir (salt okunur): child gelen props'u değiştiremez. Bu kural tek yönlü veri akışını ve öngörülebilirliği sağlar.

- **Geçirme:** `<Welcome name="Alice" />`; string dışı değer `{}` ile: `<User age={25} user={userObj} onEdit={handleEdit} />`.
- **Okuma:** function component'te ilk parametre `props` (`props.name`), class component'te `this.props.name`.
- **Destructuring:** `function Greeting({ userName })` daha kısa ve okunaklıdır.
- **Default props (varsayılan değer):** prop verilmezse kullanılacak değer. Materyaldeki yol `Button.defaultProps = { text: 'Click Me' }`; güncel yol destructuring default'u: `function Button({ text = 'Click Me' })`.
- **`children`:** component'in açılış ve kapanış etiketi arasına yazılan her şey özel `children` prop'u olarak gelir; kart, modal gibi sarmalayıcı (wrapper) component'ler bununla yazılır.
- Fonksiyon da prop olarak geçirilebilir (callback); child bu yolla parent'a haber verir.

```jsx
function Button({ text = 'Click Me' }) {
  return <button>{text}</button>;
}
function Card({ children }) {
  return <div className="card">{children}</div>;
}
// <Button />                -> "Click Me"
// <Card><h2>Başlık</h2></Card> -> h2, children olarak gelir
```

> **Dikkat:** (Materyalde function component için `Button.defaultProps` kullanılıyor, doğrusu: React 18.3 bunu uyarıyla işaretledi, React 19'da function component'lerde kaldırıldı; `{ text = 'Click Me' }` yazılmalı. React 19 ile materyaldeki `<Button />` boş buton çizer.) Props'u child içinde değiştirmeye çalışma; değişmesi gereken veri state'tir.

## 3.7 State
Kaynak: `W3/04-state.md`, `W3/04-state-example.jsx`

**State**, component'in kendine ait ve zamanla değişen verisidir (sayaç, form girdisi, açık/kapalı bilgisi). State değişince React component'i **yeniden render** eder (re-render), ekran kendiliğinden güncellenir.

- **`useState` (function component):** `const [count, setCount] = useState(0);` bir çift döndürür: mevcut değer ve onu güncelleyen setter. Argüman başlangıç değeridir.
- **Class component:** `constructor(props)` içinde önce `super(props)`, sonra `this.state = { isToggleOn: true }`. Güncelleme `this.setState(...)`; önceki state'e bağlıysa fonksiyon formu: `this.setState(prev => ({ isToggleOn: !prev.isToggleOn }))`. Handler'da `this` kaybolmasın diye `this.handleClick = this.handleClick.bind(this)` yazılır.
- **Merge ve replace farkı:** class'ta `setState` verilen alanları mevcut state ile **birleştirir** (merge); `useState` setter'ı değeri tamamen **değiştirir** (replace). Bu yüzden object state'te `...prev` şarttır.
- **Immutable (değişmez) güncelleme:** state'i doğrudan değiştirme, yeni kopya oluşturup setter'a ver. React değişikliği referans karşılaştırmasıyla anlar; aynı object'i değiştirirsen yeni render tetiklenmeyebilir.
- **Güncelleme kalıpları:**
  1. Doğrudan: `setCount(count + 1)` (basit değer).
  2. Functional update: `setCount(prev => prev + 1)` (yeni değer eskisine bağlıysa; güvenli olan budur).
  3. Object: `setUser(prev => ({ ...prev, name: 'John' }))`.
  4. Array: ekle `[...prev, item]`, sil `prev.filter(i => i.id !== id)`, güncelle `prev.map(i => i.id === id ? { ...i, completed: true } : i)`.
- **Lifting state up (state'i yukarı taşıma):** iki kardeş component aynı veriyi paylaşacaksa state en yakın ortak parent'a taşınır; `Calculator` + iki `TemperatureInput` örneği ve hatası 3.13'te.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  return (
    <>
      <button onClick={() => setCount(prev => prev + 1)}>{count}</button>
      <button onClick={() => setItems(prev => [...prev, count])}>Ekle</button>
    </>
  );
}
```

| | Props | State |
|---|---|---|
| Nereden gelir | parent'tan geçirilir | component'in içinde tutulur |
| Değiştirilebilir mi | hayır, read-only | evet, ama sadece setter / `setState` ile |
| Değişince | re-render | re-render |
| Amaç | component'ler arası iletişim | component'in iç verisi |

> **Dikkat:** (Materyalde "State is mutable" yazıyor, doğrusu: state *değişebilir* ama *mutate edilmez*; `users.push(x)` veya `this.state.user.age = 31` yasak, her zaman yeni kopya verilir.) Art arda iki `setCount(count + 1)` sayacı 1 artırır, 2 değil; bu yüzden functional update kullan.

## 3.8 Lifecycle ve useEffect
Kaynak: `W3/05-lifecycle-and-effects.md`, `W3/05-lifecycle-and-effects-example.jsx`

Her component doğar (mount), güncellenir (update) ve ölür (unmount). Veri çekme, abonelik, timer gibi **side effect** (yan etki, render dışı iş) bu aşamalara bağlanır. Class component'te bunun için lifecycle metotları, function component'te `useEffect` Hook'u vardır.

**Class lifecycle metotları (sırasıyla):**
- **Mounting:** `constructor()` (state başlat, handler bind et) -> `static getDerivedStateFromProps()` (props'tan state türet; her render'dan önce, mount ve update'te) -> `render()` (tek zorunlu metot) -> `componentDidMount()` (DOM'a eklendikten sonra; veri çekme, abonelik, DOM işlemi).
- **Updating:** `getDerivedStateFromProps()` -> `shouldComponentUpdate()` (`false` dönerse render atlanır; performans) -> `render()` -> `getSnapshotBeforeUpdate()` (değişiklik gerçek DOM'a yazılmadan hemen önce; örn. scroll konumunu yakala) -> `componentDidUpdate(prevProps, prevState)` (güncelleme sonrası; değişikliğe bağlı istek).
- **Unmounting:** `componentWillUnmount()` (temizlik: timer durdur, istek iptal et, abonelik kapat).

**`useEffect` üç hali:**
- `useEffect(fn)`: dependency array (bağımlılık dizisi) yok, **her render'dan sonra** çalışır.
- `useEffect(fn, [])`: boş dizi, **sadece ilk mount'tan sonra bir kez** çalışır.
- `useEffect(fn, [count])`: ilk mount'ta ve **`count` her değiştiğinde** çalışır.
- **Cleanup:** effect bir fonksiyon döndürürse bu temizlik fonksiyonudur; unmount'ta ve effect yeniden çalışmadan hemen önce çalışır.

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id); // cleanup: unmount'ta timer durur
  }, []);
  return <p>Seconds: {seconds}</p>;
}
```

| Class metodu | `useEffect` karşılığı |
|---|---|
| `componentDidMount` | `useEffect(fn, [])` |
| `componentDidUpdate` (belirli değer) | `useEffect(fn, [deger])` (ama ilk mount'ta da çalışır) |
| her render sonrası (`DidMount` + `DidUpdate`) | `useEffect(fn)` |
| `componentWillUnmount` | effect'in döndürdüğü cleanup fonksiyonu |
| `constructor` (state başlatma) | `useState(initial)` |
| `shouldComponentUpdate` | materyalde eşi yok; yakın karşılığı `React.memo` |

Veri çekme kalıbı: `loading`, `data`, `error` üç state; `useEffect(..., [])` içinde `async` fonksiyon tanımlanıp çağrılır (effect callback'inin kendisi `async` yapılmaz, çünkü cleanup yerine Promise döndürür), `try / catch / finally` ile `finally`'de `setLoading(false)`; render'da `if (loading) return ...` early return.

**Stale closure (bayat kapanış):** `[]` effect'inde `setInterval(() => setSeconds(seconds + 1), 1000)` sayacı 1'de takar, çünkü callback hep ilk render'ın `seconds = 0` değerini görür. Doğrusu yukarıdaki gibi `setSeconds(s => s + 1)`.

> **Dikkat:** (Materyalde dizisiz effect'in cleanup'ı "componentWillUnmount gibi" diye geçiyor, doğrusu: o cleanup her re-render'da, effect yeniden çalışmadan önce de çalışır, sadece unmount'ta değil.) (Materyalde `[count]` effect'i "componentDidUpdate eşdeğeri" deniyor, doğrusu: bu effect ilk mount'ta da çalışır, `componentDidUpdate` ise ilk render'da çalışmaz.) Cleanup'ı unutmak (timer, abonelik) memory leak'e (bellek sızıntısı) yol açar. Error yakalayan `getDerivedStateFromError` ve `componentDidCatch` metotları materyaldeki listede yok. React 18+ `StrictMode` development'ta effect'i mount'ta iki kez çalıştırır (mount, cleanup, mount); konsolda çift log normaldir.

## 3.9 Event Handling
Kaynak: `W3/06-event-handling.md`, `W3/06-event-handling-example.jsx`

Event (olay), kullanıcının tıklama, yazma, form gönderme gibi eylemleridir. React'te olaylar DOM'a çok benzer, iki farkla: isimler **camelCase** (`onClick`, `onChange`, `onSubmit`, `onMouseOver`) ve handler string değil **fonksiyon** olarak verilir.

- Fonksiyonun **referansını** ver: `onClick={handleClick}`. Parantezli `onClick={handleClick()}` render sırasında hemen çağırır.
- **Argüman geçirme:** arrow function ile sar: `onClick={() => greetUser('Alice')}`; event'i de istersen `onClick={(e) => this.handleDelete(123, e)}`.
- **Class component:** handler bir metottur; `this` kaybolmasın diye constructor'da `bind` edilir ya da class field arrow function yazılır (`handleClick = () => {...}`).
- **SyntheticEvent (sentetik olay):** React tarayıcının native event'ini sarar, tüm tarayıcılarda aynı API'yi verir. `e.target` olayı tetikleyen DOM elemanıdır; input değeri `e.target.value`, checkbox için `e.target.checked`.
- **Varsayılan davranışı engelleme:** form gönderiminde sayfa yenilenmesin, link gitmesin diye `e.preventDefault()`. React'te `return false` bunu yapmaz.
- **Controlled input:** `value={name}` + `onChange={e => setName(e.target.value)}`; input'un değeri state'ten gelir.

```jsx
function FormExample() {
  const [name, setName] = useState('');
  function handleSubmit(e) {
    e.preventDefault();               // sayfa yenilenmesin
    alert(`Submitted: ${name}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

> **Dikkat:** `onClick={greetUser('Alice')}` handler'ı render'da çalıştırır, tıklamada değil; içinde setState varsa sonsuz döngü ("Too many re-renders") olur. `onSubmit` form'a verilir, butona değil. Class'ta `bind` unutulursa handler içinde `this` `undefined` olur. Event adları küçük harfle (`onclick`) yazılırsa çalışmaz.

## 3.10 Conditional Rendering
Kaynak: `W3/07-conditional-rendering.md`, `W3/07-conditional-rendering-example.jsx`

Conditional rendering (koşullu render), bir koşula göre farklı eleman göstermektir: giriş yapmışsa "Hoş geldin", yapmamışsa "Giriş yap". React'te bunun için özel söz dizimi yoktur, normal JavaScript kullanılır.

- **`if` ile erken `return`:** JSX dışında; tüm çıktı değişiyorsa en okunaklısı. `if (isLoggedIn) return <UserGreeting />; return <GuestGreeting />;`
- **Element variable (eleman değişkeni):** `let button; if (...) button = <LogoutButton />; else button = <LoginButton />;` sonra JSX içinde `{button}`. Çıktının sadece bir parçası değişirken kullanılır.
- **Ternary `? :`:** JSX içinde iki seçenek arasında: `{status === 'active' ? <p>Active</p> : <p>Inactive</p>}`.
- **Logical `&&` (short-circuit, kısa devre):** koşul doğruysa göster, değilse hiçbir şey: `{unread.length > 0 && <h2>{unread.length} mesaj</h2>}`.
- **`||` ile fallback:** `{user?.role || 'Unknown'}`; `?.` optional chaining, `user` null ise hata vermeden `undefined` döner.
- **`return null`:** component kendini gizler (render edilir ama hiçbir şey çizmez). Class'ta `render()`'dan, function'da doğrudan `null` döndürülür.
- Çok koşul varsa `renderContent()` gibi bir yardımcı fonksiyonda `if / else if` zinciri; yükleme ekranında `loading`, `error`, `data` için ayrı `&&` satırları.

```jsx
function Mailbox({ unread, isLoggedIn }) {
  if (!isLoggedIn) return <p>Please log in</p>;  // if
  return (
    <div>
      {unread.length > 0 && <h2>{unread.length} unread</h2>}  {/* && */}
      {unread.length > 9 ? <b>Çok mesaj</b> : <i>Az mesaj</i>} {/* ternary */}
    </div>
  );
}
```

> **Dikkat:** `&&`'nin solu sayı ise ve 0 ise ekrana "0" basılır; `{count && ...}` yerine `{count > 0 && ...}` yaz. `||` fallback `0` ve `''` gibi falsy değerleri de değiştirir; sadece `null`/`undefined` için `??` kullanılır. (Materyalde `WarningBanner` içinde fazladan bir `</div>` var, kod derlenmez; doğrusu tek `<div className="warning">Warning!</div>`.) (Örnek dosyadaki function `ErrorBoundary` hata yakalamaz, doğrusu: error boundary yalnız class component ile, `getDerivedStateFromError` / `componentDidCatch` kullanılarak yazılabilir.)

## 3.11 List Rendering ve Key
Kaynak: `W3/08-list-rendering.md`, `W3/08-list-rendering-example.jsx`

Bir veri dizisini ekranda listeye çevirmek için JavaScript'in `map()` fonksiyonu kullanılır: her elemanı bir JSX elemanına dönüştürür, oluşan dizi JSX içine `{}` ile konur.

- `map()` ayrı değişkende (`const listItems = numbers.map(...)`) veya doğrudan JSX içinde **inline** yazılabilir.
- **Key:** listedeki her elemana verilen benzersiz kimlik. React bununla hangi elemanın eklendiğini, silindiğini veya değiştiğini anlar ve sadece onu günceller.
- Key **kardeşler arasında** benzersiz olmalı, global olarak değil. En iyisi verideki sabit kimlik: `key={todo.id}`; sayı listesinde `key={number.toString()}`.
- Index'i (`key={index}`) key yapma: sıra değişince, araya ekleme veya silmede eleman kimlikleri karışır, performans düşer ve component state'i yanlış elemana kayar.
- **Component çıkarınca key nereye:** key, `map()` içindeki elemana, yani `<ListItem key=... />` üzerine yazılır; `ListItem`'ın içindeki `<li>`'ye değil. Kural: `map()` çağrısının hemen içindeki eleman key ister.
- Key bir prop gibi yazılır ama component içinde `props.key` olarak okunamaz.

```jsx
function ListItem({ value }) {
  return <li>{value}</li>;                       // burada key yok
}
function NumberList({ numbers }) {
  return (
    <ul>
      {numbers.map(n => <ListItem key={n.toString()} value={n} />)}
    </ul>
  );
}
```

> **Dikkat:** key unutulursa konsolda uyarı çıkar ve liste güncellemeleri hatalı olabilir. Materyal index'i her durumda yanlış sayar; React dokümanına göre sırası hiç değişmeyen statik listelerde index kabul edilebilir, ama sınavda materyalin cevabı "index kullanma, benzersiz id kullan"dır. Key'i çıkarılan component'in içindeki `<li>`'ye koymak işe yaramaz. `key={n.toString()}` sadece değerler tekrar etmiyorsa güvenlidir; tekrar eden sayılarda key çakışır.

## 3.12 Hooks
Kaynak: `W3/09-hooks.md`, `W3/09-hooks-example.jsx`

Hook (kanca), function component'in React'in state ve lifecycle özelliklerine "takılmasını" sağlayan fonksiyondur. React 16.8 ile geldi; o günden beri class yerine tercih edilen yazım budur. Hepsinin adı `use` ile başlar.

### Rules of Hooks (Hook kuralları)
1. Hook'ları sadece **top level**'da (bileşen gövdesinin en üst seviyesinde) çağır: döngü, `if` veya iç içe fonksiyon içinde değil.
2. Hook'ları sadece **React fonksiyonlarından** çağır: function component veya custom hook; sıradan JS fonksiyonundan değil.

Neden: React hook'ları her render'da çağrılma **sırasına** göre eşler. Koşullu çağrı sırayı bozar ve state yanlış hook'a gider.

### Hook'lar tek bakışta
| Hook | Ne işe yarar | İmza |
|---|---|---|
| `useState` | Bileşene state ekler | `const [s, setS] = useState(initial)` |
| `useEffect` | Side effect (yan etki): fetch, DOM, abonelik, timer | `useEffect(() => { ...; return cleanup }, [deps])` |
| `useContext` | Context değerini `Context.Consumer` sarmadan okur | `const v = useContext(Ctx)` |
| `useReducer` | Karmaşık state için `useState` alternatifi | `const [state, dispatch] = useReducer(reducer, init)` |
| `useRef` | Render'lar arası kalıcı, değiştirilebilir kutu; genelde DOM erişimi | `const r = useRef(null)` -> `r.current` |
| `useMemo` | Pahalı hesabın **sonucunu** saklar | `useMemo(() => hesap(a), [a])` |
| `useCallback` | **Fonksiyonun referansını** saklar | `useCallback(() => {...}, [deps])` |
| `useLayoutEffect` | `useEffect` gibi ama DOM değişiminden sonra, ekrana boyamadan (paint) önce **senkron** | `useLayoutEffect(fn, [deps])` |
| `useImperativeHandle` | `ref` ile parent'a açılan değeri özelleştirir (`forwardRef` ile) | `useImperativeHandle(ref, () => ({ focus }))` |
| Custom hook | Bileşen mantığını tekrar kullanılabilir fonksiyona çıkarır | `function useX() {...}` |

### useState
İki elemanlı dizi döner: mevcut değer ve güncelleyen fonksiyon (setter). Setter çağrılınca bileşen yeniden render olur.
- Basit güncelleme: `setCount(count + 1)`.
- Yeni değer eskisine bağlıysa functional update (fonksiyonla güncelleme): `setCount(prev => prev + 1)`.
- İlk değeri hesaplamak pahalıysa lazy initial state (tembel başlangıç): `useState(() => ilkDeger())`; fonksiyon sadece ilk render'da çalışır.

### useEffect
Render sonrası yan etki çalıştırır; `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` üçlüsünün yerini tutar. Üç hali (dizi yok / `[]` / `[count]`) ve cleanup 3.8'de.
```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // ilk render'da ve count her değiştiğinde çalışır
```
> **Dikkat:** Effect içinde kullandığın her prop/state dependency array'de olmalı; eksik bırakırsan effect eski (bayat, stale) değeri görür.

### useContext
Context'teki değeri doğrudan okur; eski `Context.Consumer` sarmalayıcısına gerek kalmaz. En yakın üstteki `Provider`'ın `value`'su gelir; Provider yoksa `createContext`'e verilen varsayılan değer gelir.
```jsx
const ThemeContext = React.createContext('light'); // varsayılan
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Tema: {theme}</button>;
}
// <ThemeContext.Provider value="dark"><ThemedButton /></ThemeContext.Provider> -> "dark"
```

### useReducer
State mantığı karmaşıklaşınca (çok alan, çok tür işlem) kullanılır. Bir **reducer** fonksiyonu `(state, action) => yeniState` ve başlangıç state'i alır; `[state, dispatch]` döner. Değişiklik istemek için `dispatch({ type: '...' })` çağrılır.
- Reducer saf (pure) fonksiyondur: state'i değiştirmez, yeni obje döner.
- Genelde `switch (action.type)` ile yazılır; bilinmeyen tipte hata fırlatılır veya state aynen döner.
```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'reset':     return initialState;
    default:          throw new Error();
  }
}
const [state, dispatch] = useReducer(reducer, { count: 0 });
<button onClick={() => dispatch({ type: 'increment' })}>+</button>
```
Örnek dosyadaki `TodoApp`: `{todos, filter}` state'i, `ADD_TODO`, `TOGGLE_TODO`, `DELETE_TODO`, `SET_FILTER` action'ları; hepsi spread, `map`, `filter` ile immutable (değişmez) güncelleme yapar.

### useRef
`.current` alanı verilen değerle başlayan bir obje döner; bu obje bileşenin tüm ömrü boyunca aynı kalır. En sık kullanım DOM elemanına doğrudan erişmektir.
```jsx
const inputEl = useRef(null);
<input ref={inputEl} />
<button onClick={() => inputEl.current.focus()}>Odakla</button>
```
> **Dikkat:** `ref.current`'i değiştirmek re-render **tetiklemez**; ekranda görünmesi gereken veri ref'te değil state'te tutulur.

### useMemo ve useCallback
İkisi de performans içindir ve dependency değişmedikçe öncekini geri verir.
- `useMemo`: pahalı bir hesabın **sonucunu** saklar (memoize eder). `const filtered = useMemo(() => posts.filter(...), [posts, filter])`.
- `useCallback`: bir **fonksiyonun aynı referansını** saklar. Referans eşitliğine bakan optimize çocuk bileşenlere callback geçerken işe yarar.
```jsx
const handleClick = useCallback(() => console.log('clicked'), []);
const Child = React.memo(function Child({ onClick }) {
  return <button onClick={onClick}>Child</button>;
});
```
> **Dikkat:** `useCallback` tek başına re-render'ı engellemez; çocuk `React.memo` ile sarılı olmalı. (Materyalde `ChildComponent` `memo`'suz, yani örnek kazanç sağlamıyor.) (Materyalde "The function is created only once" yazıyor, doğrusu: arrow function her render'da yine oluşur, `useCallback` sadece ilk referansı geri verir.) JSX içinde `onClick={() => handlePostClick(id)}` yazmak her render'da yeni fonksiyon üretir, memoize etmenin anlamı kalmaz.

### useLayoutEffect
`useEffect` ile aynı imza; fark zamanlamada: tüm DOM değişikliklerinden sonra, tarayıcı ekrana boyamadan **önce** ve senkron çalışır. DOM ölçmek (`getBoundingClientRect()`) ve ölçüme göre konum ayarlamak için kullanılır; böylece titreme (flicker) olmaz.
> **Dikkat:** Ağır iş burada paint'i bloklar; normal yan etkiler için `useEffect` kullan. (Materyaldeki `Tooltip` örneği viewport koordinatını `position: absolute` olan kutuya veriyor; kapsayıcı sayfanın sol üstünde değilse tooltip kayar.)

### useImperativeHandle
Parent'ın `ref` ile çocuğa eriştiğinde gerçek DOM yerine sadece senin seçtiğin method'ları görmesini sağlar. Çocuk `forwardRef` ile `ref`'i alır.
```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
  }));
  return <input ref={inputRef} {...props} />;
});
// parent: fancyRef.current.focus(); fancyRef.current.clear();
```
Not: React 19'da function component `ref`'i normal prop olarak alır, `forwardRef` artık gerekmiyor (materyal eski ama çalışan yolu gösteriyor).

### Custom hook (özel hook)
Birden fazla bileşende tekrar eden hook mantığını bir fonksiyona çıkarırsın. Adı `use` ile başlamak **zorunda**, içinde başka hook çağırabilir. Her bileşen hook'u çağırdığında kendi bağımsız state kopyasını alır (state paylaşılmaz, mantık paylaşılır).
```jsx
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(prev => prev + 1);
  const reset = () => setCount(initial);
  return { count, increment, reset };
}
const { count, increment } = useCounter(0);
```
Materyaldeki iki yaygın kalıp (common patterns):
- `useFetch(url)`: `{ data, loading, error }` döner, `[url]` değişince yeniden çeker. (Materyaldeki sürüm `url` değişince `loading`'i tekrar `true` yapmıyor, `response.ok` kontrol etmiyor ve cleanup/abort yok; gerçek kodda üçü de eklenmeli.)
- `useLocalStorage(key, initialValue)`: ilk değeri lazy initial state ile `localStorage`'dan okur, `JSON.parse` / `JSON.stringify` ve `try/catch` kullanır, `[value, setValue]` döner. (Materyaldeki `setValue` fonksiyon alırsa `JSON.stringify(fonksiyon)` yazar ve değer kaybolur; doğrusu önce `value instanceof Function ? value(storedValue) : value` hesaplamak.)

### Dependency array ile optimizasyon
Her effect sadece gerçekten kullandığı değerlere bağlanır: kullanıcıyı çeken effect `[userId]`, gönderileri çeken effect `[userId, filter]`. Süzülmüş liste `useMemo([posts, filter])`, tıklama handler'ı `useCallback`. Böylece gereksiz fetch ve hesap yapılmaz.
> **Dikkat:** Hook'u `if` içinde çağırmak; custom hook adını `use` ile başlatmamak (React ve linter onu hook saymaz); dependency array'de değer unutmak (`eslint-plugin-react-hooks` `exhaustive-deps` kuralı uyarır).

## 3.13 Data Sharing (Bileşenler arası veri paylaşımı)
Kaynak: `W3/10-data-sharing.md`, `W3/10-data-sharing-example.jsx`

React'te veri **tek yönlü** akar: parent'tan child'a, props ile. Kardeş ya da uzak akraba bileşenler aynı veriyi kullanacaksa dört yol var: lifting state up, prop drilling, Context API, state management kütüphanesi.

### Lifting State Up (state'i yukarı taşıma)
Birden çok bileşen aynı state'e ihtiyaç duyuyorsa state **en yakın ortak ataya** (closest common ancestor) taşınır. Ata değeri props ile, değiştirme yolunu da callback prop ile aşağı verir; çocuk değeri tutmaz, sadece gösterir ve haber verir.
```jsx
function Calculator() {
  const [temperature, setTemperature] = useState('');
  return <TemperatureInput temperature={temperature}
           onTemperatureChange={setTemperature} />;
}
function TemperatureInput({ temperature, onTemperatureChange }) {
  return <input value={temperature}
           onChange={e => onTemperatureChange(e.target.value)} />;
}
```
Materyaldeki `Calculator` tek `temperature` + `scale` tutar, Celsius/Fahrenheit'ı render sırasında hesaplar (derived state, türetilmiş değer). (Materyalde boş girdi kontrolü yok: alan boşken diğer kutuda 32 veya -17.77 görünür; doğrusu boşsa boş bırakmak.)

### Prop Drilling
Veriyi, kullanmayan ara bileşenlerden geçirerek derine indirmek: `GrandParent -> Parent -> Child -> GrandChild`. Geçerli bir yöntem ama ağaç derinleştikçe her katman gereksiz prop taşır. Çözümü Context'tir. Callback de aynı yoldan inebilir (örnekte `onDataChange={setSharedData}`), böylece en alttaki bileşen en üstteki state'i değiştirir.

### Context API
Props'u her seviyede elle geçirmeden ağaca veri dağıtır. Üç adım:
1. `const UserContext = createContext();`
2. Provider ile sar ve değeri ver: `<UserContext.Provider value={{ user, setUser }}>`.
3. Alt bileşende oku: `const { user } = useContext(UserContext);`.

Setter'ı da context'e koyarsan alttaki bileşen state'i güncelleyebilir: `setUser(prev => ({ ...prev, name: 'Jane' }))`. Provider genelde ayrı bir bileşene konur: `function UserProvider({ children })` state'i tutar ve `{children}`'ı sarar.
Örnek dosyadaki iyi pratik: `useTheme` / `useUser` gibi custom context hook'ları, Provider dışında çağrılınca anlamlı hata fırlatır. Birden fazla Provider iç içe sarılabilir: `<ThemeProvider><UserProvider>...`.
> **Dikkat:** `createContext()` varsayılansız oluşturulup Provider dışında okunursa değer `undefined` olur ve `const { user } = ...` patlar. Provider'ın `value`'su değişince o context'i okuyan tüm bileşenler yeniden render olur; sık değişen büyük state için bu yüzden kütüphane tercih edilir.

### State management kütüphaneleri: Redux
Büyük uygulamalarda global state için **Redux**, **MobX**, **Zustand** kullanılır. Materyal Redux'ın temel kurulumunu gösterir (`npm install redux react-redux`):
- **Action creator**: action objesi üreten fonksiyon, `increment = () => ({ type: 'INCREMENT' })`.
- **Reducer**: `counterReducer(state = initialState, action)`; bilinmeyen action'da `return state`.
- **Store**: `createStore(counterReducer)`; tüm global state burada.
- **Provider**: `<Provider store={store}>` uygulamayı sarar.
- **Okuma**: `useSelector(state => state.count)`; **yazma**: `const dispatch = useDispatch(); dispatch(increment())`.

(Materyalde `createStore` kullanılıyor; Redux 4.2'den beri deprecated işaretli, güncel öneri Redux Toolkit `configureStore`. Kod yine çalışır.)
> **Dikkat:** Obje state'ini spread ile kopyalayarak güncelle, mutasyon yapma; Context her şeyi çözmez, sık değişen büyük state için kütüphane daha uygun.

## 3.14 Styling (Stil verme)
Kaynak: `W3/12-styling.md`, `W3/12-styling-example.jsx`, `W3/styling-example.css`

React bileşenine stil vermenin altı yolu var; hepsi geçerli, seçim projeye ve ekibe göre yapılır.

| Yöntem | Nasıl yazılır | Kapsam (scope) | Ne zaman | Kurulum |
|---|---|---|---|---|
| Inline style | `style={{ backgroundColor: 'red' }}` | Sadece o eleman | Dinamik, tek seferlik stil | Yok |
| CSS stylesheet | `import './App.css'` + `className` | Global | Basit, geleneksel projeler | Yok |
| CSS Modules | `import styles from './X.module.css'` + `styles.x` | Bileşene yerel | İsim çakışmasını önlemek, orta/büyük proje | Yok (CRA/Vite destekler) |
| Styled Components | `` styled.button`...` `` | Bileşene yerel | JS gücüyle bileşen stili, modern uygulama | `npm install styled-components` |
| Tailwind CSS | `className="p-6 text-3xl"` | Utility class'lar | Hızlı geliştirme, prototip, tutarlı tasarım | `tailwindcss postcss autoprefixer` |
| Sass/SCSS | `.scss` dosyası, değişken + nesting | Global | Karmaşık stil ihtiyacı | `npm install sass` |

### Inline styles (satır içi stil)
Stil bir **JS objesidir**, `style` prop'una verilir. Property adları camelCase (`backgroundColor`, `textAlign`), değerler string (`'10px'`). Çift süslü parantezde dıştaki JSX ifadesi, içteki obje literal'dir. State'e bağlı dinamik stil için idealdir.
```jsx
<button style={{ backgroundColor: isActive ? '#007bff' : '#6c757d', padding: '10px' }}>Tıkla</button>
```
> **Dikkat:** `style="color: red"` (string) çalışmaz; `background-color` değil `backgroundColor`; `:hover` ve media query inline yazılamaz.

### CSS stylesheet (harici CSS)
Klasik `.css` dosyası yazılır, `import './App.css';` ile dahil edilir. JSX'te `class` yerine `className`. Pseudo-class (`:hover`) ve media query normal yazılır. Koşullu class için template literal: `` className={`container ${theme}`} ``.
> **Dikkat:** CSS'i bir bileşene import etmek onu o bileşenle sınırlamaz; stil **global** olur ve aynı class adı çakışabilir.

### CSS Modules
Dosya adı `Button.module.css` olur; içindeki class'lar bileşene **yerel kapsamlı** (locally scoped) hale gelir, isim çakışması olmaz.
```jsx
import styles from './Button.module.css';
<button className={primary ? `${styles.button} ${styles.primary}` : styles.button}>OK</button>
```
> **Dikkat:** `.module.css` uzantısı olmazsa dosya normal global CSS gibi davranır.

### Styled Components (CSS-in-JS)
CSS'i JS dosyasında **tagged template literal** ile yazdıran kütüphane. Her stil, stilli bir bileşen üretir; props'a göre dinamik stil ve `&:hover` gibi iç içe seçici yazılabilir.
```jsx
import styled from 'styled-components';
const Button = styled.button`
  background: ${props => (props.primary ? '#007bff' : '#6c757d')};
  &:hover { opacity: 0.8; }
`;
<Button primary>Kaydet</Button>
```
> **Dikkat:** Stilli bileşeni başka bir bileşenin **içinde** tanımlama (her render'da yeni tip oluşur). styled-components v6 bilinmeyen `primary` prop'unu DOM'a iletip uyarı verir; transient prop `$primary` önerilir.

### Tailwind CSS
**Utility-first** (önce yardımcı class) framework: hazır küçük class'ları birleştirerek stil verirsin (`max-w-4xl mx-auto p-6`, `bg-blue-500 hover:bg-blue-700 rounded`). Materyaldeki kurulum: `npm install -D tailwindcss postcss autoprefixer`, `npx tailwindcss init -p`, `tailwind.config.js` içinde `content: ["./src/**/*.{js,jsx,ts,tsx}"]`, `index.css` içinde `@tailwind base; @tailwind components; @tailwind utilities;`. (Bu Tailwind v3 kurulumu; v4'te `init` ve `@tailwind` yerine `@import "tailwindcss";` kullanılıyor.)

### Sass/SCSS
CSS **preprocessor** (ön işlemci): değişken (`$primary-color: #007bff;`), iç içe yazım (nesting: `.container { .title {...} }`), `&:hover` ve mixin ekler. `npm install sass`, dosya `App.scss`, `import './App.scss';`. Renk fonksiyonu örneği `darken($primary-color, 10%)`. (Materyal mixin'den bahsediyor ama örnek göstermiyor; ayrıca `darken()` yeni Dart Sass'ta deprecated, yerine `color.adjust`.)

### Örnek dosyadaki ek teknikler
Tema sistemi (tema objesi `light`/`dark`/`blue`, `themes[theme]` ile seçim, `Object.keys(themes).map` ile butonlar); inline `transition` + `transform: scale(1.1) rotate(5deg)` ile animasyon; CSS dosyasında media query `@media (max-width: 768px)`, `@keyframes` (`fadeIn`, `slideIn`, `pulse`), CSS custom properties (`:root { --primary-color }`, `var(--text-color, #333)` fallback'li, `[data-theme="dark"]` ile override).
> **Dikkat:** Örnek dosyadaki "CSS Modules" ve "Styled Components" bölümleri **simülasyon**, gerçek kütüphane değil; `<style jsx>` styled-jsx (Next.js) ister, düz React'te CSS global olur. "Responsive" örneği media query değil state ile çalışıyor ve tablet görünümü desktop ile aynı. Dark temada `.card` yazısı beyaz zemin üstünde beyaz kalıyor.

## 3.15 Forms (Formlar)
Kaynak: `W3/13-forms.md`, `W3/13-forms-example.jsx`

HTML'de form elemanı kendi değerini kendisi tutar. React'te bu değeri state'e bağlayıp state'i **tek doğruluk kaynağı** (single source of truth) yaparız; buna **controlled component** (kontrollü bileşen) denir.

### Controlled component
- `value={state}` ile değer bağlanır, `onChange` içinde `setState(e.target.value)` ile güncellenir.
- Form'a `onSubmit` verilir, içinde `e.preventDefault()` sayfa yenilenmesini engeller; buton `type="submit"`.
```jsx
const [name, setName] = useState('');
const handleSubmit = e => { e.preventDefault(); alert(`Submitted name: ${name}`); };
<form onSubmit={handleSubmit}>
  <input value={name} onChange={e => setName(e.target.value)} />
  <button type="submit">Submit</button>
</form>
```

### Çok alanlı form (multiple inputs)
Tek state objesi, tek handler. Handler hangi alanın değiştiğini input'un `name` attribute'undan anlar; computed property name (`[name]`) ve spread ile diğer alanlar korunur.
```jsx
const handleChange = e => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};
<input name="email" value={formData.email} onChange={handleChange} />
```

### Eleman eleman kurallar
| Eleman | Bağlanan prop | Handler'da okunan | Not |
|---|---|---|---|
| `input` (text/email/number) | `value` | `e.target.value` | |
| `textarea` | `value` | `e.target.value` | İçerik children değil `value` ile; `<textarea />` |
| `select` | `<select value>` | `e.target.value` | `<option selected>` değil, kökteki `value` |
| `checkbox` | `checked` | `e.target.checked` | `value` değil |
| `radio` | `checked={secim === 'a'}` | `e.target.value` | Aynı `name` ile gruplanır |

Örnek dosyada checkbox grubu dizi tutar: işaretlenince `[...prev.interests, value]`, kaldırılınca `filter`; işaret durumu `checked={interests.includes(x)}`. Select'te ilk seçenek boş: `<option value="">Select a country</option>`.

### Validation (doğrulama)
- `errors` state'i bir objedir; `validate()` yeni bir hata objesi döner.
- Kurallar: boş mu, email regex'i `/\S+@\S+\.\S+/` uyuyor mu, şifre `length < 6` mı.
- Submit'te `Object.keys(errors).length === 0` ise başarılı, değilse `setErrors(...)`.
- Hata conditional rendering ile gösterilir: `{errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}`.
- Örnek dosyada ek olarak: kullanıcı yazınca o alanın hatası silinir, hatalı alan kırmızı kenarlık alır (`border: errors.name ? '2px solid red' : ...`).

(Materyalde başarılı submit dalında `setErrors({})` yok, eski hata mesajları ekranda kalır; doğrusu başarıda hataları temizlemek.) (Materyalde input'lar `type="email"` / `min`/`max` ile ama `noValidate` olmadan; tarayıcının kendi doğrulaması submit'i önce durdurur ve özel mesajlar çoğu zaman görünmez. Doğrusu `<form noValidate>`.)

### Uncontrolled component (kontrolsüz bileşen)
Değeri **DOM tutar**; sen sadece gerektiğinde **ref** ile okursun. Başlangıç değeri `value` değil `defaultValue` ile verilir.
```jsx
const nameRef = useRef(null);
const handleSubmit = e => { e.preventDefault(); alert(nameRef.current.value); };
<input ref={nameRef} defaultValue="John Doe" />
```
Örnek dosya ref bile kullanmadan okur: `Object.fromEntries(new FormData(e.target).entries())`. İşaretlenmemiş checkbox bu veride hiç yer almaz.

| | Controlled | Uncontrolled |
|---|---|---|
| Verinin sahibi | React state | DOM |
| Değer bağlama | `value` / `checked` | `defaultValue` / `defaultChecked` |
| `onChange` | Şart | Gerekmez |
| Değeri okuma | Doğrudan state | `ref.current.value` veya `FormData` |
| Anlık validation, koşullu UI | Kolay | Zor |
| Materyalin önerisi | Genelde bu önerilir | Bazı basit durumlar |

### Custom hook ile form: `useForm`
Örnek dosyada form mantığı `useForm(initialValues, validate)` hook'una çıkarılmış: `values`, `errors`, `touched` state'leri; `handleChange` (checkbox ise `checked`, değilse `value`), `handleBlur` (alanı `touched` yapar, alan bazında doğrular), `handleSubmit(onSubmit)` (event handler döndüren higher-order function; hepsini doğrular, hata yoksa `onSubmit(values)`). Hata sadece `errors.x && touched.x` ise gösterilir, böylece kullanıcı daha dokunmadan kırmızı yazı görmez.
> **Dikkat:** `value` verip `onChange` vermemek input'u salt okunur yapar; `useState()` (undefined) ile başlamak uncontrolled'dan controlled'a geçiş uyarısı verir, `useState('')` yaz; spread'i unutursan diğer alanlar silinir; `preventDefault()` unutulursa sayfa yenilenir.

## 3.16 Routing (Yönlendirme)
Kaynak: `W3/14-routing.md`, `W3/14-routing-example.jsx`

**React Router**, React'in standart routing kütüphanesidir: tek sayfalık uygulamada (SPA, single page application) sayfa yenilemeden URL'ye göre farklı bileşen gösterir. Kurulum: `npm install react-router-dom`. Materyal **v6 API**'sini anlatıyor (`Routes`, `element=`, `useNavigate`); v5'teki `Switch`, `component=`, `exact`, `useHistory` yok.

### Bileşenler ve hook'lar
| Ad | Tür | Görevi |
|---|---|---|
| `BrowserRouter` | Bileşen | Uygulamayı en dıştan sarar, History API ile routing sağlar |
| `Routes` | Bileşen | Route'ları gruplar, en uygun eşleşeni render eder |
| `Route` | Bileşen | `path` ile `element` eşlemesi |
| `Link` | Bileşen | Sayfa yenilemeden geçiş (`to`) |
| `NavLink` | Bileşen | Aktif olduğunu bilen link (`isActive`) |
| `Outlet` | Bileşen | Nested route'un çizileceği yer |
| `Navigate` | Bileşen | Render edilince yönlendirir (`to`, `replace`) |
| `useParams` | Hook | URL parametrelerini obje olarak verir |
| `useNavigate` | Hook | Kodla yönlendirme fonksiyonu döner |
| `useSearchParams` | Hook | Query string okur ve yazar |

### Temel kurulum, Link ve NavLink
```jsx
<BrowserRouter>
  <Link to="/">Home</Link>
  <NavLink to="/about" style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}>About</NavLink>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
```
`NavLink`'in `style` ve `className` prop'larına **fonksiyon** verilir: `className={({ isActive }) => isActive ? 'active' : ''}`.
> **Dikkat:** Normal `<a href>` tam sayfa yenilemesi yapar, SPA'da `Link` kullan. `Link` ve router hook'ları sadece `BrowserRouter` içinde çalışır.

### Dynamic route (URL parametresi)
`:` ile başlayan path parçası parametredir: `path="/user/:userId"`. Bileşende `const { userId } = useParams();`. `/user/123` için `userId` `"123"` olur (değer her zaman **string** gelir).

### Nested routes (iç içe rotalar)
Alt `Route`'lar üst `Route`'un içine yazılır, alt path'ler **göreli**dir (başta `/` yok). Üst bileşen alt sayfanın nereye çizileceğini `<Outlet />` ile belirtir.
```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />   {/* /dashboard/profile */}
</Route>
function Dashboard() {
  return <div><h2>Dashboard</h2><Link to="profile">Profile</Link><Outlet /></div>;
}
```
Sadece `/dashboard` açılınca `Outlet` boş kalır; varsayılan alt sayfa için `<Route index element={...} />` kullanılır. (Materyalde bu örnekte `Link` import edilmemiş; doğrusu `import { Outlet, Link } from 'react-router-dom'`.)

### Programmatic navigation ve 404
- Kodla yönlendirme: `const navigate = useNavigate();` sonra örneğin login sonrası `navigate('/dashboard')`.
- 404: catch-all route (her şeyi yakalayan rota) `<Route path="*" element={<NotFound />} />`; hiçbir rota eşleşmezse bu gösterilir.

### Protected route (korumalı rota)
Sarmalayıcı bileşen: giriş yoksa login'e yönlendirir, varsa çocuğu gösterir.
```jsx
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}
<Route path="/dashboard" element={<ProtectedRoute isAuthenticated={auth}><Dashboard /></ProtectedRoute>} />
```
`replace`: geçmişe yeni kayıt eklemez, mevcut kaydı değiştirir; geri tuşu korumalı sayfaya döndürmez.

### Query parameters (sorgu parametreleri)
`const [searchParams, setSearchParams] = useSearchParams();`, okuma `searchParams.get('q')`, yazma `setSearchParams({ q: e.target.value })`. `/search?q=react` için `"react"`.

### Örnek dosya hakkında
`14-routing-example.jsx` React Router **kullanmıyor**: Context + `window.history.pushState` + `popstate` dinleyicisiyle elle yazılmış basit bir router (`SimpleRouter`, `useRouter`, `Route`, `Link`, `NavLink`); API'si v5'e benziyor (`component=`, `exact`, `activeStyle`). Kendi `Link`'i `e.preventDefault()` + `navigate(to)` ile yenilemeyi engeller; bu, React Router'ın arkada ne yaptığını gösterir.
> **Dikkat:** Bu el yapımı router `:id` parametresini anlamıyor (`startsWith` ile düz karşılaştırıyor), bu yüzden `ProductDetail`, `UserProfile` ve `path="*"` 404 rotası **hiç render olmuyor**; "ilk eşleşen" mantığı da yok. Sınavda React Router sorulursa dokümandaki v6 API'sini yaz, örnek dosyadakini değil. Nested route'ta `<Outlet />` unutulursa alt sayfa görünmez; alt path'i `/` ile başlatmak onu mutlak (absolute) yapar.

## 3.17 Best Practices ve öğrenme yolu
Kaynak: `W3/README.md`

### Öğrenme yolu (learning path)
- **Phase 1 (temeller, 1-2. hafta):** React'e giriş, kurulum, JavaScript temelleri, components, JSX, props, state.
- **Phase 2 (orta, 3-4. hafta):** lifecycle & effects, event handling, conditional rendering, list rendering, hooks.
- **Phase 3 (ileri, 5-6. hafta):** data sharing, styling, forms, routing.
- Örnekleri çalıştırma: (1) CRA projesinde dosyayı `src/` içine kopyala, `App.js`'te import et, `npm start` (önerilen); (2) CodeSandbox / CodePen; (3) tek HTML dosyası, CDN'den `react@18`, `react-dom@18` ve `@babel/standalone`, `<script type="text/babel">`.
- Ön koşul: HTML/CSS, JavaScript, Node.js 14+, VS Code.
- **How to Use This Guide:** başlangıç seviyesi Phase 1'i bitirip küçük proje yapar; orta seviye hooks, state management, routing'e geçer; ileri seviye rehberi referans ve ekip onboarding'i için kullanır. Kaynaklar: react.dev (learn, reference), freeCodeCamp, React TypeScript Cheatsheet, "Learning React" kitabı.

(README'de path numaraları dosya numaralarıyla aynı değil, 11 numaralı dosya da yok. `create-react-app` 2025'te deprecated oldu, güncel öneri Vite; Node 14 de çok eski, güncel araçlar 18/20+ ister.)

### Best practices (iyi pratikler)
- **Code organization (kod düzeni):** bileşenleri küçük ve tek işe odaklı tut; açıklayıcı ve tutarlı dosya adları; klasörleri feature'a veya türe göre düzenle; temiz import için **barrel export** (`index.js` üzerinden toplu dışa aktarma).
- **Performance:** gereksiz render'dan kaçın (`React.memo`, `useMemo`, `useCallback`); görselleri optimize et; code splitting (kod bölme: lazy loading, dynamic import); bundle boyutunu izle.
- **Accessibility (erişilebilirlik):** semantik HTML; ARIA label'ları; klavyeyle gezinme; ekran okuyucuyla test.
- **Security (güvenlik):** her kullanıcı girdisini doğrula; XSS'i önle (kullanıcı içeriğini sanitize et); HTTPS kullan; bağımlılıkları güncel tut.

### İleri konular ve araçlar
| Konu | Materyaldeki araçlar |
|---|---|
| State management | Local: `useState`, `useReducer`; global: Context, Redux, Zustand; server state: React Query, SWR |
| Performance | `React.memo`, `useMemo`, `useCallback`; lazy loading; Webpack, Vite |
| Testing | Unit: Jest, React Testing Library; integration: Cypress, Playwright; visual: Storybook, Chromatic |
| Deployment | Netlify, Vercel, GitHub Pages; Docker, Kubernetes; CDN: CloudFlare, AWS CloudFront |
| Araçlar | VS Code, React Developer Tools, ESLint, Prettier; build: Create React App, Vite, Next.js (SSR), Webpack |

> **Dikkat:** README tablosu forms için "form libraries" diyor ama dosyada form kütüphanesi anlatılmıyor.

## Hafta 3 özeti
1. **React** UI kurmak için bir JavaScript kütüphanesidir; declarative, component tabanlı, Virtual DOM ile gereksiz DOM işini azaltır, veri tek yönlü (parent -> child) akar.
2. **Kurulum:** CRA `npx create-react-app` + `npm start` (port 3000, deprecated), Vite `npm run dev` (port 5173), Next.js. Env değişkeni CRA'da `REACT_APP_` önekiyle.
3. **Component** büyük harfle başlar (PascalCase). Functional = JSX döndüren fonksiyon (tercih edilen); class = `extends React.Component` + zorunlu `render()`, `this.props`, `this.state`.
4. **JSX kuralları:** tek root (veya Fragment `<>...</>`), `className`, `htmlFor`, self-closing `<img />`, `{}` içinde sadece ifade (expression), `if`/`for` değil.
5. **Props** parent'tan gelir ve read-only; **state** bileşenin kendi verisidir, değişince re-render olur. Obje/dizi state'i asla mutasyonla değil spread ile kopyalayarak güncellenir; eskiye bağlıysa `setX(prev => ...)`.
6. **Lifecycle:** mounting, updating, unmounting. Class'ta `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`; function'da hepsi `useEffect` (array yok: her render, `[]`: bir kez, `[x]`: x değişince, `return` = cleanup).
7. **Event handling:** `onClick={fn}` (referans), `onClick={fn()}` değil; argüman için `() => fn(a)`; class'ta `bind`; `e.preventDefault()`; React SyntheticEvent verir.
8. **Conditional rendering:** `if` + early return, ternary `a ? <X/> : <Y/>`, `&&` (solda sayı varsa `0` basılır), `null` döndürmek.
9. **List rendering:** `map` ile, her elemana kardeşleri arasında benzersiz ve kararlı `key` (veri `id`'si); sıra değişebiliyorsa index key yapma; key `map` içindeki bileşene konur.
10. **Hooks:** sadece top level'da ve React fonksiyonlarında çağrılır. `useState`, `useEffect`, `useContext`, `useReducer` (`dispatch({type})`), `useRef` (`.current`, re-render yok), `useMemo` (değer), `useCallback` (fonksiyon referansı, `React.memo` ile anlamlı), `useLayoutEffect` (paint öncesi, senkron), `useImperativeHandle` (+ `forwardRef`), custom hook (`use` ile başlar).
11. **Data sharing:** kardeşler için lifting state up (en yakın ortak ata), derinlik artınca prop drilling yerine Context (`createContext` -> `Provider value` -> `useContext`), büyük uygulamada Redux (`store`, `Provider`, `useSelector`, `useDispatch`).
12. **Styling:** inline (obje, camelCase), CSS dosyası (global, `className`), CSS Modules (`.module.css`, yerel), styled-components (tagged template, props'a göre stil), Tailwind (utility class), Sass (değişken, nesting).
13. **Forms:** controlled = `value` + `onChange` + state; textarea'da `value`, select'te kökte `value`, checkbox'ta `checked`, radio'da ortak `name`. Çok alan için `[name]: value`. Uncontrolled = `ref` + `defaultValue`. Validation `errors` objesiyle, submit'te `preventDefault`.
14. **Routing (React Router v6):** `BrowserRouter` > `Routes` > `Route path element`; `Link`/`NavLink` (`isActive`); `:id` + `useParams`; nested + `<Outlet />`; `useNavigate`; `path="*"` 404; `<Navigate to replace />` ile protected route; `useSearchParams`.
15. **Materyal tuzakları:** örnek dosyalardaki CSS Modules, Styled Components ve router simülasyon; 07'deki function "ErrorBoundary" hata yakalayamaz (error boundary sadece class ile yazılır); `useCallback` örneği `React.memo`'suz; Redux `createStore` ve CRA eski.

---

# Hafta 4: React Native'e Giriş

## 4.1 React Native nedir, nasıl çalışır, nasıl kurulur
Kaynak: `W4/1-react-native-intro.md`

Bu haftanın hedefi dört şey: RN mimarisini anlamak, Expo ve React Native CLI ile kurulum yapmak, ilk uygulama iskeletini çalıştırmak ve platforma özgü (platform-specific) özelliklere giriş. Önceki haftalar bunun temeli: W1 mobil ekosistem, W2 JavaScript/ES6 (RN'in dili), W3 React ve JSX (bileşen mantığı RN'de aynen kullanılır).

### React Native nedir?
React Native (RN), Facebook (Meta) tarafından **2015**'te çıkarılan açık kaynak (open-source) bir mobil framework'tür. React'in bileşen mantığını mobile taşır: JavaScript ile yazarsın, ekranda gerçek native bileşenler çıkar.
- **Cross-platform** (çapraz platform): tek kod tabanı (single codebase) ile iOS ve Android.
- **Native Performance**: JavaScript bridge üzerinden gerçek native bileşenlere erişim; WebView değildir.
- **Hot Reloading**: kod değişikliği anında ekranda görünür.
- **Rich Ecosystem**: binlerce 3. parti kütüphane, büyük topluluk.
- **Platform-specific APIs**: kamera, GPS, sensör gibi cihaz özelliklerine erişim.

### Nasıl çalışır: thread'ler ve bridge
Materyal mimariyi iki ayrı listeyle anlatıyor; ikisini birleştirince resim şu:
- **JavaScript Thread**: React mantığı, state yönetimi ve UI güncellemelerinin hesabı burada.
- **Bridge** (köprü): JavaScript ile native kod arasındaki iletişim kanalı; JS tarafı "şunu çiz" mesajını bridge ile gönderir.
- **Shadow Thread**: layout (yerleşim) hesabı, **Yoga** motoru ile yapılır (flexbox'ı hesaplayan motor).
- **Native (Main) Thread**: native bileşenlerin çizilmesi ve kullanıcı etkileşimleri (dokunma vb.).

Dikkat: "3 thread" sorulursa cevap JS, Shadow, Native Main; Bridge bir thread değil, aradaki köprüdür. (Materyal Bridge'i anlatıyor; güncel RN, 0.76'dan beri Bridge yerine JSI, Fabric ve TurboModules kullanan "New Architecture" ile geliyor. Sınavda materyaldeki cevabı ver.)

### Web React ile farkları
| Konu | React (web) | React Native |
|---|---|---|
| Hedef platform | Web tarayıcı | iOS ve Android |
| UI oluşturma | DOM (`div`, `p`) | Native bileşenler (`View`, `Text`, `ScrollView`) |
| Stil | CSS | Flexbox benzeri JS stil nesneleri |
| Navigasyon | React Router | React Navigation (3. parti) |
| Build | Webpack / Vite | Metro bundler + Xcode / Android Studio |

### Expo mu, React Native CLI mı?
**Expo**, RN geliştirmeyi hızlandıran platform ve araç setidir; başlangıç için önerilen yol. **React Native CLI** ise tam native kontrol isteyenler için ileri seviye yoldur.

| | Expo | React Native CLI |
|---|---|---|
| Seviye | Başlangıç (önerilen) | İleri |
| Kurulum | Minimum, hemen kod yazılır | Xcode, CocoaPods, Android Studio, Android SDK, JDK gerekir |
| Gerçek cihazda test | Expo Go ile QR okut | Cihaza native build |
| Güncelleme | OTA (Over-The-Air): mağazaya yüklemeden güncelleme | Mağaza üzerinden |
| Hazır modüller | Kamera, konum, bildirim hazır | Kendin eklersin |
| Kısıtlar | Native modül ekleme kısıtlı, bundle boyutu sınırı, bazı platform özelliklerine sınırlı erişim | Kısıt yok, tam native kontrol |

iOS geliştirme için macOS şarttır (materyal: Xcode 12+, iOS Simulator, CocoaPods).

```bash
npx create-expo-app MyFirstApp        # Expo projesi
cd MyFirstApp && npx expo start       # geliştirme sunucusu
npx react-native@latest init MyNativeApp   # CLI projesi
cd ios && pod install && cd ..        # iOS bağımlılıkları (sadece macOS)
npx react-native run-android          # veya run-ios
```

Dikkat: Materyal önce global kurulum yaptırıyor (`npm install -g @expo/cli`, `npm install -g @react-native-community/cli`); güncel Expo'da buna gerek yok, `npx expo ...` yeter. (Materyalde `npx react-native@latest init` (W4/3'te `npx react-native init`) yazıyor, güncel karşılığı `npx @react-native-community/cli@latest init AppName`.) Materyaldeki "Xcode 12+" ve Expo kısıtları (native modül, bundle boyutu) eskidir: güncel RN çok daha yeni Xcode ister, Expo'da development build ile özel native modül eklenebilir.

### Proje yapısı ve ilk çalıştırma
- `App.js`: giriş (entry) bileşeni, uygulama buradan başlar.
- `app.json`: proje bilgileri (metadata), Expo yapılandırması.
- `package.json`: bağımlılıklar; `assets/`: resim ve statik dosyalar; `node_modules/`: kurulu paketler.
- Çalıştırma sırası: `npm install` (veya `yarn`), sonra Expo için `npx expo start`, CLI için `npx react-native run-android` / `run-ios`. Hata ve log'lar Metro bundler ekranında okunur.

### Bileşen, stil ve platform mantığı
- Temel bileşenler: `View`, `Text`, `Image`, `ScrollView`, `TextInput`, `Button`. Props, state ve hook'lar (`useState`, `useEffect`) web React ile aynı şekilde kullanılır; UI yine JSX ile yazılır.
- Stil: `StyleSheet.create()` ile tekrar kullanılabilir stil nesneleri. Flexbox varsayılanı **dikey**: `flexDirection: 'column'` (web'de `row`).
- Platform farkı: `Platform.OS` (`'ios'` / `'android'`), `Platform.select({ ios: ..., android: ... })`, `StyleSheet.hairlineWidth` (cihazdaki en ince çizgi).
- `SafeAreaView`: içeriği iPhone çentiğinin (notch) altına iter (yalnız iOS'ta etkili; güncel öneri `react-native-safe-area-context`). Hazır UI kütüphaneleri: React Native Paper, Native Base.

```tsx
const styles = StyleSheet.create({
  box: {
    flex: 1,                       // boş alanı doldur
    justifyContent: 'center',      // ana eksen (dikey)
    alignItems: 'center',          // çapraz eksen (yatay)
    padding: Platform.select({ ios: 20, android: 12 }),
  },
});
```

Dikkat: RN'de flex varsayılanı `column` olduğu için `justifyContent` dikeyde, `alignItems` yatayda çalışır. Stil adları camelCase (`backgroundColor`), birim yok (`fontSize: 16`).

## 4.2 Expo ile "Hello React Native"
Kaynak: `W4/2-example-hello-expo.md`

İlk ekranı kurup hemen çıktı görmek için yazılmış örnek. Proje `npx create-expo-app hello-rn` ile kurulur, `npx expo start` ile çalışır.

### Komutlar ve test yolları
| Komut / tuş | Ne yapar |
|---|---|
| `npx expo start` | Geliştirme sunucusunu başlatır, QR kod gösterir |
| `--tunnel` / `--lan` / `--localhost` | İnternet üzerinden / yerel ağ / sadece bu bilgisayar |
| `i` / `a` / `w` | iOS simülatör / Android emülatör / web tarayıcı |
| `npx expo start --web` | Doğrudan web'de aç |
| `npx expo --help` | Komut listesi |
| `npx expo whoami` | Giriş yapmış Expo hesabını gösterir |
| `npx expo doctor` | Proje yapılandırmasını kontrol eder |
| `npx expo r -c` | Önbelleği (cache) temizleyerek başlatır |

- **Expo Go**: telefona indirilen uygulama; QR kodu okutunca proje gerçek cihazda açılır, kamera ve konum gibi native özelliklere erişir.
- Yenileme türleri: **Hot Reloading** (değişikliği anında göster), **Fast Refresh** (bileşeni state'i koruyarak yeniden yükle), **Live Reloading** (uygulamayı baştan başlat).

Dikkat: (Materyalde `whoami` için "proje bilgisini gösterir" yazıyor, doğrusu giriş yapmış hesabın kullanıcı adını gösterir.) (Materyal OTA'yı Expo Go özelliği olarak sayıyor, doğrusu OTA Expo'nun güncelleme servisinin (EAS Update) özelliğidir.) Güncel sürümlerde Hot Reloading ve Live Reloading yerini Fast Refresh'e bıraktı; `expo doctor` yerine `npx expo-doctor`, `r -c` yerine `npx expo start -c` kullanılıyor.

### Temel ve etkileşimli App.js
- Temel sürüm: `SafeAreaView` kök kapsayıcı, `StatusBar` (`expo-status-bar`'dan) üst bilgi çubuğu; ekranda ortalanmış "Hello React Native" ve `Platform.OS` + `Platform.Version` (örn. "Platform: ios 17.0").
- Etkileşimli sürümde `count` ve `message` state'i var; `{'\n'}` Text içinde satır sonu yapar.
- Etkileşimli sürümde `TouchableOpacity` (dokunulabilir alan) `onPress` ve `onLongPress` (uzun basma) alır; `Alert.alert(başlık, mesaj, butonlar)` native uyarı penceresi açar.
- Gölge: iOS'ta `shadowColor/Offset/Opacity/Radius`, Android'de `elevation`.

```tsx
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, SafeAreaView, Platform, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setCount(count + 1)}
        onLongPress={() => Alert.alert('Platform', Platform.OS)}>
        <Text>Click Count: {count}</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
```

Dikkat: (Materyalin etkileşimli sürümünde `StatusBar` `react-native`'den import ediliyor ama `style="auto"` veriliyor; `style` prop'u `expo-status-bar`'ındır, RN'inki `barStyle` alır.) `setCount(count + 1)` sonrası `if (count >= 5)` eski değeri okur, alert 6. basışta çıkar. Materyaldeki `message` state'i hiç değiştirilmiyor, `const` yeterdi.

### Önerilen klasör yapısı
`components/` (tekrar kullanılan bileşenler), `screens/` (ekranlar), `hooks/` (custom hook'lar), `utils/` (yardımcı fonksiyonlar), `constants/` (renk gibi sabitler), `assets/images` ve `assets/fonts`. Kökte `App.js`, `app.json`, `package.json`.

## 4.3 Değişkenler ve sabitler: var, let, const
Kaynak: `W4/3-react-native-variable-const.md`

RN düz JavaScript kullandığı için değişken tanımlama W2'deki ile aynı; fark, bunları bileşen içinde ekrana basmak.

| Özellik | var | let | const |
|---|---|---|---|
| Yeniden tanımlanabilir (redeclare) | Evet | Hayır | Hayır |
| Yeniden atanabilir (reassign) | Evet | Evet | Hayır |
| Kapsam (scope) | Fonksiyon | Blok | Blok |
| Hoisting (yukarı taşınma) | Evet (`undefined` ile) | TDZ var | TDZ var |

- `const`: değişmeyecek değerler (uygulama adı, `maxCount`). Varsayılan tercih budur.
- `let`: değişecek değerler. `var`: kullanma, eski yöntem.
- Anlamlı isim ver (`maxRetryCount`, `x` değil); değişkenleri başta tanımla.
- Örnek 1 (`VariableExample`): `let userCount = 0; let isOnline = true;` render'dan önce `userCount + 1` ve `false` yapılır; ekranda "User Count: 1", "Online: No" (`isOnline ? 'Yes' : 'No'`).
- Örnek 2 (`DynamicVariableExample`, aşağıda): state'ten türetilen `canIncrement`/`canDecrement` butonu `disabled` yapar, stil dizisi `[styles.button, !canDecrement && styles.disabledButton]` gri gösterir; `isComplete` (count 10) iken `{isComplete && <Text>...</Text>}` "maximum value" mesajı çıkar.
- Scope örneği: `var functionVar` fonksiyonun her yerinde, `if` içindeki `let blockVar`/`const blockConst` blok dışında `ReferenceError`.

```tsx
export default function DynamicVariableExample() {
  const [count, setCount] = useState(0);
  const maxCount = 10;                        // sabit
  let canIncrement = count < maxCount;        // her render'da yeniden hesaplanır
  const progress = (count / maxCount) * 100;  // türetilmiş değer
  return (
    <TouchableOpacity disabled={!canIncrement} onPress={() => setCount(count + 1)}>
      <Text>{count} (%{progress.toFixed(0)})</Text>
    </TouchableOpacity>
  );
}
```

Dikkat: (Materyalde let/const için hoisting "yok" yazıyor, doğrusu hoist edilirler ama TDZ (Temporal Dead Zone, geçici ölü bölge) yüzünden tanımdan önce erişim ReferenceError verir.) (Materyalde const "immutable" deniyor, doğrusu const sadece yeniden atamayı engeller; nesne/dizi içeriği değişebilir.) Bileşen içinde `let userCount = 0; userCount++` ekranı kalıcı güncellemez; her render'da baştan başlar, kalıcı değer için state gerekir. Blok içinde `let` ile tanımlanan değişkene blok dışından erişmek hata verir.

## 4.4 Props
Kaynak: `W4/4-react-native-props.md`

Props (properties, özellikler), bir bileşenden diğerine veri göndermenin yoludur. Parent (üst) bileşen child'ı (alt) props ile özelleştirir; böylece aynı bileşen farklı verilerle tekrar kullanılır.
- Veri yönü tek: parent'tan child'a.
- Props **salt okunurdur** (read-only); child onları değiştirmez.
- Props destructuring ile alınır: `function Message({ title, message, color })`; `{ color }` = `{ color: color }` kısaltması.
- Varsayılan değer (default props) destructuring içinde verilir: `function Greeting({ name = 'Guest', age = 0 })` → `<Greeting name="Jane" />` "Hello Jane! Your age: 0", `<Greeting />` "Hello Guest! Your age: 0".
- String tırnakla (`title="Save"`), diğer değerler süslüyle verilir (`age={25}`, `disabled={true}`).
- Fonksiyon da prop olarak gönderilir; child, parent'a bu fonksiyonu çağırarak haber verir.
- Stil dizisi ile prop'a göre stil: `style={[styles.button, { backgroundColor: color }]}`.

```tsx
function CustomButton({ title, onPress, color = '#007AFF', disabled = false }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}
      style={{ backgroundColor: disabled ? '#ccc' : color, padding: 15 }}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
// <CustomButton title="Kaydet" color="#28A745" onPress={save} />
// <ChildComponent onButtonClick={(msg) => alert(msg)} />
```

| Props | State |
|---|---|
| Dışarıdan (parent'tan) gelir | Bileşenin içinde oluşur |
| Salt okunur | Değiştirilebilir (setter ile) |
| Parent kontrol eder | Bileşen kendisi yönetir |

Dikkat: (Materyalde `count = count + 1` için "ERROR: props değiştirilemez" yazıyor, doğrusu destructure edilmiş yerel değişkene atama hata fırlatmaz ama parent'ı da etkilemez; kural, props nesnesini değiştirmemektir.) (Materyaldeki `onPress={delete}` geçersiz JS'tir: `delete` ayrılmış kelime, SyntaxError verir.) `borderLeftWidth` verip `borderLeftColor` vermezsen kenarlık siyah çıkar.

## 4.5 State
Kaynak: `W4/5-react-native-state.md`

State (durum), bileşenin içinde tuttuğu ve zamanla değişen veridir. State değişince bileşen otomatik olarak yeniden çizilir (re-render); düz değişkende bu olmaz.
- `useState(başlangıç)` bir dizi döner: `[değer, setter]`.
- State'i doğrudan değiştirme (`count = count + 1` yanlış); setter kullan.
- Önceki değere bağlı güncellemede fonksiyonel biçim daha iyidir: `setCount(prev => prev + 1)`.
- Birden çok state olabilir, her biri ayrı yönetilir (`name`, `age`, `isActive`).
- `SimpleCounter`: `setCount(count + 1)`, `setCount(count - 1)`, Reset `setCount(0)`; alt sınır yok, negatife iner.
- Setter anında değiştirmez: `setCount(count + 1)` satırından hemen sonra `count` hâlâ eski değerdir (4.2'deki 6. basış hatasının sebebi).
- Form: `TextInput`'a `value={name}` ve `onChangeText={setName}` verilir (kontrollü input).

```tsx
export default function SimpleForm() {
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = () => {
    if (name.trim() === '') { Alert.alert('Error', 'Please fill all fields'); return; }
    setIsSubmitted(true);
  };
  return (
    <View>
      <TextInput value={name} onChangeText={setName} placeholder="Enter your name" />
      <TouchableOpacity onPress={handleSubmit}><Text>Submit</Text></TouchableOpacity>
      {isSubmitted && <Text>Form submitted successfully!</Text>}
    </View>
  );
}
```

Dikkat: `name.trim() === ''` boşluklu girişi de boş sayar (doğrulama, validation). `{koşul && <Bileşen />}` koşullu render'dır. Materyalin test adımlarında "Reset" butonu deniyor, koddaki buton "New Form" ve sadece gönderimden sonra görünür.

## 4.6 Hooks: useState ve useEffect
Kaynak: `W4/6-react-native-hooks.md`

Hook'lar, function component'lerde state ve yaşam döngüsü (lifecycle) özelliklerini kullanmamızı sağlayan özel fonksiyonlardır; class component'e gerek bırakmazlar.
- `useState`: bileşende state yönetimi. Örnekler: `Counter` (Decrement'e iki basış "Counter: -2"), `TextInputExample` ("Hi" yazınca "You wrote: Hi", "Character count: 2").
- `WelcomeMessage`: `useEffect(() => { setTimeout(() => setMessage('Welcome!'), 2000) }, [])`; önce "Loading...", 2 sn sonra "Welcome!".
- `Timer`: Start/Stop sadece `isRunning`'i değiştirir; Stop sonrası Start kaldığı saniyeden devam eder, yalnız Reset 0 yapar.
- `useEffect(fn, deps)`: yan etkiler (side effects) için: API çağrısı, timer. Bileşen mount (ekrana gelince), update ve unmount (ekrandan kalkınca) anlarında çalışır.
- Bağımlılık dizisi (dependency array): `[]` sadece ilk yüklemede; `[isRunning]` o değer değişince; dizi yoksa her render'da.
- `useEffect`'in döndürdüğü fonksiyon **cleanup**'tır (temizlik): unmount'ta ve effect yeniden çalışmadan önce çalışır, bellek sızıntısını (memory leak) önler.

**Hook kuralları:** sadece function component'te kullan; her zaman bileşenin en üst seviyesinde çağır; koşul, döngü veya iç içe fonksiyon içinde çağırma.

```tsx
useEffect(() => {
  let interval;
  if (isRunning) {
    interval = setInterval(() => {
      setSeconds(s => s + 1);          // fonksiyonel güncelleme
    }, 1000);
  }
  return () => clearInterval(interval); // cleanup
}, [isRunning]);
```

Dikkat: Timer'da `setSeconds(seconds + 1)` yazsaydın deps `[isRunning]` olduğu için eski `seconds` değerine takılırdı; fonksiyonel biçim bu yüzden şart. (Materyal WelcomeMessage örneğinde cleanup ve console.log anlatıyor ama kodda ikisi de yok; doğrusu `const t = setTimeout(...); return () => clearTimeout(t);`.)

## 4.7 Temel bileşenlere ilk bakış (repodan silinmiş dosya)
Kaynak: `kurtarilan/W4_7-example-basic-components.md`

RN'de HTML etiketi yoktur; her şey hazır native bileşenlerle kurulur. Bu dosya her birini tek örnekle tanıtıyor.

| Bileşen | Ne işe yarar | Önemli props |
|---|---|---|
| `View` | Kapsayıcı (container), layout; web'deki `div` | `style`, `onLayout` |
| `Text` | Metin; RN'de metin sadece `Text` içinde yazılır | `style`, `numberOfLines` |
| `Image` | Resim; uzak resimde `source={{ uri }}` | `source`, `style`, `resizeMode` (`cover`, `contain`) |
| `ScrollView` | Kaydırılabilir kapsayıcı; tüm içeriği bir kerede çizer | `contentContainerStyle`, `showsVerticalScrollIndicator` |
| `FlatList` | Büyük listeler için, sadece görünen öğeleri çizer | (örnek kodu dosyada yok) |
| `TouchableOpacity` | Basınca saydamlaşan dokunulabilir alan | `onPress`, `activeOpacity` |
| `TextInput` | Metin girişi | `value`, `onChangeText`, `placeholder`, `keyboardType`, `autoCapitalize`, `autoCorrect` |

- `Dimensions.get('window').width` ekran genişliğini verir (`width - 40` gibi hesaplarda); `borderRadius` yarı boyut olunca resim yuvarlak olur.
- `resizeMode`: `cover` alanı doldurur, taşanı kırpar; `contain` resmin tamamını sığdırır, boşluk kalabilir.
- `Text` stilinde `lineHeight`, `textDecorationLine: 'underline'`; `TouchableOpacity` örneğinde `activeOpacity={0.7}` ve "Press Me ({count})" sayacı.
- Listede her öğeye `key` verilir (`Array.from({ length: 20 }, (_, i) => <View key={i} />)`).
- İyi pratikler: `StyleSheet.create()` kullan, resimlerde uygun `resizeMode`, klavye için `KeyboardAvoidingView`, büyük listede ScrollView yerine `FlatList`, iki platformda da test et.

```tsx
const { width } = Dimensions.get('window');
<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
  <Image source={{ uri: 'https://picsum.photos/300/200' }}
         style={{ width: width - 40, height: 200 }} resizeMode="cover" />
  <TextInput keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
</View>
```

Dikkat: Uzak resimde `width`/`height` vermezsen resim görünmez. Materyalde `FlatList.js` import ediliyor ama kodu yok, olduğu gibi çalıştırılırsa "module not found" verir. "Clickable link" metninde `onPress` yok, tıklanmaz; iç içe aynı yönde `ScrollView` Android'de düzgün kaymaz.

## Hafta 4 özeti
- RN: Meta, 2015, açık kaynak; tek kod tabanıyla iOS + Android, WebView değil gerçek native bileşen.
- Mimari: JS Thread (React mantığı), Bridge (JS ile native arası köprü), Shadow Thread (Yoga ile layout), Native Main Thread (çizim ve etkileşim).
- Web farkı: DOM yerine `View`/`Text`, CSS yerine stil nesnesi, React Router yerine React Navigation, Webpack yerine Metro.
- Expo başlangıç için (Expo Go, OTA, hazır modüller, ama native modül kısıtı); CLI tam kontrol için (Xcode, CocoaPods, Android Studio, JDK).
- Komutlar: `npx create-expo-app`, `npx expo start` (`i`/`a`/`w`, `--tunnel`/`--lan`/`--localhost`), `npx react-native run-android`/`run-ios`.
- `App.js` giriş bileşeni, `app.json` yapılandırma, `assets/` statik dosyalar.
- Flexbox varsayılanı `column`; `StyleSheet.create`, `Platform.OS`/`Platform.select`, `SafeAreaView`.
- `const` varsayılan, `let` değişecekse, `var` kullanma; let/const blok kapsamlı ve TDZ'li.
- Props: parent'tan child'a, salt okunur, default değer ve fonksiyon gönderilebilir.
- State: `useState`, setter ile güncelle, değişince re-render; önceki değere bağlıysa `prev => prev + 1`.
- `useEffect`: `[]` bir kez, `[x]` x değişince; cleanup ile `clearInterval`/`clearTimeout`. Hook'lar sadece üst seviyede.
- Bileşenler: `View`, `Text`, `Image` (`uri` + boyut), `ScrollView` (küçük içerik), `FlatList` (büyük liste), `TouchableOpacity`, `TextInput` (`value` + `onChangeText`).

---

# Hafta 6: React Native Core Components

Kaynak: `W6/README.md`  
Expo Blank (JavaScript) şablonunda ekranı kuran temel parçalar (core components, çekirdek bileşenler). Her bileşen için bil: ne işe yarar, önemli prop'ları (özellikleri) ve event'leri (olayları), tuzakları. İlk 9 bileşen `react-native`'den gelir; Picker ve Checkbox ayrı paket kurar; RadioButton hazır gelmez, kendin yazarsın. Örnekler `app.js` içinde ekran olarak denenir; README `expo start` diyor, güncel komut `npx expo start` (global expo-cli emekli). README'nin linklediği `StudentExercise.md` repoda yok.

| Bileşen | Ne işe yarar | Nereden import |
|---|---|---|
| View | Kutu / kapsayıcı, flexbox ile yerleşim | `react-native` |
| Text | Ekrana yazı basmak | `react-native` |
| Image | Yerel veya uzak görsel | `react-native` |
| TextInput | Kullanıcıdan metin almak | `react-native` |
| Button | Hazır, native görünümlü buton | `react-native` |
| ScrollView | Kısa içeriği kaydırılabilir yapmak | `react-native` |
| FlatList | Uzun / dinamik liste (virtualization) | `react-native` |
| TouchableOpacity | Her şeyi basılabilir yapan, opaklıkla geri bildirim veren sarmalayıcı | `react-native` |
| SafeAreaView | İçeriği çentik, köşe ve sistem çubuklarından uzak tutmak | `react-native` veya `react-native-safe-area-context` |
| Picker | Açılır liste / tekerlek seçici | `@react-native-picker/picker` |
| RadioButton | Tek seçim (kendi bileşenin) | Yok; `Pressable` ile yazılır |
| Checkbox | Çoklu seçim / onay kutusu | `expo-checkbox` |

## 6.1 View
Kaynak: `W6/components/View.md`  
View, React Native'in temel kapsayıcısıdır; web'deki `div` gibi düşün ama konumlandırma tamamen flexbox ile yapılır. Hizalama, boşluk, gölge gibi her yerleşim işi View'larla kurulur.  
Import: `import { View } from 'react-native';`

**En önemli prop'lar:**
- `style`: flexbox yerleşimi, arka plan, kenarlık, gölge, opaklık.
- `pointerEvents`: dokunmaların çocuklara geçip geçmeyeceği; overlay (üst katman) senaryolarında kritik.
- `accessible`: erişilebilirlik modunda tek öğe olarak okunsun mu.
- `accessibilityLabel`: ekran okuyucuya (screen reader) açıklayıcı etiket.
- `accessibilityRole` / `accessibilityHint`: öğenin rolü ve ne yapacağına dair ipucu.
- `collapsable`: Android'de boş View'ların ağaçtan kaldırılmasını kontrol eder (performans).
- `focusable`: klavye / TV platformlarında odak alabilsin.
- `testID`: otomasyon testlerinde View'ı bulmak için benzersiz kimlik.

**Event'ler:** `onLayout` (yerleşim veya boyut değişince; `event.nativeEvent.layout` ile width/height), `onStartShouldSetResponder` / `onMoveShouldSetResponder` (dokunma sistemini sahiplen), `onResponderGrant` / `onResponderMove` / `onResponderRelease` (jest döngüsünün aşamaları; sürükle-bırak, kaydırma), `onAccessibilityTap` (erişilebilirlik kısayolu).

```jsx
const [cardsPerRow, setCardsPerRow] = useState(2);
<View
  style={{ flex: 1, padding: 24 }}
  onLayout={(e) => setCardsPerRow(e.nativeEvent.layout.width > 500 ? 3 : 2)}
>
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
    {COURSES.map((t) => (
      <View key={t} style={{ width: `${100 / cardsPerRow - 4}%` }}><Text>{t}</Text></View>
    ))}
  </View>
</View>
```

**Dikkat:** View içine düz metin yazılmaz, metin her zaman `<Text>` içinde olur. Tekrarlanan stilleri `StyleSheet.create` ile topla; ScrollView içinde çok derin View ağaçları performansı düşürür.

## 6.2 Text
Kaynak: `W6/components/Text.md`  
Okunabilir her içerik Text ile gösterilir: başlık, paragraf, etiket, link. Text iç içe kullanılabilir (nestable); bir cümlenin bir kısmını farklı stillendirmek için içine başka Text koyarsın.  
Import: `import { Text } from 'react-native';`

**En önemli prop'lar:**
- `style`: font ailesi, boyut, renk, satır yüksekliği, hizalama.
- `numberOfLines`: en fazla kaç satır gösterilsin; taşan kısım kesilir veya `...` olur.
- `ellipsizeMode`: taşma nasıl gösterilsin (`head`, `middle`, `tail`, `clip`).
- `selectable`: kullanıcı metni seçip kopyalayabilsin.
- `allowFontScaling`: sistemin yazı boyutu ayarına (dynamic type) uysun mu; genelde açık bırakılır.
- `onTextLayout`: render edilen metni satır satır raporlar.
- `pressRetentionOffset`: basılı tutarken aktif alanın ne kadar dışarı taşabileceği (link hissi).
- `textBreakStrategy` (Android): uzun paragraflarda satır kırma stratejisi.

**Event'ler:** `onPress` (link davranışı), `onLongPress` (bağlam menüsü), `onLayout`, `onPressIn` / `onPressOut` (basma başı / sonu).

```jsx
<Text style={{ color: '#facc15', fontWeight: '600' }}>
  Highlights: <Text style={{ fontWeight: '400' }}>{highlights}</Text>
</Text>
<Text numberOfLines={2} ellipsizeMode="tail">Uzun açıklama metni...</Text>
<Text
  style={{ textDecorationLine: 'underline' }}
  onPress={() => Linking.openURL('https://reactnative.dev/docs/text')}
>
  Dokümana git
</Text>
```

**Dikkat:** Text içine View konmaz, sadece başka Text konur. `ellipsizeMode` tek başına işe yaramaz, `numberOfLines` ile birlikte verilir. Uzun metni küçük Text parçalarına böl (okunur ve stillenir).

## 6.3 Image
Kaynak: `W6/components/Image.md`  
Yerel (projeye gömülü) ve uzak (internetten) görselleri aynı API ile gösterir; önbellekleme (caching) ve çözünürlüğe göre kaynak seçimi platform tarafından yapılır.  
Import: `import { Image } from 'react-native';`

**En önemli prop'lar:**
- `source`: `require('./assets/logo.png')` (yerel) veya `{ uri: 'https://...' }` (uzak). Yerel asset'te Metro boyutu kendisi ekler.
- `resizeMode`: görsel kutuya nasıl sığsın (`cover`, `contain`, `stretch`, `repeat`, `center`).
- `style`: boyut, köşe yuvarlama, kenarlık; oranı korumak için `aspectRatio` ile birleştir.
- `defaultSource`: ana görsel yüklenirken gösterilen yer tutucu (placeholder). Materyal "iOS only" diyor; yeni RN sürümlerinde Android release build'de de çalışır.
- `blurRadius`: bulanıklaştırma; arka plan veya iskelet (skeleton) durumları için.
- `loadingIndicatorSource` (Android): indirme sırasında gösterilecek özel yükleyici görsel.
- `fadeDuration` (Android): yüklenince fade-in (belirme) animasyon süresi.
- `progressiveRenderingEnabled` (Android): uzak görseli parça parça (progressive) göstererek algılanan hızı artırır. (Materyalde "iOS" yazıyor, doğrusu Android.)

**Event'ler:** `onLoadStart` (yükleme başladı, spinner aç), `onLoad` (başarıyla bitti; boyutlar `nativeEvent.source` altında), `onLoadEnd` (başarılı ya da değil, bitti; loader kapat), `onError` (yüklenemedi; yedek görsel göster), `onProgress` (sadece uzak kaynak; indirilen byte, ilerleme çubuğu).

```jsx
const [status, setStatus] = useState('loading');
const [uri, setUri] = useState(PRIMARY_URI);
<View style={{ height: 220 }}>
  {status === 'loading' && <ActivityIndicator />}
  <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode="cover"
    onLoadStart={() => setStatus('loading')}
    onLoad={() => setStatus('loaded')}
    onError={() => { setStatus('fallback'); setUri(FALLBACK_URI); }}
  />
</View>
```

**Dikkat:** Uzak (`uri`) görselin boyutu bilinmez, `style` ile width/height vermezsen görünmez (materyal bunu açıkça yazmıyor, sadece örneklerde var). `require` içine değişken yazılmaz, yol sabit string olmalı. Büyük uzak görselleri önceden küçült; açılış ekranı ve ikonlar için Expo Asset ile önceden paketle.

## 6.4 TextInput
Kaynak: `W6/components/TextInput.md`  
Kullanıcıdan metin almanın ana yolu: formlar, arama kutuları, sohbet girişi, kayıt ekranları. Controlled (kontrollü, değeri state'te tutulan) veya uncontrolled (kontrolsüz) kullanılabilir.  
Import: `import { TextInput } from 'react-native';`

**En önemli prop'lar:**
- `value`: gösterilen metin; controlled kullanım için şart.
- `onChangeText`: her tuşta yeni metni (string) verir; anlık doğrulama burada.
- `placeholder`: alan boşken görünen ipucu metni.
- `keyboardType`: klavye tipi (`default`, `email-address`, `numeric` vb.). Sayısal klavye: `keyboardType="numeric"`; değer yine string gelir, `Number(...)` ile çevir.
- `secureTextEntry`: şifre alanı, karakterleri gizler (iOS'ta güvenli giriş davranışlarını da açar). Şifre: `<TextInput secureTextEntry value={pw} onChangeText={setPw} />`.
- `autoCapitalize`: otomatik büyük harf (`none`, `sentences`, `words`, `characters`).
- `autoCorrect`: otomatik düzeltme; arama ve kullanıcı adı alanlarında kapat.
- `returnKeyType`: Enter tuşunun etiketi (`go`, `next`, `send`, `done`, `search`...).
- `maxLength`: en fazla karakter sayısı.
- `textContentType` (iOS) / `autoComplete` (Android 13+): sistemin otomatik doldurma (auto-fill) özelliği; e-posta, şifre vb.
- `selectionColor`: imleç ve seçim vurgusunun rengi.

**Event'ler:** `onFocus` (odak aldı), `onBlur` (odak kaybetti; doğrulama / kaydetme), `onSubmitEditing` (Enter / done basıldı; sonraki alana geç), `onChange` (`onChangeText` gibi ama ham event nesnesi verir), `onEndEditing` (düzenleme bitti; ağ isteği gibi ağır işler), `onSelectionChange` (imleç / seçim aralığı), `onKeyPress` (tuş basımı, kısayollar).

```jsx
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const [value, setValue] = useState('');
const isValid = EMAIL_REGEX.test(value);
<TextInput
  value={value}
  onChangeText={setValue}
  keyboardType="email-address"
  autoCapitalize="none"
  placeholder="name@example.com"
  style={{ borderWidth: 1, borderColor: isValid ? '#22c55e' : '#ef4444' }}
/>
```

**Dikkat:** `value` verip `onChangeText` vermezsen alan kilitlenir, yazılan görünmez. `onChangeText` string verir, `onChange` event nesnesi verir; karıştırma. Controlled mı uncontrolled mı, performansa göre seç (uncontrolled: `value` verme). Listede olmayıp örneklerde geçenler: `multiline` (çok satır, Text Örnek 2), `placeholderTextColor` (placeholder rengi). Uzun formlarda klavye alanı kapatmasın diye `KeyboardAvoidingView` ile sar.

## 6.5 Button
Kaynak: `W6/components/Button.md`  
Platformun kendi native butonunu çizen hazır bileşen. Hızlı prototip ve tek aksiyonlu basit akışlar için idealdir; özelleştirme çok sınırlıdır.  
Import: `import { Button } from 'react-native';`

**En önemli prop'lar:**
- `title`: buton üzerindeki yazı (zorunlu).
- `onPress`: basılınca çalışan fonksiyon.
- `color`: iOS'ta yazı rengi, Android'de arka plan rengi.
- `disabled`: butonu pasif yapar, görünümü de soluklaşır.
- `accessibilityLabel`: ekran okuyucu için açıklama.
- `accessibilityRole`: varsayılan `button`.
- `testID`: otomasyon testi kimliği.
- `touchSoundDisabled` (Android): dokunma sesini kapatır.

**Event'ler:** sadece `onPress` (önce kısa ripple / opaklık animasyonu, sonra handler). `onPressIn` / `onPressOut` yoktur; bunlar gerekiyorsa `Pressable` kullan.

```jsx
const [timeLeft, setTimeLeft] = useState(10);
const [isRunning, setRunning] = useState(false);
<Button
  title={isRunning ? 'Pause' : 'Start'}
  onPress={() => setRunning((prev) => !prev)}
  color={isRunning ? '#f97316' : '#2563eb'}
/>
<Button title="Reset" onPress={() => { setTimeLeft(10); setRunning(false); }}
  disabled={timeLeft === 10 && !isRunning} />
```

**Dikkat:** Button `style` prop'u almaz, içine çocuk (ikon, View) da konmaz; yazı `title` ile verilir. `color` iki platformda farklı şeyi boyar. Özel stil isteniyorsa: dış boşluk için Button'ı bir `View` ile sar; gerçek özel görünüm (arka plan, köşe, ikon) için `Pressable`, `TouchableOpacity`, `TouchableHighlight` veya `TouchableWithoutFeedback` + içine `<Text>` ile kendi butonunu yaz (6.8). Görünüm platforma göre değişir; birebir tasarımda özel buton daha iyidir. (Örnek 1 tuzağı: iki alan boşsa `Number('')` 0 olduğu için sonuç "0" çıkar.)

## 6.6 ScrollView
Kaynak: `W6/components/ScrollView.md`  
Ekrana sığmayan içeriği kaydırılabilir yapar: formlar, uzun bilgi sayfaları, yatay kart galerileri. Tüm çocukları tek seferde render eder; bu yüzden kısa içerik için uygundur.  
Import: `import { ScrollView } from 'react-native';`

**En önemli prop'lar:**
- `horizontal`: true ise yatay kaydırma.
- `contentContainerStyle`: içteki içerik kapsayıcısının stili (padding, hizalama, `gap`).
- `showsVerticalScrollIndicator` / `showsHorizontalScrollIndicator`: kaydırma çubuklarını göster / gizle.
- `refreshControl`: aşağı çekip yenileme (pull-to-refresh) için `<RefreshControl />` alır.
- `pagingEnabled`: sayfa sayfa oturur; onboarding, carousel.
- `stickyHeaderIndices`: verilen indeksteki çocukları üstte sabitler (tablo başlığı).
- `keyboardShouldPersistTaps`: klavye açıkken dokunmalar ne olsun (`always`, `never`, `handled`).
- `nestedScrollEnabled`: Android'de iç içe kaydırılabilirler için gerekli.
- `contentInset` / `contentOffset` (iOS): başlangıç iç boşluğu ve kaydırma konumu.
- `scrollEnabled`: false ise içerik görünür ama kaydırılamaz.
- `scrollEventThrottle`: `onScroll`'un kaç ms'de bir tetikleneceği (örnekte 16 = yaklaşık 60 fps; listede açıklanmamış).

**Event'ler:** `onScroll` (kaydırma boyunca), `onContentSizeChange` (içerik boyutu değişince), `onScrollBeginDrag` / `onScrollEndDrag` (sürükleme başladı / bitti), `onMomentumScrollBegin` / `onMomentumScrollEnd` (atalet kaydırması başladı / bitti), `onScrollToTop` (iOS; durum çubuğuna dokunup başa dönüldü).

```jsx
const handleScroll = (e) => {
  const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
  if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
    setReachedEnd(true);
  }
};
<ScrollView onScroll={handleScroll} scrollEventThrottle={16}
  contentContainerStyle={{ padding: 18 }}>
  <Text>{TERMS}</Text>
</ScrollView>
<Button title="Accept terms" disabled={!reachedEnd} onPress={() => setAccepted(true)} />
```

**Dikkat:** Padding / `gap` gibi içerik stilleri `style`'a değil `contentContainerStyle`'a yazılır. Büyük veri için ScrollView değil FlatList veya SectionList kullan. ScrollView içine aynı yönde FlatList koyma; iç içe kaydırmada Android'de `nestedScrollEnabled` aç.

## 6.7 FlatList
Kaynak: `W6/components/FlatList.md`  
Uzun veya dinamik listeler için optimize edilmiş liste. Virtualization (sanallaştırma) ile sadece ekranda görünen öğeleri render eder; binlerce satırda bile akıcıdır. Feed, ürün listesi, sohbet; dikey, yatay ve grid (ızgara) düzeni destekler.  
Import: `import { FlatList } from 'react-native';`

**En önemli prop'lar:**
- `data`: render edilecek dizi.
- `renderItem`: her öğenin nasıl çizileceği; `{ item, index, separators }` alır.
- `keyExtractor`: her öğeye benzersiz key (string) üretir.
- `ListHeaderComponent` / `ListFooterComponent`: listenin başına / sonuna içerik (filtre, yükleniyor göstergesi).
- `ListEmptyComponent`: `data` boşken gösterilecek arayüz.
- `ItemSeparatorComponent`: satırlar arasına otomatik ayırıcı.
- `refreshing` / `onRefresh`: pull-to-refresh durumu ve tetikleyicisi (ikisini birlikte ver). Materyal Örnek 2 bunun yerine `refreshControl={<RefreshControl refreshing onRefresh tintColor />}` kullanıyor; aynı iş, renk ayarı da verilir.
- `onEndReached` / `onEndReachedThreshold`: sona yaklaşınca yeni sayfa yükleme (infinite scroll). `0.4`: içeriğin sonuna, görünür liste yüksekliğinin 0.4 katı kalınca tetiklenir.
- `initialNumToRender`: ilk anda kaç öğe render edilsin.
- `windowSize`, `maxToRenderPerBatch`, `updateCellsBatchingPeriod`: virtualization ince ayarı.
- `numColumns` / `columnWrapperStyle`: grid (çok sütun) düzeni ve satır sarmalayıcı stili; `columnWrapperStyle` sadece `numColumns > 1` iken geçerli.
- `horizontal`: yatay liste (listede yok, Overview "yatay" diyor); `numColumns` ile birlikte kullanılmaz.
- `getItemLayout`: öğe boyutunu önceden bildirir; ölçmeden hızlı `scrollToIndex`.
- `removeClippedSubviews`: ekran dışı satırları native ağaçtan çıkarır (bellek).

**Event'ler:** `onEndReached` (sona yaklaşıldı), `onRefresh` (kullanıcı çekip bırakınca, yenileme başlarken çağrılır; bitişini sen `refreshing={false}` ile bildirirsin. Materyalde "yenileme bitince" yazıyor, doğrusu başlarken), `onViewableItemsChanged` (görünen öğeler değişti; analitik, otomatik video), `onScroll`, `onScrollToIndexFailed` (`scrollToIndex` başarısız; yedek davranış).

```jsx
const [completed, setCompleted] = useState({});
<FlatList
  data={MODULES}
  keyExtractor={(item) => item.id}
  ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
  renderItem={({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>{item.title}</Text>
      <Switch value={!!completed[item.id]}
        onValueChange={(v) => setCompleted((p) => ({ ...p, [item.id]: v }))} />
    </View>
  )}
  ListEmptyComponent={<Text>Liste boş</Text>}
/>
```

Pull-to-refresh + sonsuz kaydırma (Örnek 2'nin düzeltilmiş hali):
```jsx
const [notes, setNotes] = useState([]);
const [page, setPage] = useState(1);
const [refreshing, setRefreshing] = useState(false);
const [loadingMore, setLoadingMore] = useState(false);
const busy = useRef(false); // eşzamanlı yüklemeyi engeller
const loadPage = async (p, isRefresh = false) => {
  if (busy.current) return;
  busy.current = true;
  isRefresh ? setRefreshing(true) : setLoadingMore(true);
  const items = await fetchPage(p);
  setNotes((prev) => (isRefresh ? items : [...prev, ...items]));
  setPage(p + 1);
  setRefreshing(false); setLoadingMore(false);
  busy.current = false;
};
useEffect(() => { loadPage(1, true); }, []); // ilk yükleme bir kez
<FlatList data={notes} keyExtractor={(i) => i.id} renderItem={renderNote}
  refreshing={refreshing} onRefresh={() => loadPage(1, true)}
  onEndReached={() => loadPage(page)} onEndReachedThreshold={0.4}
  ListFooterComponent={loadingMore ? <ActivityIndicator /> : null} />
```

**Dikkat:** Materyaldeki Örnek 2'de sonsuz yeniden yükleme döngüsü var: `loadPage` `useCallback(..., [loadingMore, refreshing])` ile tanımlı ve `useEffect(() => { loadPage(1, true); }, [loadPage])`. `refreshing` her değiştiğinde `loadPage` yeniden oluşur, effect yeniden çalışır: yaklaşık her 600 ms'de sayfa 1 tekrar yüklenir, eklenen sayfalar sıfırlanır. (Materyalde `[loadPage]` bağımlılığı var, doğrusu yukarıdaki gibi ilk yüklemeyi `[]` ile bir kez yapmak ve guard'ı `useRef`'te tutmak.) `keyExtractor` string döndürmeli (`String(id)`). `renderItem`'ı `useCallback` ile sar; büyük listede `getItemLayout` ver; `onEndReached` birden fazla kez tetiklenebilir, yükleme bayrağıyla koru.

## 6.8 TouchableOpacity
Kaynak: `W6/components/TouchableOpacity.md`  
İçine koyduğun her şeyi (metin, ikon, görsel, karmaşık yerleşim) basılabilir yapar; basınca içerik soluklaşır (opacity animasyonu). Özel buton, kart ve liste satırı yapmanın en esnek yolu.  
Import: `import { TouchableOpacity } from 'react-native';`

**En önemli prop'lar:**
- `onPress`: basma tamamlanınca çalışan ana aksiyon.
- `activeOpacity`: basılıyken opaklık (varsayılan `0.2`).
- `disabled`: etkileşimi ve opaklık animasyonunu kapatır.
- `style`: sarmalayıcının görünümü (padding, gölge, kenarlık).
- `hitSlop`: dokunma alanını görünen sınırların dışına genişletir; küçük ikon butonları.
- `delayPressIn` / `delayPressOut`: olayları geciktirerek kazara dokunmaları süzer.
- `pressRetentionOffset`: basılı tutarken aktif alanı büyütür.
- `accessibilityRole` / `accessibilityState`: ekran okuyucuya rol ve durum (seçili, pasif).
- `android_ripple`: Android dalga (ripple) efekti. (Materyalde TouchableOpacity prop'u olarak geçiyor, doğrusu `Pressable` prop'u; TouchableOpacity'de yok.)

**Event'ler:** `onPressIn` (parmak değdi; anlık animasyon), `onPressOut` (parmak kalktı), `onLongPress` (uzun basma; alternatif aksiyon, bağlam menüsü), `onPress` (etkileşim başarıyla tamamlandı; iş mantığı burada).

```jsx
const [expanded, setExpanded] = useState(false);
<TouchableOpacity onPress={() => setExpanded((prev) => !prev)} activeOpacity={0.6}
  style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
  <Text style={{ flex: 1 }}>{QUESTION}</Text>
  <Text>{expanded ? '-' : '+'}</Text>
</TouchableOpacity>
{expanded && <Text>{ANSWER}</Text>}
```

**Dikkat:** Button'ın aksine `title` yok, yazıyı içine `<Text>` olarak koyarsın; `style` serbesttir; içine metin, ikon (Örnek 1: `@expo/vector-icons` `Ionicons`), görsel, karmaşık yerleşim konur. Daha güçlü geri bildirim için `activeOpacity`'yi ayarla veya `Animated` ekle. Olay sırası: `onPressIn` > `onPressOut` > `onPress`. Örnek 2'deki `expo publish` komutu kaldırıldı, yerini `eas update` aldı.

## 6.9 SafeAreaView
Kaynak: `W6/components/SafeAreaView.md`  
İçeriği çentik (notch), Dynamic Island, yuvarlak köşe ve alt jest çubuğundan uzak tutar; özellikle iOS'ta önemli. Genelde ekranın en dışına (root) konur.  
Import: `import { SafeAreaView } from 'react-native'; // core, sadece iOS'ta etkili` / `import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';`  
Kurulum: `npx expo install react-native-safe-area-context` (Expo'nun önerdiği paket).

**En önemli prop'lar** (`edges`, `mode`, `initialMetrics`, `useSafeAreaInsets` sadece `react-native-safe-area-context`'te vardır, core'da yok):
- `style`: korunan alanın arka planı, hizalaması, padding'i.
- `edges`: hangi kenarlar inset (güvenli boşluk) alsın (`top`, `bottom`, `left`, `right`).
- `mode`: inset nasıl uygulansın (varsayılan `padding`, ya da `margin`).
- `children`: sarılan içerik.
- `SafeAreaProvider` `initialMetrics`: açılışta inset değerlerini hemen verir, splash sonrası zıplamayı önler.
- `useSafeAreaInsets`: canlı inset değerlerini (`insets.top` vb.) veren hook; elle boşluk ayarı için.

**Event'ler:** Etkileşim olayı yok; sadece `onLayout` ile ayarlanmış boyutu ölçebilirsin. Paketle `SafeAreaInsetsContext`'e abone olup (ör. cihaz dönünce) inset değişimine tepki verebilirsin.

```jsx
function Header() {
  const insets = useSafeAreaInsets();
  return <View style={{ paddingTop: insets.top }}><Text>Dashboard</Text></View>;
}
export default function App() {
  return <SafeAreaProvider><Header /></SafeAreaProvider>;
}
```

**Dikkat:** Örnek 2'de `edges={['top']}` ile `paddingTop: insets.top` birlikte verilmiş; paket inset'i style padding'ine ekler, üst boşluk iki katına çıkar. (Materyalde ikisi birlikte, doğrusu ikisinden biri: ya `SafeAreaView edges`, ya düz `View` + `insets.top`.) Core `SafeAreaView` Android'de hiçbir şey yapmaz ve RN 0.81'de deprecated oldu; materyaldeki "Android'de tutarlılık sağlar" sözü core için geçerli değil. `useSafeAreaInsets` sadece `SafeAreaProvider` içinde çalışır.

## 6.10 Picker
Kaynak: `W6/components/Picker.md`  
Platforma göre açılır liste (dropdown) veya tekerlek (wheel) seçici çizer. Değeri sabit bir listeyle sınırlamak için kullanılır: seviye, dil, tema. Core Picker kaldırıldığı için ayrı paket kurulur.  
Import: `import { Picker } from '@react-native-picker/picker';`  
Kurulum: `npx expo install @react-native-picker/picker`

**En önemli prop'lar:**
- `selectedValue`: şu an seçili değer; React state ile kontrol edilir.
- `onValueChange(value, index)`: seçim değişince değeri ve indeksi verir.
- `mode`: `"dialog"` (Android varsayılanı) veya `"dropdown"`.
- `enabled`: false ise etkileşim kapalı (veri yüklenirken).
- `style` / `itemStyle`: font, renk, boşluk; `itemStyle` iOS'ta öğeleri stillendirir.
- `dropdownIconColor` / `dropdownIconRippleColor` (Android): açılır ok ikonunun ve ripple'ının rengi.
- Seçenekler `<Picker.Item label="..." value="..." color="..." />` ile verilir.

**Event'ler:** tek olay `onValueChange`; hem değeri hem yeni indeksi verir.

```jsx
const [track, setTrack] = useState('foundation');
<View style={{ backgroundColor: '#1e293b', borderRadius: 14 }}>
  <Picker selectedValue={track} onValueChange={(value) => setTrack(value)}
    mode="dropdown" dropdownIconColor="#f97316">
    <Picker.Item label="Foundation Track" value="foundation" />
    <Picker.Item label="Growth Track" value="growth" />
  </Picker>
</View>
```

**Dikkat:** `selectedValue` bir Item'ın `value`'su ile birebir eşleşmeli. Android'de doğrudan stil sadece metni etkiler; arka plan için Picker'ı stillenmiş bir `View` ile sar. Uzun seçenek listesini async yüklüyorsan veri gelene kadar `enabled={false}` ver (boş tekerlek olmasın). Formlarda (Formik, React Hook Form) Picker state'ini doğrulama şemasıyla senkron tut. Materyal core Picker'a "deprecated" diyor; aslında core'dan tamamen kaldırıldı, `react-native`'den import edilemez.

## 6.11 RadioButton
Kaynak: `W6/components/RadioButton.md`  
Tek seçimlik gruplar için (bir modül, bir tema). React Native core'da hazır RadioButton hiç olmadı (materyal "artık yok" diyor); `Pressable` ile kendin yazarsın ya da `react-native-paper`, `@rneui/themed`, `native-base` gibi UI kitleri kullanırsın.  
Import: `import { Pressable, View, Text } from 'react-native';`

**En önemli prop'lar** (kendi yazdığın bileşenin):
- `value`: grup içindeki benzersiz kimlik.
- `isSelected`: bu seçenek aktif mi (boolean).
- `label`: yanında görünen metin.
- `onPress(value)`: seçim değişince çağrılan callback.
- `disabled`: ön koşul yoksa etkileşimi kapatır.
- `size`, `activeColor`, `inactiveColor`: görsel tutarlılık için stil prop'ları.

**Event'ler:** `onPress` (Pressable / TouchableOpacity üzerinden yeni değeri state'e yazar), `onAccessibilityTap` (erişilebilirlik modunda seçim; `accessibilityRole="radio"` ile kullan).

```jsx
function RadioItem({ label, value, isSelected, onPress }) {
  return (
    <Pressable accessibilityRole="radio" accessibilityState={{ selected: isSelected }}
      onPress={() => onPress(value)} style={{ flexDirection: 'row', gap: 12 }}>
      <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2 }}>
        {isSelected && <View style={{ width: 10, height: 10, borderRadius: 5 }} />}
      </View>
      <Text>{label}</Text>
    </Pressable>
  );
}
// Kullanım: const [value, setValue] = useState('core');
// <RadioItem ... isSelected={value === item.id} onPress={setValue} />
```

**Dikkat:** Seçim state'i her radio'da değil, ebeveynde tek bir değer olarak tutulur; `isSelected` buradan türetilir. Saran View'a `accessibilityRole="radiogroup"` ver (materyal önerip örneklerde kullanmıyor). Seçenek çoksa Picker'a veya modal'a geç; büyük listelerde `onPress`'i `useCallback` ile sar.

## 6.12 Checkbox
Kaynak: `W6/components/Checkbox.md`  
Kullanıcının birden fazla şeyi açıp kapatabildiği durumlar için: görev listesi, ayarlar, sözleşme onayı. Native iOS / Android kutusu çizer; API `value` ve `onValueChange` etrafında döner.  
Import: `import Checkbox from 'expo-checkbox';`  
Kurulum: `npx expo install expo-checkbox` (bare RN projede aynı API ile `@react-native-community/checkbox`).

**En önemli prop'lar** (expo-checkbox):
- `value`: işaretli mi (boolean); state ile kontrol edilir.
- `onValueChange(nextValue)`: kullanıcı tıklayınca yeni boolean değeri verir.
- `color`: işaretliyken dolgu / kenarlık rengi.
- `disabled`: etkileşimi geçici kapatır. (Materyalde "İletişimi" yazıyor, doğrusu "Etkileşimi".)
- `style`: boyut ve hizalama.

**Event'ler:** ana olay `onValueChange`; ayrıca `onPress` ya da `Pressable` gerekmez.

```jsx
const [completed, setCompleted] = useState({});
const toggle = (id, value) => setCompleted((prev) => ({ ...prev, [id]: value }));
{TASKS.map((task) => (
  <View key={task.id} style={{ flexDirection: 'row', gap: 12 }}>
    <Checkbox
      value={!!completed[task.id]}
      onValueChange={(value) => toggle(task.id, value)}
      color={completed[task.id] ? '#22c55e' : undefined}
    />
    <Text>{task.label}</Text>
  </View>
))}
```

**Dikkat:** Boş objede `completed[id]` `undefined` olur; `value`'ya `!!` ile boolean ver. Örnek 2'de değişken adı `allActive` ama `.some(Boolean)` "en az biri" demek, "hepsi" için `.every(Boolean)` gerekir; ayrıca "Save Settings" butonunun `onPress`'i yok. Küçük kutuyu `Pressable` ile sar veya `hitSlop` ekle. Formik / React Hook Form'da `Controller` ile bağla. API'ye gönderirken `Object.entries(options)` içinden sadece `true` olan anahtarları gönder.

## 6.13 Hangisini ne zaman kullanırım?

| Karşılaştırma | Birini seç | Ötekini seç |
|---|---|---|
| ScrollView vs FlatList | ScrollView: az, sabit içerik (form, sözleşme, 5 kartlık yatay galeri); hepsini bir kerede çizer | FlatList: uzun / dinamik / sayfalı veri; sadece görüneni çizer, header/footer/empty/separator hazır |
| Button vs TouchableOpacity | Button: hızlı, native görünüm, sadece `title` + `color` | TouchableOpacity: özel tasarım, ikon, kart, `style`, `onLongPress`, `onPressIn/Out` |
| Image `require` vs `uri` | `require('./a.png')`: projeye gömülü, boyut otomatik, yol sabit string | `{ uri: 'https://...' }`: internetten, width/height zorunlu, `onError` ile fallback |
| Picker vs RadioButton | Picker: çok seçenek, az yer kaplar | RadioButton: 2 ila 5 seçenek, hepsi aynı anda görünsün |
| RadioButton vs Checkbox | RadioButton: tek seçim | Checkbox: çoklu seçim / tek başına aç-kapa |

**Seçim bileşenlerinde state tasarımı:**
- **Tek seçim (Picker, RadioButton):** state tek bir string: `const [level, setLevel] = useState('foundation')`. Seçili mi kontrolü: `value === item.id`.
- **Çoklu seçim (Checkbox):** state obje (`{ slides: true, demo: false }`) ya da id dizisi (`['slides', 'demo']`). Obje ile güncelleme: `setX(prev => ({ ...prev, [id]: value }))`; dizi ile: `prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]`.
- Seçili sayısı: `Object.values(obj).filter(Boolean).length`; "en az biri" `.some(Boolean)`, "hepsi" `.every(Boolean)`.
- Her durumda state'i doğrudan değiştirme (mutate etme), yeni obje / dizi üret.

## Hafta 6 özeti

1. Metin sadece `<Text>` içinde olur; Text içine Text konur, View konmaz.
2. View flexbox ile yerleşir; `onLayout` ile boyut, `pointerEvents` ile dokunma geçişi kontrol edilir.
3. Image: yerelde `require`, uzakta `{ uri }` + mutlaka width/height; `onLoadStart` > `onLoad` / `onError` > `onLoadEnd`.
4. `progressiveRenderingEnabled` Android prop'udur (materyal iOS diyor); `fadeDuration`, `loadingIndicatorSource` da Android.
5. TextInput controlled: `value` + `onChangeText`; `onChangeText` string, `onChange` event verir.
6. Şifre `secureTextEntry`, sayı `keyboardType="numeric"` (değer yine string), e-posta `keyboardType="email-address"` + `autoCapitalize="none"`, Enter `onSubmitEditing`.
7. Button `style` almaz; `color` iOS'ta yazıyı, Android'de arka planı boyar; sadece `onPress` var. Özel görünüm: `TouchableOpacity` / `Pressable` + `<Text>`.
8. TouchableOpacity her içeriği sarar, `activeOpacity` varsayılan 0.2; `android_ripple` Pressable prop'udur.
9. ScrollView her şeyi bir kerede çizer (kısa içerik); padding `contentContainerStyle`'a yazılır.
10. FlatList: `data` + `renderItem` + `keyExtractor` üçlüsü; boş liste `ListEmptyComponent`, ayırıcı `ItemSeparatorComponent`, çok sütun `numColumns`, yatay `horizontal`, pull-to-refresh `refreshing` + `onRefresh`, sonsuz kaydırma `onEndReached` + `onEndReachedThreshold`.
11. FlatList `onRefresh` yenileme başlarken çağrılır, bitişini `refreshing={false}` bildirir; Örnek 2'deki `useEffect([loadPage])` döngü yaratır.
12. SafeAreaView: core sadece iOS'ta ve deprecated; `edges`, `mode`, `useSafeAreaInsets` `react-native-safe-area-context`'ten gelir, `SafeAreaProvider` şart; `edges` ile `insets.top`'u birlikte verme.
13. Picker: `npx expo install @react-native-picker/picker`, `selectedValue` + `onValueChange(value, index)` + `<Picker.Item label value />`; Android'de `mode` `dialog` / `dropdown`.
14. RadioButton hazır gelmez, `Pressable` + `accessibilityRole="radio"` ile yazılır; state tek string.
15. Checkbox: `expo-checkbox`, `value` + `onValueChange`; çoklu seçim state'i obje / dizi; `.some` en az biri, `.every` hepsi.
