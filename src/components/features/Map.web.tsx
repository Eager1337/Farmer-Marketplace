import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin } from 'lucide-react-native';

export function TrackingMap({ driverLocation, destination }: { driverLocation: any, destination: any }) {
  return (
    <View style={StyleSheet.absoluteFillObject} className="bg-green-50 items-center justify-center">
      <MapPin size={48} color="#16a34a" />
      <Text className="mt-4 text-gray-500 font-medium">Map view is only available on mobile devices.</Text>
    </View>
  );
}
