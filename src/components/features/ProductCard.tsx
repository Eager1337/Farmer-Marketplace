import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from '../ui/Card';
import { Plus } from 'lucide-react-native';

export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  farmer: string;
  categoryId?: string;
}

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAdd?: () => void;
}

export function ProductCard({ product, onPress, onAdd }: ProductCardProps) {
  return (
    <TouchableOpacity onPress={onPress} className="w-40 mr-4">
      <Card className="p-0 overflow-hidden">
        <Image 
          source={{ uri: product.image }} 
          className="w-full h-32 bg-gray-200"
          resizeMode="cover"
        />
        <View className="p-3 pb-4">
          <Text className="text-xs text-primary font-medium mb-1">{product.farmer}</Text>
          <Text className="text-sm font-bold text-gray-900 mb-1" numberOfLines={1}>{product.name}</Text>
          <View className="flex-row items-baseline mt-1">
            <Text className="text-sm font-bold text-earth">Le {product.price}</Text>
            <Text className="text-xs text-gray-500 ml-1">/{product.unit}</Text>
          </View>
          <TouchableOpacity 
            onPress={onAdd}
            className="absolute bottom-2 right-2 bg-primary w-8 h-8 rounded-full items-center justify-center"
          >
            <Plus size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
