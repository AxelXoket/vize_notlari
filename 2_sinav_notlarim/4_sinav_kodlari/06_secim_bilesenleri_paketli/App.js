/*
 * 06 - SECIM BILESENLERI (PAKETLI: hocanin derste kullandigi paketler)
 *
 * KURULUM:
 *   Yerel proje:  npx expo install @react-native-picker/picker expo-checkbox
 *   Expo Snack:   import yazinca paketler otomatik eklenir (gerekirse "Add dependency").
 *   Paket kurulamazsa: 07_secim_bilesenleri_paketsiz/App.js (ayni ekran, paketsiz).
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
 *   1. Picker secenekleri: SEHIRLER dizisini degistir ("Seçiniz" ilk eleman kalsin).
 *   2. Checkbox secenekleri: ILGI_ALANLARI dizisine ekle, baslangic state'ine ayni id ile false ekle.
 *   3. Radio secenekleri: SEVIYELER dizisini degistir.
 *   4. Ozet metni: en alttaki "Özet" kartindaki Text satirlarini duzenle.
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
const SEHIRLER = [
  { label: 'Seçiniz', value: '' },
  { label: 'İstanbul', value: 'istanbul' },
  { label: 'Ankara', value: 'ankara' },
  { label: 'İzmir', value: 'izmir' },
  { label: 'Bursa', value: 'bursa' },
  { label: 'Antalya', value: 'antalya' },
];

const ILGI_ALANLARI = [
  { id: 'spor', label: 'Spor' },
  { id: 'muzik', label: 'Müzik' },
  { id: 'kitap', label: 'Kitap' },
  { id: 'oyun', label: 'Oyun' },
];

const SEVIYELER = [
  { id: 'baslangic', label: 'Başlangıç' },
  { id: 'orta', label: 'Orta' },
  { id: 'ileri', label: 'İleri' },
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
  const [sehir, setSehir] = useState(''); // Picker: string
  const [ilgiler, setIlgiler] = useState({ spor: false, muzik: true, kitap: false, oyun: false }); // Checkbox: obje
  const [seviye, setSeviye] = useState('orta'); // Radio: tek string

  // Checkbox degisince sadece o anahtari guncelle (immutable)
  const ilgiDegistir = (id, deger) => {
    setIlgiler((onceki) => ({ ...onceki, [id]: deger }));
  };

  // Ozet icin etiketleri bul
  const sehirEtiketi = sehir === '' ? 'Seçilmedi' : SEHIRLER.find((s) => s.value === sehir).label;
  const seciliIlgiler = ILGI_ALANLARI.filter((i) => ilgiler[i.id]).map((i) => i.label);
  const ilgiMetni = seciliIlgiler.length > 0 ? seciliIlgiler.join(', ') : 'Yok';
  const seviyeEtiketi = SEVIYELER.find((s) => s.id === seviye)?.label ?? 'Seçilmedi';

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Tercihler</Text>

        {/* 1) PICKER: sehir */}
        <Text style={styles.label}>Şehir</Text>
        {/* Android'de arka plan icin Picker'i View ile sar */}
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={sehir}
            onValueChange={(value) => setSehir(value)}
            mode="dropdown"
            dropdownIconColor={COLORS.primary}
          >
            {SEHIRLER.map((s) => (
              <Picker.Item key={s.value} label={s.label} value={s.value} />
            ))}
          </Picker>
        </View>

        {/* 2) CHECKBOX (expo-checkbox): coklu secim */}
        <Text style={styles.label}>İlgi Alanları</Text>
        {ILGI_ALANLARI.map((item) => (
          <View key={item.id} style={styles.row}>
            <Checkbox
              value={ilgiler[item.id]}
              onValueChange={(value) => ilgiDegistir(item.id, value)}
              color={ilgiler[item.id] ? COLORS.primary : undefined}
              style={styles.checkbox}
            />
            {/* Yaziya basinca da degissin */}
            <Text
              style={styles.optionText}
              onPress={() => ilgiDegistir(item.id, !ilgiler[item.id])}
            >
              {item.label}
            </Text>
          </View>
        ))}

        {/* 3) RADIO: tek secim */}
        <Text style={styles.label}>Seviye</Text>
        <View accessibilityRole="radiogroup">
          {SEVIYELER.map((s) => (
            <RadioButton
              key={s.id}
              label={s.label}
              selected={seviye === s.id}
              onPress={() => setSeviye(s.id)}
            />
          ))}
        </View>

        {/* CANLI OZET: state degistikce otomatik guncellenir */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Özet</Text>
          <Text style={styles.cardLine}>Seçilen şehir: {sehirEtiketi}</Text>
          <Text style={styles.cardLine}>İlgi alanları: {ilgiMetni}</Text>
          <Text style={styles.cardLine}>Seviye: {seviyeEtiketi}</Text>
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
