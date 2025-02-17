import React from 'react';
import { Movie } from '../types';

interface GenreFilterProps {
  movies: Movie[];
  selectedGenre: string;
  onGenreSelect: (genre: string) => void;
}

export function GenreFilter({ movies, selectedGenre, onGenreSelect }: GenreFilterProps) {
  const allGenres = Array.from(
    new Set(movies.flatMap((movie) => movie.genres))
  ).sort();

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600">
      <button
        onClick={() => onGenreSelect('All')}
        className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
          selectedGenre === 'All'
            ? 'bg-red-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        All
      </button>
      {allGenres.map((genre) => (
        <button
          key={genre}
          onClick={() => onGenreSelect(genre)}
          className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition-colors ${
            selectedGenre === genre
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}