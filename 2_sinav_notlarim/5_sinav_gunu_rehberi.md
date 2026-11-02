# Sınav Günü Rehberi

Verilen bir ekran tasarımını Expo (React Native) ile `App.js` olarak yazmak için adımlar. Hocanın o gün söylediği kurallar (klasör düzeni, teslim biçimi, izin verilen araçlar) her zaman önce gelir.

## 1. Başlamadan

1. Bu repoyu tarayıcıda aç, [4_sinav_kodlari](4_sinav_kodlari) sekmesini açık tut.
2. Teslim için hocanın istediği klasörü masaüstünde hazırla; her çözüm o klasörde `App.js` olarak duracak.
3. Hangi yolla çalışacağına karar ver: **Snack en hızlısı** (kurulum yok). Bilgisayarda Node kuruluysa yerel Expo da olur.
4. **Çalışmayan kod puan getirmez.** Önce çalışır hale getir, sonra güzelleştir.

## 2. Soruyu okurken: istek listesini çıkar

Sorudaki her cümle ayrı bir istek, çoğu zaman ayrı puan. Madde madde yaz ve bitirdikçe işaretle:

- Başlık ve etiket metinleri **birebir**, büyük/küçük harf dahil.
- Sayı ve metin formatı **birebir** (örneğin `Toplam: X / Y`, ondalık basamak sayısı).
- Renkler **birebir** (hex kodu verildiyse aynen kullan).
- Davranış: "sadece sayı kabul eder" = `keyboardType="numeric"` + girişi süz. "Reset temizler" = state'i `''` yap.
- Boyut: "48x48 yuvarlak resim" = `width: 48, height: 48, borderRadius: 24`.

## 3. Doğru şablonu seç

| Soruda bu varsa | Şablon |
|---|---|
| Bir değer gir, butona bas, sonucu göster (dönüştürücü, hesaplayıcı) | [01_birim_donusturucu](4_sinav_kodlari/01_birim_donusturucu/App.js), [02_vki_hesaplayici](4_sinav_kodlari/02_vki_hesaplayici/App.js), arkadaş referansı [Joule dönüştürücü](3_arkadas_referansi/joule_donusturucu/App.js) |
| Listeden seç, seçili sayısını göster, seçiliye farklı renk | [03_coklu_secim_listesi](4_sinav_kodlari/03_coklu_secim_listesi/App.js), arkadaş referansı [şehir seçici](3_arkadas_referansi/sehir_secici/App.js) |
| Resim ızgarası, beğen/seç, büyük önizleme | [04_resim_galerisi_grid](4_sinav_kodlari/04_resim_galerisi_grid/App.js) |
| Form, doğrulama, şifre alanı, radio, checkbox | [05_kayit_formu](4_sinav_kodlari/05_kayit_formu/App.js) |
| Picker (dropdown), Checkbox, RadioButton birlikte | [06 paketli](4_sinav_kodlari/06_secim_bilesenleri_paketli/App.js) (hocanın paketleri), [07 paketsiz](4_sinav_kodlari/07_secim_bilesenleri_paketsiz/App.js) (paket kurulamazsa) |
| Ekle / sil / tamamla listesi | [08_yapilacaklar_listesi](4_sinav_kodlari/08_yapilacaklar_listesi/App.js) |
| Arama kutusu, kategori filtresi, sıralama | [09_arama_ve_filtre](4_sinav_kodlari/09_arama_ve_filtre/App.js) |
| "Veriyi şu linkten çek" (JSON, API) | [10_api_listesi](4_sinav_kodlari/10_api_listesi/App.js), [şehir seçici, linkten çeken](3_arkadas_referansi/sehir_secici_linkten/App.js) |
| Verilen ekranı birebir çiz (kart, profil, düzen) | [11_profil_karti_layout](4_sinav_kodlari/11_profil_karti_layout/App.js) |
| Sayaç, zamanlayıcı, kronometre | [12_sayac_ve_kronometre](4_sinav_kodlari/12_sayac_ve_kronometre/App.js) |
| Birden çok ekran, sekme, geri butonu, modal | [13_cok_ekranli_uygulama](4_sinav_kodlari/13_cok_ekranli_uygulama/App.js) |

