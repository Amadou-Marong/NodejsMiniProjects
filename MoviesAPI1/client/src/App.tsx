import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Film, ShoppingCart, Play, Plus, Search, Bell, ChevronDown } from 'lucide-react';
import { MovieCard } from './components/MovieCard';
import { GenreFilter } from './components/GenreFilter';
import { Movie } from './types';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { PaymentSuccess } from './components/PaymentSuccess';
import { PrivateRoute } from './routes/PrivateRoute';
import { useAppSelector } from './hooks/useAppSelector';
import { useAppDispatch } from './hooks/useAppDispatch';
import { addToCart, removeFromCart, clearCart } from './store/slices/cartSlice';
import { logout } from './store/slices/authSlice';

// Sample data with curated Unsplash images
const moviesData: Movie[] = [
  {
    "_id": "67ad1a47f4e231c10c020f97",
    "name": "Inception",
    "description": "A thief who enters the dreams of others to steal secrets from their subconscious.",
    "duration": 148,
    "rating": 4.8,
    "totalRatings": 22000,
    "releasedYear": 2010,
    "releasedDate": "2010-07-16T00:00:00.000Z",
    "genres": ["Sci-Fi", "Action", "Thriller"],
    "directors": ["Christopher Nolan"],
    "coverImage": "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d",
    "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    "price": 12.99,
    "createdAt": "2025-02-12T22:01:43.147Z"
  },
  {
    "_id": "67a3f3736f897e94a515b01f",
    "name": "Interstellar",
    "description": "A team of explorers travel through a wormhole in space in an attempt to save humanity.",
    "duration": 169,
    "rating": 4.7,
    "totalRatings": 19000,
    "releasedYear": 2014,
    "releasedDate": "2014-11-07T00:00:00.000Z",
    "genres": ["Sci-Fi", "Adventure", "Drama"],
    "directors": ["Christopher Nolan"],
    "coverImage": "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a",
    "actors": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    "price": 13.99,
    "createdAt": "2025-02-05T23:25:39.661Z"
  },
  {
    "_id": "67a3f3736f897e94a515b01e",
    "name": "The Dark Knight",
    "description": "Batman faces his greatest challenge as the Joker wreaks havoc on Gotham City.",
    "duration": 152,
    "rating": 4.9,
    "totalRatings": 25000,
    "releasedYear": 2008,
    "releasedDate": "2008-07-18T00:00:00.000Z",
    "genres": ["Action", "Crime", "Drama"],
    "directors": ["Christopher Nolan"],
    "coverImage": "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
    "actors": ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    "price": 11.99,
    "createdAt": "2025-02-05T23:25:39.661Z"
  },
  {
    "_id": "67a3f3736f897e94a515b01d",
    "name": "Avatar",
    "description": "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    "duration": 162,
    "rating": 4.7,
    "totalRatings": 28000,
    "releasedYear": 2009,
    "releasedDate": "2009-12-18T00:00:00.000Z",
    "genres": ["Action", "Adventure", "Fantasy"],
    "directors": ["James Cameron"],
    "coverImage": "https://images.unsplash.com/photo-1534447677768-be436bb09401",
    "actors": ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    "price": 14.99,
    "createdAt": "2025-02-05T23:25:39.660Z"
  },
  {
    "_id": "67a3f3736f897e94a515b01c",
    "name": "The Matrix",
    "description": "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
    "duration": 136,
    "rating": 4.8,
    "totalRatings": 24000,
    "releasedYear": 1999,
    "releasedDate": "1999-03-31T00:00:00.000Z",
    "genres": ["Action", "Sci-Fi"],
    "directors": ["Lana Wachowski", "Lilly Wachowski"],
    "coverImage": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    "actors": ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    "price": 10.99,
    "createdAt": "2025-02-05T23:25:39.660Z"
  }
];

