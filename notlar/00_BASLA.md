# Mobil Uygulama Geliştirme: Vize Notları

> Kaynak: `github.com/zeki-ozen/MobileAppDevelopment`, commit `7a13069` (2025-12-30). Sınav öncesi `sh guncelle.sh` çalıştır: hoca yeni bir şey eklediyse gösterir.
> Kapsam: W2, W3, W4, W6 (repoda W1 ve W5 klasörü yok). Final yazılı değil, proje (`mobile_final_project_EN.md`). W7-W9 en sonda EK olarak var.

## Nasıl kullanılır

- **Arama:** `/` tuşu ya da sol üstteki kutu. Enter sonraki eşleşmeye atlar. Prop adıyla ara: `keyExtractor`, `secureTextEntry`, `useEffect`.
- **Her hafta aynı düzende:** konu bölümleri, ardından "Olası sınav soruları", en sonda "Materyalde hata" bölümü.
- **`W6/components/FlatList.md:42` gibi referanslar** hocanın repodaki dosyası ve satırıdır. Repoyu VS Code ile açıp `Cmd+P` ile dosyaya, `Ctrl+G` ile satıra git.
- **"(ders dışı ek bilgi)"** etiketli maddeler hocanın materyalinde yok. Sınavda hocanın anlattığı cevabı ver, istersen bu bilgiyi ek olarak yaz.
- **Silinmiş dosya:** hoca W4'teki 7 numaralı "example basic components" dosyasını 2025-11-03'te sildi. İçeriği git geçmişinden `kurtarilan/W4_7-example-basic-components.md` olarak alındı, W4 notunun 7. bölümünde.

## Konu haritası

| Hafta | Konu | Repo klasörü |
|---|---|---|
| W2 | JavaScript ve ES6: değişkenler, tipler, operatörler, döngüler, fonksiyonlar, diziler, modüller | `W2/topics/` (HTML dersler + JS demolar) |
| W3 | React (web): component, JSX, props, state, lifecycle, events, koşullu/liste render, hooks, veri paylaşımı, styling, forms, routing | `W3/` |
| W4 | React Native'e giriş: Expo, proje yapısı, props/state/hooks RN'de | `W4/` |
| W6 | React Native core components: View, Text, Image, TextInput, Button, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Picker, RadioButton, Checkbox | `W6/components/` |

## TEK SAYFADA HIZLI BAKIŞ

### JavaScript (W2)

| Konu | Akılda kalacak cümle |
|---|---|
| `var` / `let` / `const` | `var` function scope, hoist edilir ve `undefined` ile başlar. `let`/`const` block scope, hoist edilir ama TDZ'dedir (tanımdan önce erişim ReferenceError). `const` yeniden atanamaz, ama içindeki obje/dizi değişebilir. |
| Primitive vs reference | string, number, boolean, null, undefined, symbol, bigint değerle kopyalanır. Object/array/function referansla. `typeof null === "object"` (tarihî hata). |
| `==` vs `===` | `===` tip dönüşümü yapmaz, her zaman bunu kullan. `0 == "0"` true, `0 === "0"` false. |
| Falsy değerler | `false, 0, -0, 0n, "", null, undefined, NaN`. Gerisi truthy (`[]`, `{}`, `"0"` dahil). |
| `??` vs `\|\|` | `\|\|` her falsy değerde sağa geçer, `??` sadece `null`/`undefined`'da. `0 \|\| 5` 5 verir, `0 ?? 5` 0 verir. |
| `?.` | Optional chaining: `user?.address?.city` ara değer yoksa hata yerine `undefined`. |
| Döngüler | `for...of` değerleri, `for...in` anahtarları dolaşır. `forEach` içinde `break` olmaz. |
| Arrow function | Kendi `this`'i ve `arguments`'ı yok, `new` ile çağrılamaz. Tek ifadede `return` örtük. |
| `map / filter / reduce` | `map` aynı uzunlukta yeni dizi, `filter` koşulu tutanlar, `reduce(acc, cur)` tek değer. Hiçbiri orijinali değiştirmez. |
| Spread / rest | `[...a, ...b]`, `{...obj, x: 1}` kopyalar/birleştirir. Rest: `function f(...args)`, `const [first, ...others] = arr`. |
| Destructuring | `const { name, age = 18 } = user;` `const [a, b] = arr;` |
| Modules | `export default` dosya başına bir tane, import ederken istediğin adı verirsin. Named export `{ }` ile ve aynı adla alınır (`as` ile değiştirilir). `<script type="module">` HTTP sunucu ister. |

