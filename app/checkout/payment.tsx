import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { useCartStore } from '../../src/store/useCartStore';
import { Check, CreditCard } from 'lucide-react-native';
import { useStripe } from '../../src/components/StripeWrapper';

const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', color: '#3b82f6', icon: CreditCard },
  { id: 'orange', name: 'Orange Money', color: '#ff7900' },
  { id: 'afrimoney', name: 'Afrimoney', color: '#e3000f' },
  { id: 'cash', name: 'Cash on Delivery', color: '#16a34a' }
];

export default function PaymentScreen() {
  const router = useRouter();
  const clearCart = useCartStore(state => state.clearCart);
  const getTotal = useCartStore(state => state.getTotal);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [phone, setPhone] = useState('');
  
  // Card Details State
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const [loading, setLoading] = useState(false);
  
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const total = getTotal() + 15000;

  const handleCardPayment = async () => {
    try {
      // In a real app, you would fetch this from your Supabase backend
      // const response = await fetch('YOUR_SUPABASE_EDGE_FUNCTION_URL', { method: 'POST' });
      // const { clientSecret } = await response.json();
      const dummyClientSecret = 'pi_test_123_secret_456'; 

      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'StoreSalone',
        paymentIntentClientSecret: dummyClientSecret,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });

      if (initError) {
        // Fallback for demonstration since we don't have a real client secret
        console.log('Stripe init error (expected without real backend):', initError);
        simulatePaymentSuccess();
        return;
      }

      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        Alert.alert(`Error code: ${presentError.code}`, presentError.message);
        setLoading(false);
      } else {
        simulatePaymentSuccess();
      }
    } catch (e) {
      console.log(e);
      simulatePaymentSuccess();
    }
  };

  const simulatePaymentSuccess = () => {
    setTimeout(() => {
      setLoading(false);
      clearCart();
      router.push('/checkout/success');
    }, 1500);
  };

  const handlePay = () => {
    setLoading(true);
    // Even though they filled the manual form, we can still simulate success
    // or trigger Stripe if that's what's needed. Since they want a manual form,
    // we'll simulate the processing directly.
    if (selectedMethod === 'card') {
      // Simulate verifying card details
      setTimeout(() => {
        simulatePaymentSuccess();
      }, 1500);
    } else {
      simulatePaymentSuccess();
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-6">
        <Text className="text-xl font-bold text-gray-900 mb-4">Select Payment Method</Text>
        
        {PAYMENT_METHODS.map((method) => (
          <TouchableOpacity
            key={method.id}
            onPress={() => !loading && setSelectedMethod(method.id)}
            disabled={loading}
            className={`flex-row items-center justify-between p-4 bg-white rounded-2xl mb-4 border-2 ${
              selectedMethod === method.id ? 'border-primary bg-green-50 shadow-md shadow-primary/20' : 'border-transparent shadow-sm'
            }`}
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-full items-center justify-center mr-4" style={{ backgroundColor: method.color }}>
                {method.icon ? <method.icon size={24} color="#fff" /> : <Text className="text-white font-bold text-lg">{method.name[0]}</Text>}
              </View>
              <Text className="font-bold text-gray-900 text-lg">{method.name}</Text>
            </View>
            {selectedMethod === method.id && (
              <View className="w-6 h-6 bg-primary rounded-full items-center justify-center">
                <Check size={14} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        ))}

        {(selectedMethod === 'orange' || selectedMethod === 'afrimoney') && (
          <View className="bg-white p-5 rounded-2xl mt-2 shadow-sm border border-gray-100">
            <Text className="font-bold text-gray-900 mb-3 text-lg">Mobile Money Number</Text>
            <Input 
              placeholder={`Enter your ${selectedMethod === 'orange' ? 'Orange' : 'Afrimoney'} number`}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
              editable={!loading}
            />
            <Text className="text-xs text-gray-500 mt-2">A prompt will be sent to your phone to authorize the payment.</Text>
          </View>
        )}

        {selectedMethod === 'card' && (
          <View className="bg-white p-5 rounded-2xl mt-2 shadow-sm border border-gray-100">
            <Text className="font-bold text-gray-900 mb-4 text-lg">Card Details</Text>
            
            <View className="mb-3">
              <Input 
                placeholder="Card Number (0000 0000 0000 0000)"
                keyboardType="number-pad"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(text.replace(/[^0-9 ]/g, ''))}
                editable={!loading}
                maxLength={19}
              />
            </View>
            
            <View className="flex-row mb-3">
              <View className="flex-1 mr-2">
                <Input 
                  placeholder="MM/YY"
                  keyboardType="number-pad"
                  value={expiry}
                  onChangeText={(text) => setExpiry(text.replace(/[^0-9\/]/g, ''))}
                  editable={!loading}
                  maxLength={5}
                />
              </View>
              <View className="flex-1 ml-2">
                <Input 
                  placeholder="CVV"
                  keyboardType="number-pad"
                  value={cvv}
                  onChangeText={(text) => setCvv(text.replace(/[^0-9]/g, ''))}
                  editable={!loading}
                  maxLength={4}
                />
              </View>
            </View>

            <View>
              <Input 
                placeholder="Cardholder Name"
                value={cardName}
                onChangeText={(text) => setCardName(text.replace(/[^a-zA-Z\s]/g, ''))}
                editable={!loading}
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View className="bg-white p-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-gray-100">
        <View className="flex-row justify-between items-end mb-6">
          <View>
            <Text className="text-gray-500 text-sm mb-1">Total to Pay</Text>
            <Text className="text-3xl font-black text-earth">Le {total.toLocaleString()}</Text>
          </View>
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-700 font-bold text-xs">Fees Included</Text>
          </View>
        </View>
        <Button 
          title={selectedMethod === 'cash' ? "Place Order" : `Pay Le ${total.toLocaleString()}`}
          onPress={handlePay} 
          size="lg"
          isLoading={loading}
          disabled={
            loading || 
            ((selectedMethod === 'orange' || selectedMethod === 'afrimoney') && phone.length < 8) ||
            (selectedMethod === 'card' && (cardNumber.length < 15 || expiry.length < 4 || cvv.length < 3 || cardName.length < 3))
          }
        />
      </View>

      {/* Loading Overlay */}
      {loading && (
        <View className="absolute inset-0 bg-black/40 items-center justify-center z-50">
          <View className="bg-white p-8 rounded-3xl items-center shadow-2xl">
            <ActivityIndicator size="large" color="#16a34a" className="mb-4" />
            <Text className="text-xl font-bold text-gray-900 mb-2">Processing Payment</Text>
            <Text className="text-gray-500 text-center px-4">Please do not close the app while we secure your transaction...</Text>
          </View>
        </View>
      )}
    </View>
  );
}
