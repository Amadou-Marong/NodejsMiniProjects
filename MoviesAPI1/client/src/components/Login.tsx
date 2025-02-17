import React, { useState } from 'react';
import { Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { login } from '../store/slices/authSlice';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, name: email.split('@')[0] }));
    navigate('/');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1574267432553-4b4628081c31")',
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
            <h2 className="mb-8 text-3xl font-bold text-white">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                Sign In
              </button>
            </form>
            <p className="mt-4 text-gray-400">
              New to MovieStream?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-white hover:underline"
              >
                Sign up now
              </button>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}