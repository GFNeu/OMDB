import React from 'react'
import {useSelector} from 'react-redux'
import MovieCard from './MovieCard'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import graphic from '../assets/undraw_blank_canvas_3rbb.svg'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    divi:{
        width: "100%",
        display:"flex",
        justifyContent: "center",
        marginTop: theme.spacing(4)
    },
    img: {
        height: "auto",
        maxWidth: "50%"
    }
  }));



const MoviesGrid = ({movies}) => {
    let classes = useStyles()
    const userFavs = useSelector(state=> state.user.Films)
    let init = userFavs? userFavs.map(f => f.imdbId) : []
    let favs = []
    if (userFavs && userFavs.length) favs=init
    
    return (
        <div>
            {!movies && (
                <div>
                    <Typography variant="overline" display="block" gutterBottom>
                        0 results were found
                    </Typography>
                    <div className={classes.divi}><img src={graphic} className={classes.img} alt="no results"></img></div>
                </div>)}
            {movies && <Typography variant="overline" display="block" gutterBottom>
            {movies.length} results were found
            </Typography>}
        <Grid container spacing={2}>
            {movies && movies.map(movie => {
                let isFav = favs.includes(movie.imdbID || movie.imdbId)
                return (<Grid item xs={12} sm={4} lg={2} md={3}key={movie.imdbID || movie.imdbId}>
                             <MovieCard movie={movie} fav={isFav}/> 
                        </Grid>)
            })}
        </Grid>
        </div>
    )
}

export default MoviesGrid
