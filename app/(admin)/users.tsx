import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, User, Search, Shield } from 'lucide-react-native';
import { Input } from '../../src/components/ui/Input';

const MOCK_USERS = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer', status: 'active' },
  { id: '2', name: 'Salone Agro', email: 'admin@saloneagro.com', role: 'admin', status: 'active' },
  { id: '3', name: 'Driver Musa', email: 'musa@delivery.com', role: 'driver', status: 'active' },
  { id: '4', name: 'Jane Smith', email: 'jane@example.com', role: 'customer', status: 'suspended' },
];

export default function ManageUsersScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredUsers = MOCK_USERS.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-4 bg-white flex-row items-center border-b border-gray-100 shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Manage Users</Text>
      </View>

      <View className="p-6 pb-2">
        <Input 
          placeholder="Search users by name or email..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView className="flex-1 px-6">
        {filteredUsers.map(user => (
          <View key={user.id} className="bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100 flex-row items-center">
            <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mr-4">
              {user.role === 'admin' ? (
                <Shield size={24} color="#3b82f6" />
              ) : (
                <User size={24} color="#6b7280" />
              )}
            </View>
            <View className="flex-1">
              <Text className="font-bold text-gray-900 text-lg">{user.name}</Text>
              <Text className="text-gray-500 text-sm">{user.email}</Text>
            </View>
            <View className="items-end">
              <View className={`px-2 py-1 rounded mb-1 ${
                user.role === 'admin' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Text className={`text-xs font-bold uppercase ${
                  user.role === 'admin' ? 'text-blue-700' : 'text-gray-600'
                }`}>{user.role}</Text>
              </View>
              <Text className={`text-xs ${
                user.status === 'active' ? 'text-green-600' : 'text-red-600'
              }`}>{user.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
