# EK: Hafta 7-9 (vize kapsamı dışı) ve Final Proje Yönergesi

> Bu dosya vize kapsamı DIŞINDADIR (vize W6'ya kadar). Hoca ileri bir konuya değinirse hızlı bakmak için tutuldu. Referans biçimi: `dosya:satır` (repo köküne göre).
> Not: Repodaki W7-W9 içeriği geçen yılın repo durumudur; bu yıl hoca farklı anlatabilir.

## İçindekiler
1. [Hafta 7: Yerel veri saklama (Local Storage)](#hafta-7-yerel-veri-saklama-local-storage)
2. [Hafta 8: Ağ ve API (Networking)](#hafta-8-ağ-ve-api-networking)
3. [Hafta 9: Cihaz özellikleri (Camera, Notifications, Maps)](#hafta-9-cihaz-özellikleri-camera-notifications-maps)
4. [Final Proje Yönergesi](#final-proje-yönergesi)
5. [Olası sorular](#olası-sorular)
6. [Materyalde hata / güncel olmayan bilgi](#materyalde-hata--güncel-olmayan-bilgi)

---

## Hafta 7: Yerel veri saklama (Local Storage)
Kaynak: `W7/README.md`, `W7/AsyncStorage.md`, `W7/MMKV.md`, `W7/SQLite.md`, `W7/Realm.md`, `W7/MySQL.md`

Genel kurgu: her dosyada önce kısa özet, sonra Expo (Blank JavaScript şablonu) istemci + Express REST API sunucu ile iki örnek. Sunucu önce çalıştırılır, sonra RN tarafı test edilir. `W7/README.md:3`, `W7/README.md:13-14`
- Örneklerdeki URL `http://192.168.1.23:PORT`: telefon `localhost`'a erişemez, bilgisayarın yerel ağ (LAN) IP'si yazılmalı. `W7/AsyncStorage.md:28`, `W7/MySQL.md:139`

### AsyncStorage
Kaynak: `W7/AsyncStorage.md`
- **Ne:** Anahtar-değer (key-value) kalıcı depolama; uygulama kapanıp açılınca veri durur. Kullanım: kullanıcı tercihleri, token, küçük önbellek (cache). `W7/AsyncStorage.md:3`
- **Kurulum/import:** paket `@react-native-async-storage/async-storage`; `import AsyncStorage from '@react-native-async-storage/async-storage';` `W7/AsyncStorage.md:26`
- **Asenkron (Promise tabanlı):** her çağrı `await` ister; REST çağrılarıyla zincirlenir. `W7/AsyncStorage.md:3`
- **Sadece string saklar:** nesne yazarken `JSON.stringify`, okurken `JSON.parse`. `W7/AsyncStorage.md:45`, `W7/AsyncStorage.md:37`
- **Temel API:** `setItem(key, value)` `W7/AsyncStorage.md:45`, `getItem(key)` (yoksa `null` döner, bu yüzden `if (cached)` kontrolü) `W7/AsyncStorage.md:35-36`. `removeItem(key)`, `clear()`, `multiGet/multiSet` kaynakta geçmiyor (ders dışı ek bilgi).
- **Örnek 1, offline cache:** önce cache'ten göster (`loadFromCache`), sonra sunucudan çekip cache'i güncelle (`syncWithServer`). `W7/AsyncStorage.md:34-53`
- **Örnek 2, JWT saklama:** login sonrası token `setItem('token', ...)`, sonraki isteklerde `Authorization: Bearer ${token}` başlığı. `W7/AsyncStorage.md:105`, `W7/AsyncStorage.md:110-112`
- **Avantaj/dezavantaj:** basit, Expo Go'da çalışır; ama yavaş/async, şifresiz. Token gibi hassas veri için `expo-secure-store` daha doğru (ders dışı ek bilgi).

### MMKV
Kaynak: `W7/MMKV.md`
- **Ne:** C++ tabanlı, çok hızlı key-value depolama; paket `react-native-mmkv`. Sık okunan ayarlar ve state cache için. `W7/MMKV.md:3`
- **Senkron (sync):** `await` gerekmez; bu sayede form alanları her tuş vuruşunda kaydedilip uygulama yeniden açılınca geri yüklenebilir (taslak/draft). `W7/MMKV.md:72`, `W7/MMKV.md:98-104`
- **Kurulum:** `import { MMKV } from 'react-native-mmkv'; const storage = new MMKV();` `W7/MMKV.md:22-24`
- **Temel API:** `storage.set(key, value)` `W7/MMKV.md:30`, `storage.getString(key)` `W7/MMKV.md:35`, `storage.delete(key)` `W7/MMKV.md:114-115`. Nesneler yine `JSON.stringify/parse` ile. `W7/MMKV.md:36`
- **Senkron okuma state başlangıcında:** `useState(getSettings())` gibi ilk değeri doğrudan diskten verebilir. `W7/MMKV.md:47`
- **Örnek 3:** kullanıcı ID'sini anahtar yaparak kullanıcı kaydet/getir, `try/catch` ve `Alert` ile hata. `W7/MMKV.md:164-210`
- **Avantaj/dezavantaj:** AsyncStorage'dan çok hızlı ve sync; ama native modül, Expo Go'da çalışmaz, development build gerekir (ders dışı ek bilgi). v4 sürümünde API `createMMKV()` ve `remove()` olarak değişti (ders dışı ek bilgi).

### SQLite (expo-sqlite)
Kaynak: `W7/SQLite.md`
- **Ne:** cihaz üzerinde ilişkisel (relational) veritabanı; tablolar, `SELECT`, filtreleme, offline sorgular. `W7/SQLite.md:3`
- **Import:** `import * as SQLite from 'expo-sqlite';` Expo içinde native build uğraşı yok. `W7/SQLite.md:3`, `W7/SQLite.md:26`
- **Kaynaktaki API (eski):** `SQLite.openDatabase('fitness.db')`, `db.transaction(tx => tx.executeSql(sql, params, ok, err))`; Promise'e saran `run()` yardımcı fonksiyonu. `W7/SQLite.md:28-37`
- **Tablo oluşturma:** `CREATE TABLE IF NOT EXISTS ...` `W7/SQLite.md:40`; sonuçlar `result.rows._array`. `W7/SQLite.md:48`
- **Parametreli sorgu:** `VALUES (?, ?, ?)` ile değerler ayrı dizi olarak (SQL injection'a karşı). `W7/SQLite.md:56`
- **Örnek 1, sunucu verisini tabloya yaz:** `DELETE` sonra `Promise.all` ile `INSERT`, sonra `SELECT`. `W7/SQLite.md:51-59`
- **Örnek 2, offline kuyruk (queue):** gönderilemeyen form cevapları `synced INT DEFAULT 0` ile saklanır; ağ gelince `POST` + `UPDATE queue SET synced = 1`. `W7/SQLite.md:109`, `W7/SQLite.md:127-138`
- **Güncel API (ders dışı ek bilgi):** `openDatabaseAsync/openDatabaseSync`, `execAsync`, `runAsync`, `getAllAsync`. Kaynaktaki `openDatabase/transaction` SDK 52'den itibaren yok (aşağıda hata bölümüne bakın).

### Realm
Kaynak: `W7/Realm.md`
- **Ne:** MongoDB'ye ait reaktif (reactive) nesne tabanlı yerel veritabanı; koleksiyon değişince UI yeniden çizilir. `W7/Realm.md:3`
- **Şema (schema):** `class Session extends Realm.Object {}` + `schema = { name, primaryKey, properties }`. `W7/Realm.md:27-36`
- **Açma:** `Realm.open({ schema: [Session] })`. `W7/Realm.md:39`
- **Okuma ve dinleme:** `realm.objects('Session')` + `data.addListener(...)` (reactive). `W7/Realm.md:58-60`
- **Yazma her zaman transaction içinde:** `realm.write(() => realm.create('Session', item, Realm.UpdateMode.Modified))` (upsert). `W7/Realm.md:68-72`
- **Sorgu:** `.filtered('dirty == true')`. `W7/Realm.md:142`
- **Örnek 2, dirty flag:** değişen not `dirty: true` işaretlenir, sadece onlar `PATCH /grades/:id` ile gönderilir, sonra `dirty = false`. `W7/Realm.md:123`, `W7/Realm.md:141-153`
- **Dezavantaj:** native modül (Expo Go'da yok); Atlas Device SDK (Realm) 2024'te kullanımdan kaldırıldı (deprecated) (ders dışı ek bilgi).

### MySQL
Kaynak: `W7/MySQL.md`
- **Ne:** sunucu tarafı ilişkisel veritabanı. Mobil uygulama MySQL'e **doğrudan bağlanmaz**; arada Express REST katmanı vardır, RN sadece `fetch` ile API'ye istek atar. `W7/MySQL.md:3`
- **Sunucu paketi:** `mysql2/promise`, `cors`, `express`. `W7/MySQL.md:21-23`
- **Bağlantı havuzu:** `mysql.createPool({ host, user, password, database })`. `W7/MySQL.md:29-34`
- **Şema:** `CREATE TABLE students (id INT AUTO_INCREMENT PRIMARY KEY, fullname VARCHAR(100) NOT NULL, ...)`. `W7/MySQL.md:12-16`
- **Parametreli sorgu:** `pool.query('INSERT ... VALUES (?, ?)', [fullname, department])`; `result.insertId`. `W7/MySQL.md:41-42`
- **Status kodları:** eksik alan `400`, oluşturma `201`. `W7/MySQL.md:39`, `W7/MySQL.md:42`
- **Filtreleme:** `GET /students?department=...` ile `WHERE department = ?`. `W7/MySQL.md:89-96`
- **İpucu:** bağlantı bilgilerini ortama göre ayarla, backend'i makine IP'si üzerinden aç ki Expo cihazı erişsin. `W7/MySQL.md:139`

### Karşılaştırma tablosu

| Özellik | AsyncStorage | MMKV | SQLite | Realm | MySQL |
|---|---|---|---|---|---|
| Nerede çalışır | Cihaz | Cihaz | Cihaz | Cihaz | Sunucu (backend) |
| Sync/Async | Async (Promise) | Sync | Async (kaynakta callback+Promise sarmalı) | Async open, sync okuma/yazma (write bloğu) | Async (`mysql2/promise`), mobil ise HTTP ile |
| Veri modeli | Key-value, sadece string | Key-value (string, sayı, bool) | İlişkisel tablo, SQL | Nesne/şema, reaktif | İlişkisel tablo, SQL |
| Hız | En yavaş | En hızlı | Orta-hızlı | Hızlı | Ağ gecikmesine bağlı |
| Expo Go | Evet | Hayır (dev build) (ders dışı) | Evet | Hayır (dev build) (ders dışı) | İlgisiz (sunucuda) |
| Tipik senaryo | Token, tercih, küçük cache | Sık okunan ayar, form taslağı | Offline liste, sorgu, gönderim kuyruğu | İlişkili nesneler, otomatik UI güncelleme | Çok kullanıcılı merkezi veri |
| Kaynak | `W7/AsyncStorage.md:3` | `W7/MMKV.md:3` | `W7/SQLite.md:3` | `W7/Realm.md:3` | `W7/MySQL.md:3` |

---

## Hafta 8: Ağ ve API (Networking)
Kaynak: `W8/README.md`, `W8/AsyncAwait.md`, `W8/FetchAPI.md`, `W8/Axios.md`, `W8/RESTfulAPIs.md`, `W8/ErrorHandling.md`, `W8/LoadingStates.md`

Genel: tüm örnekler Expo Snack'te çalışır ve kimlik doğrulaması istemeyen ücretsiz API'ler (JSONPlaceholder) kullanır. `W8/README.md:3`, `W8/README.md:17`

### Async/Await
Kaynak: `W8/AsyncAwait.md`
- `async` fonksiyon her zaman Promise döner; `await` Promise çözülene kadar o fonksiyonu bekletir (main thread'i bloklamaz). `W8/AsyncAwait.md:4`, `W8/AsyncAwait.md:7-8`
- Promise üzerine kurulu "syntactic sugar"; kod senkron gibi okunur. `W8/AsyncAwait.md:4`
- Hata yönetimi `try/catch`, temizlik `finally` (ör. `setLoading(false)`). `W8/AsyncAwait.md:58-85`
- **Sıralı (sequential):** ikinci istek ilkinin sonucuna bağlıysa art arda `await` (kullanıcı -> o kullanıcının postları). `W8/AsyncAwait.md:62-78`
- **Paralel:** bağımsız istekler `Promise.all([...])` ile aynı anda; JSON parse da paralel. `W8/AsyncAwait.md:303-319`
- `Promise.all` içinden biri reddedilirse tamamı başarısız olur; kısmi sonuç için `Promise.allSettled()`. `W8/AsyncAwait.md:555`
- Paralel yapılabilecek işlerde döngü içinde `await` kullanma; `map` + `Promise.all`. `W8/AsyncAwait.md:557`
- `loadingStage` ile sıralı adımlarda kullanıcıya ilerleme mesajı. `W8/AsyncAwait.md:63`, `W8/AsyncAwait.md:558`

### Fetch API
Kaynak: `W8/FetchAPI.md`
- Yerleşik (built-in), ek paket gerekmez; Promise döner, sonuç `Response` nesnesi. `W8/FetchAPI.md:7-8`
- `fetch(url, options)`; seçenekler `method`, `headers`, `body`, `mode`. `W8/FetchAPI.md:14`, `W8/FetchAPI.md:21-24`
- `body` JSON ise `JSON.stringify` + `Content-Type: application/json` zorunlu. `W8/FetchAPI.md:23`, `W8/FetchAPI.md:365`
- **Kilit nokta:** fetch 4xx/5xx'te hata FIRLATMAZ, sadece ağ hatasında reject olur. Bu yüzden `response.ok` kontrolü şart. `W8/FetchAPI.md:364`, `W8/FetchAPI.md:362`
- Gövde okumak da async: `await response.json()`. `W8/FetchAPI.md:51`
- Pull-to-refresh: `FlatList` + `RefreshControl refreshing onRefresh`, `fetchPosts().finally(() => setRefreshing(false))`. `W8/FetchAPI.md:228-231`, `W8/FetchAPI.md:247-253`
- Unmount olan bileşende isteği iptal için `AbortController`. `W8/FetchAPI.md:363`

### Axios
Kaynak: `W8/Axios.md`
- Promise tabanlı HTTP istemci kütüphanesi; kurulum `npm install axios`. `W8/Axios.md:4`, `W8/Axios.md:16`
- Otomatik JSON dönüşümü: cevap doğrudan `response.data`, `.json()` yok. `W8/Axios.md:7`, `W8/Axios.md:27`
- **Non-2xx cevapta otomatik hata fırlatır** (fetch'ten farkı). `W8/Axios.md:11`, `W8/Axios.md:568`
- `axios.get(url, { params })`, `axios.post(url, data)`, `patch`, `delete`. `W8/Axios.md:26-33`, `W8/Axios.md:345`, `W8/Axios.md:361`
- **Instance:** `axios.create({ baseURL, timeout, headers })`; tüm uygulamada ortak ayar. `W8/Axios.md:60-66`, `W8/Axios.md:564`
- `params` nesnesi query string'e çevrilir (`_page`, `_limit`). `W8/Axios.md:80-84`
- **Interceptor:** `api.interceptors.response.use(onSuccess, onError)`; hata tarafında `Promise.reject(error)` döndürülmeli. Token ekleme, global hata, loglama için. `W8/Axios.md:284-292`, `W8/Axios.md:565`
- Dahili `timeout` desteği; iptal `AbortController` (veya eski `CancelToken`). `W8/Axios.md:9-10`
- Sonsuz kaydırma: `onEndReached` + `onEndReachedThreshold` + `ListFooterComponent`. `W8/Axios.md:148-157`

### RESTful APIs
Kaynak: `W8/RESTfulAPIs.md`
- REST (Representational State Transfer): HTTP metotlarıyla kaynaklar (resource) üzerinde CRUD. `W8/RESTfulAPIs.md:4`
- Kaynak = URL (`/users`, `/posts/1`); endpoint = istek kabul eden URL. `W8/RESTfulAPIs.md:14-15`
- PUT tüm kaydı değiştirir, PATCH kısmi günceller. `W8/RESTfulAPIs.md:9-10`
- Filtre/sıralama/sayfalama için ayrı endpoint değil query parameter (`/posts?userId=1&_limit=5`). `W8/RESTfulAPIs.md:565`, `W8/RESTfulAPIs.md:1009`
- JSONPlaceholder sahte API: POST hep aynı id'yi döndürür, bu yüzden yerelde `Date.now()` id. `W8/RESTfulAPIs.md:102-103`
- Silmeden önce `Alert.alert` onay diyaloğu (`style: 'destructive'`). `W8/RESTfulAPIs.md:156-178`
- Doğru metodu kullan (veri çekmek için POST, oluşturmak için GET yok). `W8/RESTfulAPIs.md:1006`
- GET cevaplarını önbelleğe al, iyimser güncelleme (optimistic update) düşün. `W8/RESTfulAPIs.md:1010-1011`

**HTTP metotları**

| Metot | CRUD | Body | Örnek | Kaynak |
|---|---|---|---|---|
| GET | Read | Yok | `GET /posts?_limit=10` | `W8/RESTfulAPIs.md:7` |
| POST | Create | Var | `POST /posts` -> 201 | `W8/RESTfulAPIs.md:8` |
| PUT | Update (tam) | Var | `PUT /posts/1` | `W8/RESTfulAPIs.md:9` |
| PATCH | Update (kısmi) | Var | `PATCH /todos/1` | `W8/RESTfulAPIs.md:10` |
| DELETE | Delete | Genelde yok | `DELETE /posts/1` | `W8/RESTfulAPIs.md:11` |

**Status kodları** (kaynak: `W8/RESTfulAPIs.md:21-27`)

| Kod | Anlam |
|---|---|
| 200 OK | Başarılı |
| 201 Created | Kaynak oluşturuldu (POST) |
| 204 No Content | Başarılı, gövde yok |
| 400 Bad Request | Geçersiz istek verisi |
| 401 Unauthorized | Kimlik doğrulama gerekli |
| 404 Not Found | Kaynak yok |
| 500 Internal Server Error | Sunucu hatası |
| 403 Forbidden / 409 Conflict / 422 Unprocessable / 503 Service Unavailable | (ders dışı ek bilgi) |

Gruplar: 2xx başarı, 4xx istemci hatası, 5xx sunucu hatası. `W8/ErrorHandling.md:8`

### Error Handling
Kaynak: `W8/ErrorHandling.md`
- Hata türleri: ağ (offline, DNS), HTTP (4xx/5xx), parse (bozuk JSON), timeout, abort. `W8/ErrorHandling.md:7-11`
- Desenler: try/catch, Error Boundary, global handler (interceptor), exponential backoff ile retry. `W8/ErrorHandling.md:14-17`
- Hataları sınıflandır (`ERROR_TYPES`) ve her tür için kullanıcıya uygun mesaj (`ERROR_MESSAGES`). `W8/ErrorHandling.md:35-70`
- RN'de ağ hatası mesajı: `'Network request failed'`. `W8/ErrorHandling.md:80`
- `SyntaxError` = JSON parse hatası. `W8/ErrorHandling.md:89`
- **Timeout:** `AbortController` + `setTimeout(() => controller.abort(), 8000)`, `fetch(url, { signal })`, her durumda `clearTimeout`. Abort `AbortError` adıyla düşer. `W8/ErrorHandling.md:96-108`, `W8/ErrorHandling.md:83`
- Retry sayacı (`retryCount`) ve "Try again" düğmesi. `W8/ErrorHandling.md:115-119`
- Form: istemci tarafı doğrulama (`validateForm`) istekten önce; kullanıcı yazınca alan hatası temizlenir. `W8/ErrorHandling.md:412-435`, `W8/ErrorHandling.md:494-500`
- Timeout tipik olarak 10-30 sn; teknik detayı kullanıcıya gösterme; hata olunca cache'teki veriyi göster. `W8/ErrorHandling.md:767-769`
- Error Boundary async/fetch hatalarını yakalamaz, sadece render hatalarını (ders dışı ek bilgi).

### Loading States
Kaynak: `W8/LoadingStates.md`
- Türler: initial, refresh (pull-to-refresh), pagination (load more), submit, skeleton. `W8/LoadingStates.md:7-11`
- Skeleton: `Animated.loop(Animated.sequence([...]))` ile opaklık animasyonu, `useNativeDriver: true`. `W8/LoadingStates.md:41-56`
- Her yükleme için AYRI state: `loading`, `refreshing`, `loadingMore`, `hasMore`, `page`. `W8/LoadingStates.md:88-93`
- Load more korunması: `if (loadingMore || !hasMore) return;` `W8/LoadingStates.md:145`
- `hasMore = data.length === limit`. `W8/LoadingStates.md:121`
- Submit sırasında düğmeyi `disabled` yap (double submit önleme). `W8/LoadingStates.md:17`, `W8/LoadingStates.md:471`
- Uzun işlerde yüzde ile `ProgressBar`. `W8/LoadingStates.md:496-510`, `W8/LoadingStates.md:960`
- Bağlama göre gösterge: ilk yükleme skeleton, aksiyon spinner; anlık işlerde gösterge yok. `W8/LoadingStates.md:956`, `W8/LoadingStates.md:961`
- Sonsuz yükleme olmasın diye her zaman zaman aşımı (timeout) koy. `W8/LoadingStates.md:962`

### Kilit kod kalıpları

**1) async/await + fetch + response.ok + try/catch/finally** (`W8/AsyncAwait.md:57-85`, `W8/FetchAPI.md:48-51`)
```jsx
const load = async () => {
  try {
    setLoading(true);
    setError(null);
    const res = await fetch(URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`); // fetch 4xx/5xx'te kendisi atmaz
    const json = await res.json();
    setData(json);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false); // başarılı da olsa hatalı da olsa
  }
};
useEffect(() => { load(); }, []);
```

**2) POST (fetch)** (`W8/RESTfulAPIs.md:85-99`)
```jsx
const res = await fetch(`${API_BASE}/posts`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title, body, userId: 1 }),
});
if (!res.ok) throw new Error(`POST failed: ${res.status}`);
const created = await res.json();
```

**3) Axios instance + get/post + interceptor** (`W8/Axios.md:60-66`, `W8/Axios.md:284-292`, `W8/Axios.md:307-327`)
```jsx
const api = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com', timeout: 5000 });
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
const { data } = await api.get('/todos', { params: { _limit: 10 } }); // .json() yok
await api.post('/todos', { title, completed: false, userId: 1 });
// non-2xx otomatik olarak catch'e düşer
```
İstek interceptor'ı ile token ekleme (ders dışı ek bilgi):
```jsx
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

**4) Paralel istek** (`W8/AsyncAwait.md:303-319`)
```jsx
const [a, b] = await Promise.all([fetch(u1), fetch(u2)]);
const [ja, jb] = await Promise.all([a.json(), b.json()]);
```

**5) Timeout ile fetch** (`W8/ErrorHandling.md:96-108`)
```jsx
const controller = new AbortController();
const id = setTimeout(() => controller.abort(), 8000);
try { return await fetch(url, { signal: controller.signal }); }
finally { clearTimeout(id); }
```

**6) loading / error / data render kalıbı** (`W8/AsyncAwait.md:92-110`, `W8/FetchAPI.md:63-78`)
```jsx
if (loading) return <ActivityIndicator size="large" />;
if (error) return <Button title="Retry" onPress={load} />;
return <FlatList data={data} keyExtractor={(i) => i.id.toString()} renderItem={...} />;
```

