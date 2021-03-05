import React, {useState, useEffect} from 'react'
import axios from 'axios'
import omdbKey from '../omdb-config'
import { useHistory } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
//import movie from './oneMuvi';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import useStyles from '../components/SigleMovie-style'
import Skeleton from '@material-ui/lab/Skeleton';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiLink from '@material-ui/core/Link';
import GoogleLinks from '../components/GoogleLinks'


const SingleMovie = ({id}) => {
    let history = useHistory();
    const back= () => {
        if(history.length !== -1){
            history.goBack()
        }
    }
    const[movie, setMovie] = useState({Title: ""})
    const[loading, setLoading] = useState(true)
    const [similarMovies, setSimilarMovies] = useState()
    const[similarMoviesLoading, setSimilarMoviesLoading] = useState(true)

    useEffect(()=>{
        axios.get(`http://www.omdbapi.com/?apikey=${omdbKey}&i=${id}&plot=full`)
             .then(res => setMovie(res.data))
             .then(()=> setLoading(false))
             .then(()=>{
                return axios.get(`https://www.omdbapi.com/?apikey=${omdbKey}&s=${movie.Title}`)
                                 .then(res => setSimilarMovies(res.data))
                                 .then(()=> setSimilarMoviesLoading(false))
             })
    },[id, movie.Title])
    const classes = useStyles()
        
    return (
      <Container maxWidth="lg" className={classes.root}>
        {console.log(similarMovies)}
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={3}>
            <Paper elevation={1} className={classes.paper}>
              {loading ? (
                <Skeleton variant="rect" height={400} />
              ) : (
                <CardMedia
                  component="img"
                  alt={movie.Title}
                  height="400"
                  image={movie.Poster}
                  title={movie.Title}
                />
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} className={classes.header}>
              <Typography variant="h4" component="h2" className={classes.title}>
                {loading ? <Skeleton /> : movie.Title}
              </Typography>
              <Typography variant="h6" component="h2" className={classes.th5}>
                {loading ? <Skeleton /> : movie.Year}
              </Typography>
              <Typography variant="h6" component="h2" >
                {loading ? <Skeleton /> : movie.Genre}
              </Typography>
              <Typography variant="subtitle1" component="h2" className={classes.th6}>
                {loading ? <Skeleton /> : <span>{movie.Runtime} | <span className={classes.rated}>{movie.Rated}</span> | {movie.Language}</span>}
              </Typography>
              <Typography variant="body1" component="h2" >
                {loading ? <Skeleton /> : <span>Director: <GoogleLinks string={movie.Director}/></span>}
              </Typography>
              <Typography variant="body1" component="h2" >
                {loading ? <Skeleton /> :<span>Actors: <GoogleLinks string={movie.Actors}/></span>}
              </Typography>
              <Grid 
                container
                direction="row"
                justify="space-evenly"
                alignItems="flex-end"
                xs={12} lg={12}
                className={classes.ratingContainer}
              >
                <Grid item xs={4} md={4} className={classes.rating1}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png" alt="IMDB" title="IMDB" className={classes.ratingLogo}/>
                    <Typography variant="h5" component="h3">
                        {loading ? <Skeleton /> : movie.Ratings[0].Value}
                    </Typography>
                </Grid>
                <Grid item xs={4} md={4} className={classes.rating}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/1009px-Rotten_Tomatoes.svg.png" alt="Rotten Tomatoes" title="Rotten Tomatoes" className={classes.ratingLogo}/>
                    <Typography variant="h5" component="h3">
                        {loading ? <Skeleton /> : movie.Ratings[1].Value}
                    </Typography>
                </Grid>
                <Grid item xs={4} md={4} className={classes.rating}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Metacritic_M.png" alt="Metacritic" title="Metacritic" className={classes.ratingLogo}/>
                    <Typography variant="h5" component="h3">
                        {loading ? <Skeleton /> : movie.Ratings[2].Value}
                    </Typography>
                </Grid>
                
                <Grid item></Grid>
                <Grid item></Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid container item xs={12} md={3}>
              <Grid item lg={12}>
                <Paper elevation={1}>ADD TO FAVORITES</Paper> {/* //COMPLETAR--------------**************** */}
              </Grid>
              <Grid item xs={false} md={12}>
                <Paper elevation={1}>Similar movies</Paper> {/* /COMPLETAR---------------***************** */}
              </Grid>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper elevation={1} className={classes.plot}>
              <Typography variant="h5" component="h2">
                {loading ? <Skeleton /> : "Plot"}
              </Typography>
              <Typography variant="body1" component="p">
                {loading ? <Skeleton /> : movie.Plot}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} variant="h5" component="h2">More info</Typography>
        </AccordionSummary>
            <AccordionDetails className={classes.column}>
            <Typography variant="body1" component="p" className={classes.row1}>
                {loading ? <Skeleton /> : `Writers: ${movie.Writer}`}
            </Typography>
            <Typography variant="body1" component="p" className={classes.row2}>
                {loading ? <Skeleton /> : `Production: ${movie.Production}`}
            </Typography>
            <Typography variant="body1" component="p" className={classes.row1}>
                {loading ? <Skeleton /> : `Released: ${movie.Released}`}
            </Typography>
            <Typography variant="body1" component="p" className={classes.row2}>
                {loading ? <Skeleton /> : `Awards: ${movie.Awards}`}
            </Typography>
            <Typography variant="body1" component="p" className={classes.row1}>
                {loading ? <Skeleton /> : `BoxOffice: ${movie.BoxOffice}`}
            </Typography>
            <Typography variant="body1" component="p" className={classes.row2}>
                {loading ? <Skeleton /> : `Country: ${movie.Country}`}
            </Typography>
            <Typography variant="body1" component="p" className={classes.row1}>
                {loading ? <Skeleton /> : `DVD: ${movie.DVD}`}
            </Typography>
            <Typography variant="body1" component="p" className={classes.row2}>
                {loading ? <Skeleton /> : `IMDB Votes: ${movie.imdbVotes}`}
            </Typography>
            <Typography variant="body1" component="p" className={classes.row1}>
                {loading ? <Skeleton /> : <span>IMDB Link: <MuiLink href={`https://www.imdb.com/title/${id}`} target="_blank" rel="noreferrer">Click here</MuiLink></span>}
            </Typography>
            
           </AccordionDetails>
          </Accordion>
          </Grid>
        </Grid>
      </Container>
    );
}

export default SingleMovie


//http://www.omdbapi.com/?i=tt0372784&plot=full