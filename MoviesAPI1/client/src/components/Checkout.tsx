import React, { useState } from 'react';
import { Cart } from '../types';

interface CheckoutProps {
  cart: Cart;
  onBack: () => void;
  onComplete: () => void;
}

export function Checkout({ cart, onBack, onComplete }: CheckoutProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(onComplete, 1500);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 space-y-4">
        <h2 className="text-3xl font-bold">Checkout</h2>
        <div className="rounded-lg bg-gray-800 p-4">
          <h3 className="mb-4 font-semibold">Order Summary</h3>
          {cart.items.map((item) => (
            <div key={item.movieId} className="mb-2 flex justify-between text-sm">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-4 border-t border-gray-700 pt-4 text-lg font-semibold">
            <div className="flex justify-between">
              <span>Total</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full rounded-lg bg-gray-800 px-4 py-2.5 text-white"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full rounded-lg bg-gray-800 px-4 py-2.5 text-white"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="card" className="mb-2 block text-sm font-medium">
            Card Number
          </label>
          <input
            type="text"
            id="card"
            required
            maxLength={19}
            placeholder="0000 0000 0000 0000"
            className="w-full rounded-lg bg-gray-800 px-4 py-2.5 text-white"
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiry" className="mb-2 block text-sm font-medium">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiry"
              required
              placeholder="MM/YY"
              maxLength={5}
              className="w-full rounded-lg bg-gray-800 px-4 py-2.5 text-white"
              value={formData.expiry}
              onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="cvv" className="mb-2 block text-sm font-medium">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              required
              maxLength={3}
              placeholder="000"
              className="w-full rounded-lg bg-gray-800 px-4 py-2.5 text-white"
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-lg bg-gray-800 py-3 font-semibold text-white transition-colors hover:bg-gray-700"
          >
            Back to Cart
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            Complete Purchase
          </button>
        </div>
      </form>
    </div>
  );
}