**fetch vs axios özet**

| | fetch | axios |
|---|---|---|
| Kurulum | Yerleşik | `npm install axios` |
| JSON | `await res.json()` | `res.data` otomatik |
| Body gönderme | `JSON.stringify` + header elle | Nesne doğrudan |
| 4xx/5xx | Hata atmaz, `res.ok` kontrol | Otomatik reject |
| Timeout | `AbortController` ile elle | `timeout` seçeneği |
| Interceptor | Yok | Var |

---

## Hafta 9: Cihaz özellikleri (Camera, Notifications, Maps)
Kaynak: `W9/README.md`, `W9/components/Camera.md`, `W9/components/Notifications.md`, `W9/components/ReactNativeMaps.md`, `W9/components/ReactNativeLeaflet.md`

- Snack'te paketler **Dependencies** panelinden eklenir; yerelde `npx expo install <paket>` (Expo SDK ile uyumlu sürüm için). `W9/README.md:18-19`

### Camera (`expo-camera`)
Kaynak: `W9/components/Camera.md`
- Akış 3 adım: çalışma anında izin (runtime permission) iste, izin varsa önizleme göster, çek/tara. `W9/components/Camera.md:6-8`
- Paket `expo-camera`; `import { CameraView, useCameraPermissions } from 'expo-camera';` `W9/components/Camera.md:21`, `W9/components/Camera.md:26`
- **İzin:** `const [permission, requestPermission] = useCameraPermissions();` `permission` null ise yükleniyor, `!permission.granted` ise "izin ver" düğmesi (`onPress={requestPermission}`). `W9/components/Camera.md:30`, `W9/components/Camera.md:35-52`
- Önizleme: `<CameraView ref={cameraRef} facing={facing} />`; `facing` `'back' | 'front'`. `W9/components/Camera.md:75`, `W9/components/Camera.md:54-56`
- Fotoğraf: `await cameraRef.current?.takePictureAsync({ quality: 0.7 })` -> `photo.uri`, `<Image source={{ uri }} />`. `W9/components/Camera.md:61-65`
- QR tarama: `barcodeScannerSettings={{ barcodeTypes: ['qr'] }}` + `onBarcodeScanned={({ data }) => ...}`; tekrar tetiklenmesin diye taramadan sonra `undefined` verilir. `W9/components/Camera.md:169-177`
- Expo Go ile gerçek cihazda çalışır, web önizlemede genelde çalışmaz; izin olmadan kamera bileşenini render etme. `W9/components/Camera.md:10`, `W9/components/Camera.md:203`

