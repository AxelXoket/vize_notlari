# Arkadaş Referansı

Bir arkadaştan alınan referans çözümler. Snack'te (SDK 54) çalıştırılıp denendi.

| Çözüm | Ne yapar | |
|---|---|---|
| [Joule → cal / kcal dönüştürücü](joule_donusturucu/App.js) | Sadece sayı girişi, Convert ile `cal: 11.950287`, `kcal: 0.01195` (50 J), Reset temizler. | [Snack'te aç](https://snack.expo.dev/?sourceUrl=https%3A%2F%2Fraw.githubusercontent.com%2FAxelXoket%2Fvize_notlari%2Fmain%2F2_sinav_icin_notlarim%2F3_kod_sorusu_arkadas_cozumleri%2Fjoule_donusturucu%2FApp.js&name=joule_donusturucu&platform=web&dependencies=expo-status-bar) |
| [City Picker: seçilebilir şehir listesi](sehir_secici/App.js) | 10 şehir, 48x48 yuvarlak resim, seçili yeşil / değil gri, altta `Selected cities: X / Y`. | [Snack'te aç](https://snack.expo.dev/?sourceUrl=https%3A%2F%2Fraw.githubusercontent.com%2FAxelXoket%2Fvize_notlari%2Fmain%2F2_sinav_icin_notlarim%2F3_kod_sorusu_arkadas_cozumleri%2Fsehir_secici%2FApp.js&name=sehir_secici&platform=web&dependencies=expo-status-bar) |
| [City Picker, veriyi linkten çeken sürüm](sehir_secici_linkten/App.js) | Aynı ekran; liste bir JSON linkinden fetch ile gelir (`DATA_URL`). | [Snack'te aç](https://snack.expo.dev/?sourceUrl=https%3A%2F%2Fraw.githubusercontent.com%2FAxelXoket%2Fvize_notlari%2Fmain%2F2_sinav_icin_notlarim%2F3_kod_sorusu_arkadas_cozumleri%2Fsehir_secici_linkten%2FApp.js&name=sehir_secici_linkten&platform=web&dependencies=expo-status-bar) |

Teori: [teori_textinput_soru_cevap.md](teori_textinput_soru_cevap.md): `onChange` ile `onEndEditing` farkı, `keyboardType` ve benzer 10 soru-cevap.
