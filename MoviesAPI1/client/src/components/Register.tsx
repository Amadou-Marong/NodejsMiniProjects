import React, { useState } from 'react';
import { Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { login } from '../store/slices/authSlice';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, name }));
    navigate('/');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1536440136628-849c177e76a1")',
      }}
    >
      <div className="min-h-screen bg-black/60 px-6">
        <header className="mx-auto max-w-7xl py-6">
          <div className="flex items-center gap-2">
            <Film className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold text-white">MovieStream</h1>
          </div>
        </header>

        <main className="mx-auto max-w-md py-16">
          <div className="rounded-lg bg-black/75 p-8">
            <h2 className="mb-8 text-3xl font-bold text-white">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded bg-gray-700 px-4 py-3 text-white placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded bg-gray-700 px-4 py-3 text-white placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded bg-gray-700 px-4 py-3 text-white placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded bg-red-600 py-3 font-semibold text-white transition-colors hover:bg-red-700"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-white hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}