### Notifications (`expo-notifications`)
Kaynak: `W9/components/Notifications.md`
- Akış: izin iste, handler ayarla, yerel bildirim gönder/zamanla, (ops.) tıklamayı işle. `W9/components/Notifications.md:6-9`
- İzin: iOS her zaman; Android 13+ (API 33) da ister. `Notifications.getPermissionsAsync()` önce, yoksa `requestPermissionsAsync()`. `W9/components/Notifications.md:6`, `W9/components/Notifications.md:50-60`
- `setNotificationHandler`: uygulama ön plandayken (foreground) bildirim nasıl gösterilsin. `W9/components/Notifications.md:31-37`
- Android'de **kanal (channel)** zorunlu: `setNotificationChannelAsync('default', { importance: AndroidImportance.HIGH })`. `W9/components/Notifications.md:66-71`, `W9/components/Notifications.md:116`
- Gönderim: `scheduleNotificationAsync({ content: { title, body }, trigger: null })`; `trigger: null` = hemen. `W9/components/Notifications.md:73-80`
- Dinleyiciler: `addNotificationReceivedListener` (gelen), `addNotificationResponseReceivedListener` (tıklanan); cleanup'ta `sub.remove()`. `W9/components/Notifications.md:18-19`, `W9/components/Notifications.md:44-47`
- Expo Go'da yerel (local) bildirim çalışır; push için ek kurulum ve gerçek cihaz gerekir. `W9/components/Notifications.md:11`

