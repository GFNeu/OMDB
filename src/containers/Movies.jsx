import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import MoviesGrid from '../components/MoviesGrid'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import {simpleSearch} from '../state/search';
import queryParser from '../utils/queryParser'
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(1),
    fontWeight: "bold"
  },
}));

const Movies = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    let dispatch = useDispatch();
    const search = useSelector(state => state.search)
    const [fakeSearch, setFakeSearch] = useState(search)
    const location = useLocation();
    const classes = useStyles()

    //La idea de todo este useEffect es que cuando el usuario se loguee, se marquen como favoritas las películas en display. 
    //Y, también que cuando se desloguee, se desmarquen todas las películas 
    useEffect(()=>{
      if(isLoading || (location.search !== search.query)){
        setIsLoading(true)
        dispatch(simpleSearch(location.search))
        .then((x)=>{
          if(Object.keys(search)===0) setError(true)
          setFakeSearch(search)
          setIsLoading(false)
        })
        .catch((err)=>{
          setIsLoading(false)
          setError(true)
          setFakeSearch(search=> search.results.Search.length = 0)
          console.log("ERROR al cargar las películas en movies.jsx",err)
        })
      }
    },[isLoading, dispatch, location.search])
    
   
    return (
      <Container maxWidth="lg">
        {console.log(error)}
        <Typography variant="h5" className={classes.pageTitle}>
        {isLoading? "loading":`Showing results found for '${queryParser(search.query)}':`}
        </Typography>
        {(isLoading || error)?<LinearProgress />:<MoviesGrid movies={search.results.Search} /> }
      </Container>
    );
}

export default Movies

