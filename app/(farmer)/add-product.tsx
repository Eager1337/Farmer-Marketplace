import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Image as ImageIcon, Upload } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';

const CATEGORIES = ['Vegetables', 'Fruits', 'Grains', 'Tubers', 'Spices'];

export default function AddProductScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: 'Vegetables',
    description: '',
    imageUrl: null as string | null
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, imageUrl: result.assets[0].uri });
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.quantity) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    // Simulate API call to add product
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Your product has been listed successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }, 1500);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-6 pt-16 pb-4 bg-white flex-row items-center border-b border-gray-100 shadow-sm">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Add New Product</Text>
      </View>

      <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
        
        <View className="mb-6">
          <Text className="font-bold text-gray-900 mb-2">Product Image *</Text>
          <TouchableOpacity 
            onPress={pickImage}
            className="bg-white p-4 h-40 rounded-2xl border-2 border-dashed border-gray-300 items-center justify-center bg-gray-50 overflow-hidden"
          >
            {formData.imageUrl ? (
              <View className="w-full h-full items-center justify-center">
                <Text className="text-green-600 font-bold mb-2">Image Selected!</Text>
                <Text className="text-xs text-gray-500">Tap to change</Text>
              </View>
            ) : (
              <View className="items-center">
                <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                  <Upload size={24} color="#16a34a" />
                </View>
                <Text className="text-gray-900 font-bold">Upload Product Image</Text>
                <Text className="text-gray-500 text-xs mt-1">Tap to select from gallery</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="font-bold text-gray-900 mb-2">Product Name *</Text>
          <Input 
            placeholder="e.g. Fresh Cassava"
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text.replace(/[^a-zA-Z\s]/g, '')})}
          />
        </View>

        <View className="flex-row gap-4 mb-4">
          <View className="flex-1">
            <Text className="font-bold text-gray-900 mb-2">Price (Le) *</Text>
            <Input 
              placeholder="0.00"
              keyboardType="numeric"
              value={formData.price}
              onChangeText={(text) => setFormData({...formData, price: text.replace(/[^0-9.]/g, '')})}
            />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-gray-900 mb-2">Available Qty *</Text>
            <Input 
              placeholder="e.g. 50 kg"
              value={formData.quantity}
              onChangeText={(text) => setFormData({...formData, quantity: text.replace(/[^0-9]/g, '')})}
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="font-bold text-gray-900 mb-2">Category *</Text>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <TouchableOpacity 
                key={cat}
                onPress={() => setFormData({...formData, category: cat})}
                className={`px-4 py-2 rounded-full border ${
                  formData.category === cat 
                    ? 'bg-earth border-earth' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text className={`font-bold ${
                  formData.category === cat ? 'text-white' : 'text-gray-600'
                }`}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="mb-8">
          <Text className="font-bold text-gray-900 mb-2">Description</Text>
          <View className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2">
            <Input 
              placeholder="Describe your product (freshness, source, etc.)"
              multiline
              numberOfLines={6}
              value={formData.description}
              onChangeText={(text) => setFormData({...formData, description: text})}
              style={{ height: 120, textAlignVertical: 'top' }}
              className="border-0 bg-transparent px-2 py-2"
            />
          </View>
        </View>

        <Button 
          title="Submit Listing" 
          size="lg" 
          onPress={handleSubmit}
          isLoading={loading}
        />
        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
