/*
 * 10 - API'DEN LISTE (FETCH)
 *
 * NE YAPAR:
 *   Uygulama acilinca API_URL'deki JSON'u bir kez indirir ve listeler.
 *   Yuklenirken ActivityIndicator, hata olursa mesaj + "Tekrar dene" butonu
 *   gosterir. Liste asagi cekilince yenilenir (pull-to-refresh). Satira
 *   dokununca detay alani acilir, tekrar dokununca kapanir.
 *
 * KULLANILAN BILESENLER:
 *   View, Text, TouchableOpacity, FlatList (refreshing + onRefresh),
 *   ActivityIndicator, StyleSheet, StatusBar (expo-status-bar).
 *   Hook: useState, useEffect. API: fetch.
 *
 * NASIL UYARLANIR:
 *   - Baska bir JSON linki verilirse API_URL ve alan adlarini degistir
 *     (renderItem icindeki item.title, item.body, item.userId).
 *   - JSON dogrudan dizi degilse (ornek: { "results": [...] }):
 *     setPosts(json.results) yap.
 *   - id alani yoksa keyExtractor: (item, index) => index.toString()
 *   - Detay istenmiyorsa: expandedId state'ini ve detay View'ini sil.
 */

import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const COLORS = {
  background: '#f3f4f6',
  card: '#ffffff',
  primary: '#0891b2',
  danger: '#dc2626',
  text: '#111827',
  muted: '#6b7280',
  detail: '#ecfeff',
};

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // ilk acilista yukleniyor
  const [refreshing, setRefreshing] = useState(false); // asagi cekip yenileme
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null); // acik olan satirin id'si

  // Veriyi indiren async fonksiyon (ilk yukleme, yenileme ve tekrar dene kullanir)
  const loadPosts = async () => {
    setError(null);
    try {
      const response = await fetch(API_URL);
      // fetch 404/500'de hata FIRLATMAZ, kendimiz kontrol ederiz
      if (!response.ok) {
        throw new Error(`Sunucu hatası: ${response.status}`);
      }
      const json = await response.json();
      setPosts(json);
    } catch (e) {
      setError(e.message || 'Bilinmeyen bir hata oluştu');
    } finally {
      // basarili da olsa hatali da olsa gostergeleri kapat
      setLoading(false);
      setRefreshing(false);
    }
  };

  // SADECE ilk acilista bir kez calisir: bos bagimlilik dizisi []
  // DIKKAT: [] yerine [loadPosts] yazma ya da diziyi silme; loadPosts her
  // render'da yeniden olusur, setState render tetikler -> sonsuz istek dongusu.
  useEffect(() => {
    loadPosts();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    loadPosts();
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadPosts();
  };

  // Ayni satira dokunursa kapat, baska satira dokunursa onu ac
  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const renderItem = ({ item }) => {
    const isOpen = item.id === expandedId;
    return (
      <TouchableOpacity style={styles.card} onPress={() => toggleExpand(item.id)}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            {item.id}. {item.title}
          </Text>
          <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
        </View>

        {isOpen ? (
          <View style={styles.detail}>
            <Text style={styles.detailText}>{item.body}</Text>
            <Text style={styles.detailMeta}>Kullanıcı: {item.userId}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  // 1) Ilk yukleme ekrani
  if (loading) {
    return (
      <View style={styles.center}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.infoText}>Yükleniyor...</Text>
      </View>
    );
  }

  // 2) Hata ekrani
  if (error) {
    return (
      <View style={styles.center}>
        <StatusBar style="dark" />
        <Text style={styles.errorText}>Hata: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
          <Text style={styles.retryText}>Tekrar dene</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3) Liste
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Gönderiler ({posts.length})</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()} // id sayi, string'e cevir
        renderItem={renderItem}
        extraData={expandedId} // acik satir degisince liste yeniden cizilsin
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.infoText}>Gösterilecek veri yok</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  infoText: {
    marginTop: 12,
    color: COLORS.muted,
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  arrow: {
    marginLeft: 8,
    color: COLORS.primary,
  },
  detail: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: COLORS.detail,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.text,
  },
  detailMeta: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.muted,
  },
  separator: {
    height: 10,
  },
});
