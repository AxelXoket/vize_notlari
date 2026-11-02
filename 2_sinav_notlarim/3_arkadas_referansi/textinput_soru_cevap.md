# TextInput ve W6 Bilesenleri: Soru-Cevap (arkadas referansi)

Cevaplar [`W6/components/TextInput.md`](../../1_hoca_notlari/W6/components/TextInput.md) dosyasindaki ifadelerle uyumlu yazildi
("onChange: Similar to onChangeText but provides the raw event object",
"onEndEditing: Fires when the user finishes editing", "keyboardType: Sets the virtual keyboard type").

---

## 1. Difference between `onChange` and `onEndEditing`

**Answer (English):**

- **`onChange`** is fired **every time the text changes** (on every keystroke, paste or delete).
  It is similar to `onChangeText`, but instead of the plain string it gives the **raw event object**,
  so the new text is read with `e.nativeEvent.text`. It is used for live updates such as
  instant validation or a character counter.
- **`onEndEditing`** is fired **only once, when the user finishes editing**, that is when the
  input loses focus (blur) or the user submits with the return/done key. It also receives an
  event object (`e.nativeEvent.text` holds the final text). It is used for heavier work that
  should not run on every keystroke, such as final validation, saving, or a network request.
- **Main difference:** `onChange` runs many times while typing; `onEndEditing` runs once at the end.

```jsx
<TextInput
  onChange={(e) => console.log('typing:', e.nativeEvent.text)}      // her harfte
  onEndEditing={(e) => console.log('final:', e.nativeEvent.text)}  // yazma bitince 1 kez
/>
```

**Turkce aciklama:** `onChange` her harf degisiminde calisir ve ham event objesi verir (metin
`e.nativeEvent.text` icinde). `onChangeText` ayni anda calisir ama direkt string verir.
`onEndEditing` kullanici yazmayi bitirince (odak kaybi veya klavyede done/enter) sadece bir kez
calisir; agir isler (kaydetme, API istegi) icin uygundur.

---

## 2. Purpose of `keyboardType` and three values

**Answer (English):**

`keyboardType` determines **which virtual (on-screen) keyboard is opened** when the TextInput is
focused. It makes data entry easier and reduces wrong input, for example a number pad for prices
or a keyboard with `@` for e-mail addresses. It only changes the keyboard layout; it does **not**
validate the text (pasted text can still contain other characters).

Possible values (any three are enough):

| Value | Keyboard | Platform |
|---|---|---|
| `default` | normal text keyboard | both |
| `numeric` | numbers (and decimal point) | both |
| `number-pad` | digits only, no decimal point | both |
| `decimal-pad` | digits and decimal point | both |
| `email-address` | text keyboard with `@` and `.` | both |
| `phone-pad` | phone digits, `*`, `#` | both |
| `url` | keyboard with `/` and `.com` | iOS only |
| `ascii-capable`, `numbers-and-punctuation`, `name-phone-pad`, `twitter`, `web-search` | special layouts | iOS only |
| `visible-password` | text keyboard without suggestions | Android only |

```jsx
<TextInput keyboardType="numeric" placeholder="Joule" />
```

**Turkce aciklama:** `keyboardType`, input'a tiklayinca hangi sanal klavyenin acilacagini belirler.
Kagida en guvenli uc deger: `default`, `numeric`, `email-address` (istersen `phone-pad`).
Not: sadece klavyeyi degistirir, dogrulama yapmaz; bu yuzden kodda ayrica filtreleme gerekir.

---

## Benzer 10 soru (kisa cevaplar)

**1. Difference between `onPress` and `onLongPress`?**
`onPress` fires on a normal short tap. `onLongPress` fires only when the user keeps pressing past
the long-press threshold (about 500 ms, adjustable with `delayLongPress`); it is used for
alternate actions such as context menus. Available on `TouchableOpacity`, `Pressable`, `Text`.
*TR: kisa dokunus vs basili tutma.*

**2. Difference between `ScrollView` and `FlatList`?**
`ScrollView` renders **all children at once**; good for short content such as forms.
`FlatList` is **virtualized**: it renders only the items visible on screen, so it is efficient for
long or dynamic lists. FlatList takes `data` and `renderItem` props instead of children.
*TR: ScrollView hepsini birden cizer, FlatList sadece gorunenleri cizer (performans).*

**3. Purpose of `keyExtractor` in FlatList?**
It returns a **unique string key** for each item (e.g. `(item) => item.id`). React uses the key to
track which items changed, were added or removed, so it can re-render efficiently and keep item
state correct. If omitted, FlatList uses `item.key`, then the index.
*TR: her elemana benzersiz anahtar verir; React hangi eleman degisti bunu bilir.*

**4. What does `secureTextEntry` do?**
A boolean prop of TextInput. When `true`, the entered text is **masked** (shown as dots) for
password fields. Example: `<TextInput secureTextEntry={true} />`.
*TR: sifre alani icin yazilani gizler.*

**5. Values of `resizeMode` for Image?**
`cover` (fills the box, keeps aspect ratio, crops), `contain` (whole image visible, keeps aspect
ratio, may leave empty space), `stretch` (fills the box, aspect ratio is broken), `repeat` (tiles
the image), `center` (centers without scaling up).
*TR: resmin kutuya nasil sigacagini belirler.*

**6. Difference between `Button` and `TouchableOpacity`?**
`Button` is a simple native button: only `title`, `onPress`, `color`, `disabled`; its style cannot
be customized much. `TouchableOpacity` is a wrapper that can contain **any content** (Text, Image,
icon) and can be fully styled with `style`; it lowers opacity when pressed.
*TR: Button hazir ve az ozellestirilir; TouchableOpacity ile istedigin tasarimda buton yaparsin.*

**7. What is `activeOpacity`?**
A prop of `TouchableOpacity` that sets the opacity of the wrapped content **while it is pressed**.
Value between 0 and 1, default `0.2`. Example: `activeOpacity={0.7}`.
*TR: basiliyken ne kadar soluklasacagi.*

**8. Purpose of `SafeAreaView`?**
It keeps content inside the **safe area** of the device, away from the notch, dynamic island,
status bar and rounded corners (mainly iOS). Note: the core version is deprecated in new React
Native versions; `react-native-safe-area-context` is recommended, or a `paddingTop` on a `View`.
*TR: icerigin centik ve durum cubugu altina girmesini engeller.*

**9. Difference between `require` and `uri` in Image `source`?**
`source={require('./assets/logo.png')}` loads a **local image bundled** with the app; size is known
automatically. `source={{ uri: 'https://...' }}` loads a **remote (network) image**; you must give
`width` and `height` in the style or it will not be visible.
*TR: require yerel dosya, uri internetten; uri ile boyut vermek zorunlu.*

**10. What does `numberOfLines` do on Text?**
It limits the text to the given number of lines; the rest is cut and shown with an ellipsis
(`...`). The place of the ellipsis is set with `ellipsizeMode` (`tail`, `head`, `middle`, `clip`).
*TR: metni N satirla sinirlar, tasan kismi uc nokta ile keser.*
