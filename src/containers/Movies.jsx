import React from 'react'
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MoviesGrid from '../components/MoviesGrid'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1),
    fontWeight: "bold"
  },
}));

const Movies = () => {
    const search = useSelector(state => state.search)
    const classes = useStyles()
    
    return (
      <Container maxWidth="lg">
        <Typography variant="h5" className={classes.pageTitle}>
        {`${search.results.Search.length} results found for '${search.query}':`}
        </Typography>
        <MoviesGrid movies={search.results.Search} /> 
      </Container>
    );
}

export default Movies

