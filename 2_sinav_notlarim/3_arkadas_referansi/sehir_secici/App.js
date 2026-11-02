/*
 * ARKADAS REFERANSI: "City Picker" (secilebilir sehir listesi)
 *
 * Ne yapar:
 *   - Ustte "City Picker" basligi.
 *   - Dikey listede 10 sehir; her satirda solda 48x48 yuvarlak resim, saginda sehir adi.
 *   - Bir sehre dokununca secilir, tekrar dokununca secim kalkar.
 *   - Secili satir: yesil kenarlik + acik yesil zemin. Secili degil: gri kenarlik + beyaz zemin.
 *   - En altta, listenin disinda sabit satir: "Selected cities: X / Y".
 *
 * Kullanilan bilesenler: View, Text, Image, FlatList, TouchableOpacity, StyleSheet, StatusBar.
 *
 * NASIL UYARLANIR:
 *   1. Veri degisirse sadece CITIES dizisini degistir (id string olmali).
 *   2. Renkler COLORS icinde; farkli renk istenirse orayi degistir.
 *   3. Resim adresi imageUri() fonksiyonunda; boyut degisirse styles.avatar'i da degistir.
 *   4. Alttaki metnin formati footerText satirinda; istenen metni birebir yaz.
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

// Renk sabitleri
const COLORS = {
  background: '#f3f4f6',
  title: '#111827',
  text: '#111827',
  selectedBorder: '#22c55e',
  selectedBg: '#dcfce7',
  normalBorder: '#d1d5db',
  normalBg: '#ffffff',
  footerBg: '#ffffff',
  footerBorder: '#e5e7eb',
};

// Sehir verisi (bilesenin veri kaynagi)
const CITIES = [
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

// Turkce karakterler URL'yi bozmasin diye encodeURIComponent
function imageUri(name) {
  return `https://picsum.photos/seed/${encodeURIComponent(name)}/48/48`;
}

export default function App() {
  // Secili sehirlerin id'leri
  const [selected, setSelected] = useState([]);

  // Dokununca: seciliyse cikar, degilse ekle (diziyi kopyalayarak, immutable)
  const toggleCity = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }) => {
    const isSelected = selected.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.row, isSelected ? styles.rowSelected : styles.rowNormal]}
        onPress={() => toggleCity(item.id)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: imageUri(item.name) }} style={styles.avatar} />
        <Text style={styles.cityName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>City Picker</Text>

      <FlatList
        data={CITIES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        extraData={selected}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />

      {/* Listenin disinda, ekranin altinda sabit */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Selected cities: {selected.length} / {CITIES.length}
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
    color: COLORS.title,
    paddingHorizontal: 16,
    marginBottom: 12,
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
  cityName: {
    fontSize: 18,
    color: COLORS.text,
  },
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 30,
    backgroundColor: COLORS.footerBg,
    borderTopWidth: 1,
    borderTopColor: COLORS.footerBorder,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});