### react-native-maps
Kaynak: `W9/components/ReactNativeMaps.md`
- Native harita: iOS'ta Apple Maps, Android'de Google Maps. `W9/components/ReactNativeMaps.md:4`
- Paket `react-native-maps`; `import MapView, { Marker, Polyline } from 'react-native-maps';` `W9/components/ReactNativeMaps.md:23`, `W9/components/ReactNativeMaps.md:67`
- Bölge: `{ latitude, longitude, latitudeDelta, longitudeDelta }` (delta = zoom). `W9/components/ReactNativeMaps.md:25-30`
- `initialRegion` (kontrolsüz) vs `region` + `onRegionChangeComplete` (kontrollü); kontrollü harita takılabilir, mümkünse `initialRegion`. `W9/components/ReactNativeMaps.md:10`, `W9/components/ReactNativeMaps.md:113`
- `Marker` (`coordinate`, `title`, `description`), `Polyline` (`coordinates`, `strokeWidth`), `Polygon`. `W9/components/ReactNativeMaps.md:11-12`
- Haritaya dokunma: `onPress={(e) => e.nativeEvent.coordinate}`. `W9/components/ReactNativeMaps.md:92-95`
- Expo Go'da çalışır; iOS'ta Google Maps gibi özellikler ek native ayar ister. Çok marker için clustering. `W9/components/ReactNativeMaps.md:6`, `W9/components/ReactNativeMaps.md:114`
- Kullanıcı konumu için `expo-location` izni gerekir; kaynakta yok (ders dışı ek bilgi).

