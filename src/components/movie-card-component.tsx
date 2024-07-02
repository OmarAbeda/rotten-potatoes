import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MovieInterface from "../interfaces/movie-interface";
import { Button, Modal } from "@mui/material";
import { useContext, useState } from "react";
import MovieModalComponent from "./movie-modal-compnent";
import FavoriteInterface from "../interfaces/favorite-interface";
import FavoritesContext from "../context/favorites-context";

const MovieCard: React.FC<MovieInterface> = ({ Title, imdbID, Poster }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { checkFavorite } = useContext(FavoritesContext) as FavoriteInterface;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{
        width: 300,
        minWidth: 200,
        height: 370,
        bgcolor: "grey.800",
        borderRadius: "16px",
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: 180, objectFit: "contain" }}
        image={Poster}
        title={Title}
      />
      <CardContent sx={{ color: "white" }}>
        <Typography gutterBottom variant="h5" component="div">
          {Title}
        </Typography>
      </CardContent>
      <div>
        <Button variant="outlined" onClick={handleOpen}>
          Open
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MovieModalComponent
            imdbID={imdbID}
            Favorited={checkFavorite(Title)}
          ></MovieModalComponent>
        </Modal>
      </div>
    </Card>
  );
};

export default MovieCard;
