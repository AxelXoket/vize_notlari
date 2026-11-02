/*
 * 07 - SECIM BILESENLERI (PAKETSIZ: sadece react-native core)
 *
 * NE YAPAR:
 *   06 ile ayni ekran, ama HICBIR paket kurmadan (paket kurulamazsa yedek).
 *   Sehir secimi: kutuya basinca Modal acilir, FlatList'ten secilir (dropdown).
 *   Ilgi alanlari: Pressable ile Checkbox (coklu secim).
 *   Seviye: Pressable ile RadioButton (tek secim). Altta canli ozet.
 *
 * BILESENLER:
 *   View, Text, Pressable, ScrollView, Modal, FlatList, StyleSheet,
 *   StatusBar (expo-status-bar)
 *
 * NASIL UYARLANIR:
 *   1. Dropdown secenekleri: CITIES dizisini degistir (value '' olan "Select..." kalsin).
 *   2. Checkbox secenekleri: INTERESTS dizisine ekle, baslangic state'ine ayni id ile false ekle.
 *   3. Radio secenekleri: LEVELS dizisini degistir.
 *   4. Ikinci bir dropdown: yeni state + yeni modalVisible state'i, Modal blogunu kopyala.
 */

import { useState } from 'react';
import { View, Text, Pressable, ScrollView, Modal, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const COLORS = {
  bg: '#f1f5f9',
  card: '#ffffff',
  text: '#0f172a',
  muted: '#64748b',
  border: '#cbd5e1',
  primary: '#2563eb',
  selectedBg: '#dbeafe',
  overlay: 'rgba(0, 0, 0, 0.4)',
  white: '#ffffff',
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

// Core RadioButton: dis halka + seciliyse ic dolu daire
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

// Core Checkbox: kare kutu + isaretliyse icinde ✓
function Checkbox({ label, checked, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.row}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={[styles.checkBox, checked && styles.checkBoxChecked]}>
        {checked && <Text style={styles.checkMark}>✓</Text>}
      </View>
      <Text style={styles.optionText}>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const [city, setCity] = useState(''); // dropdown: string
  const [modalVisible, setModalVisible] = useState(false); // dropdown listesi acik mi
  const [interests, setInterests] = useState({ sports: false, music: true, books: false, games: false }); // checkbox: obje
  const [level, setLevel] = useState('intermediate'); // radio: tek string

  // Checkbox'a basinca o anahtari tersine cevir (immutable)
  const toggleInterest = (id) => {
    setInterests((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Listeden secince: degeri kaydet ve modali kapat
  const selectCity = (value) => {
    setCity(value);
    setModalVisible(false);
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

        {/* 1) DROPDOWN: kutu + Modal icinde FlatList */}
        <Text style={styles.label}>City</Text>
        <Pressable style={styles.dropdownBox} onPress={() => setModalVisible(true)}>
          <Text style={[styles.optionText, city === '' && { color: COLORS.muted }]}>
            {city === '' ? 'Select...' : cityLabel}
          </Text>
          <Text style={styles.arrow}>▼</Text>
        </Pressable>

        {/* 2) CHECKBOX: coklu secim */}
        <Text style={styles.label}>Interests</Text>
        {INTERESTS.map((item) => (
          <Checkbox
            key={item.id}
            label={item.label}
            checked={interests[item.id]}
            onPress={() => toggleInterest(item.id)}
          />
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

        {/* CANLI OZET */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Summary</Text>
          <Text style={styles.cardLine}>Selected city: {cityLabel}</Text>
          <Text style={styles.cardLine}>Interests: {interestsText}</Text>
          <Text style={styles.cardLine}>Level: {levelLabel}</Text>
        </View>
      </ScrollView>

      {/* DROPDOWN LISTESI: transparent Modal, disariya basinca kapanir */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)} // Android geri tusu
      >
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          {/* Icerideki bosluga basinca kapanmasin diye ayri Pressable */}
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.cardTitle}>Select a city</Text>
            <FlatList
              data={CITIES}
              keyExtractor={(item) => item.label}
              renderItem={({ item }) => {
                const isSelected = item.value === city;
                return (
                  <Pressable
                    style={[styles.listItem, isSelected && styles.listItemSelected]}
                    onPress={() => selectCity(item.value)}
                  >
                    <Text style={[styles.optionText, item.value === '' && { color: COLORS.muted }]}>
                      {item.label}
                    </Text>
                    {isSelected && <Text style={styles.listCheck}>✓</Text>}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
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
  dropdownBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  arrow: {
    color: COLORS.primary,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
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
  checkBox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.muted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkBoxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkMark: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
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
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    maxHeight: '70%',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  listItemSelected: {
    backgroundColor: COLORS.selectedBg,
  },
  listCheck: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});
