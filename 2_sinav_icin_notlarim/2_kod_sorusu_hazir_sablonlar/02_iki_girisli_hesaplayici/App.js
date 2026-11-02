/*
 * SABLON 02: Vucut Kitle Indeksi (VKI / BMI) hesaplayici, iki girisli hesaplayici
 *
 * NE YAPAR:
 *   Boy (cm) ve kilo (kg) alinir. Calculate'e basinca VKI = kilo / (boy_metre * boy_metre)
 *   hesaplanir, kategori bulunur ve kategoriye gore renkli kartta gosterilir.
 *   Kategoriler: Underweight < 18.5, Normal < 25, Overweight < 30, Obese >= 30.
 *   Clear her seyi sifirlar. Bos, sifir veya mantiksiz giriste kirmizi uyari gosterir.
 *
 * KULLANILAN BILESENLER:
 *   View, Text, TextInput, TouchableOpacity, StyleSheet (react-native),
 *   StatusBar (expo-status-bar). Hook: useState
 *
 * NASIL UYARLANIR:
 *   - Formul: handleCalculate icindeki "weight / (heightM * heightM)" satiri.
 *   - Kategori sinirlari / renkleri: CATEGORIES dizisi (sirasiyla kontrol edilir).
 *   - Baska iki girisli hesap (ornek: indirim, faiz): etiketleri ve formulu degistir.
 *   - Renkler ve baslik: COLORS ve TITLE sabitleri.
 */

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Renkler: tasarima gore buradan degistir
const COLORS = {
  background: '#FFFFFF',
  text: '#111111',
  muted: '#666666',
  border: '#CCCCCC',
  primary: '#2196F3',
  onPrimary: '#FFFFFF',
  error: '#D32F2F',
};

const TITLE = 'BMI Calculator';

// Kategori tablosu: max degerinden KUCUK ise o kategori (yukaridan asagi kontrol edilir)
const CATEGORIES = [
  { max: 18.5, name: 'Underweight', color: '#03A9F4' },
  { max: 25, name: 'Normal', color: '#4CAF50' },
  { max: 30, name: 'Overweight', color: '#FF9800' },
  { max: Infinity, name: 'Obese', color: '#F44336' },
];

// Sadece rakam ve tek ondalik ayirici birakir; virgulu noktaya cevirir
function keepNumeric(text) {
  let cleaned = text.replace(/,/g, '.').replace(/[^0-9.]/g, '');
  const firstDot = cleaned.indexOf('.');
  if (firstDot !== -1) {
    cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '');
  }
  return cleaned;
}

export default function App() {
  // State: iki giris, sonuc ve hata
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Hesapla: dogrula, VKI hesapla, kategoriyi bul
  const handleCalculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (height.trim() === '' || weight.trim() === '') {
      setError('Please enter height and weight.');
      setResult(null);
      return;
    }
    if (isNaN(h) || isNaN(w) || h < 50 || h > 250 || w <= 0 || w > 400) {
      setError('Invalid value: height must be 50-250 cm, weight 0-400 kg.');
      setResult(null);
      return;
    }

    const heightM = h / 100; // cm -> metre
    const bmi = w / (heightM * heightM);
    const category = CATEGORIES.find((c) => bmi < c.max);

    setError('');
    setResult({ bmi: bmi.toFixed(1), name: category.name, color: category.color });
  };

  // Temizle: tum state'i bastaki haline dondur
  const handleClear = () => {
    setHeight('');
    setWeight('');
    setResult(null);
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{TITLE}</Text>

      {/* Boy girisi */}
      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 175"
        keyboardType="numeric"
        value={height}
        onChangeText={(text) => setHeight(keepNumeric(text))}
      />

      {/* Kilo girisi */}
      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 70"
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => setWeight(keepNumeric(text))}
      />

      {/* Butonlar yan yana */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleCalculate} activeOpacity={0.7}>
          <Text style={styles.primaryText}>Calculate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={handleClear} activeOpacity={0.7}>
          <Text style={styles.outlineText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Hata mesaji */}
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      {/* Sonuc karti: rengi kategoriye gore degisir */}
      {result !== null && (
        <View style={[styles.card, { backgroundColor: result.color }]}>
          <Text style={styles.cardLabel}>Body Mass Index</Text>
          <Text style={styles.cardValue}>{result.bmi}</Text>
          <Text style={styles.cardCategory}>{result.name}</Text>
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
    marginBottom: 24,
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
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  primaryText: {
    color: COLORS.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  outlineText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 12,
  },
  card: {
    marginTop: 24,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  cardLabel: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  cardValue: {
    color: '#FFFFFF',
    fontSize: 44,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  cardCategory: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
