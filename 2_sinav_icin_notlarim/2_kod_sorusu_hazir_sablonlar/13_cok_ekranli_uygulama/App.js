/*
 * 13 - COK EKRANLI UYGULAMA (NAVIGASYON PAKETI OLMADAN)
 *
 * Ne yapar: 4 ekran: Ana sayfa / Liste / Detay / Ayarlar.
 * - Hangi ekranin gorunecegini tek bir state belirler:
 *     const [screen, setScreen] = useState('home');
 * - Altta core bilesenlerle yazilmis tab bar (aktif sekme renkli).
 * - Listeden bir ogeye basinca Detay ekrani acilir, "Geri" ile listeye doner.
 * - Ayarlar'da Switch ile koyu tema. Tema renkleri (theme) tum ekranlara
 *   props ile gecer.
 * - Modal ile "Hakkinda" penceresi.
 *
 * Bilesenler: View, Text, TouchableOpacity, ScrollView, Switch, Modal,
 * StyleSheet, useState, StatusBar (expo-status-bar).
 *
 * MANTIK: Ekran = kucuk bir fonksiyon bilesen. App sadece state tutar ve
 * "screen" degerine gore dogru bileseni cizer. Ekranlar veriyi ve
 * fonksiyonlari (onSelect, onBack, onToggleDark...) PROPS olarak alir.
 *
 * NASIL UYARLANIR:
 * - Yeni ekran: fonksiyon bilesen yaz, renderScreen icine bir if ekle,
 *   sekme olacaksa TABS dizisine { key, label, icon } ekle.
 * - Listede baska veri: ITEMS dizisini degistir, Detay ekraninda alanlari yaz.
 * - Tema rengi: LIGHT ve DARK nesnelerinde ayni anahtarlar olmali.
 * - Hakkinda yerine baska bir pencere: Modal icindeki Text'leri degistir.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Iki tema: anahtarlar ayni, sadece renkler farkli
const COLORS = {
  primary: '#7C3AED',
  white: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

const LIGHT = {
  background: '#F5F5F7',
  card: '#FFFFFF',
  text: '#111827',
  subtext: '#6B7280',
  border: '#E5E7EB',
  tabBar: '#FFFFFF',
};

const DARK = {
  background: '#111827',
  card: '#1F2937',
  text: '#F9FAFB',
  subtext: '#9CA3AF',
  border: '#374151',
  tabBar: '#1F2937',
};

const ITEMS = [
  { id: '1', title: 'Elma', emoji: '🍎', price: 25, description: 'Taze ve tatli kirmizi elma.' },
  { id: '2', title: 'Muz', emoji: '🍌', price: 40, description: 'Ithal, olgun muz.' },
  { id: '3', title: 'Uzum', emoji: '🍇', price: 55, description: 'Cekirdeksiz siyah uzum.' },
  { id: '4', title: 'Portakal', emoji: '🍊', price: 30, description: 'Sulu, C vitamini deposu.' },
  { id: '5', title: 'Cilek', emoji: '🍓', price: 70, description: 'Mevsiminde toplanmis cilek.' },
];

// Alt sekmeler (Detay sekme degil, Liste'nin alt ekrani)
const TABS = [
  { key: 'home', label: 'Ana Sayfa', icon: '🏠' },
  { key: 'list', label: 'Liste', icon: '📋' },
  { key: 'settings', label: 'Ayarlar', icon: '⚙️' },
];

// ================= EKRANLAR =================

function HomeScreen({ theme, onGoList, onOpenAbout }) {
  return (
    <View style={styles.screen}>
      <Text style={[styles.heading, { color: theme.text }]}>Hos geldin 👋</Text>
      <Text style={[styles.paragraph, { color: theme.subtext }]}>
        Bu uygulama navigasyon paketi olmadan, sadece useState ile ekran
        degistirmeyi gosterir.
      </Text>

      <TouchableOpacity style={styles.primaryButton} onPress={onGoList}>
        <Text style={styles.primaryButtonText}>Listeye git</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.outlineButton, { borderColor: COLORS.primary }]}
        onPress={onOpenAbout}
      >
        <Text style={styles.outlineButtonText}>Hakkinda</Text>
      </TouchableOpacity>
    </View>
  );
}

function ListScreen({ theme, items, onSelect }) {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={[styles.heading, { color: theme.text }]}>Meyveler</Text>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.listItem, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => onSelect(item)}
        >
          <Text style={styles.listEmoji}>{item.emoji}</Text>
          {/* flex: 1 -> yazi alani kalan genisligi doldurur, fiyat saga yaslanir */}
          <Text style={[styles.listTitle, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.listPrice, { color: theme.subtext }]}>{item.price} TL ›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function DetailScreen({ theme, item, onBack }) {
  return (
    <View style={styles.screen}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>‹ Geri</Text>
      </TouchableOpacity>

      <View style={[styles.detailCard, { backgroundColor: theme.card }]}>
        <Text style={styles.detailEmoji}>{item.emoji}</Text>
        <Text style={[styles.heading, { color: theme.text }]}>{item.title}</Text>
        <Text style={styles.detailPrice}>{item.price} TL</Text>
        <Text style={[styles.paragraph, { color: theme.subtext }]}>{item.description}</Text>
      </View>
    </View>
  );
}

