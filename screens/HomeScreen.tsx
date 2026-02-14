import { Dimensions, StyleSheet, Text, View ,ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');


const HomeScreen = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 bg-white">
                {/* Header Row */}
                <View className="flex-row items-center justify-between px-4 py-4">
                    {/* Profile Image */}
                    <Ionicons name="person-circle-outline" size={40} color="black" />
                    
                    {/* Sun | Fab Button */}
                    <View className="bg-blue-500 rounded-full px-6 py-2">
                        <Text className="text-white font-semibold text-sm">Sun | Fab</Text>
                    </View>
                    
                    {/* Search Icon */}
                    <Ionicons name="search-outline" size={24} color="black" />
                </View>

                {/* Greeting Section */}
                <View className="px-4 py-6">
                    <Text className="text-3xl font-bold">Hello, Sahi!</Text>
                    <Text className="text-gray-500 text-base mt-2">Here's your outfit for today</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


export default HomeScreen

const styles = StyleSheet.create({})