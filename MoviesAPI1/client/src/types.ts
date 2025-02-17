export interface Movie {
  _id: string;
  name: string;
  description: string;
  duration: number;
  rating: number;
  totalRatings: number;
  releasedYear: number;
  releasedDate: string;
  genres: string[];
  directors: string[];
  coverImage: string;
  actors: string[];
  price: number;
  createdAt: string;
}

export interface CartItem {
  movieId: string;
  name: string;
  price: number;
  coverImage: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}