### React (W3)

| Konu | Akılda kalacak cümle |
|---|---|
| Component | UI parçası döndüren fonksiyon (ya da `render()` metodlu class). Adı **PascalCase** olmalı, yoksa HTML etiketi sanılır. |
| JSX kuralları | Tek kök eleman (gerekirse `<>...</>` Fragment). `class` yerine `className`, `for` yerine `htmlFor`. Etiketler kapanmalı (`<img />`). `{}` içine ifade yazılır, `if` deyimi yazılmaz. Inline style obje ve camelCase: `style={{ backgroundColor: 'red' }}`. |
| Props | Ebeveynden çocuğa veri, **read-only**. `props.children` iç içe içerik. Fonksiyon da prop olarak geçer (callback ile çocuktan ebeveyne haber). |
| State | Bileşenin kendi değişen verisi. `const [x, setX] = useState(0)`. Değişince yeniden render. Doğrudan değiştirme, kopyala: `setItems([...items, yeni])`, `setUser({...user, ad})`. Önceki değere göre: `setCount(c => c + 1)`. |
| Props vs State | Props dışarıdan gelir ve salt okunur. State içeride tutulur ve setter ile değişir. |
| useEffect | `useEffect(fn)` her render sonrası. `useEffect(fn, [])` sadece mount'ta bir kez. `useEffect(fn, [x])` mount ve `x` her değiştiğinde. `return () => {...}` cleanup: unmount ve bir sonraki effect öncesi (timer, listener temizliği). |
| Lifecycle karşılıkları | `componentDidMount` ≈ `[]`, `componentDidUpdate` ≈ `[deps]`, `componentWillUnmount` ≈ cleanup. |
| Events | `onClick={handle}` doğru, `onClick={handle()}` render anında çağırır (yanlış). Parametre için `onClick={() => handle(id)}`. Form: `e.preventDefault()`. |
| Koşullu render | `cond && <X/>` (dikkat: `0 && ...` ekrana 0 basar), `cond ? <A/> : <B/>`, erken `return null`. |
| Liste render | `items.map(i => <li key={i.id}>...)`. `key` kardeşler arasında benzersiz ve sabit olmalı. Sıra değişen listede index'i key yapma. |
| Rules of Hooks | Sadece en üst seviyede çağır (if/loop/iç fonksiyon içinde değil), sadece component ya da custom hook içinde. Custom hook adı `use` ile başlar. |
| Diğer hooks | `useContext` prop drilling'i önler. `useRef` render tetiklemeyen değer veya DOM erişimi. `useMemo` hesaplanan değeri, `useCallback` fonksiyonu hafızada tutar. `useReducer` karmaşık state içindir. |
| Veri paylaşımı | Lifting state up: ortak state'i en yakın ortak ebeveyne taşı. Context API: Provider ile ağaca dağıt. Büyük uygulamada Redux gibi store. |
| Forms | Controlled: `value` + `onChange`, tek gerçek kaynak state. Uncontrolled: `useRef` ile DOM'dan oku. |
| Routing | `BrowserRouter` > `Routes` > `Route path element`. Sayfa yenilemeden geçiş için `Link`/`NavLink`. `useParams` URL parametresini, `useNavigate` programatik yönlendirmeyi verir. `path="*"` 404 sayfası. |

### React Native (W4)

| Konu | Akılda kalacak cümle |
|---|---|
| Ne | React ile **gerçek native** iOS/Android UI. WebView değil. Tek JS kod tabanı. |
| Web vs RN | `div` yerine `View`, metin **mutlaka** `<Text>` içinde, `img` yerine `Image`, `input` yerine `TextInput`, `onClick` yerine `onPress`, CSS yerine `StyleSheet.create({...})`. |
| Flexbox | RN'de varsayılan `flexDirection: 'column'`. `flex: 1` alanı doldurur. `justifyContent` ana eksende, `alignItems` çapraz eksende hizalar. Birimler px değil, birimsiz sayı. |
| Expo | `npx create-expo-app MyApp`, sonra `npx expo start`. QR kodu telefondaki **Expo Go** ile okut. Dev server'da `a` Android, `i` iOS, `w` web. |
| Expo vs CLI | Expo kolay, hızlı, OTA güncelleme verir ama native kontrolü kısıtlı. RN CLI tam native kontrol verir ama Xcode/Android Studio ister. |
| Dosyalar | `App.js` giriş bileşeni, `app.json` Expo ayarları (ad, ikon, splash), `package.json` bağımlılıklar, `assets/` görseller. |

