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

const SignupScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => navigation.replace('Tabs');

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
            <View className="flex-1 justify-center" >
                            <View className="items-center mb-6">
                                <Image
                                    source={require('../assets/logo1.svg')}
                                    style={{ width: 250, height: 250 }}
                                />
                            </View>
                        </View>
          </View>

          <Text style={styles.heading}>Create account</Text>
          <Text style={styles.sub}>Your AI wardrobe awaits</Text>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputRow}>
              <Ionicons name="person-outline" size={18} color={Colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Full name"
                placeholderTextColor={Colors.textLight}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={18} color={Colors.textMuted} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
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

            <Text style={styles.terms}>
              By signing up you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>

            <TouchableOpacity style={styles.createBtn} onPress={handleSignup} activeOpacity={0.85}>
              <Text style={styles.createBtnText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Image source={require('../assets/google.png')} style={styles.socialIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <FontAwesome5 name="apple" size={20} color={Colors.navy} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <FontAwesome5 name="facebook" size={20} color="#1877F2" />
            </TouchableOpacity>
          </View>

          {/* Login */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: 40,
  },
  back: { marginBottom: Spacing.lg, width: 40 },
  logoSection: { alignItems: 'center' },
  heading: {
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
  input: { flex: 1, fontSize: 15, color: Colors.text },
  terms: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 18,
    paddingHorizontal: 4,
  },
  termsLink: { color: Colors.blue, fontWeight: Fonts.medium },
  createBtn: {
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
  createBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: Fonts.bold,
    letterSpacing: 0.5,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.xxl,
    gap: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.sand },
  dividerLabel: { fontSize: 12, color: Colors.textMuted },
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
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: { fontSize: 14, color: Colors.textMuted },
  loginLink: { fontSize: 14, color: Colors.blue, fontWeight: Fonts.semibold },
});
