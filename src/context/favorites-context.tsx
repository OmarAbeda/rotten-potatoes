import { ReactNode, createContext, useState } from 'react';
import FavoriteInterface from '../interfaces/favorite-interface';

const FavoritesContext = createContext<FavoriteInterface | undefined>(
  undefined
);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (movie: string | undefined) => {
    if (movie === undefined) {
      throw new Error('useUserContext must be used with a DashboardContext');
    }
    setFavorites([...favorites, movie]);
  };

  const removeFavorite = (movie: string | undefined) => {
    if (movie === undefined) {
      throw new Error('useUserContext must be used with a DashboardContext');
    }
    setFavorites(favorites.filter((fav: string) => fav != movie));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
