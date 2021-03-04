import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme=>({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 170,
    justifyContent: "space-between",
    border: "solid white 5px"
  },
  link: {
    textDecoration: "none",
    color: "black"
  },
  titleCont: {
    margin: 0,
    padding: 0,
    marginLeft: 6,
    marginRight: 6,
  },
  title: {
      fontWeight: "bold"
  },
  subCont:{
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "100%",
    marginLeft: 6,
    marginRight: 6,    
  },
  fav: {
      padding: "0"
  }
}));

export default function ImgMediaCard({movie}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to={`/movies/${movie.imdbID}`} className={classes.link}>
        <CardActionArea>
        <CardMedia
            component="img"
            alt={movie.Title}
            height="250"
            image={movie.Poster}
            title={movie.Title}
          /> 
          <CardContent className={classes.titleCont}>
            <Typography variant="body1" gutterBottom={false} className={classes.title} noWrap={true}>
              {movie.Title}
            </Typography>
            
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className={classes.subCont}>
      <Typography variant="body2" color="textSecondary" component="p">
            {movie.Year}
          </Typography>
          
            <Checkbox className={classes.fav} icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" size="small"/>
           

      </CardActions>
    </Card>
  );
}


