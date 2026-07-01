import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../src/lib/firebase';
import { useAuthStore } from '../../src/store/useAuthStore';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'buyer' | 'farmer' | 'admin' | 'driver'>('buyer');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      login({
        id: userCredential.user.uid,
        name: userCredential.user.displayName || 'User',
        phone: userCredential.user.phoneNumber || '+0000000000',
        role: role
      });

      if (role === 'farmer') router.replace('/(farmer)');
      else if (role === 'driver') router.replace('/(driver)');
      else if (role === 'admin') router.replace('/(admin)');
      else router.replace('/(tabs)');

    } catch (error: any) {
      if (Platform.OS === 'web') {
        window.alert("Invalid Credentials. Please check your email and password.");
      } else {
        Alert.alert("Login Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
        phone: userCredential.user.phoneNumber || '+0000000000',
        role: role
      });

      if (role === 'farmer') router.replace('/(farmer)');
      else if (role === 'driver') router.replace('/(driver)');
      else if (role === 'admin') router.replace('/(admin)');
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
        <View className="mb-10">
          <Text className="text-4xl font-bold text-primary mb-2">Welcome Back</Text>
          <Text className="text-gray-500 text-base">Sign in to continue to SaloneAgro</Text>
        </View>

        {/* Role Selection */}
        <View className="flex-row bg-gray-100 p-1 rounded-xl mb-6">
          <TouchableOpacity 
            className={`flex-1 py-3 items-center rounded-lg ${role === 'buyer' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setRole('buyer')}
          >
            <Text className={`font-bold text-xs ${role === 'buyer' ? 'text-primary' : 'text-gray-500'}`}>Buyer</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-3 items-center rounded-lg ${role === 'farmer' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setRole('farmer')}
          >
            <Text className={`font-bold text-xs ${role === 'farmer' ? 'text-primary' : 'text-gray-500'}`}>Farmer</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-3 items-center rounded-lg ${role === 'driver' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setRole('driver')}
          >
            <Text className={`font-bold text-xs ${role === 'driver' ? 'text-primary' : 'text-gray-500'}`}>Driver</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 py-3 items-center rounded-lg ${role === 'admin' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setRole('admin')}
          >
            <Text className={`font-bold text-xs ${role === 'admin' ? 'text-primary' : 'text-gray-500'}`}>Admin</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Input
            label="Email Address"
            placeholder="e.g. john@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Button
          title={`Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          onPress={handleLogin}
          isLoading={loading}
          disabled={!email || !password || googleLoading}
        />

        <View className="my-4 flex-row items-center">
          <View className="flex-1 h-[1px] bg-gray-200" />
          <Text className="mx-4 text-gray-400 font-medium">OR</Text>
          <View className="flex-1 h-[1px] bg-gray-200" />
        </View>

        <TouchableOpacity 
          className="w-full bg-white border border-gray-200 p-4 rounded-xl items-center mb-6 shadow-sm"
          onPress={handleGoogleLogin}
          disabled={loading || googleLoading}
        >
          <Text className="font-bold text-gray-800 text-lg">
            {googleLoading ? 'Connecting...' : 'Sign In with Google'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-2">
          <Text className="text-gray-500">Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text className="text-primary font-bold">Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
