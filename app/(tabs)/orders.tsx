import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Package } from 'lucide-react-native';
import { MOCK_ORDERS } from '../../src/data/mockData';

export default function BuyerOrdersScreen() {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const activeOrders = MOCK_ORDERS.filter(o => ['Pending Pickup', 'Processing'].includes(o.status));
  const historyOrders = MOCK_ORDERS.filter(o => ['Completed', 'Cancelled'].includes(o.status));

  const displayOrders = activeTab === 'active' ? activeOrders : historyOrders;

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-4 bg-white flex-row items-center border-b border-gray-100 shadow-sm">
        <Text className="text-xl font-bold text-gray-900">My Orders</Text>
      </View>

      <View className="flex-row px-6 mt-4 mb-2">
        <TouchableOpacity 
          className={`flex-1 py-3 items-center border-b-2 ${activeTab === 'active' ? 'border-primary' : 'border-transparent'}`}
          onPress={() => setActiveTab('active')}
        >
          <Text className={`font-bold ${activeTab === 'active' ? 'text-primary' : 'text-gray-500'}`}>
            Active Orders ({activeOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 py-3 items-center border-b-2 ${activeTab === 'history' ? 'border-primary' : 'border-transparent'}`}
          onPress={() => setActiveTab('history')}
        >
          <Text className={`font-bold ${activeTab === 'history' ? 'text-primary' : 'text-gray-500'}`}>
            History ({historyOrders.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 pt-2" showsVerticalScrollIndicator={false}>
        {displayOrders.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Package size={48} color="#d1d5db" />
            <Text className="text-gray-500 mt-4 font-medium">No orders found.</Text>
          </View>
        ) : (
          displayOrders.map((order) => (
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
                <Text className="font-bold text-primary whitespace-nowrap">Le {order.amount.toLocaleString()}</Text>
              </View>
            </View>
          ))
        )}
        <View className="h-20" />
      </ScrollView>
    </View>
  );
}
