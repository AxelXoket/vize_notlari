/*
 * SABLON 01: Genel birim donusturucu
 *
 * NE YAPAR:
 *   Bir sayi girilir, yatay seceneklerden (chip) donusum turu secilir,
 *   Convert'e basinca sonuc kartta gosterilir. Reset her seyi temizler.
 *   Hazir donusumler: Celsius -> Fahrenheit, km -> mi, kg -> lb, TRY -> USD (sabit kur).
 *
 * KULLANILAN BILESENLER:
 *   View, Text, TextInput, TouchableOpacity, ScrollView (yatay chip listesi),
 *   Platform, StyleSheet (react-native), StatusBar (expo-status-bar). Hook: useState
 *
 * NASIL UYARLANIR:
 *   - Yeni birim: CONVERSIONS dizisine TEK SATIR ekle (label, from, to, convert fonksiyonu).
 *   - Kur degisirse: USD_RATE sabitini guncelle.
 *   - Baslik ve renkler: TITLE ve COLORS sabitleri.
 *   - Ondalik basamak: DECIMALS sabiti (veya handleConvert icindeki toFixed).
 */

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Renkler: tasarima gore buradan degistir
const COLORS = {
  background: '#FFFFFF',
  text: '#111111',
  muted: '#666666',
  border: '#CCCCCC',
  primary: '#2196F3',
  onPrimary: '#FFFFFF',
  chip: '#EEF4FB',
  card: '#F5F9FF',
  error: '#D32F2F',
};

const TITLE = 'Unit Converter';
const DECIMALS = 2;
const USD_RATE = 41.5; // 1 USD = 41.5 TRY (sabit, ornek kur)

// DONUSUM TABLOSU: yeni birim icin buraya bir satir ekle
const CONVERSIONS = [
  { label: '°C → °F', from: '°C', to: '°F', convert: (x) => (x * 9) / 5 + 32 },
  { label: 'km → mi', from: 'km', to: 'mi', convert: (x) => x * 0.621371 },
  { label: 'kg → lb', from: 'kg', to: 'lb', convert: (x) => x * 2.20462 },
  { label: 'TRY → USD', from: 'TRY', to: 'USD', convert: (x) => x / USD_RATE },
];

// Sadece rakam, bastaki eksi ve tek ondalik ayirici birakir; virgulu noktaya cevirir
function keepNumeric(text) {
  let cleaned = text.replace(/,/g, '.').replace(/[^0-9.-]/g, '');
  const negative = cleaned.startsWith('-');
  cleaned = cleaned.replace(/-/g, '');
  const firstDot = cleaned.indexOf('.');
  if (firstDot !== -1) {
    cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '');
  }
  return negative ? '-' + cleaned : cleaned;
}

export default function App() {
  // State: giris metni, secili donusum (dizideki sira), sonuc ve hata
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const conversion = CONVERSIONS[selected];

  // Chip secilince turu degistir, eski sonucu sil
  const handleSelect = (index) => {
    setSelected(index);
    setResult(null);
    setError('');
  };

  // Convert: dogrula ve tablodaki fonksiyonla hesapla
  const handleConvert = () => {
    const value = parseFloat(input);
    if (input.trim() === '' || isNaN(value)) {
      setError('Please enter a valid number.');
      setResult(null);
      return;
    }
    setError('');
    setResult({ value: value, output: conversion.convert(value).toFixed(DECIMALS) });
  };

  // Reset: giris, sonuc ve hatayi temizle
  const handleReset = () => {
    setInput('');
    setResult(null);
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{TITLE}</Text>

      {/* Donusum turu secimi: yatay kayan chip'ler */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipRow}
        contentContainerStyle={styles.chipRowContent}
      >
        {CONVERSIONS.map((item, index) => {
          const active = index === selected;
          return (
            <TouchableOpacity
              key={item.label}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => handleSelect(index)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Giris alani; iOS numeric klavyede eksi yok, o yuzden iOS'ta numbers-and-punctuation */}
      <Text style={styles.label}>Value ({conversion.from})</Text>
      <TextInput
        style={styles.input}
        placeholder={conversion.from}
        keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
        value={input}
        onChangeText={(text) => setInput(keepNumeric(text))}
      />

      {/* Butonlar */}
      <TouchableOpacity style={styles.convertButton} onPress={handleConvert} activeOpacity={0.7}>
        <Text style={styles.convertText}>Convert</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>

      {/* Hata mesaji */}
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {/* Sonuc karti: sadece Convert'ten sonra */}
      {result !== null && (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Result</Text>
          <Text style={styles.cardValue}>
            {result.output} {conversion.to}
          </Text>
          <Text style={styles.cardSub}>
            {result.value} {conversion.from} = {result.output} {conversion.to}
          </Text>
        </View>
      )}

      <StatusBar style="dark" />
    </View>
  );
}

// Stiller
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 70,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  chipRow: {
    flexGrow: 0,
    marginBottom: 20,
  },
  chipRowContent: {
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.chip,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  chipTextActive: {
    color: COLORS.onPrimary,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  convertButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  convertText: {
    color: COLORS.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  resetText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  error: {
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 4,
  },
  card: {
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 14,
    color: COLORS.muted,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 6,
  },
  cardSub: {
    fontSize: 14,
    color: COLORS.text,
  },
});
