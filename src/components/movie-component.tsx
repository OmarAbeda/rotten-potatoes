/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { getMovies } from "../api/api";
import SearchParameter from "../interfaces/search-paramater-interface";
import Movie from "../interfaces/movie-interface";
import MovieCard from "./movie-card-component";
import { Grid } from "@mui/material";

const MovieComponent: React.FC<SearchParameter> = ({ param, page }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies(param, page);
        setMovies(data);
      } catch (error) {
        throw new Error("Movie not found");
      }
    };
    fetchMovies();
  }, [page, param]);

  return (
    <>
      <Grid container justifyContent="center" spacing={2} sx={{ padding: 2 }}>
        {movies.map((movie) => (
          <Grid
            key={movie.imdbID}
            item
            xs={12}
            sm={6}
            md={4}
            style={{ display: "flex" }}
          >
            <MovieCard
              Title={movie.Title}
              Year={movie.Year}
              imdbID={movie.imdbID}
              Type={movie.Type}
              Poster={movie.Poster}
              Page={page}
              Favorite={false}
            />
          </Grid>
        ))}
      </Grid>
      <br></br>
    </>
  );
};

export default MovieComponent;
