import React from 'react';
import { Star, Clock, Calendar, ShoppingCart, Play, Plus, Info } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onAddToCart: () => void;
}

export function MovieCard({ movie, onAddToCart }: MovieCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg transition-all hover:scale-105 hover:z-10">
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img
          src={movie.coverImage}
          alt={movie.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-xl font-bold">{movie.name}</h3>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            {movie.genres.map((genre) => (
              <span key={genre} className="rounded-full bg-gray-800 px-2 py-0.5 text-xs">
                {genre}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>{movie.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{movie.duration}m</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{movie.releasedYear}</span>
            </div>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-gray-300">{movie.description}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-gray-200">
              <Play className="h-4 w-4 fill-current" /> Play
            </button>
            <button className="flex items-center justify-center gap-1 rounded-full bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700">
              <Plus className="h-4 w-4" /> List
            </button>
            <button
              onClick={onAddToCart}
              className="col-span-2 flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold transition-colors hover:bg-red-700"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}