import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Users, Truck, AlertCircle, TrendingUp, ChevronRight, CheckCircle, CreditCard, Settings } from 'lucide-react-native';
import { Card } from '../../src/components/ui/Card';
import { useRouter } from 'expo-router';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-6 bg-gray-900 rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white/80 text-sm">System Admin</Text>
            <Text className="text-white text-xl font-bold">SaloneAgro Operations</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/settings')} className="bg-white/10 p-2 rounded-full">
            <Settings size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 p-6">
        <View className="flex-row flex-wrap justify-between mb-6">
          <Card className="w-[48%] items-center p-4 mb-4">
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
              <Users size={24} color="#3b82f6" />
            </View>
            <Text className="text-xl font-bold text-gray-900">1,204</Text>
            <Text className="text-gray-500 text-xs">Total Users</Text>
          </Card>
          
          <Card className="w-[48%] items-center p-4 mb-4">
            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
              <TrendingUp size={24} color="#16a34a" />
            </View>
            <Text className="text-xl font-bold text-gray-900">452</Text>
            <Text className="text-gray-500 text-xs">Active Farmers</Text>
          </Card>
        </View>

        <Text className="text-lg font-bold text-gray-900 mb-4">Quick Actions</Text>
        
        <TouchableOpacity 
          className="bg-white p-4 rounded-2xl mb-4 flex-row items-center justify-between shadow-sm"
          onPress={() => router.push('/(admin)/orders')}
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-4">
              <Truck size={20} color="#f97316" />
            </View>
            <View>
              <Text className="font-bold text-gray-900 text-lg">All Orders</Text>
              <Text className="text-sm text-gray-500">Monitor active and past orders</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white p-4 rounded-2xl mb-4 flex-row items-center justify-between shadow-sm"
          onPress={() => router.push('/(admin)/farmers')}
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-4">
              <CheckCircle size={20} color="#16a34a" />
            </View>
            <View>
              <Text className="font-bold text-gray-900 text-lg">Verify Farmers</Text>
              <Text className="text-sm text-gray-500">Approve pending applications</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white p-4 rounded-2xl mb-4 flex-row items-center justify-between shadow-sm"
          onPress={() => router.push('/(admin)/users')}
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-4">
              <Users size={20} color="#3b82f6" />
            </View>
            <View>
              <Text className="font-bold text-gray-900 text-lg">Manage Users</Text>
              <Text className="text-sm text-gray-500">View and manage all users</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-white p-4 rounded-2xl mb-4 flex-row items-center justify-between shadow-sm"
          onPress={() => router.push('/(admin)/transactions')}
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-4">
              <CreditCard size={20} color="#9333ea" />
            </View>
            <View>
              <Text className="font-bold text-gray-900 text-lg">Transactions</Text>
              <Text className="text-sm text-gray-500">Monitor payments & refunds</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}
