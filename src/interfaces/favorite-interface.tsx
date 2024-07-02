export default interface FavoriteInterface {
  favorites: string[];
  addFavorite: (movie: string | undefined) => void;
  removeFavorite: (movie: string | undefined) => void;
  checkFavorite: (movie: string | undefined) => boolean;
}
