import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {addToFavorites, removeFromFavorites} from '../state/user'
import {setModal} from '../state/modal'
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles(theme=>({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 170,
    justifyContent: "space-between",
    border: "solid white 5px",
    '&:hover': {
      boxShadow: theme.shadows[8]
    }
  },
  link: {
    textDecoration: "none",
    color: "black",
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
      padding: "0",
  },
  icon: {
    fontSize: 18,
    heigth: "auto",
    maxWidth: 80
  }
}));

export default function ImgMediaCard({movie, fav = false}) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [isFav, setIsFav] = useState(fav)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.id)

  const handleFav = (e) => {
    e.preventDefault()

    if(!isFav){
      dispatch(addToFavorites(movie.imdbID))
      .then((data)=>{
        if(data.payload.id) {
          setIsFav(true)
          enqueueSnackbar(`${movie.Title} was added to your favorites`, { variant: 'success', });
        }
      })
      .catch(err=>{ 
        dispatch(setModal({open: true, content: "login"}))
        enqueueSnackbar('Please sign in to continue!')
        console.log("ERROR!!!",err)
      })
    } else {
      dispatch(removeFromFavorites(movie.imdbID))
      .then((data)=>{
        if(data.payload.id) {
          setIsFav(false)
          enqueueSnackbar(`${movie.Title} was removed from your favorites`, { variant: 'success', });
        }
      })
      .catch(err=>{ 
        dispatch(setModal({open: true, content: "login"}))
        enqueueSnackbar('Please sign in to continue!')
        console.log("ERROR!!!",err)
      })
    }
  }

  let tooltipLabel = user? "Mark as favorite" : "Log in to mark as favorite"
  
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
          <Tooltip title={isFav? "Unmark as favorite" : tooltipLabel} arrow>
          <IconButton size="small" className={classes.fav} onClick={(e)=>handleFav(e)} name={movie.imdbID}>
                {isFav? <Favorite color="secondary" className={classes.icon}/> : <FavoriteBorder className={classes.icon}/>}
          </IconButton>
          </Tooltip>
          

      </CardActions>
    </Card>
  );
}


