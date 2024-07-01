/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import Movie from '../interfaces/movie-interface';
import MovieCard from './movie-card-component';
import { Grid } from '@mui/material';
import FavoritesContext from '../context/favorites-context';
import FavoriteInterface from '../interfaces/favorite-interface';
import { getFavorites } from '../api/api';

const FavoritesComponent: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { favorites } = useContext(FavoritesContext) as FavoriteInterface;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getFavorites(favorites);
        setMovies(data);
      } catch (error) {
        throw new Error('Movie not found');
      }
    };
    fetchMovies();
  }, [favorites]);

  return (
    <>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {movies.map((movie) => (
            <Grid key={movie.imdbID} item md={4}>
              <MovieCard
                Title={movie.Title}
                Year={movie.Year}
                imdbID={movie.imdbID}
                Type={movie.Type}
                Poster={movie.Poster}
                Page={0}
                Favorite={true}
              ></MovieCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <br></br>
    </>
  );
};

export default FavoritesComponent;
