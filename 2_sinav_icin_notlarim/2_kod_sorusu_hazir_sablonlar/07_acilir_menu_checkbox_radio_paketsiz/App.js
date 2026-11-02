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
 *   1. Dropdown secenekleri: SEHIRLER dizisini degistir (value '' olan "Seçiniz" kalsin).
 *   2. Checkbox secenekleri: ILGI_ALANLARI dizisine ekle, baslangic state'ine ayni id ile false ekle.
 *   3. Radio secenekleri: SEVIYELER dizisini degistir.
 *   4. Ikinci bir dropdown: yeni state + yeni modalAcik state'i, Modal blogunu kopyala.
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
  const [sehir, setSehir] = useState(''); // dropdown: string
  const [modalAcik, setModalAcik] = useState(false); // dropdown listesi acik mi
  const [ilgiler, setIlgiler] = useState({ spor: false, muzik: true, kitap: false, oyun: false }); // checkbox: obje
  const [seviye, setSeviye] = useState('orta'); // radio: tek string

  // Checkbox'a basinca o anahtari tersine cevir (immutable)
  const ilgiDegistir = (id) => {
    setIlgiler((onceki) => ({ ...onceki, [id]: !onceki[id] }));
  };

  // Listeden secince: degeri kaydet ve modali kapat
  const sehirSec = (value) => {
    setSehir(value);
    setModalAcik(false);
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

        {/* 1) DROPDOWN: kutu + Modal icinde FlatList */}
        <Text style={styles.label}>Şehir</Text>
        <Pressable style={styles.dropdownBox} onPress={() => setModalAcik(true)}>
          <Text style={[styles.optionText, sehir === '' && { color: COLORS.muted }]}>
            {sehir === '' ? 'Seçiniz' : sehirEtiketi}
          </Text>
          <Text style={styles.arrow}>▼</Text>
        </Pressable>

        {/* 2) CHECKBOX: coklu secim */}
        <Text style={styles.label}>İlgi Alanları</Text>
        {ILGI_ALANLARI.map((item) => (
          <Checkbox
            key={item.id}
            label={item.label}
            checked={ilgiler[item.id]}
            onPress={() => ilgiDegistir(item.id)}
          />
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

        {/* CANLI OZET */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Özet</Text>
          <Text style={styles.cardLine}>Seçilen şehir: {sehirEtiketi}</Text>
          <Text style={styles.cardLine}>İlgi alanları: {ilgiMetni}</Text>
          <Text style={styles.cardLine}>Seviye: {seviyeEtiketi}</Text>
        </View>
      </ScrollView>

      {/* DROPDOWN LISTESI: transparent Modal, disariya basinca kapanir */}
      <Modal
        visible={modalAcik}
        transparent
        animationType="fade"
        onRequestClose={() => setModalAcik(false)} // Android geri tusu
      >
        <Pressable style={styles.overlay} onPress={() => setModalAcik(false)}>
          {/* Icerideki bosluga basinca kapanmasin diye ayri Pressable */}
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.cardTitle}>Şehir seçin</Text>
            <FlatList
              data={SEHIRLER}
              keyExtractor={(item) => item.label}
              renderItem={({ item }) => {
                const secili = item.value === sehir;
                return (
                  <Pressable
                    style={[styles.listItem, secili && styles.listItemSelected]}
                    onPress={() => sehirSec(item.value)}
                  >
                    <Text style={[styles.optionText, item.value === '' && { color: COLORS.muted }]}>
                      {item.label}
                    </Text>
                    {secili && <Text style={styles.listCheck}>✓</Text>}
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
