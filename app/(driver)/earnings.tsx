import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowDownToLine, Banknote } from 'lucide-react-native';

const MOCK_PAYOUTS = [
  { id: 'PO-9021', date: 'Oct 24, 2023', amount: 450000, status: 'completed', method: 'Orange Money' },
  { id: 'PO-9018', date: 'Oct 17, 2023', amount: 380000, status: 'completed', method: 'Bank Transfer' },
  { id: 'PO-9010', date: 'Oct 10, 2023', amount: 425000, status: 'completed', method: 'Orange Money' },
];

export default function EarningsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-4 bg-white flex-row items-center border-b border-gray-100 shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">My Earnings</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        <View className="bg-green-700 p-6 rounded-3xl mb-6 shadow-sm">
          <Text className="text-white/80 text-sm mb-1">Available Balance</Text>
          <Text className="text-white text-3xl font-bold mb-4">Le 136,000</Text>
          
          <TouchableOpacity className="bg-white/20 py-3 rounded-xl flex-row items-center justify-center">
            <ArrowDownToLine size={20} color="#ffffff" className="mr-2" />
            <Text className="text-white font-bold">Withdraw Funds</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between mb-6">
          <View className="bg-white p-4 rounded-2xl flex-1 mr-2 shadow-sm border border-gray-100">
            <Text className="text-gray-500 text-xs mb-1">This Week</Text>
            <Text className="text-lg font-bold text-gray-900">Le 450,000</Text>
          </View>
          <View className="bg-white p-4 rounded-2xl flex-1 ml-2 shadow-sm border border-gray-100">
            <Text className="text-gray-500 text-xs mb-1">Total Trips</Text>
            <Text className="text-lg font-bold text-gray-900">42</Text>
          </View>
        </View>

        <Text className="text-lg font-bold text-gray-900 mb-4">Recent Payouts</Text>

        {MOCK_PAYOUTS.map((payout) => (
          <View key={payout.id} className="bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-4">
                <Banknote size={20} color="#16a34a" />
              </View>
              <View>
                <Text className="font-bold text-gray-900">{payout.method}</Text>
                <Text className="text-xs text-gray-500">{payout.date}</Text>
              </View>
            </View>
            
            <View className="items-end">
              <Text className="font-bold text-gray-900">
                Le {payout.amount.toLocaleString()}
              </Text>
              <Text className="text-xs mt-1 text-green-600 capitalize">
                {payout.status}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
