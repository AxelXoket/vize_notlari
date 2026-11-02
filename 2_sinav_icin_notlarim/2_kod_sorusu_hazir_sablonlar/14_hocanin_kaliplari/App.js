/*
 * 14 - HOCANIN KALIPLARI (FOTOGRAF GORUNTULEYICI)
 *
 * NE YAPAR:
 *   Bir fotograf kartini gosterir. Previous / Next (cekirdek Button) ile
 *   fotograflar arasinda gezilir. Yildiz ikonuna (Ionicons) basinca favori
 *   olur. Alttaki secimle resmin kutuya nasil sigacagi (resizeMode) degisir.
 *   Ekran asagi cekilince (RefreshControl) ya da Refresh butonuna basinca
 *   fotograflar karisir ve "Last updated" saati yenilenir.
 *
 * NEDEN VAR:
 *   Hocanin W6 orneklerinde olup 01-13'te olmayan 5 parca burada:
 *   1) SafeAreaView  : hocanin W6 orneklerinde ekranin en dis kutusu.
 *   2) Button        : cekirdek buton (title, onPress, color, disabled).
 *   3) RefreshControl: ScrollView'a asagi cekip yenileme ekler.
 *   4) Ionicons      : @expo/vector-icons ikonlari (kurulum gerekmez).
 *   5) resizeMode    : Image'in kutuya sigma bicimi.
 *
 * KULLANILAN BILESENLER:
 *   SafeAreaView, ScrollView (refreshControl), RefreshControl, View, Text,
 *   Image (resizeMode), Button, TouchableOpacity, StyleSheet,
 *   Ionicons (@expo/vector-icons), StatusBar (expo-status-bar).
 *   Hook: useState.
 *
 * NASIL UYARLANIR:
 *   - Baslik: TITLE. Fotograflar: PHOTOS (her birinin id'si farkli olsun).
 *   - Ikon degistirmek: name="star" yerine "heart", "trash", "add-circle",
 *     "checkmark-circle", "search", "settings" ... Bos hali: "heart-outline".
 *   - Button rengini color ile verirsin (iOS: yazi rengi, Android/web:
 *     arka plan rengi); style ALMAZ. Tasarim lazimsa TouchableOpacity kullan
 *     (01-13'teki gibi).
 *   - Baska bir sablona SafeAreaView koymak: import'a SafeAreaView ekle,
 *     return'deki en dis <View style={styles.container}> ... </View>
 *     etiketlerini <SafeAreaView ...> ... </SafeAreaView> yap. O sablonun
 *     container stilinde "paddingTop: 50" varsa onu buradaki gibi
 *     Platform.OS === 'android' ? 50 : 0 yap; yoksa iPhone'da bosluk ikiye katlanir.
 *   - Yenileme istenmiyorsa: ScrollView'dan refreshControl satirini sil.
 *
 * NOT (web onizleme):
 *   Asagi cekip yenileme yalnizca telefonda (Expo Go) calisir; web'de
 *   ayni isi Refresh butonu yapar. resizeMode="center" web'de resmi
 *   kucultmez, telefonda kutuya sigacak kadar kucultur.
 *
 * NOT (SafeAreaView):
 *   Cekirdek SafeAreaView YALNIZCA iOS'ta etkilidir; Android'de ve web'de duz
 *   View gibi davranir. RN 0.81'de (Expo SDK 54) deprecated: Snack import'un
 *   ustunu cizer ama calisir. Hoca kullandigi icin burada. Android'de durum
 *   cubugu bosluguna paddingTop verilir (styles.container). Yeni projede
 *   onerilen: react-native-safe-area-context paketindeki SafeAreaView.
 */

