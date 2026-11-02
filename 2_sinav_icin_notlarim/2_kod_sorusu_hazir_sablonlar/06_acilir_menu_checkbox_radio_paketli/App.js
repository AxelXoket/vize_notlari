/*
 * 06 - SECIM BILESENLERI (PAKETLI: hocanin derste kullandigi paketler)
 *
 * KURULUM:
 *   Yerel proje:  npx expo install @react-native-picker/picker expo-checkbox
 *   Expo Snack:   import yazinca paketler otomatik eklenir (gerekirse "Add dependency").
 *   Paket kurulamazsa: 07_acilir_menu_checkbox_radio_paketsiz/App.js (ayni ekran, paketsiz).
 *
 * NE YAPAR:
 *   Sehir secimi (Picker), coklu ilgi alani secimi (expo-checkbox),
 *   tek secimlik seviye (core RadioButton). Altta canli ozet.
 *
 * BILESENLER:
 *   Picker + Picker.Item (selectedValue / onValueChange)
 *   Checkbox from 'expo-checkbox' (value / onValueChange / color)
 *   Pressable ile RadioButton, View, Text, ScrollView, StyleSheet
 *
 * NASIL UYARLANIR:
 *   1. Picker secenekleri: CITIES dizisini degistir ("Select..." ilk eleman kalsin).
 *   2. Checkbox secenekleri: INTERESTS dizisine ekle, baslangic state'ine ayni id ile false ekle.
 *   3. Radio secenekleri: LEVELS dizisini degistir.
 *   4. Ozet metni: en alttaki "Summary" kartindaki Text satirlarini duzenle.
 */

import { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';

const COLORS = {
  bg: '#f1f5f9',
  card: '#ffffff',
  text: '#0f172a',
  muted: '#64748b',
  border: '#cbd5e1',
  primary: '#2563eb',
};

// value '' olan ilk eleman = "henuz secilmedi"
const CITIES = [
  { label: 'Select...', value: '' },
  { label: 'İstanbul', value: 'istanbul' },
  { label: 'Ankara', value: 'ankara' },
  { label: 'İzmir', value: 'izmir' },
  { label: 'Bursa', value: 'bursa' },
  { label: 'Antalya', value: 'antalya' },
];

const INTERESTS = [
  { id: 'sports', label: 'Sports' },
  { id: 'music', label: 'Music' },
  { id: 'books', label: 'Books' },
  { id: 'games', label: 'Games' },
];

const LEVELS = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

// Core ile RadioButton (hocanin RadioItem ornegindeki kalip)
function RadioButton({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.row}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View style={[styles.radioOuter, selected && { borderColor: COLORS.primary }]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.optionText}>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const [city, setCity] = useState(''); // Picker: string
  const [interests, setInterests] = useState({ sports: false, music: true, books: false, games: false }); // Checkbox: obje
  const [level, setLevel] = useState('intermediate'); // Radio: tek string

  // Checkbox degisince sadece o anahtari guncelle (immutable)
  const toggleInterest = (id, value) => {
    setInterests((prev) => ({ ...prev, [id]: value }));
  };

  // Ozet icin etiketleri bul
  const cityLabel = city === '' ? 'Not selected' : CITIES.find((s) => s.value === city).label;
  const selectedInterests = INTERESTS.filter((i) => interests[i.id]).map((i) => i.label);
  const interestsText = selectedInterests.length > 0 ? selectedInterests.join(', ') : 'None';
  const levelLabel = LEVELS.find((s) => s.id === level)?.label ?? 'Not selected';

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Preferences</Text>

        {/* 1) PICKER: city */}
        <Text style={styles.label}>City</Text>
        {/* Android'de arka plan icin Picker'i View ile sar */}
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={city}
            onValueChange={(value) => setCity(value)}
            mode="dropdown"
            dropdownIconColor={COLORS.primary}
          >
            {CITIES.map((s) => (
              <Picker.Item key={s.value} label={s.label} value={s.value} />
            ))}
          </Picker>
        </View>

        {/* 2) CHECKBOX (expo-checkbox): coklu secim */}
        <Text style={styles.label}>Interests</Text>
        {INTERESTS.map((item) => (
          <View key={item.id} style={styles.row}>
            <Checkbox
              value={interests[item.id]}
              onValueChange={(value) => toggleInterest(item.id, value)}
              color={interests[item.id] ? COLORS.primary : undefined}
              style={styles.checkbox}
            />
            {/* Yaziya basinca da degissin */}
            <Text
              style={styles.optionText}
              onPress={() => toggleInterest(item.id, !interests[item.id])}
            >
              {item.label}
            </Text>
          </View>
        ))}

        {/* 3) RADIO: tek secim */}
        <Text style={styles.label}>Level</Text>
        <View accessibilityRole="radiogroup">
          {LEVELS.map((s) => (
            <RadioButton
              key={s.id}
              label={s.label}
              selected={level === s.id}
              onPress={() => setLevel(s.id)}
            />
          ))}
        </View>

        {/* CANLI OZET: state degistikce otomatik guncellenir */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Summary</Text>
          <Text style={styles.cardLine}>Selected city: {cityLabel}</Text>
          <Text style={styles.cardLine}>Interests: {interestsText}</Text>
          <Text style={styles.cardLine}>Level: {levelLabel}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 50, // SafeAreaView yerine
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 18,
    marginBottom: 8,
  },
  pickerBox: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    marginRight: 10,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    padding: 16,
    marginTop: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  cardLine: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 4,
  },
});
