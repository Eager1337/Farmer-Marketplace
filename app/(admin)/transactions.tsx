import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

const MOCK_TRANSACTIONS = [
  { id: 'TRX-1029', amount: 150000, type: 'payment', user: 'John Doe', method: 'Card', date: 'Today, 14:30', status: 'completed' },
  { id: 'TRX-1028', amount: 45000, type: 'payment', user: 'Jane Smith', method: 'Orange Money', date: 'Today, 10:15', status: 'completed' },
  { id: 'TRX-1027', amount: 12000, type: 'refund', user: 'Alusine Kamara', method: 'Wallet', date: 'Yesterday, 16:45', status: 'completed' },
  { id: 'TRX-1026', amount: 250000, type: 'payment', user: 'Fatmata Sesay', method: 'Card', date: 'Yesterday, 09:20', status: 'failed' },
];

export default function TransactionsScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-4 bg-white flex-row items-center border-b border-gray-100 shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Transactions</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        <View className="flex-row justify-between mb-6">
          <View className="bg-white p-4 rounded-xl flex-1 mr-2 shadow-sm border border-gray-100">
            <Text className="text-gray-500 text-sm mb-1">Today's Revenue</Text>
            <Text className="text-xl font-bold text-green-600">Le 195,000</Text>
          </View>
          <View className="bg-white p-4 rounded-xl flex-1 ml-2 shadow-sm border border-gray-100">
            <Text className="text-gray-500 text-sm mb-1">Pending Payouts</Text>
            <Text className="text-xl font-bold text-orange-600">Le 45,000</Text>
          </View>
        </View>

        <Text className="text-lg font-bold text-gray-900 mb-4">Recent Activity</Text>

        {MOCK_TRANSACTIONS.map(trx => (
          <View key={trx.id} className="bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
                trx.type === 'payment' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {trx.type === 'payment' ? (
                  <ArrowDownLeft size={20} color="#16a34a" />
                ) : (
                  <ArrowUpRight size={20} color="#ef4444" />
                )}
              </View>
              <View>
                <Text className="font-bold text-gray-900">{trx.user}</Text>
                <Text className="text-xs text-gray-500">{trx.id} • {trx.method}</Text>
              </View>
            </View>
            
            <View className="items-end">
              <Text className={`font-bold ${
                trx.type === 'payment' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trx.type === 'payment' ? '+' : '-'}Le {trx.amount.toLocaleString()}
              </Text>
              <Text className={`text-xs mt-1 ${
                trx.status === 'completed' ? 'text-green-600' : 'text-red-500'
              }`}>{trx.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
