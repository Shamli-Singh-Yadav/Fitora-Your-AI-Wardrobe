import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FitoraLogoMark } from '../components/ui';
import { Colors, Fonts, Radius, Spacing } from '../constants/theme';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('Required', 'Please enter your email address');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Email sent ✓',
        'Check your inbox for a link to reset your password.',
        [{ text: 'Back to Login', onPress: () => navigation.goBack() }]
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back */}
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={Colors.navy} />
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoSection}>
            <View style={styles.logoIconWrap}>
              <FitoraLogoMark size={44} />
            </View>
          </View>

          {/* Heading */}
          <Text style={styles.heading}>Forgot password?</Text>
          <Text style={styles.sub}>
            No worries — enter your email and we'll send you a reset link.
          </Text>

          {/* Input */}
          <View style={[styles.inputRow, { marginTop: Spacing.xxl }]}>
            <Ionicons name="mail-outline" size={18} color={Colors.textMuted} />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor={Colors.textLight}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Text>
          </TouchableOpacity>

          {/* Back to login */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Remember it? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
              <Text style={styles.loginLink}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: 40,
  },
  back: { marginBottom: Spacing.xl, width: 40 },
  logoSection: { alignItems: 'center', marginBottom: Spacing.xl },
  logoIconWrap: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: Colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  heading: {
    fontSize: 26,
    fontWeight: Fonts.bold,
    color: Colors.navy,
    marginBottom: 8,
  },
  sub: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    gap: 10,
    marginBottom: 14,
  },
  input: { flex: 1, fontSize: 15, color: Colors.text },
  submitBtn: {
    backgroundColor: Colors.blue,
    borderRadius: Radius.full,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: Spacing.xxl,
  },
  submitBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: Fonts.bold,
    letterSpacing: 0.4,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: { fontSize: 14, color: Colors.textMuted },
  loginLink: { fontSize: 14, color: Colors.blue, fontWeight: Fonts.semibold },
});
