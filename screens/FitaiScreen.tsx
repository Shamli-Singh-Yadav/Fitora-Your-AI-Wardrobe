import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FitoraLogoMark } from '../components/ui';
import { Colors, Fonts, Radius, Spacing } from '../constants/theme';

// ── Types ─────────────────────────────────────────────────────────
type Message = {
  id: string;
  role: 'ai' | 'user';
  text: string;
  time: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'ai',
    text: "Hi Aditya! ✨ I'm your personal AI stylist. How can I help you look and feel incredible today?",
    time: '9:15 AM',
  },
];

const SUGGESTIONS = [
  { id: '1', label: 'Make an outfit' },
  { id: '2', label: 'Create a packing list' },
  { id: '3', label: 'Rate my outfit' },
];

const AI_RESPONSES: Record<string, string> = {
  default: "That's a great choice! Let me look through your wardrobe and put something together for you ✨",
  'make an outfit':
    "Sure! For today's casual Sunday, I'm thinking: cream linen shirt + olive chinos + tan loafers. Tuck the shirt halfway — it'll look effortlessly put together 🌿",
  'create a packing list':
    "I'll need a few details! Where are you heading, how many days, and what's the weather like? I'll pull the most versatile pieces from your wardrobe 🧳",
  'rate my outfit':
    "Upload a photo and I'll give you an honest, constructive rating across fit, colour coordination, and occasion-appropriateness ⭐",
};

function getTimeStr() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(AI_RESPONSES)) {
    if (key !== 'default' && lower.includes(key)) {
      return AI_RESPONSES[key];
    }
  }
  return AI_RESPONSES['default'];
}

// ── Component ─────────────────────────────────────────────────────
const FitaiScreen = ({ route, navigation }: any) => {
  const initialPrompt = route?.params?.initialPrompt;
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef<FlatList>(null);
  const typingOpacity = useRef(new Animated.Value(0)).current;

  // Auto-send initial prompt if navigated from Home
  useEffect(() => {
    if (initialPrompt) {
      setTimeout(() => sendMessage(initialPrompt), 400);
    }
  }, []);

  // Typing dots animation
  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(typingOpacity, { toValue: 0.3, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      typingOpacity.setValue(0);
    }
  }, [isTyping]);

  const sendMessage = (text?: string) => {
    const val = (text ?? input).trim();
    if (!val) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: val, time: getTimeStr() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: getAIResponse(val),
        time: getTimeStr(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1100);

    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isAI = item.role === 'ai';
    return (
      <View style={[styles.msgRow, isAI ? styles.msgRowAI : styles.msgRowUser]}>
        {isAI && (
          <View style={styles.aiAvatar}>
            <Image
              source={require('../assets/logo.svg')}
              style={{ width: 30, height: 30}}
            />
          </View>
        )}
        <View style={[styles.bubble, isAI ? styles.bubbleAI : styles.bubbleUser]}>
          <Text style={[styles.bubbleText, isAI ? styles.bubbleTextAI : styles.bubbleTextUser]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── Chat Header ── */}
      <View style={styles.header}>
        <View style={styles.aiAvatarLg}>
          <Image
            source={require('../assets/logo.svg')}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>FitAI 5.2</Text>
          <View style={styles.headerStatus}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Your personal stylist</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerSearch}>
          <Ionicons name="search-outline" size={20} color={Colors.navy} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerMore}>
          <Ionicons name="ellipsis-vertical" size={18} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* ── Date chip ── */}
      <View style={styles.dateChipWrap}>
        <View style={styles.dateChip}>
          <Text style={styles.dateChipText}>Sun 1 Feb</Text>
        </View>
      </View>

      {/* ── Messages ── */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={10}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
          ListFooterComponent={
            isTyping ? (
              <View style={styles.msgRow}>
                <View style={styles.aiAvatar}>
                  <Image
                    source={require('../assets/logo.svg')}
                    style={{ width: 28, height: 28 }}
                  />
                </View>
                <Animated.View style={[styles.bubble, styles.bubbleAI, { opacity: typingOpacity }]}>
                  <Text style={[styles.bubbleText, styles.bubbleTextAI]}>  ● ● ●  </Text>
                </Animated.View>
              </View>
            ) : null
          }
        />

        {/* ── Suggestions ── */}
        {messages.length <= 2 && (
          <View style={styles.suggestionsWrap}>
            <Text style={styles.suggestLabel}>Suggested</Text>
            {SUGGESTIONS.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={styles.suggestChip}
                onPress={() => sendMessage(s.label)}
              >
                <Text style={styles.suggestChipText}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* ── Input Bar ── */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.inputIcon}>
            <Ionicons name="mic-outline" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Ask anything..."
            placeholderTextColor={Colors.textLight}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => sendMessage()}
            returnKeyType="send"
            multiline
          />
          <TouchableOpacity style={styles.inputIcon} onPress={() => {}}>
            <Ionicons name="camera-outline" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => sendMessage()}
            activeOpacity={0.85}
          >
            <Ionicons name="arrow-up" size={18} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FitaiScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  flex: { flex: 1 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
    gap: 10,
    backgroundColor: Colors.white,
  },
  aiAvatarLg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 15, fontWeight: Fonts.bold, color: Colors.navy },
  headerStatus: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 1 },
  statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.green },
  statusText: { fontSize: 11, color: Colors.green, fontWeight: Fonts.medium },
  headerSearch: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMore: { paddingHorizontal: 4 },

  // Date chip
  dateChipWrap: { alignItems: 'center', paddingVertical: 10 },
  dateChip: {
    backgroundColor: Colors.blue,
    borderRadius: Radius.full,
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  dateChipText: { fontSize: 12, color: Colors.white, fontWeight: Fonts.semibold },

  // Messages
  messageList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: 14,
  },
  msgRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginVertical: 4,
  },
  msgRowAI: { justifyContent: 'flex-start' },
  msgRowUser: { justifyContent: 'flex-end' },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.blueSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  bubbleAI: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 1,
  },
  bubbleUser: {
    backgroundColor: Colors.blue,
    borderBottomRightRadius: 4,
  },
  bubbleText: { fontSize: 14, lineHeight: 21 },
  bubbleTextAI: { color: Colors.navy },
  bubbleTextUser: { color: Colors.white },

  // Suggestions
  suggestionsWrap: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    alignItems: 'flex-end',
    gap: 8,
  },
  suggestLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 4,
    alignSelf: 'flex-end',
  },
  suggestChip: {
    borderWidth: 1.5,
    borderColor: Colors.sand,
    borderRadius: Radius.full,
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: Colors.white,
  },
  suggestChipText: {
    fontSize: 13,
    color: Colors.navy,
    fontWeight: Fonts.medium,
  },

  // Input bar
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 14 : 10,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    gap: 8,
  },
  inputIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 22,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.text,
    maxHeight: 90,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 3,
  },
});
