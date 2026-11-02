/*
 * ARKADAS REFERANSI: Joule -> cal / kcal donusturucu
 *
 * NE YAPAR:
 *   Kullanici Joule degerini girer, Convert'e basinca cal ve kcal sonucunu gosterir.
 *   Formuller: 1 cal = 4.184 J  ->  cal = J / 4.184
 *              1 kcal = 4184 J  ->  kcal = J / 4184
 *   Ornek: 50 J -> cal: 11.950287, kcal: 0.01195
 *   Reset: Joule alanini temizler (sonuclari ve hata mesajini da temizler).
 *
 * KULLANILAN BILESENLER:
 *   View, Text, TextInput, TouchableOpacity, StyleSheet (react-native), StatusBar (expo-status-bar)
 *   Hook: useState
 *
 * NASIL UYARLANIR:
 *   - Baslik / etiket / placeholder: TITLE, LABEL sabitlerini degistir.
 *   - Formul: handleConvert icindeki "joule / 4.184" ve "joule / 4184" satirlari.
 *   - Ondalik basamak: toFixed(6) ve toFixed(5) degerleri.
 *   - Renkler: en ustteki COLORS objesi.
 */

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Renkler: tasarima gore buradan degistir
const COLORS = {
  background: '#FFFFFF',
  text: '#111111',
  label: '#555555',
  border: '#CCCCCC',
  primary: '#2196F3',
  buttonText: '#FFFFFF',
  error: '#D32F2F',
};

// Ekrandaki yazilar
const TITLE = 'Joule to → cal / kcal Converter';
const LABEL = 'Joule';

// Sadece rakam ve tek bir ondalik ayirici birakir; virgulu noktaya cevirir ("12,5" -> "12.5")
function keepNumeric(text) {
  let cleaned = text.replace(/,/g, '.').replace(/[^0-9.]/g, '');
  const firstDot = cleaned.indexOf('.');
  if (firstDot !== -1) {
    // ilk noktadan sonraki diger noktalari sil
    cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '');
  }
  return cleaned;
}

export default function App() {
  // State: girilen deger, sonuclar ve hata mesaji
  const [joule, setJoule] = useState('');
  const [cal, setCal] = useState(null);
  const [kcal, setKcal] = useState(null);
  const [error, setError] = useState('');

  // Her tus vurusunda girisi suz (sadece sayisal giris)
  const handleChange = (text) => {
    setJoule(keepNumeric(text));
  };

  // Convert: dogrula, hesapla, sonucu state'e yaz
  const handleConvert = () => {
    const value = parseFloat(joule);
    if (joule.trim() === '' || isNaN(value)) {
      setError('Please enter a valid Joule value.');
      setCal(null);
      setKcal(null);
      return;
    }
    setError('');
    setCal((value / 4.184).toFixed(6));
    setKcal((value / 4184).toFixed(5));
  };

  // Reset: girisi temizle; eski sonuc ekranda kalmasin diye sonuclari da temizle
  const handleReset = () => {
    setJoule('');
    setCal(null);
    setKcal(null);
    setError('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{TITLE}</Text>

      {/* Giris alani */}
      <View style={styles.form}>
        <Text style={styles.label}>{LABEL}</Text>
        <TextInput
          style={styles.input}
          placeholder="Joule"
          keyboardType="numeric"
          value={joule}
          onChangeText={handleChange}
        />

        {/* Convert: mavi, tam genislik, yuvarlak kose */}
        <TouchableOpacity style={styles.convertButton} onPress={handleConvert} activeOpacity={0.7}>
          <Text style={styles.convertText}>Convert</Text>
        </TouchableOpacity>

        {/* Reset: sade yazi buton */}
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>

        {/* Hata mesaji (bos veya gecersiz giris) */}
        {error !== '' && <Text style={styles.error}>{error}</Text>}

        {/* Sonuclar: sadece Convert'ten sonra gorunur */}
        {cal !== null && (
          <View style={styles.results}>
            <Text style={styles.resultText}>cal: {cal}</Text>
            <Text style={styles.resultText}>kcal: {kcal}</Text>
          </View>
        )}
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

// Stiller
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: COLORS.label,
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
    color: COLORS.buttonText,
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
    marginTop: 8,
  },
  results: {
    marginTop: 16,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 6,
  },
});
