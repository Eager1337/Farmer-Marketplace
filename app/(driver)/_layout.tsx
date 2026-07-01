import { Stack } from 'expo-router';

export default function DriverLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Driver Dashboard', headerShown: false }} />
      <Stack.Screen name="deliveries" options={{ title: 'Deliveries', headerShown: false }} />
      <Stack.Screen name="earnings" options={{ title: 'Earnings', headerShown: false }} />
    </Stack>
  );
}