### Leaflet (WebView + CDN)
Kaynak: `W9/components/ReactNativeLeaflet.md`
- Leaflet bir web harita kütüphanesi; RN'de `react-native-webview` içinde HTML olarak, Leaflet CDN'den yüklenir. `W9/components/ReactNativeLeaflet.md:4`
- `react-native-webview-leaflet` Snack'te çalışmaz (TypeScript entry). `W9/components/ReactNativeLeaflet.md:7`
- Kullanım: `<WebView originWhitelist={['*']} source={{ html }} />`; HTML içinde `L.map`, `L.tileLayer` (OpenStreetMap), `L.marker`. `W9/components/ReactNativeLeaflet.md:49-55`, `W9/components/ReactNativeLeaflet.md:78-80`
- **Köprü (bridge), WebView -> RN:** HTML'de `window.ReactNativeWebView.postMessage(JSON.stringify(...))`, RN'de `onMessage={(e) => JSON.parse(e.nativeEvent.data)}`. `W9/components/ReactNativeLeaflet.md:58`, `W9/components/ReactNativeLeaflet.md:81-84`
- **RN -> WebView:** `webRef.current.postMessage(...)`, HTML'de `message` dinleyicisi. `W9/components/ReactNativeLeaflet.md:167-169`, `W9/components/ReactNativeLeaflet.md:140-147`
- Şekiller: `L.polygon`, `L.circle`, `L.divIcon` ile emoji marker. `W9/components/ReactNativeLeaflet.md:129-136`
- İnternet gerekir (CDN + tile); izin gerekmez. Web önizleme bozulursa Expo Go ile cihazda dene. `W9/components/ReactNativeLeaflet.md:212-213`

