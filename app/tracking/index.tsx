import React, { useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Phone, MessageCircle, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { TrackingMap } from '../../src/components/features/Map';

export default function TrackingScreen() {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '60%'], []);

  // Freetown coordinates mock
  const driverLocation = { latitude: 8.484, longitude: -13.230 };
  const destination = { latitude: 8.475, longitude: -13.238 };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <TrackingMap driverLocation={driverLocation} destination={destination} />

      {/* Back Button Overlay */}
      <TouchableOpacity 
        onPress={() => router.back()}
        className="absolute top-14 left-6 w-12 h-12 bg-white rounded-full items-center justify-center shadow-md"
      >
        <ArrowLeft size={24} color="#111827" />
      </TouchableOpacity>

      {/* Bottom Sheet for tracking details */}
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View className="items-center mb-6">
            <Text className="text-gray-500 font-medium">Estimated Arrival</Text>
            <Text className="text-4xl font-bold text-gray-900">12:45 PM</Text>
            <Text className="text-primary font-bold mt-1">10 minutes away</Text>
          </View>

          {/* Progress Tracker */}
          <View className="mb-8">
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                <Text className="text-white text-xs">✓</Text>
              </View>
              <Text className="ml-3 font-medium text-gray-900">Order Confirmed</Text>
            </View>
            <View className="absolute left-4 top-8 w-0.5 h-6 bg-primary" />
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                <Text className="text-white text-xs">✓</Text>
              </View>
              <Text className="ml-3 font-medium text-gray-900">Driver Picked up Order</Text>
            </View>
            <View className="absolute left-4 top-20 w-0.5 h-6 bg-gray-200" />
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full border-2 border-primary bg-white items-center justify-center">
                <View className="w-3 h-3 rounded-full bg-primary" />
              </View>
              <Text className="ml-3 font-bold text-primary">Heading to you</Text>
            </View>
          </View>

          {/* Driver Info */}
          <View className="bg-gray-50 p-4 rounded-2xl flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-14 h-14 bg-gray-200 rounded-full mr-4 overflow-hidden">
                <Image source={{ uri: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=200&auto=format&fit=crop' }} className="w-full h-full" />
              </View>
              <View>
                <Text className="text-lg font-bold text-gray-900">Ibrahim S.</Text>
                <Text className="text-gray-500 text-sm">🛵 Honda TVS • AJA 432</Text>
              </View>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
                <MessageCircle size={20} color="#16a34a" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 bg-primary rounded-full items-center justify-center">
                <Phone size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 24,
  },
});
