import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TrendingUp, Package, Bell, Plus, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/useAuthStore';
import { Card } from '../../src/components/ui/Card';
import { MOCK_ORDERS } from '../../src/data/mockData';

export default function FarmerDashboard() {
  const user = useAuthStore(state => state.user);
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-6 bg-earth rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white/80 text-sm">Farmer Dashboard</Text>
            <Text className="text-white text-xl font-bold">Hello, {user?.name || 'Farmer'}</Text>
          </View>
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.push('/settings')} className="bg-white/20 p-2 rounded-full mr-3">
              <Settings size={20} color="#fff" />
            </TouchableOpacity>
            <View className="bg-white/20 p-2 rounded-full">
              <Bell size={20} color="#fff" />
            </View>
          </View>
        </View>

        <Text className="text-white/80 mb-1">Total Earnings (This Month)</Text>
        <Text className="text-4xl font-bold text-white">Le 4,500,000</Text>
      </View>

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row gap-4 mb-6">
          <Card className="flex-1 items-center p-4">
            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
              <Package size={24} color="#16a34a" />
            </View>
            <Text className="text-2xl font-bold text-gray-900">20</Text>
            <Text className="text-gray-500 text-xs">Active Listings</Text>
          </Card>
          <Card className="flex-1 items-center p-4">
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
              <TrendingUp size={24} color="#3b82f6" />
            </View>
            <Text className="text-2xl font-bold text-gray-900">15</Text>
            <Text className="text-gray-500 text-xs">Total Orders</Text>
          </Card>
        </View>

        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-900">Recent Orders</Text>
          <TouchableOpacity onPress={() => router.push('/(farmer)/orders')}>
            <Text className="text-sm font-medium text-primary">See All</Text>
          </TouchableOpacity>
        </View>
        
        <View className="pb-24">
          {MOCK_ORDERS.map((order) => (
            <View key={order.id} className="bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100">
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="font-bold text-gray-900">{order.orderNumber}</Text>
                  <Text className="text-xs text-gray-400">{order.date}</Text>
                </View>
                <View className={`px-2 py-1 rounded-md ${
                  order.status === 'Completed' ? 'bg-green-50' : 
                  order.status === 'Processing' ? 'bg-blue-50' : 
                  order.status === 'Cancelled' ? 'bg-red-50' : 'bg-yellow-50'
                }`}>
                  <Text className={`text-xs font-bold ${
                    order.status === 'Completed' ? 'text-green-600' : 
                    order.status === 'Processing' ? 'text-blue-600' : 
                    order.status === 'Cancelled' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {order.status}
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-end mt-2 pt-3 border-t border-gray-50">
                <Text className="text-sm font-medium text-gray-600 flex-1 mr-4" numberOfLines={2}>
                  {order.itemsDesc}
                </Text>
                <Text className="font-bold text-earth whitespace-nowrap">Le {order.amount.toLocaleString()}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity 
        className="absolute bottom-6 right-6 w-14 h-14 bg-earth rounded-full items-center justify-center shadow-lg elevation-5"
        onPress={() => router.push('/(farmer)/add-product')}
      >
        <Plus size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