| | react-native-maps | Leaflet (WebView) |
|---|---|---|
| Render | Native harita | HTML/JS WebView içinde |
| Sağlayıcı | Apple/Google Maps | OSM veya özel tile |
| Performans/jest | Akıcı, native | Daha yavaş |
| İletişim | Props/events | `postMessage`/`onMessage` |

---

## Final Proje Yönergesi
Kaynak: `mobile_final_project_EN.md`

- **Yazılı final YOK**; öğrenci kendi seçtiği konuda mobil uygulama geliştirip sınıfta sunar. `mobile_final_project_EN.md:5`
- Uygulama: gerçek bir problemi çözmeli, çalışır durumda olmalı, Git ile versiyonlanmalı, temel ama anlamlı UI içermeli. `mobile_final_project_EN.md:9-12`
- **Tarih yok:** dosyada teslim/sunum tarihi geçmiyor.
- **Puan yok:** kriterlerin ağırlığını hoca ayrıca belirleyecek. `mobile_final_project_EN.md:62`

### Teslim edilecekler (Deliverables)

| # | Teslim | İçerik | Kaynak |
|---|---|---|---|
| 1 | Git repo linki | Public veya hocaya erişim verilmiş private | `mobile_final_project_EN.md:20-21` |
| 1a | PDF dosyası | Proje adı + kısa açıklama, tech stack, kurulum/çalıştırma, ana özellikler listesi, **her ekranın** ekran görüntüsü, **commit sayısı** | `mobile_final_project_EN.md:22-28` |
| 2 | Çalışan uygulama | APK / TestFlight / Expo linki veya canlı demo; birkaç ekranlı gezilebilir akış | `mobile_final_project_EN.md:30-32` |
| 3 | Sunum | 7-10 dk; slayt önerilir, zorunlu değil. İçerik: problem/motivasyon, hedef kullanıcı, tech stack ve mimari, ana ekranlar ve akış, teknik zorluklar ve çözümleri, gelecek geliştirmeler | `mobile_final_project_EN.md:34-42` |

### Minimum teknik şartlar
- En az **3 anlamlı UI ekranı** (liste, detay, ayarlar, login...). `mobile_final_project_EN.md:49`
- Temel **navigation** (ekranlar arası geçiş). `mobile_final_project_EN.md:50`
- En az bir **kullanıcı girdisi** (form, buton, seçim). `mobile_final_project_EN.md:51`
- Basit de olsa **state management**. `mobile_final_project_EN.md:52`
- Tercihen **veritabanı / kalıcı depolama** (SQLite, Firestore, local JSON, Shared Preferences...). Anlamlıysa ekstra değer; yapay/gereksiz DB kullanımından kaçın. `mobile_final_project_EN.md:55-56`

### Değerlendirme kriterleri (ağırlıklar kaynakta YOK)

| Kriter | Neye bakılır | Kaynak |
|---|---|---|
| Tech Stack & Architecture | Teknoloji seçiminin uygunluğu, mimari farkındalık (MVVM, modülerlik), bileşenlerle tekrarın azaltılması, bilinçli state yönetimi seçimi | `mobile_final_project_EN.md:66`, `:80-84` |
| Git Usage | Commit sayısı ve zamana yayılması (tek büyük commit değil), anlamlı mesaj ("fix", "final" değil), varsa branch/merge artı | `mobile_final_project_EN.md:67`, `:88-92` |
| Number & Quality of UI Screens | En az 3 ekran, tutarlı tema (renk, font, ikon), okunabilirlik, buton boyutu, dikey modda farklı ekranlara uyum | `mobile_final_project_EN.md:68`, `:96-103` |
| Functionality & Stability | Ana akış hatasız tamamlanıyor mu, kritik crash var mı, boş liste / geçersiz girdi / internet yok durumunda anlamlı mesaj | `mobile_final_project_EN.md:69`, `:107-111` |
| Data Management / DB Usage | Uygun veri çözümü, makul veri modeli, uygulama kapanıp açılınca kritik veri korunuyor mu | `mobile_final_project_EN.md:70`, `:115-121` |
| Originality & Problem Definition | "To-do klonu" mu, belirli hedef kitle/ihtiyaç var mı, kendine has karakter | `mobile_final_project_EN.md:71`, `:125-130` |
| Documentation & Presentation | PDF kalitesi, kurulum talimatı, 7-10 dk süreye uyum, ana ekranları gösterme (demo/video/gif), gelecek planı | `mobile_final_project_EN.md:72`, `:134-140` |

