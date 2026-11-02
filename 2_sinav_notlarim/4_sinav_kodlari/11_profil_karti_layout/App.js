/*
 * 11 - PROFIL KARTI (LAYOUT / TASARIM KOPYALAMA)
 *
 * Ne yapar: Sosyal medya tarzi bir profil sayfasi cizer. Kapak resmi, ustune
 * tasan yuvarlak profil fotografi, ad / unvan / biyografi, 3 istatistik kutusu,
 * "Takip et" ve "Mesaj" butonlari, yatay kaydirilan kucuk resim seridi.
 *
 * Bilesenler: View, Text, Image, ScrollView (dikey + yatay), TouchableOpacity,
 * StyleSheet, useState, StatusBar (expo-status-bar).
 *
 * FLEXBOX HATIRLATMA:
 * - flexDirection: 'column' (varsayilan, alt alta) | 'row' (yan yana)
 * - justifyContent: ANA eksende dizilim (row ise yatay, column ise dikey)
 *   'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
 * - alignItems: CAPRAZ eksende hizalama ('center', 'flex-start', 'stretch')
 * - flex: 1 -> kalan boslugu doldur (yan yana iki kutu flex: 1 ise esit bolusur)
 * - gap: cocuklar arasi bosluk (RN 0.71+ destekler)
 * - position: 'absolute' + top/left/right/bottom -> elemani akistan cikarip
 *   ust uste bindirir (ornek: kapak uzerindeki rozet)
 *
 * NASIL UYARLANIR:
 * - PROFILE / STATS / PHOTOS sabitlerindeki verileri tasarimdakilerle degistir.
 * - Renkleri COLORS icinden degistir, stillere dokunmadan tema degisir.
 * - Istatistik sayisi farkliysa STATS dizisine eleman ekle / sil; map ile cizilir.
 * - Profil fotografi daha cok tassin istersen avatar marginTop degerini
 *   (-50) buyut; deger avatar yuksekliginin yarisi olunca tam ortadan tasar.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const COLORS = {
  background: '#F2F3F7',
  card: '#FFFFFF',
  primary: '#4F46E5',
  text: '#1F2937',
  subtext: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
};

const PROFILE = {
  name: 'Ayse Yilmaz',
  title: 'Mobil Uygulama Gelistirici',
  bio:
    'React Native ve Expo ile mobil uygulamalar gelistiriyorum. Kullanici ' +
    'deneyimi, temiz kod ve hizli prototipleme ilgi alanlarim. Bos zamanlarimda ' +
    'fotograf cekiyor, kamp yapiyor ve acik kaynak projelere katki veriyorum.',
  cover: 'https://picsum.photos/id/1018/800/400',
  avatar: 'https://i.pravatar.cc/200?img=47',
};

const STATS = [
  { id: '1', label: 'Gonderi', value: '128' },
  { id: '2', label: 'Takipci', value: '4.2K' },
  { id: '3', label: 'Takip', value: '312' },
];

const PHOTOS = [
  'https://picsum.photos/id/10/200/200',
  'https://picsum.photos/id/20/200/200',
  'https://picsum.photos/id/30/200/200',
  'https://picsum.photos/id/40/200/200',
  'https://picsum.photos/id/50/200/200',
  'https://picsum.photos/id/60/200/200',
];

export default function App() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* KART: gölgeli beyaz kutu */}
        <View style={styles.card}>
          {/* Kapak resmi: uri ile resimde width/height ZORUNLU */}
          <Image source={{ uri: PROFILE.cover }} style={styles.cover} />

          {/* position absolute ornegi: kapagin sag ust kosesinde rozet */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>PRO</Text>
          </View>

          {/* Negatif marginTop ile avatar kapagin ustune tasar */}
          <Image source={{ uri: PROFILE.avatar }} style={styles.avatar} />

          <View style={styles.info}>
            <Text style={styles.name}>{PROFILE.name}</Text>
            <Text style={styles.title}>{PROFILE.title}</Text>

            {/* numberOfLines undefined olursa tum metin gorunur */}
            <Text
              style={styles.bio}
              numberOfLines={bioExpanded ? undefined : 2}
            >
              {PROFILE.bio}
            </Text>
            <TouchableOpacity onPress={() => setBioExpanded(!bioExpanded)}>
              <Text style={styles.moreText}>
                {bioExpanded ? 'Daha az goster' : 'Devamini gor'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Istatistikler: row + space-between ile yan yana 3 kutu */}
          <View style={styles.statsRow}>
            {STATS.map((item) => (
              <View key={item.id} style={styles.statBox}>
                <Text style={styles.statValue}>{item.value}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* Butonlar: ikisi de flex: 1, arada gap */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.button,
                isFollowing ? styles.buttonOutline : styles.buttonFilled,
              ]}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Text
                style={isFollowing ? styles.buttonOutlineText : styles.buttonFilledText}
              >
                {isFollowing ? 'Takip ediliyor' : 'Takip et'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonOutline]}>
              <Text style={styles.buttonOutlineText}>Mesaj</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Yatay resim seridi */}
        <Text style={styles.sectionTitle}>Fotograflar</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.photoStrip}
        >
          {PHOTOS.map((uri) => (
            <Image key={uri} source={{ uri: uri }} style={styles.photo} />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50, // SafeAreaView yerine ust bosluk
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    overflow: 'hidden', // kapak resmi kose yuvarlakligina uysun
    alignItems: 'center', // avatar ve yazilar ortalanir
    paddingBottom: 16,
    // iOS golgesi
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    // Android golgesi
    elevation: 5,
  },
  cover: {
    width: '100%',
    height: 160,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // genisligin yarisi -> tam daire
    borderWidth: 4,
    borderColor: COLORS.white,
    marginTop: -50, // yuksekligin yarisi kadar yukari tasar
  },
  info: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  title: {
    fontSize: 14,
    color: COLORS.subtext,
    marginTop: 2,
  },
  bio: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  moreText: {
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch', // kartin tum genisligini kullan
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statBox: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.subtext,
    marginTop: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    gap: 12,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  button: {
    flex: 1, // iki buton esit genislik
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonFilled: {
    backgroundColor: COLORS.primary,
  },
  buttonFilledText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
  },
  buttonOutlineText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 24,
    marginBottom: 10,
  },
  photoStrip: {
    gap: 10,
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
});
