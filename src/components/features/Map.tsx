import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { MapPin } from 'lucide-react-native';

export function TrackingMap({ driverLocation, destination }: { driverLocation: any, destination: any }) {
  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      initialRegion={{
        latitude: 8.480,
        longitude: -13.234,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      }}
    >
      <Marker coordinate={driverLocation} title="Driver">
        <View style={{ backgroundColor: '#16a34a', padding: 8, borderRadius: 9999, borderWidth: 2, borderColor: '#ffffff' }}>
          <Text style={{ fontSize: 20 }}>🛵</Text>
        </View>
      </Marker>
      <Marker coordinate={destination} title="Destination">
        <View style={{ backgroundColor: '#a16207', padding: 8, borderRadius: 9999, borderWidth: 2, borderColor: '#ffffff' }}>
          <MapPin size={20} color="#fff" />
        </View>
      </Marker>
      <Polyline
        coordinates={[driverLocation, { latitude: 8.480, longitude: -13.235 }, destination]}
        strokeColor="#16a34a"
        strokeWidth={4}
      />
    </MapView>
  );
}
