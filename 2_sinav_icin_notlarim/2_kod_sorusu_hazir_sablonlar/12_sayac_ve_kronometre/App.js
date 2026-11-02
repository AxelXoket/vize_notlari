/*
 * 12 - SAYAC VE KRONOMETRE
 *
 * Ne yapar:
 * - Ustte SAYAC: +, -, Sifirla. Adim (1 / 5 / 10) secilebilir. 0'in altina inmez.
 * - Altta KRONOMETRE: Baslat / Durdur / Sifirla / Tur. Format mm:ss.d
 *   (d = saniyenin onda biri). Turlar liste halinde gosterilir.
 *
 * Bilesenler: View, Text, TouchableOpacity, ScrollView, StyleSheet,
 * useState, useEffect, StatusBar (expo-status-bar).
 *
 * ZAMANLAYICI KALIBI (hocanin Timer ornegiyle ayni):
 *   useEffect(() => {
 *     let interval;
 *     if (isRunning) {
 *       interval = setInterval(() => setX(prev => prev + 1), 100);
 *     }
 *     return () => clearInterval(interval); // cleanup
 *   }, [isRunning]);
 * - setX(prev => prev + 1) FONKSIYONEL guncelleme: interval icinde eski
 *   degere takilip kalmayi (stale closure) onler. setX(x + 1) YAZMA.
 * - Cleanup: Durdur'a basinca veya ekran kapaninca interval temizlenir.
 *
 * NASIL UYARLANIR:
 * - Geri sayim icin: baslangic degeri ver, setX(prev => prev - 1) yaz ve
 *   prev <= 0 olunca setIsRunning(false) cagir.
 * - Sadece saniye istenirse aralik 1000 ms, format icin formatTime'i sadelestir.
 * - Adim secenekleri STEPS dizisinden degistirilir.
 * - Tur listesi gerekmiyorsa addLap ve laps ile ilgili kisimlari sil.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const COLORS = {
  background: '#F4F6FA',
  card: '#FFFFFF',
  primary: '#2563EB',
  green: '#16A34A',
  red: '#DC2626',
  gray: '#6B7280',
  text: '#111827',
  light: '#E5E7EB',
  white: '#FFFFFF',
};

const STEPS = [1, 5, 10];

// 100 ms'lik birim sayisini "mm:ss.d" metnine cevirir. Ornek: 754 -> "01:15.4"
function formatTime(tenths) {
  const minutes = Math.floor(tenths / 600); // 600 x 0.1 sn = 1 dk
  const seconds = Math.floor((tenths % 600) / 10);
  const tenth = tenths % 10;
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  return mm + ':' + ss + '.' + tenth;
}

export default function App() {
  // ---------- SAYAC ----------
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increase = () => setCount((prev) => prev + step);
  // Math.max ile 0'in altina inmez
  const decrease = () => setCount((prev) => Math.max(0, prev - step));
  const resetCount = () => setCount(0);

  // ---------- KRONOMETRE ----------
  const [tenths, setTenths] = useState(0); // gecen sure, 0.1 sn biriminde
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTenths((prev) => prev + 1); // fonksiyonel guncelleme
      }, 100);
    }
    return () => clearInterval(interval); // cleanup
  }, [isRunning]);

  const toggleRunning = () => setIsRunning((prev) => !prev);

  const resetWatch = () => {
    setIsRunning(false);
    setTenths(0);
    setLaps([]);
  };

  const addLap = () => {
    // Bir onceki tura gore fark (ilk turda baslangictan itibaren)
    const lastTotal = laps.length > 0 ? laps[0].total : 0;
    const newLap = {
      number: laps.length + 1,
      total: tenths,
      diff: tenths - lastTotal,
    };
    setLaps([newLap, ...laps]); // immutable: yeni dizi, en yeni tur ustte
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* ===== SAYAC KARTI ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sayac</Text>
          <Text style={styles.countText}>{count}</Text>

          {/* Adim secimi: secili olan renkli */}
          <View style={styles.row}>
            {STEPS.map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.stepButton, step === s && styles.stepButtonActive]}
                onPress={() => setStep(s)}
              >
                <Text style={[styles.stepText, step === s && styles.stepTextActive]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.red }]}
              onPress={decrease}
            >
              <Text style={styles.buttonText}>- {step}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.gray }]}
              onPress={resetCount}
            >
              <Text style={styles.buttonText}>Sifirla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.green }]}
              onPress={increase}
            >
              <Text style={styles.buttonText}>+ {step}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== KRONOMETRE KARTI ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Kronometre</Text>
          <Text style={styles.timeText}>{formatTime(tenths)}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isRunning ? COLORS.red : COLORS.green },
              ]}
              onPress={toggleRunning}
            >
              <Text style={styles.buttonText}>{isRunning ? 'Durdur' : 'Baslat'}</Text>
            </TouchableOpacity>

            {/* Tur sadece calisirken aktif */}
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: COLORS.primary },
                !isRunning && styles.buttonDisabled,
              ]}
              onPress={addLap}
              disabled={!isRunning}
            >
              <Text style={styles.buttonText}>Tur</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.gray }]}
              onPress={resetWatch}
            >
              <Text style={styles.buttonText}>Sifirla</Text>
            </TouchableOpacity>
          </View>

          {/* Tur listesi */}
          {laps.length === 0 ? (
            <Text style={styles.emptyText}>Henuz tur yok</Text>
          ) : (
            laps.map((lap) => (
              <View key={lap.number} style={styles.lapRow}>
                <Text style={styles.lapNumber}>Tur {lap.number}</Text>
                <Text style={styles.lapDiff}>+{formatTime(lap.diff)}</Text>
                <Text style={styles.lapTotal}>{formatTime(lap.total)}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  content: {
    padding: 16,
    gap: 16, // iki kart arasi bosluk
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  countText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: 10,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.text,
    marginVertical: 10,
    fontVariant: ['tabular-nums'], // rakamlar ayni genislikte, titreme olmaz
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
  },
  stepButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  stepButtonActive: {
    backgroundColor: COLORS.primary,
  },
  stepText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  stepTextActive: {
    color: COLORS.white,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    minWidth: 90,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    color: COLORS.gray,
    marginTop: 16,
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light,
    marginTop: 6,
  },
  lapNumber: {
    flex: 1,
    color: COLORS.text,
    fontWeight: '600',
  },
  lapDiff: {
    flex: 1,
    textAlign: 'center',
    color: COLORS.gray,
  },
  lapTotal: {
    flex: 1,
    textAlign: 'right',
    color: COLORS.text,
  },
});
