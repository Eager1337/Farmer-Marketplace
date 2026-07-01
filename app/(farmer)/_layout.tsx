import { Stack, Redirect } from 'expo-router';
import { useAuthStore } from '../../src/store/useAuthStore';

export default function FarmerLayout() {
  const user = useAuthStore(state => state.user);

  if (user?.role !== 'farmer') {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Farmer Dashboard', headerShown: false }} />
      <Stack.Screen name="orders" options={{ title: 'All Orders' }} />
    </Stack>
  );
}
