import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import MovieComponent from "../components/movie-component";
import TopMoviesComponent from "../components/top-movies-component";
import FavoritesComponent from "../components/favorites-component";

const Mainpage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [movie, setMovie] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);
  const [top, setTop] = useState<boolean>(true);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const handlePrev = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  //handles the search function and reset page number on changing the search subject
  const handleClick = () => {
    setFavorite(false);
    if (search != movie) {
      setPage(1);
    } else {
      setPage(page);
    }
    setMovie(search);
    // setPage(page);
    setSearched(true);
    setTop(false);
  };

  const handleFavorites = () => {
    setFavorite(true);
    setSearched(false);
    setTop(false);
  };

  const handleTop = () => {
    setFavorite(false);
    setSearched(false);
    setTop(true);
  };

  return (
    <>
      <div className="h-full w-full">
        <h1 className="mb-4 text-center text-4xl font-bold text-green-900">
          Rotten Potatoes
        </h1>
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="block w-full rounded-lg bg-gray-800 py-2 pl-10 pr-3 text-white placeholder-gray-500 focus:bg-gray-700 focus:text-white focus:outline-none"
              placeholder="Search…"
              aria-label="search"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <Button
            variant="contained"
            disableElevation
            size="small"
            endIcon={<SearchIcon />}
            onClick={handleClick}
            className="px-2 py-1 text-sm"
          >
            Search
          </Button>
        </div>
        <br />
        <div className="flex justify-center">
          <div className="flex space-x-4">
            <Button
              variant="contained"
              disableElevation
              size="small"
              style={{ backgroundColor: "#AA6C39", color: "#fff" }}
              endIcon={<StarIcon />}
              onClick={handleTop}
              className="px-2 py-1 text-sm"
            >
              Top Movies
            </Button>

            <Button
              variant="contained"
              disableElevation
              size="small"
              style={{ backgroundColor: "#e91e63", color: "#fff" }}
              endIcon={<FavoriteIcon />}
              onClick={handleFavorites}
              className="px-2 py-1 text-sm"
            >
              Go to favorites
            </Button>
          </div>
        </div>

        <br></br>
      </div>
      <br></br>

      {favorite ? (
        <FavoritesComponent></FavoritesComponent>
      ) : searched ? (
        <MovieComponent param={movie} page={page}></MovieComponent>
      ) : top ? (
        <TopMoviesComponent></TopMoviesComponent>
      ) : null}

      {searched ? (
        <div className="flex justify-center space-x-2">
          <Button
            variant="outlined"
            onClick={handlePrev}
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": { borderColor: "grey" },
            }}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "grey.700",
              color: "white",
              "&:hover": { backgroundColor: "grey.600" },
            }}
          >
            Next
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default Mainpage;
