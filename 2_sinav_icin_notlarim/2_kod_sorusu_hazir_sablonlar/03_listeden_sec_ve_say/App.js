/*
 * SABLON 03: TEK / COKLU SECIMLI LISTE
 *
 * Ne yapar:
 *   - FlatList ile liste; satira dokununca secilir / secim kalkar.
 *   - MULTI = true ise birden fazla secim, MULTI = false ise tek secim (radio gibi).
 *   - "Tümünü seç" ve "Temizle" butonlari (tek secim modunda "Tümünü seç" gizlenir).
 *   - Altta sayac ("Selected: X / Y") ve secilenlerin virgulle listesi.
 *
 * Kullanilan bilesenler: View, Text, Image, FlatList, TouchableOpacity, StyleSheet, StatusBar.
 *
 * NASIL UYARLANIR:
 *   1. Veriyi ITEMS dizisine yaz ({ id: 'string', name: '...' }).
 *   2. Tek secim istenirse MULTI = false yap; baska bir sey degismez.
 *   3. Resim istenmiyorsa SHOW_IMAGE = false yap.
 *   4. Basligi TITLE'dan, alt metin formatini footer kisminden degistir.
 */

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

// Mod ayarlari
const MULTI = true; // true: coklu secim, false: tek secim
const SHOW_IMAGE = true; // satirin solunda yuvarlak resim
const TITLE = 'Item Picker';

// Renk sabitleri
const COLORS = {
  background: '#f3f4f6',
  text: '#111827',
  muted: '#6b7280',
  selectedBorder: '#22c55e',
  selectedBg: '#dcfce7',
  normalBorder: '#d1d5db',
  normalBg: '#ffffff',
  primary: '#2563eb',
  danger: '#dc2626',
  white: '#ffffff',
  footerBorder: '#e5e7eb',
};

// Veri
const ITEMS = [
  { id: '1', name: 'İstanbul' },
  { id: '2', name: 'Ankara' },
  { id: '3', name: 'İzmir' },
  { id: '4', name: 'Bursa' },
  { id: '5', name: 'Antalya' },
  { id: '6', name: 'Konya' },
  { id: '7', name: 'Trabzon' },
  { id: '8', name: 'Sivas' },
  { id: '9', name: 'Eskişehir' },
  { id: '10', name: 'Gaziantep' },
];

function imageUri(name) {
  return `https://picsum.photos/seed/${encodeURIComponent(name)}/48/48`;
}

export default function App() {
  // Secili id'ler (tek secimde de dizi; en fazla 1 eleman olur)
  const [selected, setSelected] = useState([]);

  const toggleItem = (id) => {
    setSelected((prev) => {
      const isSelected = prev.includes(id);
      if (MULTI) {
        // Coklu: varsa cikar, yoksa ekle
        return isSelected ? prev.filter((x) => x !== id) : [...prev, id];
      }
      // Tek: ayni ise bosalt, degilse sadece onu sec
      return isSelected ? [] : [id];
    });
  };

  const selectAll = () => setSelected(ITEMS.map((item) => item.id));
  const clearAll = () => setSelected([]);

  // Secilenlerin adlari, listedeki sirayla
  const selectedNames = ITEMS.filter((item) => selected.includes(item.id))
    .map((item) => item.name)
    .join(', ');

  const renderItem = ({ item }) => {
    const isSelected = selected.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.row, isSelected ? styles.rowSelected : styles.rowNormal]}
        onPress={() => toggleItem(item.id)}
        activeOpacity={0.7}
      >
        {SHOW_IMAGE && (
          <Image source={{ uri: imageUri(item.name) }} style={styles.avatar} />
        )}
        <Text style={styles.name}>{item.name}</Text>
        {/* Sagda isaret: coklu modda kare, tek modda yuvarlak */}
        <View
          style={[
            styles.mark,
            MULTI ? styles.markSquare : styles.markRound,
            isSelected && styles.markOn,
          ]}
        >
          {isSelected && <Text style={styles.markText}>✓</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{TITLE}</Text>
      <Text style={styles.subtitle}>
        {MULTI ? 'Çoklu seçim modu' : 'Tek seçim modu'}
      </Text>

      {/* Butonlar */}
      <View style={styles.buttonRow}>
        {MULTI && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.primary }]}
            onPress={selectAll}
          >
            <Text style={styles.buttonText}>Tümünü seç</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.danger }]}
          onPress={clearAll}
        >
          <Text style={styles.buttonText}>Temizle</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        extraData={selected}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      {/* Alt bilgi: sayac + secilenler */}
      <View style={styles.footer}>
        <Text style={styles.counter}>
          Selected: {selected.length} / {ITEMS.length}
        </Text>
        <Text style={styles.selectedNames} numberOfLines={2}>
          {selectedNames.length > 0 ? selectedNames : 'Henüz seçim yok'}
        </Text>
      </View>

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
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 8,
    borderWidth: 2,
    borderRadius: 10,
  },
  rowSelected: {
    borderColor: COLORS.selectedBorder,
    backgroundColor: COLORS.selectedBg,
  },
  rowNormal: {
    borderColor: COLORS.normalBorder,
    backgroundColor: COLORS.normalBg,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: 18,
    color: COLORS.text,
  },
  mark: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: COLORS.normalBorder,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  markSquare: {
    borderRadius: 6,
  },
  markRound: {
    borderRadius: 13,
  },
  markOn: {
    borderColor: COLORS.selectedBorder,
    backgroundColor: COLORS.selectedBorder,
  },
  markText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    paddingBottom: 30,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.footerBorder,
  },
  counter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  selectedNames: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
  },
});
