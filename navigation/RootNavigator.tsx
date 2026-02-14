import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const RootNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen 
                name='Login' 
                component={LoginScreen}
            />
            <Stack.Screen 
                name='Signup' 
                component={SignupScreen}
            />
            <Stack.Screen 
                name='ForgotPassword' 
                component={ForgotPasswordScreen}
            />
            <Stack.Screen
                name='Tabs'
                component={TabNavigator}
                options={{ animationEnabled: false }}
            />
        </Stack.Navigator>
    )
}

export default RootNavigator;

const styles = StyleSheet.create({})