# Mobil Uygulama Geliştirme: Vize Hazırlık

Kapsam: W2 (JavaScript), W3 (React), W4 (React Native'e giriş), W6 (React Native core components).
Kaynak: hocanın reposu [`zeki-ozen/MobileAppDevelopment`](https://github.com/zeki-ozen/MobileAppDevelopment), commit `7a13069`. `repo/` klasörü bu repoya bağlı (submodule).

## Nereden başlamalı

| Dosya | Ne | GitHub'da |
|---|---|---|
| [KONU_ANLATIMI.md](KONU_ANLATIMI.md) | Kısa ve net konu anlatımı, 4 hafta tek dosyada | Tıkla, direkt okunur |
| [notlar/00_BASLA.md](notlar/00_BASLA.md) | Tek sayfalık hızlı bakış ve materyaldeki hatalar | Tıkla, direkt okunur |
| [notlar/haftalar/](notlar/haftalar/) | Çok detaylı notlar ve hafta başına 36-54 soru-cevap | Tıkla, direkt okunur |
| `KONU_ANLATIMI.html`, `notlar/SINAV_NOTLARI.html` | Aramalı, çevrimdışı açılan sürümler | GitHub Pages ile ya da indirip çift tıklayarak |

GitHub'da bir dosya içinde aramak için `Cmd+F` (Windows'ta `Ctrl+F`). Repo genelinde arama için repoda `t` tuşu dosya bulur.

## Başka bilgisayarda

```bash
git clone --recurse-submodules <bu-reponun-adresi>
cd <repo-adi>
sh guncelle.sh
```

`guncelle.sh` hocanın reposunu indirir ve notlar hazırlandıktan sonra hocanın neyi değiştirdiğini listeler.

## Klasörler

- `repo/`: hocanın reposu (submodule, değiştirilmedi)
- `kurtarilan/`: hocanın 2025-11-03'te sildiği W4 dosyası, git geçmişinden kurtarıldı
- `notlar/`: detaylı notlar
- `araclar/`: notları doğrulayan (`check_notes.py`) ve HTML üreten (`build_html.py`) betikler
