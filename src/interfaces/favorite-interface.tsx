export default interface FavoriteInterface {
  favorites: string | undefined[];
  addFavorite: (movie: string | undefined) => void;
  removeFavorite: (movie: string | undefined) => void;
}
