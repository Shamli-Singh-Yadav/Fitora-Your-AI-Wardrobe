import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = () => {
        navigation.replace('Tabs')
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 justify-center px-6 py-8">
                <View className="items-center mb-12">
                    <Image
                        source={require('../assets/logo.svg')}
                        style={{ width: 150, height: 150 }}
                    />
                </View>

                <View className="mb-6">
                    <View className="flex-row items-center bg-gray-100 rounded-full px-6 py-4 border border-gray-300">
                        <Ionicons name="person" size={20} color="gray" />
                        <TextInput
                            placeholder="Username or Email"
                            placeholderTextColor="#999"
                            value={username}
                            onChangeText={setUsername}
                            className="flex-1 ml-3 text-base"
                        />
                    </View>
                </View>

                <View className="mb-4">
                    <View className="flex-row items-center bg-gray-100 rounded-full px-6 py-4 border border-gray-300">
                        <Ionicons name="lock-closed" size={20} color="gray" />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            className="flex-1 ml-3 text-base"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? 'eye' : 'eye-off'}
                                size={20}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity className="mb-6" onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text className="text-blue-500 text-center font-semibold">Forgot Password?</Text>
                </TouchableOpacity>

            
                <TouchableOpacity
                    onPress={handleLogin}
                    className="bg-blue-500 rounded-full py-4 mb-8"
                >
                    <Text className="text-white text-center text-lg font-bold">Login</Text>
                </TouchableOpacity>

                {/* Divider */}
                <View className="flex-row items-center mb-8">
                    <View className="flex-1 h-px bg-gray-300"></View>
                    <Text className="px-4 text-gray-500">OR Continue with</Text>
                    <View className="flex-1 h-px bg-gray-300"></View>
                </View>

                {/* Social Login Buttons */}
                <View className="flex-row justify-center gap-6 mb-8">
                    {/* Google */}
                    <TouchableOpacity className="w-16 h-16 rounded-full border-2 border-blue-400 items-center justify-center">
                        <Image source={require('../assets/google.png')} style={{ width: 32, height: 32 }} />
                    </TouchableOpacity>

                    {/* Apple */}
                    <TouchableOpacity className="w-16 h-16 rounded-full border-2 border-blue-400 items-center justify-center">
                        <FontAwesome5 name="apple" size={24} color="black" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity className="w-16 h-16 rounded-full border-2 border-blue-400 items-center justify-center">
                        <FontAwesome5 name="facebook" size={24} color="#1877F2" />
                    </TouchableOpacity>
                </View>

                {/* Sign Up */}
                <View className="flex-row justify-center gap-1">
                    <Text className="text-gray-600">Create An Account</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text className="text-blue-500 font-semibold underline">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
