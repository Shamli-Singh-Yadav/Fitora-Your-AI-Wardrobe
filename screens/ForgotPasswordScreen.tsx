import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert, ImageSourcePropType } from 'react-native'
import React, { useState } from 'react'
import { Ionicons, FontAwesome5} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'




const ForgotPasswordScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email address')
            return
        }

        setLoading(true)
        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            Alert.alert('Success', 'Password reset link sent to your email', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack()
                }
            ])
        }, 1000)
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                className="flex-1"
            >
                <View className="flex-1 justify-center px-6 py-8">
                    {/* Logo */}
                    <View className="items-center mb-6">
                        <Image source={require('../assets/logo.svg')}
                        style={{ width: 150, height: 150 }} />
                    </View>

                    {/* Email Input */}
                    <View className="w-full mb-3">
                        <View className="flex-row items-center bg-gray-50 rounded-full px-5 py-4 border border-gray-300">
                            <Ionicons name="mail" size={20} color="#999" />
                            <TextInput
                                placeholder="Enter your email address"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={setEmail}
                                className="flex-1 ml-3 text-base text-gray-800"
                                editable={!loading}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>
                    </View>

                    {/* Description Text */}
                    <Text className="text-gray-500 text-xs text-center mb-6 leading-5">
                        We will send you a message to set or reset your new password
                    </Text>

                    {/* Submit Button */}
                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={loading}
                        className={`rounded-full py-3.5 mb-6 ${loading ? 'bg-blue-400' : 'bg-blue-500'}`}
                    >
                        <Text className="text-white text-center text-base font-bold">
                            {loading ? 'Sending...' : 'Submit'}
                        </Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View className="flex-row items-center mb-6">
                        <View className="flex-1 h-px bg-gray-300"></View>
                        <Text className="px-3 text-gray-400 text-xs">OR Continue with</Text>
                        <View className="flex-1 h-px bg-gray-300"></View>
                    </View>

                    {/* Social Buttons */}
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

                    {/* Back to Login Link */}
                    <View className="flex-row justify-center gap-1">
                        <Text className="text-gray-600 text-sm">I Already Have an Account</Text>
                        <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
                            <Text className="text-blue-500 font-semibold text-sm underline">Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({})
