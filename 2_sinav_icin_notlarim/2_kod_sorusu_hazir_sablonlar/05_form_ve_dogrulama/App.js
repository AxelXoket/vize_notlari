/*
 * 05 - KAYIT FORMU (sadece core bilesenler, paket yok)
 *
 * NE YAPAR:
 *   Full Name, Email, Phone, Password, Confirm Password alanlari; gender icin
 *   RadioButton grubu; "I accept the terms" Checkbox'i; Register ve Clear
 *   butonlari. Her alanin altinda kirmizi hata metni cikar. Basarili kayitta
 *   alttaki "Summary" kartinda girilenler gorunur ve Alert.alert acilir.
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
 *   1. Yeni alan: EMPTY_FORM'a anahtar ekle, bir TextInput kopyala, validate()'e kural ekle.
 *   2. Alan silmek: TextInput'u, EMPTY_FORM anahtarini ve validate() kuralini sil.
 *   3. Radio secenekleri: GENDERS dizisini degistir (ornek: Class 1, 2, 3, 4).
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

const GENDERS = [
  { id: 'female', label: 'Female' },
  { id: 'male', label: 'Male' },
  { id: 'prefer_not_to_say', label: 'Prefer not to say' },
];

// Formun bos hali (Clear butonu da bunu kullanir)
const EMPTY_FORM = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  gender: '',
  terms: false,
};

// Basit e-posta kontrolu: bir@iki.uc
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Tum kurallar burada; hatali alanlar icin { fieldName: 'mesaj' } doner
function validate(form) {
  const errors = {};

  if (form.fullName.trim() === '') errors.fullName = 'Required';

  if (form.email.trim() === '') errors.email = 'Required';
  else if (!EMAIL_REGEX.test(form.email.trim())) errors.email = 'Invalid email';

  if (form.phone.trim() === '') errors.phone = 'Required';
  else if (form.phone.length < 10) errors.phone = 'Phone must be at least 10 digits';

  if (form.password === '') errors.password = 'Required';
  else if (form.password.length < 6) errors.password = 'At least 6 characters';

  if (form.confirmPassword === '') errors.confirmPassword = 'Required';
  else if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match';

  if (form.gender === '') errors.gender = 'Please select an option';

  if (!form.terms) errors.terms = 'You must accept the terms';

  return errors;
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
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [summary, setSummary] = useState(null); // basarili kayittan sonra dolar

  // "ileri" tusuyla siradaki alana gecmek icin ref'ler
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Tek alan guncelle (immutable) ve o alanin hatasini sil
  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleRegister = () => {
    const newErrors = validate(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSummary(null);
      return; // hata var, kayit yok
    }

    setSummary(form);
    Alert.alert('Success', `Welcome, ${form.fullName.trim()}!`);
  };

  const handleClear = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setSummary(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const genderLabel = (id) => {
    const found = GENDERS.find((g) => g.id === id);
    return found ? found.label : '-';
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
          <Text style={styles.title}>Sign Up</Text>

          {/* FULL NAME */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input, errors.fullName && styles.inputError]}
            placeholder="Full Name"
            value={form.fullName}
            onChangeText={(t) => updateField('fullName', t)}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

          {/* EMAIL */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            ref={emailRef}
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="example@mail.com"
            value={form.email}
            onChangeText={(t) => updateField('email', t)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => phoneRef.current?.focus()}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* PHONE */}
          <Text style={styles.label}>Phone</Text>
          <TextInput
            ref={phoneRef}
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="Phone number"
            value={form.phone}
            // Sadece rakam kalsin
            onChangeText={(t) => updateField('phone', t.replace(/[^0-9]/g, ''))}
            keyboardType="phone-pad"
            maxLength={11}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          {/* PASSWORD + goster/gizle */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              ref={passwordRef}
              style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
              placeholder="At least 6 characters"
              value={form.password}
              onChangeText={(t) => updateField('password', t)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />
            <TouchableOpacity style={styles.showButton} onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showButtonText}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          {/* CONFIRM PASSWORD + goster/gizle */}
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              ref={confirmPasswordRef}
              style={[styles.input, styles.passwordInput, errors.confirmPassword && styles.inputError]}
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChangeText={(t) => updateField('confirmPassword', t)}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              returnKeyType="done"
            />
            <TouchableOpacity
              style={styles.showButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Text style={styles.showButtonText}>{showConfirmPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

          {/* GENDER: RadioButton grubu (tek secim, string state) */}
          <Text style={styles.label}>Gender</Text>
          <View accessibilityRole="radiogroup">
            {GENDERS.map((g) => (
              <RadioButton
                key={g.id}
                label={g.label}
                selected={form.gender === g.id}
                onPress={() => updateField('gender', g.id)}
              />
            ))}
          </View>
          {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

          {/* TERMS: Checkbox (boolean state) */}
          <Checkbox
            label="I accept the terms"
            checked={form.terms}
            onPress={() => updateField('terms', !form.terms)}
          />
          {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

          {/* BUTONLAR: terms kabul edilmeden Register pasif ve soluk */}
          <TouchableOpacity
            style={[styles.button, !form.terms && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={!form.terms}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClear}>
            <Text style={[styles.buttonText, styles.clearButtonText]}>Clear</Text>
          </TouchableOpacity>

          {/* SUMMARY KARTI: sadece basarili kayittan sonra */}
          {summary && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Summary</Text>
              <Text style={styles.cardLine}>Full Name: {summary.fullName}</Text>
              <Text style={styles.cardLine}>Email: {summary.email}</Text>
              <Text style={styles.cardLine}>Phone: {summary.phone}</Text>
              <Text style={styles.cardLine}>Password: {'*'.repeat(summary.password.length)}</Text>
              <Text style={styles.cardLine}>Gender: {genderLabel(summary.gender)}</Text>
              <Text style={styles.cardLine}>Terms: {summary.terms ? 'Accepted' : 'No'}</Text>
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
