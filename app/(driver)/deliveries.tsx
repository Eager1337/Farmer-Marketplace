import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, PackageCheck, Package } from 'lucide-react-native';

const MOCK_DELIVERIES = [
  { id: 'DEL-8904', date: 'Today, 02:30 PM', pickup: 'Farmer John', dropoff: 'Lumley', earnings: 15000, status: 'active' },
  { id: 'DEL-8903', date: 'Today, 01:15 PM', pickup: 'Makeni Farms', dropoff: 'Aberdeen', earnings: 25000, status: 'active' },
  { id: 'DEL-8902', date: 'Today, 10:30 AM', pickup: 'Salone Farms', dropoff: 'Aberdeen', earnings: 35000, status: 'completed' },
  { id: 'DEL-8901', date: 'Today, 08:15 AM', pickup: 'Green Valley', dropoff: 'Wilberforce', earnings: 42000, status: 'completed' },
  { id: 'DEL-8895', date: 'Yesterday, 04:45 PM', pickup: 'Agro Hub', dropoff: 'Lumley', earnings: 28000, status: 'completed' },
  { id: 'DEL-8892', date: 'Yesterday, 02:20 PM', pickup: 'Fresh Roots', dropoff: 'Congo Cross', earnings: 31000, status: 'completed' },
];

export default function DeliveriesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const activeDeliveries = MOCK_DELIVERIES.filter(d => d.status === 'active');
  const historyDeliveries = MOCK_DELIVERIES.filter(d => d.status === 'completed');

  const displayDeliveries = activeTab === 'active' ? activeDeliveries : historyDeliveries;

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-4 bg-white flex-row items-center border-b border-gray-100 shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">My Deliveries</Text>
      </View>

      <View className="flex-row px-6 mt-4 mb-2">
        <TouchableOpacity 
          className={`flex-1 py-3 items-center border-b-2 ${activeTab === 'active' ? 'border-blue-600' : 'border-transparent'}`}
          onPress={() => setActiveTab('active')}
        >
          <Text className={`font-bold ${activeTab === 'active' ? 'text-blue-600' : 'text-gray-500'}`}>
            Active ({activeDeliveries.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 py-3 items-center border-b-2 ${activeTab === 'history' ? 'border-blue-600' : 'border-transparent'}`}
          onPress={() => setActiveTab('history')}
        >
          <Text className={`font-bold ${activeTab === 'history' ? 'text-blue-600' : 'text-gray-500'}`}>
            History ({historyDeliveries.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 pt-2" showsVerticalScrollIndicator={false}>
        {displayDeliveries.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Package size={48} color="#d1d5db" />
            <Text className="text-gray-500 mt-4 font-medium">No deliveries found.</Text>
          </View>
        ) : (
          displayDeliveries.map((delivery) => (
            <View key={delivery.id} className="bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100">
              <View className="flex-row justify-between items-center mb-3 border-b border-gray-100 pb-3">
                <View className="flex-row items-center">
                  <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${delivery.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'}`}>
                    {delivery.status === 'completed' ? (
                      <PackageCheck size={16} color="#16a34a" />
                    ) : (
                      <Package size={16} color="#3b82f6" />
                    )}
                  </View>
                  <View>
                    <Text className="font-bold text-gray-900">{delivery.id}</Text>
                    <Text className="text-xs text-gray-500">{delivery.date}</Text>
                  </View>
                </View>
                <Text className="font-bold text-green-600">Le {delivery.earnings.toLocaleString()}</Text>
              </View>

              <View className="pl-2">
                <View className="flex-row items-center mb-2">
                  <View className="w-2 h-2 rounded-full bg-blue-500 mr-3" />
                  <Text className="text-gray-700 text-sm">{delivery.pickup}</Text>
                </View>
                <View className="flex-row items-center">
                  <MapPin size={12} color="#ef4444" className="mr-2 ml-[2px]" />
                  <Text className="text-gray-700 text-sm ml-[2px]">{delivery.dropoff}</Text>
                </View>
              </View>
            </View>
          ))
        )}
        <View className="h-20" />
      </ScrollView>
    </View>
  );
}
