/*
 * 08 - YAPILACAKLAR LISTESI (TODO)
 *
 * NE YAPAR:
 *   Kullanici gorev yazar, "Add" ile listeye ekler. Goreve dokununca
 *   tamamlandi olur (ustu cizili). "Delete" butonu onay sorar. Ustte sayac,
 *   altinda All / Active / Completed filtre sekmeleri vardir.
 *
 * KULLANILAN BILESENLER:
 *   View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet,
 *   StatusBar (expo-status-bar). Hook: useState.
 *
 * NASIL UYARLANIR:
 *   - "Gorev" yerine baska bir sey (alisveris, not, sehir) icin: metinleri
 *     ve item alanlarini (title, done) degistir.
 *   - Ek alan lazimsa (oncelik, tarih): addTodo icindeki yeni nesneye ekle,
 *     renderItem icinde goster.
 *   - Filtre istenmiyorsa: FILTERS dizisini ve filtre View'ini sil,
 *     FlatList data={todos} yap.
 *   - "Secili sayisini goster" sorusu = buradaki sayac mantigi
 *     (todos.filter(t => t.done).length).
 */

import { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const COLORS = {
  background: '#f3f4f6',
  card: '#ffffff',
  primary: '#2563eb',
  danger: '#dc2626',
  text: '#111827',
  muted: '#6b7280',
  border: '#e5e7eb',
  done: '#16a34a',
};

// Filtre sekmeleri: key kodda, label ekranda kullanilir
const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Completed' },
];

export default function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Yeni gorev ekle (bos ise ekleme)
  const addTodo = () => {
    const title = text.trim();
    if (title === '') return;

    const newTodo = {
      id: Date.now().toString(), // keyExtractor icin string id
      title: title,
      done: false,
    };
    setTodos((prev) => [newTodo, ...prev]); // yeni dizi, en uste ekle
    setText('');
  };

  // Tamamlandi durumunu tersine cevir (immutable: map ile yeni dizi)
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // Silmeden once onay sor
  // Not: Snack'in WEB onizlemesinde Alert butonlari calismaz, telefonda (Expo Go) dene.
  const deleteTodo = (id, title) => {
    Alert.alert('Delete task', `Delete "${title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setTodos((prev) => prev.filter((t) => t.id !== id)),
      },
    ]);
  };

  // Sayac ve filtre: state'ten turetilir, ayri state tutulmaz
  const doneCount = todos.filter((t) => t.done).length;

  const visibleTodos = todos.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true; // 'all'
  });

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.rowLeft}
        onPress={() => toggleTodo(item.id)}
      >
        <View style={[styles.checkbox, item.done && styles.checkboxDone]}>
          {item.done ? <Text style={styles.checkMark}>✓</Text> : null}
        </View>
        <Text style={[styles.rowText, item.done && styles.rowTextDone]}>
          {item.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTodo(item.id, item.title)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>To-Do List</Text>
      <Text style={styles.counter}>
        {doneCount} of {todos.length} tasks completed
      </Text>

      {/* Giris satiri */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTodo} // klavyede Enter ile de ekle
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Filtre sekmeleri */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => {
          const selected = filter === f.key;
          return (
            <TouchableOpacity
              key={f.key}
              style={[styles.filterButton, selected && styles.filterButtonActive]}
              onPress={() => setFilter(f.key)}
            >
              <Text
                style={[styles.filterText, selected && styles.filterTextActive]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={visibleTodos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks yet</Text>
        }
        style={styles.list}
        keyboardShouldPersistTaps="handled"
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  counter: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 4,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginLeft: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 8,
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.done,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxDone: {
    backgroundColor: COLORS.done,
  },
  checkMark: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  rowText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  rowTextDone: {
    textDecorationLine: 'line-through', // ustu cizili
    color: COLORS.muted,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  deleteText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  separator: {
    height: 8, // satirlar arasi bosluk
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: 40,
    fontSize: 16,
  },
});
