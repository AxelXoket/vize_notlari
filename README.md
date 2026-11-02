# Mobil Uygulama Geliştirme: Vize

## Ne için nereye bakarım

| Ne lazım | Nereye bak |
|---|---|
| **Kodu okuyamıyorum, neyin ne olduğunu bilmiyorum** | [0_kod_okuma_rehberi.md](2_sinav_icin_notlarim/0_kod_okuma_rehberi.md) |
| **Sınava başlarken, adım adım ne yapacağım** | [1_sinavda_ne_yapacagim_rehber.md](2_sinav_icin_notlarim/1_sinavda_ne_yapacagim_rehber.md) |
| **Kod sorusu:** bana bir ekran verildi, hazır kod lazım | [2_kod_sorusu_hazir_sablonlar](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar) (tablodaki "Snack'te aç") |
| **Kod sorusu:** arkadaşın tam çözüm örnekleri | [3_kod_sorusu_arkadas_cozumleri](2_sinav_icin_notlarim/3_kod_sorusu_arkadas_cozumleri) |
| **Teori / kağıt sorusu:** bir konuyu kısaca hatırlamak | [4_teori_konu_anlatimi.md](2_sinav_icin_notlarim/4_teori_konu_anlatimi.md) |
| **Teori / kağıt sorusu:** bir prop'u, event'i, farkı detaylı aramak | [5_teori_detayli_notlar](2_sinav_icin_notlarim/5_teori_detayli_notlar) (dosyada `Cmd+F`) |
| Kod çalışmıyor, hata mesajı çıktı | Rehberin 5. bölümü: [Sık hatalar](2_sinav_icin_notlarim/1_sinavda_ne_yapacagim_rehber.md#5-sık-hatalar-ve-çözümleri) |
| Hocanın derste anlattığının aslı | [1_hocanin_ders_materyali](1_hocanin_ders_materyali) |

## Kod sorusunda hangi şablon

🟢 = **hocanın bir örneğiyle birebir uyuşuyor**: aynı işi yapıyor ve hocanın o örnekte kullandığı her bileşen şablonda var (SafeAreaView sayılmadı, şablon 14'te gösteriliyor). Hocanın derste anlattığına en yakın şablonlar bunlar. Diğerleri hocanın kalıplarıyla yazıldı ama hocada aynı işi yapan tam bir örnek yok ya da bir bileşen farklı (örnek: `Button` yerine `TouchableOpacity`).

| Soruda bu varsa | Şablon |
|---|---|
| Sayı gir, butona bas, sonucu göster (dönüştürücü) | [01_sayi_gir_sonuc_goster](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/01_sayi_gir_sonuc_goster/App.js) |
| İki giriş, hesapla, sonuca göre renk | [02_iki_girisli_hesaplayici](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/02_iki_girisli_hesaplayici/App.js) |
| Listeden seç, seçileni say, seçiliye farklı renk | [03_listeden_sec_ve_say](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/03_listeden_sec_ve_say/App.js) |
| Resim ızgarası | [04_resim_galerisi](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/04_resim_galerisi/App.js) |
| Form, giriş alanları, hata mesajları | 🟢 [05_form_ve_dogrulama](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/05_form_ve_dogrulama/App.js) (hocanın örneği: [W4 State, Örnek 2: Form State Management](1_hocanin_ders_materyali/W4/5-react-native-state.md#example-2-form-state-management), [W6 RadioButton, Örnek 1](1_hocanin_ders_materyali/W6/components/RadioButton.md#example-1-module-selection)) |
| Açılır menü (Picker), checkbox, radio | 🟢 [06 paketli](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/06_acilir_menu_checkbox_radio_paketli/App.js) (hocanın örneği: [W6 Picker, Örnek 1](1_hocanin_ders_materyali/W6/components/Picker.md#example-1-course-level-selector), [W6 Checkbox, Örnek 1](1_hocanin_ders_materyali/W6/components/Checkbox.md#example-1-lesson-task-list), [W6 RadioButton, Örnek 1](1_hocanin_ders_materyali/W6/components/RadioButton.md#example-1-module-selection)) ya da [07 paketsiz](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/07_acilir_menu_checkbox_radio_paketsiz/App.js) |
| Ekle / sil / tamamla listesi | [08_ekle_sil_listesi](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/08_ekle_sil_listesi/App.js) |
| Arama kutusu, filtre, sıralama | 🟢 [09_arama_ve_filtre](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/09_arama_ve_filtre/App.js) (hocanın örneği: [W6 TextInput, Örnek 2: Search Bar Filtering a List](1_hocanin_ders_materyali/W6/components/TextInput.md#example-2-search-bar-filtering-a-list)) |
| "Veriyi şu linkten çek" | [10_linkten_veri_cek](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/10_linkten_veri_cek/App.js) |
| Verilen ekran görüntüsünü aynen çiz | [11_ekran_tasarimi_kopyala](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/11_ekran_tasarimi_kopyala/App.js) |
| Sayaç, zamanlayıcı | 🟢 [12_sayac_ve_kronometre](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/12_sayac_ve_kronometre/App.js) (hocanın örneği: [W4 Hooks, useEffect Örnek 2: Timer](1_hocanin_ders_materyali/W4/6-react-native-hooks.md#example-2-timer), [W4 State, Örnek 1: Simple Counter](1_hocanin_ders_materyali/W4/5-react-native-state.md#example-1-simple-counter)) |
| Birden çok ekran, sekme, geri butonu | [13_cok_ekranli_uygulama](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/13_cok_ekranli_uygulama/App.js) |
| SafeAreaView, çekirdek Button, ikon, aşağı çekip yenileme, resim sığdırma | [14_hocanin_kaliplari](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar/14_hocanin_kaliplari/App.js) |

Snack'te çalışır halde açmak için: [şablon tablosu](2_sinav_icin_notlarim/2_kod_sorusu_hazir_sablonlar), sağdaki **"Snack'te aç"**.

## Teori için hangi dosya

| Konu | Kısa anlatım | Detaylı not + soru-cevap |
|---|---|---|
| W2 JavaScript | [Hafta 2](2_sinav_icin_notlarim/4_teori_konu_anlatimi.md#hafta-2-javascript--es6) | [W2_javascript.md](2_sinav_icin_notlarim/5_teori_detayli_notlar/W2_javascript.md) |
| W3 React: component, JSX, props, state | [Hafta 3](2_sinav_icin_notlarim/4_teori_konu_anlatimi.md#hafta-3-react-web) | [W3a_react_temeller.md](2_sinav_icin_notlarim/5_teori_detayli_notlar/W3a_react_temeller.md) |
| W3 React: useEffect, hooks, olaylar, listeler | (aynı bölüm) | [W3b_react_hooks_ve_olaylar.md](2_sinav_icin_notlarim/5_teori_detayli_notlar/W3b_react_hooks_ve_olaylar.md) |
| W3 React: stil, form, router | (aynı bölüm) | [W3c_react_stil_form_router.md](2_sinav_icin_notlarim/5_teori_detayli_notlar/W3c_react_stil_form_router.md) |
| W4 React Native'e giriş, Expo | [Hafta 4](2_sinav_icin_notlarim/4_teori_konu_anlatimi.md#hafta-4-react-nativee-giriş) | [W4_react_native_giris.md](2_sinav_icin_notlarim/5_teori_detayli_notlar/W4_react_native_giris.md) |
| **W6 React Native bileşenleri** (en çok soru) | [Hafta 6](2_sinav_icin_notlarim/4_teori_konu_anlatimi.md#hafta-6-react-native-core-components) | [W6_react_native_bilesenler.md](2_sinav_icin_notlarim/5_teori_detayli_notlar/W6_react_native_bilesenler.md) |
| TextInput olayları, keyboardType | | [teori_textinput_soru_cevap.md](2_sinav_icin_notlarim/3_kod_sorusu_arkadas_cozumleri/teori_textinput_soru_cevap.md) |
