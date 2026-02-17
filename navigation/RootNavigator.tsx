import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* Auth flow */}
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ animation: 'slide_from_right' }}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
      options={{ animation: 'slide_from_bottom' }}
    />

    {/* Main app */}
    <Stack.Screen
      name="Tabs"
      component={TabNavigator}
      options={{ animation: 'fade' }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
