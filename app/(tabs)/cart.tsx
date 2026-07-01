import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { useCartStore } from '../../src/store/useCartStore';

export default function CartScreen() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-white pt-14 px-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Your Cart</Text>
        <View className="flex-1 items-center justify-center">
          <View className="w-24 h-24 bg-green-50 rounded-full items-center justify-center mb-6">
            <ShoppingCart size={32} color="#16a34a" />
          </View>
          <Text className="text-xl font-bold text-gray-900 mb-2">Cart is empty</Text>
          <Text className="text-gray-500 text-center mb-8">
            Looks like you haven't added any fresh produce to your cart yet.
          </Text>
          <Button title="Start Shopping" onPress={() => router.push('/(tabs)')} className="w-full max-w-[200px]" />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white pt-14 px-6 pb-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-gray-900">Your Cart</Text>
        <Text className="text-gray-500">{items.length} items</Text>
      </View>

      <ScrollView className="flex-1 p-6">
        {items.map((item) => (
          <View key={item.id} className="flex-row bg-white p-3 rounded-2xl mb-4 shadow-sm">
            <Image 
              source={{ uri: item.image }} 
              className="w-20 h-20 rounded-xl bg-gray-200"
              resizeMode="cover"
            />
            <View className="flex-1 ml-3 justify-between">
              <View className="flex-row justify-between items-start">
                <View>
                  <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>{item.name}</Text>
                  <Text className="text-xs text-primary">{item.farmer}</Text>
                </View>
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <Trash2 size={18} color="#ef4444" />
                </TouchableOpacity>
              </View>
              
              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-sm font-bold text-earth">Le {item.price}</Text>
                
                <View className="flex-row items-center bg-gray-100 rounded-full">
                  <TouchableOpacity 
                    className="w-8 h-8 items-center justify-center"
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} color="#4b5563" />
                  </TouchableOpacity>
                  <Text className="text-sm font-bold text-gray-900 w-6 text-center">{item.quantity}</Text>
                  <TouchableOpacity 
                    className="w-8 h-8 items-center justify-center bg-primary rounded-full"
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="bg-white p-6 rounded-t-3xl shadow-lg border-t border-gray-100">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500">Subtotal</Text>
          <Text className="text-gray-900 font-medium">Le {getTotal()}</Text>
        </View>
        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-500">Delivery</Text>
          <Text className="text-gray-900 font-medium">Le 15000</Text>
        </View>
        <View className="flex-row justify-between mb-6 pt-4 border-t border-gray-100">
          <Text className="text-lg font-bold text-gray-900">Total</Text>
          <Text className="text-xl font-bold text-earth">Le {getTotal() + 15000}</Text>
        </View>
        
        <Button 
          title="Proceed to Checkout" 
          onPress={() => router.push('/checkout')} 
          size="lg"
        />
      </View>
    </View>
  );
}