function Layout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const { items } = useAppSelector(state => state.cart);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 20;
      setIsHeaderTransparent(isTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsProfileOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header 
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          isHeaderTransparent ? 'bg-gradient-to-b from-black/80 to-transparent' : 'bg-black/95 shadow-lg'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link 
                to="/"
                className="flex items-center gap-2 transition-transform hover:scale-105"
              >
                <Film className="h-8 w-8 text-red-600" />
                <h1 className="text-2xl font-bold text-white">MovieStream</h1>
              </Link>
              <nav className="hidden space-x-6 text-sm font-medium md:flex">
                <Link to="/" className="text-white hover:text-red-500">Home</Link>
                <Link to="/movies" className="text-gray-300 hover:text-white">Movies</Link>
                <Link to="/tv-shows" className="text-gray-300 hover:text-white">TV Shows</Link>
                <Link to="/my-list" className="text-gray-300 hover:text-white">My List</Link>
              </nav>
            </div>
            <div className="flex items-center gap-6">
              <button className="hidden text-gray-300 hover:text-white md:block">
                <Search className="h-5 w-5" />
              </button>
              <button className="hidden text-gray-300 hover:text-white md:block">
                <Bell className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="relative rounded-full p-2 text-gray-300 hover:text-white"
              >
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold">
                    {items.length}
                  </span>
                )}
              </button>
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 rounded-full hover:bg-gray-800/50"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md bg-black/95 py-2 shadow-xl ring-1 ring-gray-800">
                      <div className="px-4 py-2">
                        <p className="text-sm font-medium text-white">{user?.name}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>
                      <div className="border-t border-gray-800">
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            navigate('/profile');
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="rounded-full bg-red-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route
          path="/my-list"
          element={
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment-success"
          element={
            <PrivateRoute>
              <PaymentSuccess onBackToHome={() => navigate('/')} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

function Home() {
  const [selectedGenre, setSelectedGenre] = React.useState('All');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const filteredMovies = selectedGenre === 'All'
    ? moviesData
    : moviesData.filter(movie => movie.genres.includes(selectedGenre));

  const handleAddToCart = (movie: Movie) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    dispatch(addToCart({
      movieId: movie._id,
      name: movie.name,
      price: movie.price,
      coverImage: movie.coverImage
    }));
  };

  return (
    <>
      <div className="relative min-h-screen w-full">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0"
            alt="Featured Movie"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 md:p-16">
          <h1 className="mb-4 text-5xl font-bold md:text-7xl">Inception</h1>
          <p className="mb-6 max-w-xl text-lg text-gray-300">
            A thief who enters the dreams of others to steal secrets from their subconscious.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-black transition-colors hover:bg-gray-200">
              <Play className="h-5 w-5 fill-current" /> Play
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-gray-600/80 px-8 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-gray-500/80">
              <Plus className="h-5 w-5" /> My List
            </button>
          </div>
        </div>
      </div>

      <main className="relative z-10 -mt-32 bg-gradient-to-b from-transparent to-black">
        <div className="mx-auto max-w-7xl px-6 pt-32">
          <h2 className="mb-6 text-3xl font-bold text-white">Popular Movies</h2>
          <GenreFilter
            movies={moviesData}
            selectedGenre={selectedGenre}
            onGenreSelect={setSelectedGenre}
          />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredMovies.map((movie) => (
              <MovieCard 
                key={movie._id} 
                movie={movie} 
                onAddToCart={() => handleAddToCart(movie)}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

function Movies() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-8 text-3xl font-bold">Movies</h1>
        <p className="text-gray-400">Coming soon...</p>
      </div>
    </div>
  );
}

function TVShows() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-8 text-3xl font-bold">TV Shows</h1>
        <p className="text-gray-400">Coming soon...</p>
      </div>
    </div>
  );
}

function MyList() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-8 text-3xl font-bold">My List</h1>
        <p className="text-gray-400">Your list is empty</p>
      </div>
    </div>
  );
}

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector(state => state.cart);

  return (
    <div className="mx-auto max-w-2xl px-4 pt-24">
      <h2 className="mb-8 text-3xl font-bold">Your Cart</h2>
      <Cart
        items={items}
        total={total}
        onRemoveItem={(movieId) => dispatch(removeFromCart(movieId))}
        onCheckout={() => navigate('/checkout')}
      />
    </div>
  );
}

function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);

  const handleCheckoutComplete = () => {
    dispatch(clearCart());
    navigate('/payment-success');
  };

  return (
    <div className="pt-24">
      <Checkout
        cart={cart}
        onBack={() => navigate('/cart')}
        onComplete={handleCheckoutComplete}
      />
    </div>
  );
}

function App() {
  return <Layout />;
}

export default App;