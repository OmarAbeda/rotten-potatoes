import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import MovieInterface from '../interfaces/movie-interface';
import { Button, Modal } from '@mui/material';
import { useState } from 'react';
import MovieModalComponent from './movie-modal-compnent';

const MovieCard: React.FC<MovieInterface> = ({
  Title,
  imdbID,
  Poster,
  Favorite,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card sx={{ width: 300, height: 370 }}>
      <CardMedia
        component="img"
        sx={{ height: 180, objectFit: 'contain' }}
        image={Poster}
        title={Title}
      />
      <CardContent>
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
            Favorited={Favorite}
          ></MovieModalComponent>
        </Modal>
      </div>
    </Card>
  );
};

export default MovieCard;
