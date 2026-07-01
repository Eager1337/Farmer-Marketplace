import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';
import { MOCK_PRODUCTS } from '../../src/data/mockData';
import { ProductCard } from '../../src/components/features/ProductCard';
import { useCartStore } from '../../src/store/useCartStore';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const addItem = useCartStore(state => state.addItem);

  const filteredProducts = MOCK_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.farmer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: any) => {
    addItem(product);
    Alert.alert("Added to Cart", `${product.name} was added to your cart.`);
  };

  return (
    <View className="flex-1 bg-white pt-14 px-6">
      <Text className="text-2xl font-bold text-gray-900 mb-6">Discover</Text>
      
      <View className="flex-row items-center border border-gray-200 rounded-xl px-4 h-12 bg-gray-50 mb-6">
        <SearchIcon size={20} color="#9ca3af" />
        <TextInput 
          className="flex-1 ml-2 text-base text-gray-900"
          placeholder="Search by product, farm, or location"
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
      </View>

      {searchQuery === '' ? (
        <View className="flex-1 items-center justify-center pb-20">
          <SearchIcon size={64} color="#e5e7eb" className="mb-4" />
          <Text className="text-gray-500 font-medium">Search for fresh produce</Text>
        </View>
      ) : filteredProducts.length > 0 ? (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <Text className="text-sm text-gray-500 mb-4">{filteredProducts.length} results found</Text>
          <View className="flex-row flex-wrap justify-between">
            {filteredProducts.map(product => (
              <View key={product.id} className="w-[48%] mb-4">
                <ProductCard 
                  product={product} 
                  onAdd={() => handleAddToCart(product)}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center pb-20">
          <Text className="text-gray-500 font-medium">No results found for "{searchQuery}"</Text>
          <Text className="text-gray-400 text-sm mt-2">Try checking for spelling or try a different term.</Text>
        </View>
      )}
    </View>
  );
}
