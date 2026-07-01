import React from 'react';

// Bypassing Stripe on web to prevent Metro bundler native import errors
export const StripeProvider = ({ children }: any) => <>{children}</>;

export const useStripe = () => {
  return {
    initPaymentSheet: async () => {
      console.warn('Stripe is bypassed on web in this demo.');
      return { error: null };
    },
    presentPaymentSheet: async () => {
      return { error: null }; // Automatically simulate success for demo on web
    }
  };
};
