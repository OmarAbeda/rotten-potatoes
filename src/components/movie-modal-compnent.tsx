import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardMedia, CardContent, Button } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import ModelInterface from '../interfaces/modal-interface';
import { getMovie } from '../api/api';
import MovieInfoInterface from '../interfaces/movie-info-interface';
import FavoritesContext from '../context/favorites-context';
import FavoriteInterface from '../interfaces/favorite-interface';

const style = {
  margin: 'auto',
  padding: '20px',
  height: 650,
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const MovieModalComponent: React.FC<ModelInterface> = ({
  imdbID,
  Favorited,
}) => {
  const [movie, setMovie] = useState<MovieInfoInterface>();
  const { addFavorite, removeFavorite } = useContext(
    FavoritesContext
  ) as FavoriteInterface;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovie(imdbID);
        setMovie(data);
      } catch (error) {
        throw new Error('Movie not found');
      }
    };
    fetchMovies();
  }, [imdbID]);

  return (
    <Box sx={style} overflow="scroll">
      <Typography gutterBottom variant="h5" component="div">
        {movie?.Title}
      </Typography>

      <CardContent>
        <CardMedia
          component="img"
          sx={{ height: 150, objectFit: 'contain' }}
          image={movie?.Poster}
          title={movie?.Title}
        />
        <br></br>
        <Typography variant="body2" color="text.secondary">
          Imdb Rating: {movie?.imdbRating} Metascore: {movie?.Metascore}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          Director: {movie?.Drirector} Writer: {movie?.Writer}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          Actors: {movie?.Actors}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          BoxOffice: {movie?.BoxOffice}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          Awards: {movie?.Awards}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          Summary: {movie?.Plot}
        </Typography>
      </CardContent>

      <br />
      <div>
        {Favorited ? (
          <Button
            variant="outlined"
            onClick={() => removeFavorite(movie?.Title)}
          >
            Remove From Favorites
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => addFavorite(movie?.Title)}>
            Add to Favorites
          </Button>
        )}
      </div>
    </Box>
  );
};

export default MovieModalComponent;