### Bonus (zorunlu değil)
Testler (unit/widget), platform özellikleri (kamera, konum, bildirim, sensör, offline mod: yani W7-W9 konuları), clean code, i18n (TR/EN), erişilebilirlik (accessibility). `mobile_final_project_EN.md:148-157`

### Akademik dürüstlük
- Hazır/başkasına ait proje yok, dışarıya yaptırma yok, başka öğrenciden veya fork/clone + küçük değişiklikle repo yok. `mobile_final_project_EN.md:165-169`
- Tutorial/örnek proje kullanıldıysa kaynaklar PDF'te belirtilmeli. `mobile_final_project_EN.md:170`
- Öğrenci kendi kodunu anlamalı ve sunumda sorulara cevap verebilmeli. `mobile_final_project_EN.md:172-174`
- Özet kural: fikir orijinal olmayabilir, ama kod orijinal olmalı. `mobile_final_project_EN.md:178`

---

## Olası sorular

1. **AsyncStorage'a nesne nasıl kaydedilir?** Sadece string sakladığı için `setItem(key, JSON.stringify(obj))`, okurken `JSON.parse(await getItem(key))`. `W7/AsyncStorage.md:45`, `W7/AsyncStorage.md:37`
2. **AsyncStorage ile MMKV farkı?** AsyncStorage async (Promise), MMKV senkron ve C++ tabanlı çok hızlı. `W7/AsyncStorage.md:3`, `W7/MMKV.md:3`, `W7/MMKV.md:72`
3. **Mobil uygulama MySQL'e doğrudan bağlanır mı?** Hayır; Express REST API arada durur, RN `fetch` ile API'ye istek atar. `W7/MySQL.md:3`
4. **SQLite'ta neden `?` placeholder kullanılır?** Değerler ayrı dizi olarak geçilir, SQL injection'a karşı güvenli. `W7/SQLite.md:56`, `W7/MySQL.md:41`
5. **Realm'de veri nasıl yazılır?** Her zaman `realm.write(() => realm.create(..., Realm.UpdateMode.Modified))` transaction'ı içinde. `W7/Realm.md:68-72`
6. **fetch 404 döndüğünde catch'e düşer mi?** Hayır; sadece ağ hatasında reject olur. `response.ok` kontrol edilip elle `throw` gerekir. `W8/FetchAPI.md:364`
7. **Axios'un fetch'e göre üstünlükleri?** Otomatik JSON (`response.data`), non-2xx'te otomatik hata, interceptor, timeout, `axios.create` instance. `W8/Axios.md:7-12`
8. **Sıralı ve paralel istek ne zaman?** İkinci istek ilkine bağlıysa sıralı `await`; bağımsızsa `Promise.all`. `W8/AsyncAwait.md:30-31`, `W8/AsyncAwait.md:554`
9. **`Promise.all` vs `Promise.allSettled`?** `all` biri reddedilince tümden başarısız; `allSettled` kısmi sonuç verir. `W8/AsyncAwait.md:555`
10. **PUT ile PATCH farkı?** PUT tüm kaynağı değiştirir, PATCH kısmen günceller. `W8/RESTfulAPIs.md:9-10`
11. **201 ve 204 ne demek?** 201 Created (POST sonrası), 204 No Content (başarılı, gövde yok). `W8/RESTfulAPIs.md:22-23`
12. **fetch'e timeout nasıl eklenir?** `AbortController` + `setTimeout(controller.abort)`, `fetch(url, { signal })`, sonra `clearTimeout`. `W8/ErrorHandling.md:96-108`
13. **`finally` bloğu neden kullanılır?** Başarı ya da hata olsun `setLoading(false)` mutlaka çalışsın diye. `W8/AsyncAwait.md:83-85`
14. **Kamera izni nasıl istenir?** `const [permission, requestPermission] = useCameraPermissions();` izin yoksa düğme ile `requestPermission`. `W9/components/Camera.md:30`, `W9/components/Camera.md:43-52`
15. **Android'de bildirim için ekstra ne gerekir?** Android 13+ runtime izni ve bildirim kanalı (`setNotificationChannelAsync`). `W9/components/Notifications.md:115-116`
16. **`initialRegion` ile `region` farkı?** `initialRegion` sadece başlangıç (kontrolsüz); `region` kontrollü, her değişimde state güncellenir, takılma yapabilir. `W9/components/ReactNativeMaps.md:10`, `W9/components/ReactNativeMaps.md:113`
17. **Final projede minimum şartlar?** 3 anlamlı ekran, navigation, en az bir kullanıcı girdisi, basit state yönetimi; tercihen kalıcı depolama. `mobile_final_project_EN.md:49-56`

---

## Materyalde hata / güncel olmayan bilgi

