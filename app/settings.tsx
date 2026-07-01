import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Switch, KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft, User, Phone, MapPin, Bell, Shield, HelpCircle, LogOut, Save } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../src/store/useAuthStore';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  
  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <View className="px-6 pt-16 pb-4 bg-white flex-row items-center justify-between border-b border-gray-100 shadow-sm">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Account Settings</Text>
        </View>
        <TouchableOpacity className="bg-primary px-4 py-2 rounded-full flex-row items-center">
          <Save size={16} color="white" className="mr-2" />
          <Text className="text-white font-bold text-sm">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Profile Info Section */}
        <Text className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Personal Information</Text>
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <View className="flex-row items-center mb-4 pb-4 border-b border-gray-50">
            <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mr-4">
              <Text className="text-2xl">👤</Text>
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-900">{user?.name || 'User'}</Text>
              <View className="bg-green-100 px-3 py-1 rounded-full self-start mt-1">
                <Text className="text-primary text-xs font-bold capitalize">{user?.role || 'Guest'} Account</Text>
              </View>
            </View>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-xs text-gray-500 mb-1 ml-1 font-medium">Full Name</Text>
              <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <User size={18} color="#9ca3af" className="mr-3" />
                <TextInput 
                  defaultValue={user?.name}
                  placeholder="Enter your full name"
                  className="flex-1 text-gray-900 font-medium"
                />
              </View>
            </View>
            
            <View>
              <Text className="text-xs text-gray-500 mb-1 ml-1 font-medium">Phone Number</Text>
              <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <Phone size={18} color="#9ca3af" className="mr-3" />
                <TextInput 
                  defaultValue={user?.phone}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  className="flex-1 text-gray-900 font-medium"
                />
              </View>
            </View>

            <View>
              <Text className="text-xs text-gray-500 mb-1 ml-1 font-medium">Primary Address</Text>
              <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                <MapPin size={18} color="#9ca3af" className="mr-3" />
                <TextInput 
                  placeholder="E.g., 123 Aberdeen Rd, Freetown"
                  className="flex-1 text-gray-900 font-medium"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Preferences Section */}
        <Text className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Preferences</Text>
        <View className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
          <View className="flex-row items-center justify-between p-4 border-b border-gray-50">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center mr-3">
                <Bell size={20} color="#3b82f6" />
              </View>
              <View>
                <Text className="font-bold text-gray-900">Push Notifications</Text>
                <Text className="text-xs text-gray-500">Order updates and alerts</Text>
              </View>
            </View>
            <Switch 
              value={notificationsEnabled} 
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#d1d5db', true: '#86efac' }}
              thumbColor={notificationsEnabled ? '#16a34a' : '#f3f4f6'}
            />
          </View>

          <View className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-purple-50 rounded-full items-center justify-center mr-3">
                <Shield size={20} color="#a855f7" />
              </View>
              <View>
                <Text className="font-bold text-gray-900">Marketing Emails</Text>
                <Text className="text-xs text-gray-500">Promotions and discounts</Text>
              </View>
            </View>
            <Switch 
              value={marketingEnabled} 
              onValueChange={setMarketingEnabled}
              trackColor={{ false: '#d1d5db', true: '#d8b4fe' }}
              thumbColor={marketingEnabled ? '#a855f7' : '#f3f4f6'}
            />
          </View>
        </View>

        {/* Support & Legal */}
        <View className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-50">
            <View className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3">
              <HelpCircle size={20} color="#6b7280" />
            </View>
            <Text className="font-bold text-gray-900 flex-1">Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleLogout}
            className="flex-row items-center p-4"
          >
            <View className="w-10 h-10 bg-red-50 rounded-full items-center justify-center mr-3">
              <LogOut size={20} color="#ef4444" />
            </View>
            <Text className="font-bold text-red-500 flex-1">Log Out</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center pb-12">
          <Text className="text-xs text-gray-400 font-medium">StoreSalone v1.0.0</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
