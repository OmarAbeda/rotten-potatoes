import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearIcon from "@mui/icons-material/Clear";
import { CardMedia, CardContent, Button, Snackbar } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import ModelInterface from "../interfaces/modal-interface";
import { getMovie } from "../api/api";
import MovieInfoInterface from "../interfaces/movie-info-interface";
import FavoritesContext from "../context/favorites-context";
import FavoriteInterface from "../interfaces/favorite-interface";

// const style = {
//   margin: "auto",
//   padding: "16px",
//   maxHeight: "90vh",
//   width: 800,
//   backgroundColor: "grey.800",
//   color: "white",
//   borderRadius: "16px",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
// };

const MovieModalComponent: React.FC<ModelInterface> = ({
  imdbID,
  Favorited,
}) => {
  const [movie, setMovie] = useState<MovieInfoInterface>();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarColor, setSnackbarColor] = useState<string>("#43a047");
  const { addFavorite, removeFavorite } = useContext(
    FavoritesContext,
  ) as FavoriteInterface;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovie(imdbID);
        setMovie(data);
      } catch (error) {
        throw new Error("Movie not found");
      }
    };
    fetchMovies();
  }, [imdbID]);

  const handleAddFavorite = (title: string | undefined) => {
    addFavorite(title);
    setSnackbarMessage(`Added "${title}" to Favorites`);
    setSnackbarColor("#43a047");
    setSnackbarOpen(true);
  };

  const handleRemoveFavorite = (title: string | undefined) => {
    removeFavorite(title);
    setSnackbarMessage(`Removed "${title}" From Favorites`);
    setSnackbarColor("#880808");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      className="bg-gray-800 bg-opacity-80" // Use Tailwind's opacity utilities
      sx={{
        margin: "auto",
        padding: "16px",
        maxHeight: "90vh",
        width: 800,
        color: "white",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography gutterBottom variant="h5" component="div">
        {movie?.Title}
      </Typography>

      <CardContent sx={{ color: "white" }}>
        <CardMedia
          component="img"
          sx={{ height: 150, objectFit: "contain" }}
          image={movie?.Poster}
          title={movie?.Title}
        />
        <br></br>
        <Typography variant="body2">
          Imdb Rating: {movie?.imdbRating} Metascore: {movie?.Metascore}
        </Typography>
        <br />
        <Typography variant="body2">
          Director: {movie?.Director} Writer: {movie?.Writer}
        </Typography>
        <br />
        <Typography variant="body2">Actors: {movie?.Actors}</Typography>
        <br />
        <Typography variant="body2">BoxOffice: {movie?.BoxOffice}</Typography>
        <br />
        <Typography variant="body2">Awards: {movie?.Awards}</Typography>
        <br />
        <Typography variant="body2">Summary: {movie?.Plot}</Typography>
      </CardContent>

      <br />
      <div>
        {Favorited ? (
          <Button
            variant="contained"
            disableElevation
            size="small"
            style={{ backgroundColor: "#880808", color: "#fff" }}
            endIcon={<ClearIcon />}
            className="px-2 py-1 text-sm"
            onClick={() => handleRemoveFavorite(movie?.Title)}
          >
            Remove From Favorites
          </Button>
        ) : (
          <Button
            onClick={() => handleAddFavorite(movie?.Title)}
            variant="contained"
            disableElevation
            size="small"
            style={{ backgroundColor: "#e91e63", color: "#fff" }}
            endIcon={<FavoriteIcon />}
            className="px-2 py-1 text-sm"
          >
            Add To Favorites
          </Button>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        ContentProps={{
          style: {
            backgroundColor: snackbarColor,
            color: "white",
            textAlign: "center",
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
};

export default MovieModalComponent;
