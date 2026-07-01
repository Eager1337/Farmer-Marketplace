import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Package, Banknote, ChevronRight, MapPin, Truck, CheckCircle, Settings } from 'lucide-react-native';
import { Card } from '../../src/components/ui/Card';
import { useRouter } from 'expo-router';

export default function DriverDashboard() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-6 bg-green-700 rounded-b-3xl flex-row justify-between items-center">
        <View>
          <Text className="text-white/80 text-sm">Driver Mode</Text>
          <Text className="text-white text-xl font-bold">Rider Dashboard</Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.push('/settings')} className="mr-3 bg-white/20 p-2 rounded-full">
            <Settings size={20} color="#fff" />
          </TouchableOpacity>
          <View className="flex-row items-center bg-white/20 px-3 py-2 rounded-full">
            <Text className="text-white font-bold mr-2">{isOnline ? 'Online' : 'Offline'}</Text>
            <Switch 
              value={isOnline} 
              onValueChange={setIsOnline} 
              trackColor={{ false: '#d1d5db', true: '#10b981' }}
              thumbColor={isOnline ? '#ffffff' : '#f3f4f6'}
            />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 p-6">
        <View className="flex-row flex-wrap justify-between mb-6">
          <Card className="w-[48%] items-center p-4 mb-4">
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
              <Package size={24} color="#3b82f6" />
            </View>
            <Text className="text-xl font-bold text-gray-900">12</Text>
            <Text className="text-gray-500 text-xs">Today's Deliveries</Text>
          </Card>
          
          <Card className="w-[48%] items-center p-4 mb-4">
            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
              <Banknote size={24} color="#16a34a" />
            </View>
            <Text className="text-xl font-bold text-gray-900">Le 450K</Text>
            <Text className="text-gray-500 text-xs">Today's Earnings</Text>
          </Card>
        </View>

        {isOnline && (
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">Current Delivery</Text>
            <Card className="p-4 bg-blue-50 border-blue-200">
              <View className="flex-row items-center justify-between mb-4">
                <View className="bg-blue-100 px-3 py-1 rounded-full">
                  <Text className="text-blue-700 text-xs font-bold uppercase">In Progress</Text>
                </View>
                <Text className="text-gray-500 text-sm">Est. 15 mins</Text>
              </View>
              
              <View className="mb-4">
                <View className="flex-row items-start mb-4">
                  <View className="w-6 items-center mr-3">
                    <View className="w-3 h-3 rounded-full bg-blue-500 mb-1" />
                    <View className="w-0.5 h-6 bg-gray-300" />
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500">Pick up</Text>
                    <Text className="font-bold text-gray-900">Farmer John's Farm</Text>
                  </View>
                </View>
                
                <View className="flex-row items-start">
                  <View className="w-6 items-center mr-3">
                    <MapPin size={16} color="#ef4444" />
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500">Drop off</Text>
                    <Text className="font-bold text-gray-900">Lumley Beach Road</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity className="bg-blue-600 py-3 rounded-xl items-center">
                <Text className="text-white font-bold text-lg">Navigate</Text>
              </TouchableOpacity>
            </Card>
          </View>
        )}

        <Text className="text-lg font-bold text-gray-900 mb-4">Quick Actions</Text>
        
        <TouchableOpacity 
          className="bg-white p-4 rounded-2xl mb-4 flex-row items-center justify-between shadow-sm border border-gray-100"
          onPress={() => router.push('/(driver)/deliveries')}
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-4">
              <Truck size={20} color="#f97316" />
            </View>
            <View>
              <Text className="font-bold text-gray-900 text-lg">Delivery History</Text>
              <Text className="text-sm text-gray-500">View completed trips</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white p-4 rounded-2xl mb-4 flex-row items-center justify-between shadow-sm border border-gray-100"
          onPress={() => router.push('/(driver)/earnings')}
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-4">
              <Banknote size={20} color="#9333ea" />
            </View>
            <View>
              <Text className="font-bold text-gray-900 text-lg">My Earnings</Text>
              <Text className="text-sm text-gray-500">View payouts and history</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>
        
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}
