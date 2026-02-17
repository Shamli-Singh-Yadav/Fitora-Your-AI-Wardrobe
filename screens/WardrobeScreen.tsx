import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SectionHeader, Tag } from '../components/ui';
import { Colors, Fonts, Radius, Spacing } from '../constants/theme';

const { width } = Dimensions.get('window');
const CARD_W = (width - Spacing.xl * 2 - Spacing.md) / 2;

const CATEGORIES = ['All', 'Tops', 'Bottoms', 'Shoes', 'Accessories'];

const ITEMS = [
  { id: '1', emoji: '👔', name: 'Cream Linen Shirt', brand: 'Uniqlo · S', bg: '#F5EDE0', tags: ['Casual', 'Summer'] },
  { id: '2', emoji: '🧥', name: 'Olive Chinos', brand: 'H&M · 30×32', bg: '#E8F0E8', tags: ['Versatile'] },
  { id: '3', emoji: '🥼', name: 'White Blazer', brand: 'Zara · M', bg: '#FEF0E8', tags: ['Formal', 'Events'] },
  { id: '4', emoji: '👟', name: 'Tan Loafers', brand: 'Clarks · UK 9', bg: '#E8F1FF', tags: ['Smart'] },
  { id: '5', emoji: '🧣', name: 'Navy Scarf', brand: 'M&S · One size', bg: '#EEEAF8', tags: ['Winter'] },
  { id: '6', emoji: '🎩', name: 'Straw Hat', brand: 'Vintage · S/M', bg: '#FCEAE8', tags: ['Summer', 'Beach'] },
];

const WardrobeScreen = ({ navigation }: any) => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Wardrobe</Text>
          <Text style={styles.sub}>Your curated digital closet</Text>
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search-outline" size={20} color={Colors.navy} />
        </TouchableOpacity>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        {[['42', 'Pieces'], ['18', 'Outfits'], ['6', 'Occasions']].map(([num, label]) => (
          <View key={label} style={styles.statCard}>
            <Text style={styles.statNum}>{num}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabRow}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.tab, activeCategory === cat && styles.tabActive]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[styles.tabText, activeCategory === cat && styles.tabTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grid */}
      <FlatList
        data={ITEMS}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemCard} activeOpacity={0.85}>
            <View style={[styles.itemImg, { backgroundColor: item.bg }]}>
              <Text style={styles.itemEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.itemBrand}>{item.brand}</Text>
              <View style={styles.tagRow}>
                {item.tags.map((t) => (
                  <Tag key={t} label={t} />
                ))}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <Ionicons name="add" size={28} color={Colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WardrobeScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  title: { fontSize: 26, fontWeight: Fonts.bold, color: Colors.navy },
  sub: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
  searchBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 4, elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: Spacing.xl,
    marginVertical: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 1,
  },
  statCard: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: Fonts.bold, color: Colors.navy },
  statLabel: { fontSize: 10, color: Colors.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 2 },
  tabRow: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.sm,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16, paddingVertical: 7,
    borderRadius: Radius.full, borderWidth: 1.5, borderColor: Colors.sand,
    backgroundColor: Colors.white,
  },
  tabActive: { backgroundColor: Colors.navy, borderColor: Colors.navy },
  tabText: { fontSize: 13, color: Colors.navy, fontWeight: Fonts.medium },
  tabTextActive: { color: Colors.white },
  grid: { paddingHorizontal: Spacing.xl, paddingBottom: 100 },
  gridRow: { gap: Spacing.md, marginBottom: Spacing.md },
  itemCard: {
    width: CARD_W, borderRadius: Radius.lg, backgroundColor: Colors.white,
    overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  itemImg: { height: 110, alignItems: 'center', justifyContent: 'center' },
  itemEmoji: { fontSize: 40 },
  itemInfo: { padding: 12, gap: 2 },
  itemName: { fontSize: 13, fontWeight: Fonts.semibold, color: Colors.navy },
  itemBrand: { fontSize: 11, color: Colors.textMuted },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 6 },
  fab: {
    position: 'absolute', bottom: 90, right: Spacing.xl,
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: Colors.blue,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.blue, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 10, elevation: 5,
  },
});
