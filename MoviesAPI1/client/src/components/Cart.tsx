import React from 'react';
import { X } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  total: number;
  onRemoveItem: (movieId: string) => void;
  onCheckout: () => void;
}

export function Cart({ items, total, onRemoveItem, onCheckout }: CartProps) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <p className="text-lg text-gray-400">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.movieId} className="flex items-center gap-4 rounded-lg bg-gray-800 p-4">
          <img
            src={item.coverImage}
            alt={item.name}
            className="h-20 w-16 rounded object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-white">{item.name}</h3>
            <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
          </div>
          <button
            onClick={() => onRemoveItem(item.movieId)}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ))}
      <div className="mt-6 space-y-4 border-t border-gray-800 pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}