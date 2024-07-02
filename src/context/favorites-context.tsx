import { ReactNode, createContext, useState } from "react";
import FavoriteInterface from "../interfaces/favorite-interface";

const FavoritesContext = createContext<FavoriteInterface | undefined>(
  undefined,
);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (movie: string | undefined) => {
    if (movie === undefined) {
      throw new Error("useUserContext must be used with a DashboardContext");
    }
    setFavorites([...favorites, movie]);
  };

  const removeFavorite = (movie: string | undefined) => {
    if (movie === undefined) {
      throw new Error("useUserContext must be used with a DashboardContext");
    }
    setFavorites(favorites.filter((fav: string) => fav != movie));
  };

  const checkFavorite = (movie: string | undefined) => {
    if (movie === undefined) {
      throw new Error("movie must be defined");
    }
    return favorites.includes(movie);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, checkFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
