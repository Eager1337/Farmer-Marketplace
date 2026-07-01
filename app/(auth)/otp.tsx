import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { useAuthStore } from '../../src/store/useAuthStore';

export default function OTPScreen() {
  const { phone, role, name } = useLocalSearchParams<{ phone: string, role: string, name: string }>();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const userRole = (role as 'buyer' | 'farmer' | 'admin' | 'driver') || 'buyer';
      // If name is provided via params use it, otherwise fallback to the role-based mock names
      const userName = name || (userRole === 'farmer' ? 'Alpha Usman' : 'Serayy Bah');
      login({ id: '1', name: userName, phone: phone || '', role: userRole });
      
      if (userRole === 'farmer') {
        router.replace('/(farmer)');
      } else if (userRole === 'admin') {
        router.replace('/(admin)');
      } else if (userRole === 'driver') {
        router.replace('/(driver)');
      } else {
        router.replace('/(tabs)');
      }
    }, 1000);
  };

  const handleOtpChange = (text: string, index: number) => {
    const numericText = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = numericText;
    setOtp(newOtp);
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-white" 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 px-6 justify-center">
        <View className="mb-10">
          <Text className="text-3xl font-bold text-primary mb-2">Verify Phone</Text>
          <Text className="text-gray-500 text-base">
            We sent a 4-digit code to {phone || 'your phone'}
          </Text>
        </View>

        <View className="flex-row justify-between mb-10 px-4">
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              className="w-16 h-16 bg-gray-50 border border-gray-200 rounded-xl text-center text-2xl font-bold text-gray-900"
              keyboardType="number-pad"
              maxLength={1}
              value={otp[index]}
              onChangeText={(text) => handleOtpChange(text, index)}
            />
          ))}
        </View>

        <Button 
          title="Verify & Continue" 
          onPress={handleVerify} 
          isLoading={loading} 
          disabled={otp.some(digit => digit === '')}
        />

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-500">Didn't receive the code? </Text>
          <TouchableOpacity>
            <Text className="text-primary font-bold">Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
