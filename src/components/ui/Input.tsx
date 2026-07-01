import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: InputProps) {
  return (
    <View className={`mb-4 ${className}`}>
      {label && <Text className="text-sm font-medium text-gray-700 mb-1 ml-1">{label}</Text>}
      <View
        className={`flex-row items-center border rounded-xl px-3 h-12 bg-gray-50
          ${error ? 'border-red-500' : 'border-gray-200'}
        `}
      >
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        <TextInput
          className="flex-1 h-full text-base text-gray-900"
          placeholderTextColor="#9ca3af"
          {...props}
        />
        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>
      {error && <Text className="text-xs text-red-500 mt-1 ml-1">{error}</Text>}
    </View>
  );
}
