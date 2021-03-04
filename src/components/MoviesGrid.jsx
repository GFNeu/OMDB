import React from 'react'
import MovieCard from './MovieCard'
import Grid from '@material-ui/core/Grid';

const MoviesGrid = ({movies}) => {
    return (
        <Grid container spacing={2}>
            {movies && movies.map(movie => (
            <Grid item xs={6} sm={2} key={movie.imdbID}>
                <MovieCard movie={movie}/> 
            </Grid>
            ))}
        </Grid>
    )
}

export default MoviesGrid
