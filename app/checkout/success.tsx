import React from 'react';
import { View, Text } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <View className="w-40 h-40 bg-green-50 rounded-full items-center justify-center mb-8 shadow-inner border-[8px] border-green-100">
        <CheckCircle2 size={80} color="#16a34a" />
      </View>
      
      <Text className="text-3xl font-black text-gray-900 text-center mb-4 tracking-tight">Payment Successful!</Text>
      <View className="bg-gray-50 px-6 py-4 rounded-2xl mb-12 w-full border border-gray-100">
        <Text className="text-gray-500 text-center text-base leading-relaxed">
          Your order has been placed successfully. A driver will be assigned to deliver your fresh produce shortly.
        </Text>
      </View>

      <Button 
        title="Track Order" 
        onPress={() => router.push('/tracking')} 
        size="lg"
        className="w-full mb-4"
      />
      <Button 
        title="Back to Home" 
        variant="ghost"
        onPress={() => router.replace('/(tabs)')} 
        size="lg"
        className="w-full"
      />
    </View>
  );
}
