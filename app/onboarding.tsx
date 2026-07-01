import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { Button } from '../src/components/ui/Button';

const slides = [
  {
    id: '1',
    title: 'Fresh from the Farm',
    description: 'Get fresh agricultural produce directly from rural farmers in Sierra Leone.',
  },
  {
    id: '2',
    title: 'Fair Prices for All',
    description: 'We ensure farmers get a fair share and buyers get the best prices.',
  },
  {
    id: '3',
    title: 'Fast & Reliable Delivery',
    description: 'Track your orders in real-time until they reach your doorstep.',
  }
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { width } = useWindowDimensions();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push('/(auth)/login');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-64 h-64 bg-green-100 rounded-full mb-10 items-center justify-center">
          <Text className="text-6xl">🌱</Text>
        </View>
        <Text className="text-3xl font-bold text-gray-900 text-center mb-4">
          {slides[currentSlide].title}
        </Text>
        <Text className="text-base text-gray-500 text-center mb-10">
          {slides[currentSlide].description}
        </Text>

        <View className="flex-row gap-2 mb-10">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full ${index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-gray-200'}`}
            />
          ))}
        </View>
      </View>

      <View className="p-6 pb-12">
        <Button
          title={currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          onPress={handleNext}
          size="lg"
        />
      </View>
    </View>
  );
}