function SettingsScreen({ theme, isDark, onToggleDark, onOpenAbout }) {
  return (
    <View style={styles.screen}>
      <Text style={[styles.heading, { color: theme.text }]}>Ayarlar</Text>

      {/* Satir: yazi solda, Switch sagda (space-between) */}
      <View style={[styles.settingRow, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.settingLabel, { color: theme.text }]}>Koyu tema</Text>
        <Switch
          value={isDark}
          onValueChange={onToggleDark}
          trackColor={{ false: '#D1D5DB', true: COLORS.primary }}
          thumbColor={COLORS.white}
        />
      </View>

      <TouchableOpacity
        style={[styles.settingRow, { backgroundColor: theme.card, borderColor: theme.border }]}
        onPress={onOpenAbout}
      >
        <Text style={[styles.settingLabel, { color: theme.text }]}>Hakkinda</Text>
        <Text style={{ color: theme.subtext }}>›</Text>
      </TouchableOpacity>
    </View>
  );
}

function TabBar({ theme, activeTab, onChange }) {
  return (
    <View style={[styles.tabBar, { backgroundColor: theme.tabBar, borderTopColor: theme.border }]}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity key={tab.key} style={styles.tabItem} onPress={() => onChange(tab.key)}>
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                { color: isActive ? COLORS.primary : theme.subtext },
                isActive && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ================= ANA BILESEN =================

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'list' | 'detail' | 'settings'
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);

  const theme = isDark ? DARK : LIGHT;

  const openDetail = (item) => {
    setSelectedItem(item);
    setScreen('detail');
  };

  // screen degerine gore hangi ekranin cizilecegi
  const renderScreen = () => {
    if (screen === 'list') {
      return <ListScreen theme={theme} items={ITEMS} onSelect={openDetail} />;
    }
    if (screen === 'detail' && selectedItem) {
      return <DetailScreen theme={theme} item={selectedItem} onBack={() => setScreen('list')} />;
    }
    if (screen === 'settings') {
      return (
        <SettingsScreen
          theme={theme}
          isDark={isDark}
          onToggleDark={setIsDark}
          onOpenAbout={() => setAboutVisible(true)}
        />
      );
    }
    return (
      <HomeScreen
        theme={theme}
        onGoList={() => setScreen('list')}
        onOpenAbout={() => setAboutVisible(true)}
      />
    );
  };

  // Detay acikken alt barda "Liste" sekmesi aktif gorunsun
  const activeTab = screen === 'detail' ? 'list' : screen;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* flex: 1 -> ekran alani tab bar disindaki tum yeri kaplar */}
      <View style={styles.content}>{renderScreen()}</View>

      <TabBar theme={theme} activeTab={activeTab} onChange={setScreen} />

      {/* Hakkinda penceresi */}
      <Modal
        visible={aboutVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAboutVisible(false)} // Android geri tusu
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: theme.card }]}>
            <Text style={[styles.heading, { color: theme.text }]}>Hakkinda</Text>
            <Text style={[styles.paragraph, { color: theme.subtext }]}>
              Mobil Uygulama Gelistirme dersi icin hazirlanmis ornek uygulama.
              Surum 1.0
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={() => setAboutVisible(false)}>
              <Text style={styles.primaryButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  content: {
    flex: 1,
  },
  screen: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  outlineButton: {
    borderWidth: 2,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  outlineButtonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  listEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  listTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
  },
  listPrice: {
    fontSize: 15,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    marginBottom: 12,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  detailCard: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  detailEmoji: {
    fontSize: 72,
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 24, // alt kenar (home cizgisi) icin bosluk
  },
  tabItem: {
    flex: 1, // 3 sekme esit genislik
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 22,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  tabLabelActive: {
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalBox: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
  },
});
