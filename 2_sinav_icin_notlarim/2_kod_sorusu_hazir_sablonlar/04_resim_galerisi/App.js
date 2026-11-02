/*
 * SABLON 04: RESIM GALERISI (3 SUTUNLU GRID) + BEGENI + BUYUK ONIZLEME
 *
 * Ne yapar:
 *   - FlatList numColumns={3} ile picsum resimlerinden izgara.
 *   - Resme dokununca begenilir / begeni kalkar; sag ust kosede yesil rozet cikar.
 *   - Ustte sayac: "Liked: X / Y".
 *   - Resme uzun basinca (onLongPress) Modal acilir, resim buyuk gosterilir; "Kapat" ile kapanir.
 *
 * Kullanilan bilesenler: View, Text, Image, FlatList, TouchableOpacity, Modal,
 *   StyleSheet, useWindowDimensions, StatusBar.
 *
 * NASIL UYARLANIR:
 *   1. Sutun sayisi NUM_COLUMNS'ta; hucre boyutu ekrana gore otomatik hesaplanir.
 *   2. Resim sayisi IMAGE_COUNT'ta; kendi listen varsa IMAGES dizisini elle yaz
 *      ({ id: 'string', uri: '...' }).
 *   3. Rozet yerine kenarlik istenirse styles.cellSelected'i kullan (asagida hazir).
 *   4. Uzun basma yerine normal dokunusla onizleme istenirse onPress ile onLongPress'i yer degistir.
 */

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const NUM_COLUMNS = 3;
const IMAGE_COUNT = 24;
const GAP = 6; // hucreler arasi bosluk
const PADDING = 12; // listenin kenar boslugu

// Renk sabitleri
const COLORS = {
  background: '#f3f4f6',
  text: '#111827',
  muted: '#6b7280',
  badge: '#22c55e',
  white: '#ffffff',
  overlay: 'rgba(0, 0, 0, 0.85)',
  button: '#2563eb',
};

// Veri: 1..IMAGE_COUNT arasi resimler (seed ayni kaldikca resim de ayni kalir)
const IMAGES = Array.from({ length: IMAGE_COUNT }, (_, i) => ({
  id: String(i + 1),
  uri: `https://picsum.photos/seed/photo${i + 1}/300/300`,
  bigUri: `https://picsum.photos/seed/photo${i + 1}/800/800`,
}));

export default function App() {
  const [liked, setLiked] = useState([]); // begenilen id'ler
  const [preview, setPreview] = useState(null); // modalda gosterilen resim (null: kapali)

  // Hucre genisligi: ekran - kenar bosluklari - aradaki bosluklar, sutun sayisina bol
  const { width } = useWindowDimensions();
  const cellSize = (width - PADDING * 2 - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item, index }) => {
    const isLiked = liked.includes(item.id);
    // Satirin son hucresi degilse saga bosluk ver
    const isLastInRow = (index + 1) % NUM_COLUMNS === 0;
    return (
      <TouchableOpacity
        onPress={() => toggleLike(item.id)}
        onLongPress={() => setPreview(item)}
        delayLongPress={400}
        activeOpacity={0.8}
        style={[
          styles.cell,
          { width: cellSize, height: cellSize, marginRight: isLastInRow ? 0 : GAP },
        ]}
      >
        <Image source={{ uri: item.uri }} style={styles.image} />
        {isLiked && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gallery</Text>
      <Text style={styles.counter}>
        Liked: {liked.length} / {IMAGES.length}
      </Text>
      <Text style={styles.hint}>Dokun: beğen. Uzun bas: büyük önizleme.</Text>

      <FlatList
        data={IMAGES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        extraData={liked}
        contentContainerStyle={styles.listContent}
      />

      {/* Buyuk onizleme (core Modal) */}
      <Modal
        visible={preview !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPreview(null)} // Android geri tusu
      >
        <View style={styles.modalBackground}>
          {preview && (
            <Image
              source={{ uri: preview.bigUri }}
              style={{ width: width - 40, height: width - 40, borderRadius: 12 }}
            />
          )}
          {preview && (
            <Text style={styles.modalInfo}>
              Photo #{preview.id} {liked.includes(preview.id) ? '(liked)' : ''}
            </Text>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setPreview(null)}
          >
            <Text style={styles.closeText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    paddingHorizontal: PADDING,
  },
  counter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    paddingHorizontal: PADDING,
    marginTop: 4,
  },
  hint: {
    fontSize: 13,
    color: COLORS.muted,
    paddingHorizontal: PADDING,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: PADDING,
    paddingBottom: 30,
  },
  cell: {
    marginBottom: GAP,
    borderRadius: 8,
    overflow: 'hidden',
  },
  // Rozet yerine kenarlik istenirse cell stiline ekle
  cellSelected: {
    borderWidth: 3,
    borderColor: COLORS.badge,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.badge,
    borderWidth: 2,
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInfo: {
    color: COLORS.white,
    fontSize: 16,
    marginTop: 12,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: COLORS.button,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
