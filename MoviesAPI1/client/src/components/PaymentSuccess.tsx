import React from 'react';
import { Film, CheckCircle } from 'lucide-react';

interface PaymentSuccessProps {
  onBackToHome: () => void;
}

export function PaymentSuccess({ onBackToHome }: PaymentSuccessProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 z-50 w-full border-b border-gray-800 bg-black/95 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <Film className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold text-white">MovieStream</h1>
          </div>
        </div>
      </header>

      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="mt-16 max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>
          <h2 className="mb-4 text-3xl font-bold">Payment Successful!</h2>
          <p className="mb-8 text-gray-400">
            Thank you for your purchase. Your movies are now available in your library.
          </p>
          <button
            onClick={onBackToHome}
            className="w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
}