import { useState } from 'react';
import {
  Button,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const TITLE = 'Photo Viewer';

const PHOTOS = [
  { id: '1', title: 'Photo A', uri: 'https://picsum.photos/seed/photoa/900/300' },
  { id: '2', title: 'Photo B', uri: 'https://picsum.photos/seed/photob/900/300' },
  { id: '3', title: 'Photo C', uri: 'https://picsum.photos/seed/photoc/900/300' },
  { id: '4', title: 'Photo D', uri: 'https://picsum.photos/seed/photod/900/300' },
];

// Image'in kutuya sigma bicimleri (hocanin Image.md'deki liste)
// repeat: resmi kucultmeden doseme gibi tekrarlar
const RESIZE_MODES = ['cover', 'contain', 'stretch', 'center', 'repeat'];

const COLORS = {
  background: '#f8fafc',
  card: '#ffffff',
  primary: '#2563eb',
  star: '#f59e0b',
  text: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  imageBox: '#e2e8f0',
};

// Saati "14:05:09" bicimine cevirir
const formatTime = (date) => date.toLocaleTimeString('en-GB');

export default function App() {
  const [photos, setPhotos] = useState(PHOTOS);
  const [index, setIndex] = useState(0); // gosterilen fotografin sirasi
  const [favorites, setFavorites] = useState([]); // favori fotograf id'leri
  const [resizeMode, setResizeMode] = useState('cover');
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(formatTime(new Date()));

  const photo = photos[index];
  const isFavorite = favorites.includes(photo.id);
  const isFirst = index === 0;
  const isLast = index === photos.length - 1;

  const goPrevious = () => setIndex((prev) => prev - 1);
  const goNext = () => setIndex((prev) => prev + 1);

  // Favorideyse cikar, degilse ekle
  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.includes(photo.id)
        ? prev.filter((id) => id !== photo.id)
        : [...prev, photo.id]
    );
  };

  // Yenileme: veriyi indiriyormus gibi 1 saniye bekler, sonra ilk fotografi
  // sona tasir (sira her yenilemede gorunur sekilde degissin).
  // Gercek bir API olsaydi setTimeout yerine fetch yazilirdi (bkz. sablon 10).
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPhotos((prev) => [...prev.slice(1), prev[0]]);
      setIndex(0);
      setLastUpdated(formatTime(new Date()));
      setRefreshing(false);
    }, 1000);
  };

  return (
    // SafeAreaView: iPhone'da icerik centik / durum cubugu altina girmesin diye
    // en dis kutu (Android'de etkisi yok, bosluk styles.container'dan gelir)
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        // Asagi cekince handleRefresh calisir, refreshing true iken donen ikon gorunur
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]} // Android donen ikon rengi
            tintColor={COLORS.primary} // iOS donen ikon rengi
          />
        }
      >
        <Text style={styles.title}>{TITLE}</Text>
        <Text style={styles.subtitle}>
          {refreshing ? 'Refreshing...' : `Last updated: ${lastUpdated}`}
        </Text>

        <View style={styles.card}>
          <View style={styles.imageBox}>
            {/* resizeMode: cover = doldur (kirpar), contain = tamami gorunur,
                stretch = esneterek doldur, center = ortala (buyutmez) */}
            <Image
              source={{ uri: photo.uri }}
              style={styles.image}
              resizeMode={resizeMode}
            />
          </View>

          <View style={styles.cardRow}>
            <View style={styles.cardInfo}>
              <Text style={styles.photoTitle}>{photo.title}</Text>
              <Text style={styles.muted}>
                Photo {index + 1} / {photos.length}
              </Text>
            </View>

            {/* Ionicons: name ikonun adi, size boyutu, color rengi */}
            <TouchableOpacity onPress={toggleFavorite} style={styles.iconButton}>
              <Ionicons
                name={isFavorite ? 'star' : 'star-outline'}
                size={28}
                color={COLORS.star}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Cekirdek Button: style almaz; rengi color ile, kapatmayi disabled ile */}
        <View style={styles.buttonRow}>
          <View style={styles.buttonCell}>
            <Button title="Previous" onPress={goPrevious} disabled={isFirst} />
          </View>
          <View style={styles.buttonCell}>
            <Button
              title="Next"
              onPress={goNext}
              disabled={isLast}
              color={COLORS.primary}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Resize mode</Text>
        <View style={styles.modeRow}>
          {RESIZE_MODES.map((mode) => {
            const isActive = mode === resizeMode;
            return (
              <TouchableOpacity
                key={mode}
                style={[styles.modeChip, isActive && styles.modeChipActive]}
                onPress={() => setResizeMode(mode)}
              >
                <Text style={[styles.modeText, isActive && styles.modeTextActive]}>
                  {mode}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Ionicons name="heart" size={18} color={COLORS.star} />
          <Text style={styles.footerText}>
            Favorites: {favorites.length} / {photos.length}
          </Text>
        </View>

        <Button title="Refresh" onPress={handleRefresh} disabled={refreshing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    // SafeAreaView Android'de bosluk birakmaz, durum cubugu payini elle veririz
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  content: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 16,
    color: COLORS.muted,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  imageBox: {
    backgroundColor: COLORS.imageBox,
  },
  image: {
    width: '100%', // uri ile gelen resme boyut vermek ZORUNLU
    height: 220,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  cardInfo: {
    flex: 1,
  },
  photoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  muted: {
    marginTop: 2,
    color: COLORS.muted,
  },
  iconButton: {
    padding: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  buttonCell: {
    flex: 1, // Button style almadigi icin genisligi saran View verir
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  modeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modeChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  modeChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  modeText: {
    color: COLORS.text,
  },
  modeTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 20,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 16,
    color: COLORS.text,
  },
});
