/*
 * 05 - KAYIT FORMU (sadece core bilesenler, paket yok)
 *
 * NE YAPAR:
 *   Ad Soyad, E-posta, Telefon, Sifre, Sifre Tekrar alanlari; cinsiyet icin
 *   RadioButton grubu; "Kosullari kabul ediyorum" Checkbox'i; Kaydol ve Temizle
 *   butonlari. Her alanin altinda kirmizi hata metni cikar. Basarili kayitta
 *   alttaki "Ozet" kartinda girilenler gorunur ve Alert.alert acilir.
 *
 * BILESENLER:
 *   View, Text, TextInput, TouchableOpacity, Pressable, ScrollView,
 *   KeyboardAvoidingView, Alert, Platform, StyleSheet, StatusBar (expo-status-bar)
 *
 * ONEMLI TEXTINPUT PROP/EVENT'LERI:
 *   value + onChangeText (kontrollu input), placeholder, keyboardType,
 *   autoCapitalize, maxLength, secureTextEntry, returnKeyType,
 *   onSubmitEditing (klavyedeki "ileri" tusu), ref + focus()
 *
 * NASIL UYARLANIR:
 *   1. Yeni alan: BOS_FORM'a anahtar ekle, bir TextInput kopyala, validate()'e kural ekle.
 *   2. Alan silmek: TextInput'u, BOS_FORM anahtarini ve validate() kuralini sil.
 *   3. Radio secenekleri: CINSIYETLER dizisini degistir (ornek: Sinif 1, 2, 3, 4).
 *   4. Renkler: en ustteki COLORS sabitini degistir.
 */

import { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const COLORS = {
  bg: '#f1f5f9',
  card: '#ffffff',
  text: '#0f172a',
  muted: '#64748b',
  border: '#cbd5e1',
  primary: '#2563eb',
  error: '#dc2626',
  success: '#16a34a',
  white: '#ffffff',
};

const CINSIYETLER = [
  { id: 'kadin', label: 'Kadın' },
  { id: 'erkek', label: 'Erkek' },
  { id: 'belirtmek_istemiyorum', label: 'Belirtmek istemiyorum' },
];

// Formun bos hali (Temizle butonu da bunu kullanir)
const BOS_FORM = {
  adSoyad: '',
  email: '',
  telefon: '',
  sifre: '',
  sifreTekrar: '',
  cinsiyet: '',
  kosul: false,
};

// Basit e-posta kontrolu: bir@iki.uc
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Tum kurallar burada; hatali alanlar icin { alanAdi: 'mesaj' } doner
function validate(form) {
  const hatalar = {};

  if (form.adSoyad.trim() === '') hatalar.adSoyad = 'Ad Soyad boş bırakılamaz.';

  if (form.email.trim() === '') hatalar.email = 'E-posta boş bırakılamaz.';
  else if (!EMAIL_REGEX.test(form.email.trim())) hatalar.email = 'Geçerli bir e-posta girin.';

  if (form.telefon.trim() === '') hatalar.telefon = 'Telefon boş bırakılamaz.';
  else if (form.telefon.length < 10) hatalar.telefon = 'Telefon en az 10 haneli olmalı.';

  if (form.sifre === '') hatalar.sifre = 'Şifre boş bırakılamaz.';
  else if (form.sifre.length < 6) hatalar.sifre = 'Şifre en az 6 karakter olmalı.';

  if (form.sifreTekrar === '') hatalar.sifreTekrar = 'Şifre tekrarı boş bırakılamaz.';
  else if (form.sifreTekrar !== form.sifre) hatalar.sifreTekrar = 'Şifreler eşleşmiyor.';

  if (form.cinsiyet === '') hatalar.cinsiyet = 'Bir seçenek seçin.';

  if (!form.kosul) hatalar.kosul = 'Koşulları kabul etmelisiniz.';

  return hatalar;
}

// Core ile RadioButton: dis halka + seciliyse ic dolu daire
function RadioButton({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.radioRow}
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

// Core ile Checkbox: kare kutu + isaretliyse icinde ✓
function Checkbox({ label, checked, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.checkRow}
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
  const [form, setForm] = useState(BOS_FORM);
  const [hatalar, setHatalar] = useState({});
  const [sifreGoster, setSifreGoster] = useState(false);
  const [sifreTekrarGoster, setSifreTekrarGoster] = useState(false);
  const [ozet, setOzet] = useState(null); // basarili kayittan sonra dolar

  // "ileri" tusuyla siradaki alana gecmek icin ref'ler
  const emailRef = useRef(null);
  const telefonRef = useRef(null);
  const sifreRef = useRef(null);
  const sifreTekrarRef = useRef(null);

  // Tek alan guncelle (immutable) ve o alanin hatasini sil
  const alanDegistir = (alan, deger) => {
    setForm((onceki) => ({ ...onceki, [alan]: deger }));
    setHatalar((onceki) => ({ ...onceki, [alan]: undefined }));
  };

  const kaydol = () => {
    const yeniHatalar = validate(form);
    setHatalar(yeniHatalar);

    if (Object.keys(yeniHatalar).length > 0) {
      setOzet(null);
      return; // hata var, kayit yok
    }

    setOzet(form);
    Alert.alert('Kayıt başarılı', `Hoş geldin, ${form.adSoyad.trim()}!`);
  };

  const temizle = () => {
    setForm(BOS_FORM);
    setHatalar({});
    setOzet(null);
    setSifreGoster(false);
    setSifreTekrarGoster(false);
  };

  const cinsiyetEtiketi = (id) => {
    const bulunan = CINSIYETLER.find((c) => c.id === id);
    return bulunan ? bulunan.label : '-';
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Kayıt Ol</Text>

          {/* AD SOYAD */}
          <Text style={styles.label}>Ad Soyad</Text>
          <TextInput
            style={[styles.input, hatalar.adSoyad && styles.inputError]}
            placeholder="Ad Soyad"
            value={form.adSoyad}
            onChangeText={(t) => alanDegistir('adSoyad', t)}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />
          {hatalar.adSoyad && <Text style={styles.errorText}>{hatalar.adSoyad}</Text>}

          {/* E-POSTA */}
          <Text style={styles.label}>E-posta</Text>
          <TextInput
            ref={emailRef}
            style={[styles.input, hatalar.email && styles.inputError]}
            placeholder="ornek@mail.com"
            value={form.email}
            onChangeText={(t) => alanDegistir('email', t)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => telefonRef.current?.focus()}
          />
          {hatalar.email && <Text style={styles.errorText}>{hatalar.email}</Text>}

          {/* TELEFON */}
          <Text style={styles.label}>Telefon</Text>
          <TextInput
            ref={telefonRef}
            style={[styles.input, hatalar.telefon && styles.inputError]}
            placeholder="05xx xxx xx xx"
            value={form.telefon}
            // Sadece rakam kalsin
            onChangeText={(t) => alanDegistir('telefon', t.replace(/[^0-9]/g, ''))}
            keyboardType="phone-pad"
            maxLength={11}
            returnKeyType="next"
            onSubmitEditing={() => sifreRef.current?.focus()}
          />
          {hatalar.telefon && <Text style={styles.errorText}>{hatalar.telefon}</Text>}

          {/* SIFRE + goster/gizle */}
          <Text style={styles.label}>Şifre</Text>
          <View style={styles.passwordRow}>
            <TextInput
              ref={sifreRef}
              style={[styles.input, styles.passwordInput, hatalar.sifre && styles.inputError]}
              placeholder="En az 6 karakter"
              value={form.sifre}
              onChangeText={(t) => alanDegistir('sifre', t)}
              secureTextEntry={!sifreGoster}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => sifreTekrarRef.current?.focus()}
            />
            <TouchableOpacity style={styles.showButton} onPress={() => setSifreGoster(!sifreGoster)}>
              <Text style={styles.showButtonText}>{sifreGoster ? 'Gizle' : 'Göster'}</Text>
            </TouchableOpacity>
          </View>
          {hatalar.sifre && <Text style={styles.errorText}>{hatalar.sifre}</Text>}

          {/* SIFRE TEKRAR + goster/gizle */}
          <Text style={styles.label}>Şifre Tekrar</Text>
          <View style={styles.passwordRow}>
            <TextInput
              ref={sifreTekrarRef}
              style={[styles.input, styles.passwordInput, hatalar.sifreTekrar && styles.inputError]}
              placeholder="Şifreyi tekrar girin"
              value={form.sifreTekrar}
              onChangeText={(t) => alanDegistir('sifreTekrar', t)}
              secureTextEntry={!sifreTekrarGoster}
              autoCapitalize="none"
              returnKeyType="done"
            />
            <TouchableOpacity
              style={styles.showButton}
              onPress={() => setSifreTekrarGoster(!sifreTekrarGoster)}
            >
              <Text style={styles.showButtonText}>{sifreTekrarGoster ? 'Gizle' : 'Göster'}</Text>
            </TouchableOpacity>
          </View>
          {hatalar.sifreTekrar && <Text style={styles.errorText}>{hatalar.sifreTekrar}</Text>}

          {/* CINSIYET: RadioButton grubu (tek secim, string state) */}
          <Text style={styles.label}>Cinsiyet</Text>
          <View accessibilityRole="radiogroup">
            {CINSIYETLER.map((c) => (
              <RadioButton
                key={c.id}
                label={c.label}
                selected={form.cinsiyet === c.id}
                onPress={() => alanDegistir('cinsiyet', c.id)}
              />
            ))}
          </View>
          {hatalar.cinsiyet && <Text style={styles.errorText}>{hatalar.cinsiyet}</Text>}

          {/* KOSULLAR: Checkbox (boolean state) */}
          <Checkbox
            label="Koşulları kabul ediyorum"
            checked={form.kosul}
            onPress={() => alanDegistir('kosul', !form.kosul)}
          />
          {hatalar.kosul && <Text style={styles.errorText}>{hatalar.kosul}</Text>}

          {/* BUTONLAR: kosul kabul edilmeden Kaydol pasif ve soluk */}
          <TouchableOpacity
            style={[styles.button, !form.kosul && styles.buttonDisabled]}
            onPress={kaydol}
            disabled={!form.kosul}
          >
            <Text style={styles.buttonText}>Kaydol</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={temizle}>
            <Text style={[styles.buttonText, styles.clearButtonText]}>Temizle</Text>
          </TouchableOpacity>

          {/* OZET KARTI: sadece basarili kayittan sonra */}
          {ozet && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Özet</Text>
              <Text style={styles.cardLine}>Ad Soyad: {ozet.adSoyad}</Text>
              <Text style={styles.cardLine}>E-posta: {ozet.email}</Text>
              <Text style={styles.cardLine}>Telefon: {ozet.telefon}</Text>
              <Text style={styles.cardLine}>Şifre: {'*'.repeat(ozet.sifre.length)}</Text>
              <Text style={styles.cardLine}>Cinsiyet: {cinsiyetEtiketi(ozet.cinsiyet)}</Text>
              <Text style={styles.cardLine}>Koşullar: {ozet.kosul ? 'Kabul edildi' : 'Hayır'}</Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 50, // SafeAreaView yerine
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    marginTop: 4,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  showButton: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.border,
  },
  showButtonText: {
    color: COLORS.text,
    fontWeight: '600',
  },
  radioRow: {
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
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 6,
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
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  clearButton: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: 10,
  },
  clearButtonText: {
    color: COLORS.primary,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
    padding: 16,
    marginTop: 20,
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
