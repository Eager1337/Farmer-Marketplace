import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { useCartStore } from '../../src/store/useCartStore';

export default function CheckoutScreen() {
  const router = useRouter();
  const getTotal = useCartStore(state => state.getTotal);
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  const total = getTotal();
  const deliveryFee = 15000;
  const grandTotal = total + deliveryFee;

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-6">
        <View className="bg-white p-4 rounded-2xl mb-6 shadow-sm">
          <Text className="text-lg font-bold text-gray-900 mb-4">Delivery Details</Text>
          <Input 
            label="Delivery Address" 
            placeholder="e.g. 12 Pademba Road, Freetown" 
            value={address}
            onChangeText={setAddress}
          />
          <Input 
            label="Delivery Note (Optional)" 
            placeholder="e.g. Call me when you arrive" 
            value={note}
            onChangeText={setNote}
          />
        </View>

        <View className="bg-white p-4 rounded-2xl mb-6 shadow-sm">
          <Text className="text-lg font-bold text-gray-900 mb-4">Order Summary</Text>
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-500">Items Total</Text>
            <Text className="text-gray-900">Le {total}</Text>
          </View>
          <View className="flex-row justify-between mb-4 pb-4 border-b border-gray-100">
            <Text className="text-gray-500">Delivery Fee</Text>
            <Text className="text-gray-900">Le {deliveryFee}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg font-bold text-gray-900">Total to Pay</Text>
            <Text className="text-xl font-bold text-earth">Le {grandTotal}</Text>
          </View>
        </View>
      </ScrollView>

      <View className="bg-white p-6 rounded-t-3xl shadow-lg border-t border-gray-100">
        <Button 
          title="Continue to Payment" 
          onPress={() => router.push('/checkout/payment')} 
          size="lg"
          disabled={!address}
        />
      </View>
    </View>
  );
}
