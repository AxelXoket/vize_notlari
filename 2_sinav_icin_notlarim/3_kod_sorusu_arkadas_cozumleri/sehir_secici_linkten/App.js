/*
 * ARKADAS REFERANSI: "City Picker", veriyi linkten ceken surum
 *
 * Ne yapar:
 *   - sehir_secici/App.js ile ayni ekran, ama sehir listesi sabit dizi yerine DATA_URL'den fetch ile gelir.
 *   - Yuklenirken ActivityIndicator, hata olursa hata mesaji + "Try again" butonu.
 *   - Dokununca secim / secimi kaldirma, altta sabit "Selected cities: X / Y".
 *
 * Kullanilan bilesenler: View, Text, Image, FlatList, TouchableOpacity,
 *   ActivityIndicator, StyleSheet, StatusBar; hook'lar: useState, useEffect.
 *
 * NASIL UYARLANIR:
 *   1. Verilen JSON linkini DATA_URL'ye yapistir. GitHub dosyasiysa "Raw" butonundaki
 *      adresi kullan (raw.githubusercontent.com/...), normal sayfa adresi JSON dondurmez.
 *   2. Gelen JSON'daki alan adlari farkliysa (ornegin city, title, cityName)
 *      mapItem() fonksiyonunda x.name yerine o alani yaz.
 *   3. JSON dizi degil de { cities: [...] } gibi bir nesneyse toArray() icinde
 *      json.cities dondur.
 *   4. Veri dosyasini indirip projeye koyman istenirse: import cities from './cities.json';
 *      sonra sehir_secici/App.js'deki gibi sabit dizi kullan (fetch gerekmez).
 */

import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

// Verilen JSON linkini buraya yapistir, alan adlarini asagidaki mapItem ile uyarla
const DATA_URL = 'https://jsonplaceholder.typicode.com/users';

// Renk sabitleri
const COLORS = {
  background: '#f3f4f6',
  title: '#111827',
  text: '#111827',
  muted: '#6b7280',
  error: '#dc2626',
  selectedBorder: '#22c55e',
  selectedBg: '#dcfce7',
  normalBorder: '#d1d5db',
  normalBg: '#ffffff',
  footerBg: '#ffffff',
  footerBorder: '#e5e7eb',
  button: '#2563eb',
  buttonText: '#ffffff',
};

// Gelen her kaydi { id, name } bicimine cevir (id mutlaka string)
function mapItem(x, index) {
  return {
    id: String(x.id ?? index),
    name: x.name,
  };
}

// JSON'un kendisi dizi degilse icindeki diziyi bul
function toArray(json) {
  if (Array.isArray(json)) return json;
  if (json && Array.isArray(json.cities)) return json.cities;
  return [];
}

function imageUri(name) {
  return `https://picsum.photos/seed/${encodeURIComponent(name)}/48/48`;
}

export default function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);

  const loadCities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      const json = await response.json();
      setCities(toArray(json).map(mapItem));
      setSelected([]);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Uygulama acilinca bir kez veri cek
  useEffect(() => {
    loadCities();
  }, []);

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

  // Ortadaki icerik: yukleniyor, hata veya liste
  let content;
  if (loading) {
    content = (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.selectedBorder} />
        <Text style={styles.infoText}>Loading...</Text>
      </View>
    );
  } else if (error) {
    content = (
      <View style={styles.center}>
        <Text style={styles.errorText}>Could not load data: {error}</Text>
        <TouchableOpacity style={styles.button} onPress={loadCities}>
          <Text style={styles.buttonText}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    content = (
      <FlatList
        data={cities}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        extraData={selected}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.infoText}>No cities.</Text>}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>City Picker</Text>

      {content}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Selected cities: {selected.length} / {cities.length}
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  infoText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.muted,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 12,
  },
  button: {
    backgroundColor: COLORS.button,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.buttonText,
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
  cityName: {
    fontSize: 18,
    color: COLORS.text,
    flexShrink: 1,
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
