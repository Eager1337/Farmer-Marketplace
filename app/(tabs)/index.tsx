import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { Search, MapPin, Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../src/store/useAuthStore';
import { useCartStore } from '../../src/store/useCartStore';
import { ProductCard, Product } from '../../src/components/features/ProductCard';
import { CATEGORIES, MOCK_PRODUCTS } from '../../src/data/mockData';



export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const addItem = useCartStore(state => state.addItem);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleAddToCart = (product: Product) => {
    addItem(product);
    Alert.alert("Added to Cart", `${product.name} was added to your cart.`);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-14 pb-4 bg-primary rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white/80 text-sm">Good morning,</Text>
            <Text className="text-white text-xl font-bold">{user?.name || 'Guest'}</Text>
          </View>
          <View className="bg-white/20 p-2 rounded-full">
            <Bell size={20} color="#fff" />
          </View>
        </View>

        <View className="flex-row items-center bg-white rounded-xl px-4 h-12">
          <Search size={20} color="#9ca3af" />
          <TextInput 
            className="flex-1 ml-2 text-base"
            placeholder="Search for tomatoes, rice..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Delivery Location */}
        <View className="flex-row items-center px-6 py-4 border-b border-gray-100">
          <MapPin size={16} color="#16a34a" />
          <Text className="ml-2 text-sm text-gray-600">Deliver to: <Text className="font-semibold text-gray-900">Freetown Central</Text></Text>
        </View>

        {/* Categories */}
        <View className="mt-6 px-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900">Categories</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
              <Text className="text-sm text-primary font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map(category => (
              <TouchableOpacity 
                key={category.id} 
                className="items-center mr-6"
                onPress={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <View className={`w-16 h-16 rounded-full items-center justify-center mb-2 border ${selectedCategory === category.id ? 'bg-primary border-primary' : 'bg-green-50 border-green-100'}`}>
                  <Text className="text-2xl">{category.icon}</Text>
                </View>
                <Text className={`text-sm ${selectedCategory === category.id ? 'font-bold text-primary' : 'text-gray-700'}`}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Products */}
        <View className="mt-8 px-6 pb-20">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900">Popular Near You</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
              <Text className="text-sm text-primary font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MOCK_PRODUCTS
              .filter(p => !selectedCategory || p.categoryId === selectedCategory)
              .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={() => handleAddToCart(product)}
              />
            ))}
          </ScrollView>
          {MOCK_PRODUCTS.filter(p => !selectedCategory || p.categoryId === selectedCategory).filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
            <View className="items-center justify-center py-10">
              <Text className="text-gray-500">No products found in this category.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
