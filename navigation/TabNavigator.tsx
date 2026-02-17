import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import FitaiScreen from '../screens/FitaiScreen';
import WardrobeScreen from '../screens/WardrobeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Colors, Fonts } from '../constants/theme';

const Tab = createBottomTabNavigator();

type TabIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  label: string;
};

const TabIcon = ({ name, focused, label }: TabIconProps) => (
  <View style={tabStyles.iconWrap}>
    <Ionicons
      name={focused ? name : `${name}-outline` as any}
      size={22}
      color={focused ? Colors.blue : Colors.textMuted}
    />
    <Text style={[tabStyles.label, focused && tabStyles.labelActive]}>{label}</Text>
  </View>
);

const CenterButton = ({ onPress }: { onPress?: () => void }) => (
  <TouchableOpacity onPress={onPress} style={tabStyles.centerBtn} activeOpacity={0.85}>
    <View style={tabStyles.centerBtnInner}>
      <Ionicons name="add" size={28} color="white" />
    </View>
  </TouchableOpacity>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: tabStyles.tabBar,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon name="home" focused={focused} label="Home" />
        ),
      }}
    />

    <Tab.Screen
      name="FitAI"
      component={FitaiScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon name="sparkles" focused={focused} label="FitAI" />
        ),
      }}
    />

    <Tab.Screen
      name="AddItem"
      component={WardrobeScreen}
      options={{
        tabBarIcon: () => null,
        tabBarButton: (props) => <CenterButton onPress={props.onPress ?? undefined} />,
      }}
    />

    <Tab.Screen
      name="Wardrobe"
      component={WardrobeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon name="bag" focused={focused} label="Wardrobe" />
        ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon name="person" focused={focused} label="Profile" />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;

const tabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    height: Platform.OS === 'ios' ? 82 : 68,
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
    gap: 3,
  },
  label: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: Fonts.medium,
    letterSpacing: 0.2,
  },
  labelActive: { color: Colors.blue },
  centerBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerBtnInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
});
