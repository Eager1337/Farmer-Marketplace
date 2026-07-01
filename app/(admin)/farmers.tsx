import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, X, ShieldAlert } from 'lucide-react-native';

const MOCK_FARMERS = [
  { id: '1', name: 'Alusine Kamara', location: 'Makeni', crop: 'Rice, Cassava', status: 'pending' },
  { id: '2', name: 'Fatmata Sesay', location: 'Bo', crop: 'Vegetables', status: 'pending' },
  { id: '3', name: 'Ibrahim Conteh', location: 'Kenema', crop: 'Cocoa', status: 'pending' },
];

export default function VerifyFarmersScreen() {
  const router = useRouter();
  const [farmers, setFarmers] = useState(MOCK_FARMERS);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    Alert.alert(
      `Confirm ${action}`,
      `Are you sure you want to ${action} this farmer?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => {
            setFarmers(prev => prev.filter(f => f.id !== id));
            Alert.alert('Success', `Farmer ${action}d successfully`);
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-4 bg-white flex-row items-center border-b border-gray-100 shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Verify Farmers</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        {farmers.length === 0 ? (
          <View className="items-center justify-center mt-12">
            <ShieldAlert size={48} color="#9ca3af" />
            <Text className="text-gray-500 mt-4 text-lg">No pending applications</Text>
          </View>
        ) : (
          farmers.map(farmer => (
            <View key={farmer.id} className="bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100">
              <View className="flex-row justify-between mb-4">
                <View>
                  <Text className="text-lg font-bold text-gray-900">{farmer.name}</Text>
                  <Text className="text-gray-500">{farmer.location} • {farmer.crop}</Text>
                </View>
                <View className="bg-yellow-100 px-3 py-1 rounded-full h-8 justify-center">
                  <Text className="text-yellow-700 text-xs font-bold uppercase">{farmer.status}</Text>
                </View>
              </View>

              <View className="flex-row space-x-4">
                <TouchableOpacity 
                  className="flex-1 bg-red-50 flex-row items-center justify-center py-3 rounded-xl border border-red-100"
                  onPress={() => handleAction(farmer.id, 'reject')}
                >
                  <X size={16} color="#ef4444" className="mr-2" />
                  <Text className="text-red-600 font-bold">Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="flex-1 bg-green-50 flex-row items-center justify-center py-3 rounded-xl border border-green-100"
                  onPress={() => handleAction(farmer.id, 'approve')}
                >
                  <Check size={16} color="#16a34a" className="mr-2" />
                  <Text className="text-green-600 font-bold">Approve</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
