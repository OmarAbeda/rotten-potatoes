import axios from 'axios';
import MovieInterface from '../interfaces/movie-interface';
import MovieInfoInterface from '../interfaces/movie-info-interface';

const url = 'https://www.omdbapi.com/?apikey=2bce1bb6';

const movie_titles = [
  'The Shawshank Redemption',
  'The Godfather',
  'The Dark Knight',
  'The Godfather: Part II',
  '12 Angry Men',
  "Schindler's List",
  'Pulp Fiction',
  'The Lord of the Rings: The Return of the King',
  'The Good, the Bad and the Ugly',
  'Fight Club',
];

//omdbapi only allows 10 movies at a time, so an api call has to be called with every page change,
export async function getMovies(
  movie: string,
  page: number
): Promise<MovieInterface[]> {
  try {
    const response = await axios.get(`${url}&s=${movie}&page=${page}`);
    return response.data.Search;
  } catch (error) {
    throw new Error('Movie not found');
  }
}

export async function getMovie(id: string): Promise<MovieInfoInterface> {
  try {
    const response = await axios.get(`${url}&i=${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Movie not found');
  }
}

export async function getTopRated() {
  const movies = [];

  for (let i = 0; i < movie_titles.length; i++) {
    try {
      const response = await axios.get(`${url}&t=${movie_titles[i]}`);
      movies.push(response.data);
    } catch (error) {
      throw new Error('Movie not found');
    }
  }

  return movies;
}

export async function getFavorites(favorites: string[] | undefined[]) {
  const movies = [];

  for (let i = 0; i < favorites.length; i++) {
    try {
      const response = await axios.get(`${url}&t=${favorites[i]}`);
      movies.push(response.data);
    } catch (error) {
      throw new Error('Movie not found');
    }
  }

  return movies;
}

//this gets all results but it can be too slow and can make up to 50 calls depending the search subject
// export default async function getMovies(movie: string): Promise<Movie[]> {
//   let more = true;
//   let page = 1;
//   const movies: Movie[] = [];

//   while (more) {
//     try {
//       const response = await axios.get(`${url}&s=${movie}&page=${page}`);
//       if (response.data.Search) {
//         movies.push(...response.data.Search);
//         page++;
//       } else {
//         more = false;
//       }
//     } catch (error) {
//       more = false;
//       console.error("Failed to fetch movie", error);
//     }
//   }

//   return movies;
// }