| # | Yer | Sorun | Doğrusu |
|---|---|---|---|
| 1 | `W7/MMKV.md:3` | "MMKV ... built by Facebook" | MMKV Tencent (WeChat) tarafından geliştirildi; `react-native-mmkv` ise Marc Rousavy'nin paketi. |
| 2 | `W7/MMKV.md:3` vs `:30`, `:36` | "JSON serialization beklemeden" deniyor ama örnekler nesneleri `JSON.stringify/parse` ile saklıyor. | MMKV sadece string/number/bool/buffer saklar; nesne için JSON yine gerekir. |
| 3 | `W7/MMKV.md:149` | `Picker` `react-native`'den import ediliyor. | `Picker` core'dan çıkarıldı; `@react-native-picker/picker` paketi gerekir. Kod bu haliyle çalışmaz. |
| 4 | `W7/README.md:13` | Kodların Expo Blank şablonunda "aynen" çalıştığı söyleniyor. | MMKV ve Realm native modül; Expo Go'da yok, development build gerekir. |
| 5 | `W7/SQLite.md:28`, `:33-34`, `:99` | `SQLite.openDatabase` + `db.transaction/tx.executeSql` | Eski (legacy) API; Expo SDK 50'de `expo-sqlite/legacy`'ye taşındı, SDK 52'de kaldırıldı. Güncel: `openDatabaseAsync`, `runAsync`, `getAllAsync`. |
| 6 | `W7/Realm.md:62`, `:132` | Cleanup `realmInstance?.close()` boş bağımlılıklı `useEffect` içinde; closure'daki `realmInstance` hep `null`. | Realm hiç kapanmaz; `useRef` veya yerel değişken kullanılmalı. Ayrıca Realm (Atlas Device SDK) 2024'te deprecated. |
| 7 | `W7/AsyncStorage.md:41-48` | `syncWithServer` içinde try/catch/finally yok. | fetch hata verirse `loading` sonsuza kadar `true` kalır. |
| 8 | `W7/SQLite.md:130-135` | Kuyruk gönderiminde `response.ok` kontrol edilmeden `synced = 1` yapılıyor. | Sunucu 500 dönerse kayıt "gönderildi" diye işaretlenip kaybolur. |
| 9 | `W8/ErrorHandling.md:80` | `!navigator.onLine` ile ağ kontrolü. | RN'de `navigator.onLine` tanımsız (`undefined`), `!undefined` her zaman `true`: catch'e düşen her hata NETWORK sınıflanır. `@react-native-community/netinfo` kullanılmalı. |
| 10 | `W8/LoadingStates.md:38` | `new Animated.Value(0)` render içinde, `useRef` yok. | Her render'da yeni değer oluşur; `useRef(new Animated.Value(0)).current` olmalı. |
| 11 | `W8/LoadingStates.md:96-103`, `:127-130` | `fetchArticles` ve `loadInitial` hata yönetimi yok. | İstek düşerse skeleton sonsuza kadar döner; aynı dosyanın kendi ipucuyla (`:962`) çelişir. |
| 12 | `W8/FetchAPI.md:215` | Örnek 2'de `response.ok` kontrolü yok. | Aynı dosyanın ipucuyla (`:362`) çelişir. Benzeri `W8/RESTfulAPIs.md:549-550`. |
| 13 | `W8/FetchAPI.md:4`, `:24` | Fetch'in "web tarayıcısıyla tamamen aynı" çalıştığı ve `mode` (cors) seçeneği. | RN'de CORS yok, `mode` etkisiz; tarayıcıyla birebir aynı değil. |
| 14 | `W8/Axios.md:9`, `:567` | `axios.CancelToken` öneriliyor. | Axios v0.22'den beri deprecated; `AbortController` (`signal`) kullanılmalı. |
| 15 | `W8/ErrorHandling.md:482` | Örnek 2'de `'timeout'` mesajı kontrol ediliyor. | O örnekte timeout mekanizması yok; dal hiç çalışmaz (küçük). |
| 16 | `W9/components/Notifications.md:33` | `shouldShowAlert: true` | Expo SDK 53'ten beri deprecated; `shouldShowBanner` ve `shouldShowList`. |
| 17 | `W9/README.md:9` vs `W9/components/Notifications.md` | Her not "iki çalışır örnek" içerir deniyor. | Notifications dosyasında tek örnek var; zamanlanmış bildirim, iptal ve tıklama dinleyicisi örneklenmemiş (`:110-114` arası boş). |
| 18 | `W9/components/ReactNativeLeaflet.md:17-19` | Key Concepts: `mapCenterPosition`, `mapMarkers`, `mapShapes`. | Bunlar `react-native-webview-leaflet` prop'ları; dosya bu paketi kullanmıyor (`:7`), örneklerde geçmiyor. |
| 19 | `W9` ve `W8` tüm örnekler (ör. `W9/components/Camera.md:25`) | `SafeAreaView` `react-native`'den. | RN 0.81'de deprecated; `react-native-safe-area-context` önerilir (ders dışı ek bilgi). |
| 20 | `mobile_final_project_EN.md:5` vs `:139` | Proje bireysel ("each student") ama sunumda "her takım üyesinin katkısı" isteniyor. | Bireysel mi takım mı belirsiz; hocaya sorulmalı. |
| 21 | `mobile_final_project_EN.md:20-28` | PDF içeriği "Git repository link" maddesinin altında; PDF ayrı teslim olarak listelenmemiş. | PDF'in ayrı teslim edildiği/README olarak repoda durup durmayacağı belirsiz. |
| 22 | `mobile_final_project_EN.md:55`, `:149` | Room, CoreData, Hive, "widget tests" | Android/iOS/Flutter terimleri; RN karşılıkları: SQLite/AsyncStorage/MMKV, Jest + React Native Testing Library. Belge platformdan bağımsız yazılmış. |

**Emin olunamayan:** `W9/components/ReactNativeLeaflet.md:140` HTML'de sadece `window.addEventListener('message')` var; react-native-webview Android'de mesajı `document` üzerinde de tetikleyebiliyor, Android'de marker senkronu çalışmayabilir (cihazda doğrulanmadı).
