import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, SectionHeader, Chip } from '../components/ui';
import { Colors, Fonts, Radius, Spacing } from '../constants/theme';

const { width } = Dimensions.get('window');

const QUICK_ASKS = [
  { id: '1', icon: '✨', label: 'Make an outfit' },
  { id: '2', icon: '🧳', label: 'Pack for a trip' },
  { id: '3', icon: '⭐', label: 'Rate my look' },
  { id: '4', icon: '🎉', label: 'Occasion help' },
];

const RECENT_LOOKS = [
  { id: '1', emoji: '👔', name: 'Office Ready', tag: 'Business', bg: '#F5EDE0', match: 94 },
  { id: '2', emoji: '👗', name: 'Date Night', tag: 'Evening', bg: '#FCEAE8', match: 88 },
  { id: '3', emoji: '🧥', name: 'Weekend Out', tag: 'Casual', bg: '#E8F1FF', match: 91 },
  { id: '4', emoji: '👘', name: 'Garden Lunch', tag: 'Brunch', bg: '#E8F0E8', match: 85 },
];

const HomeScreen = ({ navigation }: any) => {
  const [activeAsk, setActiveAsk] = useState('1');

  const goToChat = (prompt?: string) => {
    navigation.navigate('FitAI', { initialPrompt: prompt });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ── Top Header ── */}
        <View style={styles.topBar}>
          <View style={styles.userRow}>
            <Avatar initials="A" size={42} />
            <View>
              <Text style={styles.greeting}>Good morning, Aditya ✦</Text>
              <Text style={styles.greetingSub}>Sunday, 1 Feb · Clear skies</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={22} color={Colors.navy} />
          </TouchableOpacity>
        </View>

        {/* ── Today's Vibe Card ── */}
        <TouchableOpacity
          style={styles.todayCard}
          onPress={() => goToChat('What should I wear today?')}
          activeOpacity={0.9}
        >
          <View style={styles.todayDecor1} />
          <View style={styles.todayDecor2} />
          <Text style={styles.todayLabel}>TODAY'S VIBE</Text>
          <Text style={styles.todayTitle}>Effortless Sunday</Text>
          <Text style={styles.todayDesc}>
            Cream linen, olive chinos, tan loafers.{'\n'}Tuck halfway for that easy-going look.
          </Text>
          <View style={styles.todayBadge}>
            <View style={styles.todayDot} />
            <Text style={styles.todayBadgeText}>FitAI styled this for you</Text>
          </View>
        </TouchableOpacity>

        {/* ── Quick Ask FitAI ── */}
        <SectionHeader title="Ask FitAI" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {QUICK_ASKS.map((item) => (
            <Chip
              key={item.id}
              label={item.label}
              icon={item.icon}
              active={activeAsk === item.id}
              onPress={() => {
                setActiveAsk(item.id);
                goToChat(item.label);
              }}
            />
          ))}
        </ScrollView>

        {/* ── Recent Looks ── */}
        <SectionHeader
          title="Recent Looks"
          linkText="See all →"
          onLinkPress={() => navigation.navigate('Wardrobe')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.looksRow}
        >
          {RECENT_LOOKS.map((look) => (
            <TouchableOpacity key={look.id} style={styles.lookCard} activeOpacity={0.85}>
              <View style={[styles.lookImg, { backgroundColor: look.bg }]}>
                <Text style={styles.lookEmoji}>{look.emoji}</Text>
                <View style={styles.matchBadge}>
                  <Text style={styles.matchText}>{look.match}%</Text>
                </View>
              </View>
              <View style={styles.lookInfo}>
                <Text style={styles.lookName}>{look.name}</Text>
                <Text style={styles.lookTag}>{look.tag}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  scroll: { flex: 1 },
  content: { paddingBottom: 100 },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  greeting: { fontSize: 15, fontWeight: Fonts.semibold, color: Colors.navy },
  greetingSub: { fontSize: 12, color: Colors.textMuted, marginTop: 1 },
  notifBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 4, elevation: 2,
  },

  todayCard: {
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.md,
    backgroundColor: Colors.navy,
    borderRadius: Radius.xl,
    padding: Spacing.xxl,
    overflow: 'hidden',
    position: 'relative',
  },
  todayDecor1: {
    position: 'absolute', top: -24, right: -24,
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: 'rgba(42,137,250,0.2)',
  },
  todayDecor2: {
    position: 'absolute', bottom: -16, right: 24,
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: 'rgba(201,168,76,0.18)',
  },
  todayLabel: {
    fontSize: 10, letterSpacing: 2,
    color: 'rgba(255,255,255,0.5)', fontWeight: Fonts.semibold, marginBottom: 8,
  },
  todayTitle: {
    fontSize: 22, fontWeight: Fonts.bold, color: Colors.white, marginBottom: 6,
  },
  todayDesc: {
    fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 19, marginBottom: Spacing.lg,
  },
  todayBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.blue, alignSelf: 'flex-start',
    borderRadius: Radius.full, paddingVertical: 6, paddingHorizontal: 14, gap: 6,
  },
  todayDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.white },
  todayBadgeText: { fontSize: 12, color: Colors.white, fontWeight: Fonts.medium },

  chipRow: {
    paddingHorizontal: Spacing.xl, paddingBottom: Spacing.sm, gap: 10,
  },

  looksRow: {
    paddingHorizontal: Spacing.xl, paddingBottom: Spacing.sm, gap: 14,
  },
  lookCard: {
    width: 140, borderRadius: Radius.lg, backgroundColor: Colors.white,
    overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 2,
  },
  lookImg: {
    height: 150, alignItems: 'center', justifyContent: 'center', position: 'relative',
  },
  lookEmoji: { fontSize: 46 },
  matchBadge: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: Colors.blue, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3,
  },
  matchText: { fontSize: 10, color: Colors.white, fontWeight: Fonts.bold },
  lookInfo: { padding: 12 },
  lookName: { fontSize: 13, fontWeight: Fonts.semibold, color: Colors.navy },
  lookTag: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
});
