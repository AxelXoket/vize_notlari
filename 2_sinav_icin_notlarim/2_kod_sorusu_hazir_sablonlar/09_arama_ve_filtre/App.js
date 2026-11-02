/*
 * 09 - ARAMA VE FILTRE
 *
 * NE YAPAR:
 *   Sabit urun dizisini kart listesi olarak gosterir. Ustte arama kutusu
 *   (buyuk/kucuk harf duyarsiz, toLowerCase ile), altinda yatay kaydirilan
 *   kategori chip'leri (tek secim), fiyata gore artan/azalan siralama butonu,
 *   sonuc sayisi ve sonuc yoksa bos mesaj vardir.
 *
 * KULLANILAN BILESENLER:
 *   View, Text, TextInput, TouchableOpacity, ScrollView (yatay), FlatList,
 *   Image, StyleSheet, StatusBar (expo-status-bar). Hook: useState, useMemo.
 *
 * NASIL UYARLANIR:
 *   - Kisi listesi isteniyorsa: PRODUCTS icindeki alanlari (name, category,
 *     price, image) degistir, renderItem icindeki Text'leri guncelle.
 *   - Aranacak alan farkliysa: useMemo icindeki item.name kismini degistir
 *     (ornek: item.name + ' ' + item.city).
 *   - Siralama baska alana gore olacaksa: sort icindeki a.price / b.price
 *     yerine o alani yaz (metin icin a.name.localeCompare(b.name, 'en')).
 *   - Liste ASLA state'e kopyalanmaz: kaynak PRODUCTS + filtre state'leri
 *     -> useMemo ile turetilmis liste.
 */

import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const COLORS = {
  background: '#f3f4f6',
  card: '#ffffff',
  primary: '#7c3aed',
  text: '#111827',
  muted: '#6b7280',
  border: '#e5e7eb',
  price: '#059669',
};

// Sabit veri (picsum: her id sabit bir resim verir)
const PRODUCTS = [
  { id: '1', name: 'Wireless Headphones', category: 'Electronics', price: 1299, image: 'https://picsum.photos/id/1/200/200' },
  { id: '2', name: 'Smart Watch', category: 'Electronics', price: 2499, image: 'https://picsum.photos/id/2/200/200' },
  { id: '3', name: 'Bluetooth Speaker', category: 'Electronics', price: 899, image: 'https://picsum.photos/id/3/200/200' },
  { id: '4', name: 'Cotton T-Shirt', category: 'Clothing', price: 249, image: 'https://picsum.photos/id/4/200/200' },
  { id: '5', name: 'Jeans', category: 'Clothing', price: 699, image: 'https://picsum.photos/id/5/200/200' },
  { id: '6', name: 'Light Jacket', category: 'Clothing', price: 1599, image: 'https://picsum.photos/id/6/200/200' },
  { id: '7', name: 'Crime and Punishment', category: 'Books', price: 120, image: 'https://picsum.photos/id/7/200/200' },
  { id: '8', name: 'The Alchemist', category: 'Books', price: 95, image: 'https://picsum.photos/id/8/200/200' },
  { id: '9', name: 'Moby Dick', category: 'Books', price: 150, image: 'https://picsum.photos/id/9/200/200' },
  { id: '10', name: 'Running Shoes', category: 'Sports', price: 1899, image: 'https://picsum.photos/id/10/200/200' },
  { id: '11', name: 'Yoga Mat', category: 'Sports', price: 349, image: 'https://picsum.photos/id/11/200/200' },
  { id: '12', name: 'Dumbbell Set', category: 'Sports', price: 799, image: 'https://picsum.photos/id/12/200/200' },
  { id: '13', name: 'Steel Thermos', category: 'Home', price: 449, image: 'https://picsum.photos/id/13/200/200' },
  { id: '14', name: 'Coffee Maker', category: 'Home', price: 3299, image: 'https://picsum.photos/id/14/200/200' },
];

// Kategoriler veriden otomatik cikar, basa "All" eklenir
const CATEGORIES = ['All', ...new Set(PRODUCTS.map((p) => p.category))];

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sortAsc, setSortAsc] = useState(true); // true: artan, false: azalan

  // Filtrelenmis + siralanmis liste: sadece bagimliliklar degisince yeniden hesaplanir
  const filteredProducts = useMemo(() => {
    // toLowerCase: buyuk/kucuk harf farkini yok sayar
    const q = query.trim().toLowerCase();

    const result = PRODUCTS.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesQuery = item.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    // filter zaten yeni dizi dondurur, sort onu degistirir; PRODUCTS bozulmaz
    result.sort((a, b) => (sortAsc ? a.price - b.price : b.price - a.price));
    return result;
  }, [query, category, sortAsc]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Products</Text>

      {/* Arama kutusu */}
      <TextInput
        style={styles.search}
        placeholder="Search products..."
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      {/* Kategori chip'leri: yatay ScrollView (FlatList degil, ic ice degil) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScroll}
        contentContainerStyle={styles.chipContent}
      >
        {CATEGORIES.map((cat) => {
          const selected = category === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, selected && styles.chipActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.chipText, selected && styles.chipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Sonuc sayisi + siralama butonu */}
      <View style={styles.toolbar}>
        <Text style={styles.resultCount}>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
        </Text>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortAsc((prev) => !prev)}
        >
          <Text style={styles.sortText}>
            {sortAsc ? 'Price: low to high ↑' : 'Price: high to low ↓'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No results</Text>
        }
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  search: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  chipScroll: {
    flexGrow: 0, // yatay ScrollView dikeyde gereksiz yer kaplamasin
    flexShrink: 0, // alttaki uzun liste chip satirini ezip kesmesin
    marginTop: 12,
  },
  chipContent: {
    paddingRight: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginRight: 8,
    backgroundColor: COLORS.card,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  resultCount: {
    color: COLORS.muted,
    fontSize: 14,
  },
  sortButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  sortText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  cardBody: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  category: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.price,
    marginTop: 4,
  },
  separator: {
    height: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: 40,
    fontSize: 16,
  },
});