### React Native Core Components (W6)

| Bileşen | Bilinmesi gereken |
|---|---|
| `View` | Kapsayıcı (`div` gibi). `style`, `onLayout`. |
| `Text` | Tüm metin bunun içinde. `numberOfLines` + `ellipsizeMode` taşan metni kısaltır. İç içe Text stil devralır. `onPress` alabilir. |
| `Image` | Yerel: `source={require('./assets/x.png')}`. Uzak: `source={{ uri: 'https://...' }}` ve **width/height zorunlu**, yoksa görünmez. `resizeMode`: cover, contain, stretch, center. |
| `TextInput` | `value` + `onChangeText(text)` (string doğrudan gelir). Şifre için `secureTextEntry`. Klavye için `keyboardType` (`numeric`, `email-address`, `phone-pad`). Ayrıca `placeholder`, `multiline`, `maxLength`, `autoCapitalize`, `onSubmitEditing`. |
| `Button` | `title` + `onPress`. Sadece `color` ve `disabled` var. **`style` prop'u almaz**; özel görünüm için TouchableOpacity/Pressable kullan. |
| `TouchableOpacity` | İçine istediğin View/Text'i koyup basılabilir yaparsın. Basınca saydamlaşır, oranı `activeOpacity` (varsayılan 0.2) belirler. `onLongPress`, `disabled`. |
| `ScrollView` | Tüm çocukları **bir kerede** render eder, az ve sabit içerik için. `horizontal`, `contentContainerStyle`, `refreshControl`, `pagingEnabled`. |
| `FlatList` | Uzun/dinamik liste, sadece görünenleri render eder (virtualization). `data`, `renderItem={({ item, index }) => ...}`, `keyExtractor={item => item.id}`. Boş liste: `ListEmptyComponent`. Başlık/ayraç: `ListHeaderComponent`, `ItemSeparatorComponent`. Sonsuz kaydırma: `onEndReached`. Pull-to-refresh: `refreshing` + `onRefresh`. Ayrıca `horizontal`, `numColumns`. |
| `SafeAreaView` | İçeriği çentik ve status bar altından uzak tutar. Core sürümü sadece iOS'ta çalışır. Önerilen kullanım `react-native-safe-area-context` paketi (`SafeAreaProvider`, `edges`, `useSafeAreaInsets`). |
| `Picker` | Core'dan çıkarıldı. `npx expo install @react-native-picker/picker`. Kullanım: `selectedValue` + `onValueChange(value, index)`, içine `<Picker.Item label value />`. |
| `RadioButton` | Core'da yok, `Pressable`/`TouchableOpacity` ile elle yazılır. Tek seçim, state tek değer (string). |
| `Checkbox` | `npx expo install expo-checkbox`. `value` (boolean) + `onValueChange`. Çoklu seçim için state dizi ya da `{ id: bool }` objesi. |

**ScrollView mu FlatList mi?** Az ve sabit içerik (form, profil sayfası) için ScrollView. Çok, uzun ya da API'den gelen liste için FlatList.
**Button mu TouchableOpacity mi?** Hızlı ve standart buton için Button. Özel tasarım (ikon, renk, kart) için TouchableOpacity.

## Materyaldeki hatalar: sınavda tuzak olabilecekler

Her haftanın son bölümünde dosya:satır kanıtıyla tam liste var. Hoca bu örneklerden "çıktı ne?" veya "hata nerede?" diye sorabilir:

- **W2:** `W2/topics/09_Arrays_and_Iteration_Methods.html:191` yaş filtresinden sonra ortalamayı 87.5 yazıyor, doğrusu 86.33 (259/3). `W2/topics/01_Using_JS_in_HTML.html:8` inline script `<p>` ile açılmış, çalışmaz.
- **W3:** `W3/07-conditional-rendering-example.jsx:168-176` ErrorBoundary function component olarak yazılmış, hiçbir hatayı yakalamaz (gerçek ErrorBoundary class component olmalı). `W3/14-routing-example.jsx:43-45` elle yazılmış router `:id` parametresini anlamıyor.
- **W4:** `W4/4-react-native-props.md:165` `onPress={delete}`: `delete` JS'de ayrılmış kelime, SyntaxError verir.
- **W6:** `W6/components/Image.md:14` `progressiveRenderingEnabled` için iOS yazıyor, prop aslında Android'e ait. `W6/components/TouchableOpacity.md:13` `android_ripple` TouchableOpacity'nin değil Pressable'ın prop'u.
