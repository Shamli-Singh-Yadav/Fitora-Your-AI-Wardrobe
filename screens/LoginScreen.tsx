import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { FitoraLogoMark } from '../components/ui';
import { Colors, Fonts, Radius, Spacing } from '../constants/theme';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => navigation.replace('Tabs');

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
          {/* ── Logo ── */}
            <View className="flex-1 justify-center">
                <View className="items-center mb-6">
                    <Image
                        source={require('../assets/logo1.svg')}
                        style={{ width: 250, height: 250 }}
                    />
                </View>
            </View>

          {/* ── Welcome ── */}
          <Text style={styles.welcome}>Welcome back</Text>
          <Text style={styles.sub}>Sign in to your closet</Text>

          {/* ── Inputs ── */}
          <View style={styles.form}>
            <View style={styles.inputRow}>
              <Ionicons name="person-outline" size={18} color={Colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Email or username"
                placeholderTextColor={Colors.textLight}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={18} color={Colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={Colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={18}
                  color={Colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotRow}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* ── Login Button ── */}
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.loginBtnText}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* ── Divider ── */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* ── Social ── */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Image
                source={require('../assets/google.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <FontAwesome5 name="apple" size={20} color={Colors.navy} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <FontAwesome5 name="facebook" size={20} color="#1877F2" />
            </TouchableOpacity>
          </View>

          {/* ── Sign Up ── */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: 40,
  },

  // Logo
  logoSection: { alignItems: 'center' },
  logoIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 22,
    backgroundColor: Colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  brand: {
    fontSize: 22,
    fontWeight: Fonts.bold,
    color: Colors.blue,
    letterSpacing: 4,
  },
  tagline: {
    fontSize: 13,
    color: Colors.textMuted,
    letterSpacing: 1.5,
    marginTop: 3,
  },

  // Headings
  welcome: {
    fontSize: 26,
    fontWeight: Fonts.bold,
    color: Colors.navy,
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: Spacing.xxl,
  },

  // Form
  form: { gap: 10 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  forgotRow: { alignSelf: 'flex-end', paddingTop: 2 },
  forgotText: {
    fontSize: 13,
    color: Colors.blue,
    fontWeight: Fonts.medium,
  },

  // Buttons
  loginBtn: {
    backgroundColor: Colors.blue,
    borderRadius: Radius.full,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  loginBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: Fonts.bold,
    letterSpacing: 0.5,
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.xxl,
    gap: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.sand },
  dividerLabel: { fontSize: 12, color: Colors.textMuted },

  // Social
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: Spacing.xxxl,
  },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.sand,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  socialIcon: { width: 24, height: 24, resizeMode: 'contain' },

  // Sign up
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: { fontSize: 14, color: Colors.textMuted },
  signupLink: {
    fontSize: 14,
    color: Colors.blue,
    fontWeight: Fonts.semibold,
  },
});