Her şablonun en üstündeki yorumda **"NASIL UYARLANIR"** bölümü var: neyi nereden değiştireceğin yazar. Renkler dosyanın başındaki `COLORS` sabitinde.

## 4a. Snack ile (önerilen)

1. [4_sinav_kodlari](4_sinav_kodlari) sayfasındaki **"Snack'te aç"** linkine tıkla. Şablon kodu yüklü halde açılır.
   (Ya da [snack.expo.dev](https://snack.expo.dev) aç, `App.js`'in içini sil, şablonu yapıştır.)
2. Sağ üstten **Web** önizlemeyi seç ya da telefonda **Expo Go** ile QR'ı okut.
3. Kodu uyarla. Sol altta hata sayısı görünür; hata varsa üstüne tıkla, mesajı oku.
4. Bitince editörde `Cmd+A`, `Cmd+C`, sonra teslim klasöründeki `App.js` dosyasına yapıştır ve kaydet. (Snack'te "Save" giriş ister, gerek yok.)

## 4b. Yerel Expo ile (Node kuruluysa)

```bash
cd ~/Desktop
npx create-expo-app@latest uygulama --template blank
cd uygulama
npx expo start
```

- Telefonda Expo Go ile QR'ı okut. Bilgisayarda görmek için `w` (gerekirse önce `npx expo install react-dom react-native-web`).
- `App.js`'i şablonla değiştir. Kaydedince ekran kendini yeniler.
- Paket gerekiyorsa (Picker, Checkbox): `npx expo install @react-native-picker/picker expo-checkbox`
- Teslim: bitmiş `App.js`'i hocanın istediği klasöre kopyala.

## 5. Sık hatalar ve çözümleri

| Hata / belirti | Sebep | Çözüm |
|---|---|---|
| `Text strings must be rendered within a <Text> component` | Bir metin `View`'in içinde çıplak duruyor (ya da `{cond && 'yazı'}`) | Metni `<Text>` içine al; `&&` yerine ternary |
| `X is not defined` / `X is not a function` | Import eksik ya da yanlış paketten | `import { X } from 'react-native'`; Picker `@react-native-picker/picker`'dan |
| `Each child in a list should have a unique "key" prop` | FlatList'te `keyExtractor` yok ya da `map`'te `key` yok | `keyExtractor={(item) => item.id}` (string olmalı) |
| Uzak resim görünmüyor | `uri` ile resimde boyut yok | `style={{ width: 48, height: 48 }}` |
| Button'a stil verilmiyor | Button `style` almaz | `TouchableOpacity` + `Text` kullan |
| Sonuç `NaN` | Boş ya da virgüllü giriş | `Number(text.replace(',', '.'))`, `isNaN` kontrolü |
| Liste kaymıyor ya da uyarı | FlatList, ScrollView'un içine konmuş | İkisinden birini kullan; FlatList'e `ListHeaderComponent` ver |
| Ekran sonsuz döngüye giriyor | `onPress={fn()}` ya da render içinde `setState` | `onPress={() => fn()}` |
| `useEffect` sürekli çalışıyor | Bağımlılık dizisi yok ya da her render'da değişen bir şey var | İlk yükleme için `useEffect(() => {...}, [])` |
| `Alert.alert` web'de açılmıyor | Snack web önizlemede çalışmaz | Telefonda Expo Go ile dene; ekrana `Text` ile de yazdır |

## 6. Teori soruları için

- W6 bileşen prop'ları, event'leri ve 40 soru-cevap: [2_detayli_notlar/W6.md](2_detayli_notlar/W6.md).
- Kısa tekrar: [1_konu_anlatimi.md](1_konu_anlatimi.md).

## 7. Teslimden önce son kontrol

- [ ] Her çözümün `App.js`'i teslim klasöründe ve kaydedildi.
- [ ] Uygulama hatasız açılıyor (kırmızı ekran yok).
- [ ] Sorudaki her madde tek tek işaretli; metinler, sayı formatı ve renkler birebir.
- [ ] Boş giriş, tekrar basma, Reset gibi uç durumlar denendi.
