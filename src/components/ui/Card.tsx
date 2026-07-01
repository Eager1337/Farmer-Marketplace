import React from 'react';
import { View, ViewProps } from 'react-native';

export function Card({ className = '', children, ...props }: ViewProps) {
  return (
    <View
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
