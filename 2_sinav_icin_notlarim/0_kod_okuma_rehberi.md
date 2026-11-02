# Kod Okuma Rehberi

Sınavda kodu sıfırdan yazmıyorsun, **hazır kodu okuyup değiştiriyorsun**. Bunun için dili bilmen gerekmez; neyin nerede olduğunu tanıman yeter.

## 1. Bir App.js'in 5 bölümü

Her şablon (ve hocanın her örneği) yukarıdan aşağıya bu sırayla gider:

```js
// 1) EN ÜST: yorum (/* ... */)  ->  OKU. Neyi nereden değiştireceğini söyler.

// 2) IMPORT: "şu parçaları kullanacağım" listesi  ->  DOKUNMA.
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

// 3) AYARLAR: büyük harfli sabitler  ->  EN ÇOK BURAYI DEĞİŞTİRİRSİN.
const TITLE = 'Temperature Converter';      // ekrandaki başlık
const COLORS = { primary: '#2196F3' };      // renkler

// 4) UYGULAMA: export default function App() { ... }
export default function App() {
  const [input, setInput] = useState('');   // 4a) HAFIZA: değişen bilgiler
  const handleReset = () => { ... };        // 4b) İŞLER: butona basınca ne olacak
  return ( <View> ... </View> );            // 4c) EKRAN: ne görünecek
}

// 5) EN ALT: styles  ->  boyut, boşluk, yazı büyüklüğü.
const styles = StyleSheet.create({ ... });
```

Sınavda neredeyse her değişiklik şu üç yerden birindedir: **3 (ayarlar)**, **4c (ekran)**, **4b (işler)**.

## 2. Kod sözlüğü

| Gördüğün | Anlamı | Türkçesi |
|---|---|---|
| `// yazı` ya da `/* yazı */` | Yorum, kod değil | "Not: ..." |
| `const AD = 'Ali';` | Bir şeye isim ver | "AD'ın değeri Ali olsun" |
| `'metin'` ya da `"metin"` | Ekranda yazacak düz yazı | Tırnak içi = yazı |
| `[ 'a', 'b', 'c' ]` | Liste (dizi) | Elma, armut, kiraz |
| `{ ad: 'Ali', yas: 20 }` | Bilgi kartı (obje) | Adı Ali, yaşı 20 |
| `const [sayi, setSayi] = useState(0)` | Hafıza kutusu: `sayi` okumak, `setSayi` değiştirmek için; başlangıç 0 | "sayi diye bir kutu aç, içi 0" |
| `const sil = () => { ... }` | Bir iş tanımla | "sil denince süslü parantezin içindekini yap" |
| `if (kosul) { ... }` | Koşul | "Eğer ... ise şunu yap" |
| `return ( ... )` | Ekranda bunu göster | |
| `<View> ... </View>` | Kutu | Ekrandaki bir alan |
| `<Text>Merhaba</Text>` | Yazı | Ekranda "Merhaba" |
| `<TextInput />` | Yazı giriş kutusu | |
| `<Image source={{ uri: '...' }} />` | Resim | |
| `<TouchableOpacity onPress={sil}>` | Basılabilir alan | "Buna basınca sil işini yap" |
| `<FlatList data={liste} renderItem={...} />` | Liste ekranı | "liste'deki her şey için bir satır çiz" |
| `<SafeAreaView>` | En dış kutu, iPhone'da içeriği çentiğin altına sokmaz (Android'de düz View) | Hocanın W6 örnekleri bununla başlar |
| `<Button title="Save" onPress={handleSave} />` | Hazır buton, `style` almaz | "Save yazan düz buton" |
| `<Ionicons name="star" size={24} />` | İkon | "24 boyutunda yıldız" |
| `{sayi}` (etiketlerin arasında) | Hafızadaki değeri ekrana bas | |
| `style={styles.baslik}` | Görünüş | "baslik stilini kullan" |
| `{kosul && <Text>...</Text>}` | Koşullu gösterme | "Koşul doğruysa bunu göster" |
| `kosul ? 'A' : 'B'` | Kısa koşul | "Koşul doğruysa A, değilse B" |
| `liste.map(x => <Text>{x}</Text>)` | Listeyi tek tek ekrana bas | "Listedeki her şey için bir satır" |
| `liste.length` | Listedeki eleman sayısı | |
| `.toFixed(2)` | Sayıyı 2 ondalıkla yaz | 3.14159 -> "3.14" |

## 3. Okuma yöntemi: ekrandan başla, koddan değil

1. **Ekranda bir yazı gör** (örneğin "Convert").
2. **`Cmd+F` ile o yazıyı kodda ara.** Bulduğun yer o butonun kodudur.
3. Yazıyı değiştirmen gerekiyorsa tırnak ya da etiket içini değiştir.
4. Butona basınca ne olduğunu görmek için yanındaki `onPress={handleConvert}`'e bak, sonra `Cmd+F` ile `handleConvert`'ü ara. Orası basınca yapılan iştir.
5. Her değişiklikten sonra sağdaki ekrana bak. Kırmızı hata çıkarsa `Cmd+Z` ile geri al.

**Kodu baştan sona anlamaya çalışma.** Sadece değiştireceğin yeri bul.

## 4. En sık 8 değişiklik nasıl yapılır

| İstenen | Nereyi bul (`Cmd+F`) | Ne yap |
|---|---|---|
| Başlık metni | Ekrandaki başlık yazısı ya da `TITLE` | Tırnak içini sorudaki metinle değiştir |
| Renk | `COLORS` | `'#22c55e'` gibi değeri sorudakiyle değiştir |
| Liste verisi | Büyük harfli liste (`CITIES`, `ITEMS`, `DATA`) | Elemanları değiştir, her birinin `id`'si farklı olsun |
| Hata mesajı | Ekranda çıkan hata yazısı ya da `setError(` | Tırnak içini değiştir |
| Sonuç biçimi | Ekranda sonucu gösteren `<Text>` | `<Text>cal: {sonuc}</Text>` gibi sorudaki biçime getir |
| Formül | Convert'in `onPress` adı (`handleConvert`) | Hesap satırını değiştir: `deger / 4.184` |
| Ondalık sayısı | `toFixed` | Parantez içindeki sayıyı değiştir |
| Sayaç metni | `.length` ya da ekrandaki sayaç yazısı | `Selected: {secili.length} / {LISTE.length}` gibi |

## 5. Hata çıkarsa

| Mesaj | Ne demek | Çözüm |
|---|---|---|
| `Unexpected token` | Bir parantez, süslü parantez ya da tırnak eksik/fazla | Son değiştirdiğin satıra bak, `Cmd+Z` |
| `X is not defined` | X diye bir şey yok: yazım hatası ya da import eksik | Adı doğru yazdın mı? `import { X } from 'react-native'` |
| `Text strings must be rendered within a <Text>` | Bir yazı `<Text>` dışında kalmış | Yazıyı `<Text>...</Text>` içine al |
| `Adjacent JSX elements must be wrapped` | `return` içinde iki ayrı kök eleman var | Hepsini bir `<View>...</View>` içine al |

**Altın kural:** küçük değiştir, ekrana bak, çalışıyorsa devam et. Bozulursa `Cmd+Z`.
