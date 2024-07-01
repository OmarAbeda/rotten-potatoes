import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import MovieComponent from '../components/movie-component';
import TopMoviesComponent from '../components/top-movies-component';
import FavoritesComponent from '../components/favorites-component';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  //backgroundColor: alpha(theme.palette.common.black, 0.15),
  backgroundColor: alpha(theme.palette.common.black, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Mainpage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [movie, setMovie] = useState<string>('');
  const [searched, setSearched] = useState<boolean>(false);
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
  };

  const handleFavorites = () => {
    setFavorite(true);
    setSearched(false);
  };

  return (
    <>
      <div>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={search}
            onChange={handleSearch}
          />
        </Search>

        <br></br>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            disableElevation
            size="large"
            endIcon={<SearchIcon />}
            onClick={handleClick}
          >
            Search
          </Button>
          <Button
            variant="contained"
            disableElevation
            size="large"
            color="error"
            onClick={handleFavorites}
          >
            Go to favorites
          </Button>
        </div>
      </div>
      <br></br>

      {favorite ? (
        <FavoritesComponent></FavoritesComponent>
      ) : searched ? (
        <MovieComponent param={movie} page={page}></MovieComponent>
      ) : (
        <TopMoviesComponent></TopMoviesComponent>
      )}

      <Button variant="outlined" onClick={handlePrev}>
        Prev
      </Button>
      <Button variant="contained" onClick={handleNext}>
        Next
      </Button>
    </>
  );
};

export default Mainpage;
