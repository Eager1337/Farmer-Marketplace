import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { User, Settings, MapPin, CreditCard, HelpCircle, LogOut, Tractor, Navigation } from 'lucide-react-native';
import { useAuthStore } from '../../src/store/useAuthStore';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  const menuItems = [
    { icon: <MapPin size={24} color="#4b5563" />, title: 'Delivery Addresses' },
    { icon: <CreditCard size={24} color="#4b5563" />, title: 'Payment Methods' },
    { icon: <Settings size={24} color="#4b5563" />, title: 'Settings' },
    { icon: <HelpCircle size={24} color="#4b5563" />, title: 'Help & Support' },
  ];

  const featureItems = [
    { icon: <Navigation size={24} color="#3b82f6" />, title: 'Track Delivery Bike', route: '/tracking' as any, roles: ['buyer', 'admin'] },
    { icon: <Tractor size={24} color="#f97316" />, title: 'Driver Dashboard', route: '/(driver)' as any, roles: ['driver', 'admin'] },
    { icon: <Settings size={24} color="#8b5cf6" />, title: 'Admin Dashboard', route: '/(admin)' as any, roles: ['admin'] },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Profile Header */}
      <View className="bg-white px-6 pt-16 pb-8 rounded-b-3xl shadow-sm items-center">
        <View className="w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-4">
          <Text className="text-3xl">👤</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-900 mb-1">{user?.name || 'Guest User'}</Text>
        <Text className="text-gray-500">{user?.phone || '+232 00 000 000'}</Text>
        <View className="mt-4 px-4 py-1 bg-green-100 rounded-full">
          <Text className="text-primary font-medium capitalize">{user?.role || 'Buyer'} Account</Text>
        </View>
      </View>

      {/* Menu List */}
      <View className="mt-6 px-6">
        <Text className="text-gray-500 font-bold mb-3 ml-2 uppercase text-xs">Features</Text>
        {featureItems.filter(item => item.roles.includes(user?.role || 'buyer')).map((item, index) => (
          <TouchableOpacity 
            key={`feat-${index}`}
            onPress={() => router.push(item.route)}
            className="flex-row items-center bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100"
          >
            <View className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center mr-4">
              {item.icon}
            </View>
            <Text className="flex-1 text-lg font-bold text-gray-900">{item.title}</Text>
          </TouchableOpacity>
        ))}

        <Text className="text-gray-500 font-bold mt-2 mb-3 ml-2 uppercase text-xs">Account</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={`menu-${index}`} 
            onPress={() => {
              if (item.title === 'Settings') {
                router.push('/settings');
              }
            }}
            className="flex-row items-center bg-white p-4 rounded-2xl mb-4 shadow-sm"
          >
            <View className="w-12 h-12 bg-gray-50 rounded-full items-center justify-center mr-4">
              {item.icon}
            </View>
            <Text className="flex-1 text-lg font-medium text-gray-700">{item.title}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          onPress={handleLogout}
          className="flex-row items-center bg-red-50 p-4 rounded-2xl mt-4"
        >
          <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mr-4">
            <LogOut size={24} color="#ef4444" />
          </View>
          <Text className="flex-1 text-lg font-bold text-red-500">Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
