import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '../../src/lib/firebase';
import { useAuthStore } from '../../src/store/useAuthStore';

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'farmer' | 'driver'>('buyer');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update Firebase profile with the name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }

      // Save user to local store
      login({
        id: userCredential.user.uid,
        name: name,
        phone: phone,
        role: role
      });

      // Redirect to correct dashboard
      if (role === 'farmer') router.replace('/(farmer)');
      else if (role === 'driver') router.replace('/(driver)');
      else router.replace('/(tabs)');

    } catch (error: any) {
      if (Platform.OS === 'web') {
        window.alert(error.message);
      } else {
        Alert.alert("Registration Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (Platform.OS !== 'web') {
      Alert.alert("Notice", "Google Sign-In is currently only supported on the Web version.");
      return;
    }
    
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      login({
        id: userCredential.user.uid,
        name: userCredential.user.displayName || 'Google User',
        phone: userCredential.user.phoneNumber || phone || '+0000000000',
        role: role
      });

      if (role === 'farmer') router.replace('/(farmer)');
      else if (role === 'driver') router.replace('/(driver)');
      else router.replace('/(tabs)');
      
    } catch (error: any) {
      window.alert(error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-white" 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View className="mb-8">
          <Text className="text-4xl font-bold text-primary mb-2">Join SaloneAgro</Text>
          <Text className="text-gray-500 text-base">Create an account to start buying fresh produce.</Text>
        </View>

        {/* Role Selection */}
        <View className="flex-row bg-gray-100 p-1 rounded-xl mb-6">
          <TouchableOpacity 
            className={`flex-1 py-3 items-center rounded-lg ${role === 'buyer' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setRole('buyer')}
          >
            <Text className={`font-bold ${role === 'buyer' ? 'text-primary' : 'text-gray-500'}`}>Buyer</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-3 items-center rounded-lg ${role === 'farmer' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setRole('farmer')}
          >
            <Text className={`font-bold ${role === 'farmer' ? 'text-primary' : 'text-gray-500'}`}>Farmer</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-3 items-center rounded-lg ${role === 'driver' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setRole('driver')}
          >
            <Text className={`font-bold ${role === 'driver' ? 'text-primary' : 'text-gray-500'}`}>Driver</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Input 
            label="Full Name" 
            placeholder="e.g. John Doe" 
            value={name}
            onChangeText={(text) => setName(text.replace(/[^a-zA-Z\s]/g, ''))}
          />
          <Input 
            label="Email Address" 
            placeholder="e.g. john@example.com" 
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input 
            label="Phone Number" 
            placeholder="e.g. +232 76 123 456" 
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/[^0-9+]/g, ''))}
          />
          <Input 
            label="Password" 
            placeholder="Enter a secure password" 
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Button 
          title="Sign Up with Email" 
          onPress={handleRegister} 
          isLoading={loading} 
          disabled={!phone || !name || !email || !password || googleLoading}
        />

        <View className="my-4 flex-row items-center">
          <View className="flex-1 h-[1px] bg-gray-200" />
          <Text className="mx-4 text-gray-400 font-medium">OR</Text>
          <View className="flex-1 h-[1px] bg-gray-200" />
        </View>

        <TouchableOpacity 
          className="w-full bg-white border border-gray-200 p-4 rounded-xl items-center mb-6 shadow-sm"
          onPress={handleGoogleRegister}
          disabled={loading || googleLoading}
        >
          <Text className="font-bold text-gray-800 text-lg">
            {googleLoading ? 'Connecting...' : 'Sign Up with Google'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-2">
          <Text className="text-gray-500">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-primary font-bold">Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
