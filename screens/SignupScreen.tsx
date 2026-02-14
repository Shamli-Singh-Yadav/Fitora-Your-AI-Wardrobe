import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, ImageSourcePropType } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'


const SignupScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSignup = () => {
        navigation.replace('Tabs')
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
                <View className="px-6 py-8 items-center justify-center min-h-screen">
                    <View className="mb-6 items-center">
                        <Image source={require('../assets/logo.svg')}
                        style={{ width: 150, height: 150 }} />
                    </View>
                    
                    <View className="w-2/4 mb-4">
                        <View className="flex-row items-center bg-gray-100 rounded-full px-6 py-4 border border-gray-300">
                            <Ionicons name="person" size={20} color="gray" />
                            <TextInput
                                placeholder="Username or Email"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={setEmail}
                                className="flex-1 ml-3 text-base"
                                outlineWidth={0}
                            />
                        </View>
                    </View>

                    <View className="w-2/4 mb-6">
                        <View className="flex-row items-center bg-gray-100 rounded-full px-6 py-4 border border-gray-300">
                            <Ionicons name="lock-closed" size={20} color="gray" />
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                className="flex-1 ml-3 text-base"
                                outlineWidth={0}
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

                    <View className="mb-6 flex-row flex-wrap">
                        <Text className="text-gray-600 text-sm">By clicking the </Text>
                        <TouchableOpacity>
                            <Text className="text-blue-500 font-semibold text-sm">Register</Text>
                        </TouchableOpacity>
                        <Text className="text-gray-600 text-sm"> button, you agree to the public offer</Text>
                    </View>

                    <TouchableOpacity
                        onPress={handleSignup}
                        className="w-2/4 bg-blue-500 rounded-full py-4 mb-8">
                        <Text className="text-white text-center text-lg font-bold">Create Account</Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center w-full mb-8">
                        <View className="flex-1 h-px bg-gray-300"></View>
                        <Text className="px-4 text-gray-500 text-sm">OR Continue with</Text>
                        <View className="flex-1 h-px bg-gray-300"></View>
                    </View>

                    {/* Social Signup Buttons */}
                    <View className="flex-row justify-center gap-6 mb-8">

                        <TouchableOpacity className="w-16 h-16 rounded-full border-2 border-blue-400 items-center justify-center">
                            <Image source={require('../assets/google.png')} style={{ width: 32, height: 32 }} />
                        </TouchableOpacity>

                        <TouchableOpacity className="w-16 h-16 rounded-full border-2 border-blue-400 items-center justify-center">
                            <FontAwesome5 name="apple" size={24} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity className="w-16 h-16 rounded-full border-2 border-blue-400 items-center justify-center">
                            <FontAwesome5 name="facebook" size={24} color="#1877F2" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-center gap-1">
                        <Text className="text-gray-600 text-sm">I Already Have an Account</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text className="text-blue-500 font-semibold text-sm underline">Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({})
