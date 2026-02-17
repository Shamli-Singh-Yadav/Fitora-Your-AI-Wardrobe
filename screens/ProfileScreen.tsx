import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, FitoraLogo } from '../components/ui';
import { Colors, Fonts, Radius, Spacing } from '../constants/theme';

const STYLE_TAGS = ['Minimalist', 'Earth tones', 'Smart casual'];

const PROFILE_ROWS = [
  { icon: '👗', label: 'My Wardrobe', sub: '42 pieces catalogued', screen: 'Wardrobe' },
  { icon: '✨', label: 'FitAI Chat', sub: 'Your personal stylist', screen: 'FitAI' },
  { icon: '🎨', label: 'Style Palette', sub: 'Warm minimalist · Earth tones', screen: null },
  { icon: '📊', label: 'Style Stats', sub: '18 outfits created', screen: null },
];

const SETTINGS_ROWS = [
  { icon: '🔔', label: 'Notifications', sub: null },
  { icon: '🔒', label: 'Privacy & Data', sub: null },
  { icon: '💬', label: 'Feedback', sub: null },
  { icon: '🚪', label: 'Sign Out', sub: null },
];

const ProfileScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <FitoraLogo size={28} />
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Avatar initials="A" size={80} />
          <Text style={styles.name}>Aditya</Text>
          <Text style={styles.bio}>
            Building confidence one outfit at a time.{'\n'}Mumbai · Style since 2021
          </Text>
          <View style={styles.tagsRow}>
            {STYLE_TAGS.map((t) => (
              <View key={t} style={styles.styleTag}>
                <Text style={styles.styleTagText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Journey stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsHeader}>YOUR JOURNEY</Text>
          <View style={styles.statsRow}>
            {[
              { num: '42', label: 'Pieces', color: Colors.blue },
              { num: '18', label: 'Outfits', color: Colors.gold },
              { num: '78%', label: 'Confidence', color: Colors.green },
            ].map((s) => (
              <View key={s.label} style={styles.statItem}>
                <Text style={[styles.statNum, { color: s.color }]}>{s.num}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Profile rows */}
        <View style={styles.section}>
          {PROFILE_ROWS.map((row, i) => (
            <TouchableOpacity
              key={row.label}
              style={[styles.row, i < PROFILE_ROWS.length - 1 && styles.rowBorder]}
              onPress={() => row.screen && navigation.navigate(row.screen)}
              activeOpacity={0.7}
            >
              <Text style={styles.rowIcon}>{row.icon}</Text>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>{row.label}</Text>
                {row.sub && <Text style={styles.rowSub}>{row.sub}</Text>}
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings rows */}
        <View style={styles.section}>
          {SETTINGS_ROWS.map((row, i) => (
            <TouchableOpacity
              key={row.label}
              style={[styles.row, i < SETTINGS_ROWS.length - 1 && styles.rowBorder]}
              activeOpacity={0.7}
            >
              <Text style={styles.rowIcon}>{row.icon}</Text>
              <View style={styles.rowText}>
                <Text style={[
                  styles.rowLabel,
                  row.label === 'Sign Out' && { color: Colors.red },
                ]}>{row.label}</Text>
              </View>
              {row.label !== 'Sign Out' && (
                <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.version}>FITORA v1.0  ·  Your AI Wardrobe</Text>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.cream },
  content: { paddingBottom: 100 },

  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg, paddingBottom: Spacing.sm,
  },
  settingsBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07, shadowRadius: 4, elevation: 1,
  },

  hero: { alignItems: 'center', paddingVertical: Spacing.xl },
  name: {
    fontSize: 24, fontWeight: Fonts.bold, color: Colors.navy,
    marginTop: 14, marginBottom: 6,
  },
  bio: {
    fontSize: 13, color: Colors.textMuted, textAlign: 'center',
    lineHeight: 19, marginBottom: 14,
  },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  styleTag: {
    backgroundColor: Colors.blueSoft, borderRadius: Radius.full,
    paddingHorizontal: 14, paddingVertical: 6,
  },
  styleTagText: { fontSize: 12, color: Colors.blue, fontWeight: Fonts.medium },

  statsCard: {
    marginHorizontal: Spacing.xl, marginBottom: Spacing.lg,
    backgroundColor: Colors.white, borderRadius: Radius.xl,
    overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 1,
  },
  statsHeader: {
    padding: Spacing.lg, paddingBottom: 0,
    fontSize: 10, letterSpacing: 1.5,
    color: Colors.textMuted, fontWeight: Fonts.semibold,
  },
  statsRow: { flexDirection: 'row', padding: Spacing.lg },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: Fonts.bold },
  statLabel: { fontSize: 11, color: Colors.textMuted, marginTop: 3 },

  section: {
    marginHorizontal: Spacing.xl, marginBottom: Spacing.lg,
    backgroundColor: Colors.white, borderRadius: Radius.xl,
    overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 1,
  },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.lg, paddingVertical: 15, gap: 14,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.warm },
  rowIcon: { fontSize: 18, width: 24, textAlign: 'center' },
  rowText: { flex: 1 },
  rowLabel: { fontSize: 14, color: Colors.text, fontWeight: Fonts.medium },
  rowSub: { fontSize: 12, color: Colors.textMuted, marginTop: 1 },

  version: {
    textAlign: 'center', fontSize: 11, color: Colors.textLight,
    letterSpacing: 1, marginBottom: 8,
  },
});
