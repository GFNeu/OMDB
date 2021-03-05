import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import omdbKey from '../omdb-config'
import MoviesGrid from '../components/MoviesGrid'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import graphic from '../assets/undraw_horror_movie_3988.svg'

const useStyles = makeStyles((theme) => ({
    pageTitle: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(1),
      fontWeight: "bold"
    },
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


const UserFavs = () => {
    const classes = useStyles()
    const history = useHistory()
    const user = useSelector(state => state.user)
    const [favs, setFavs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    if(!user || !user.id) history.push('/')

    useEffect(() => {
        if(user.id){
                    let promesas = user.Films.map(m => axios.get(`http://www.omdbapi.com/?apikey=${omdbKey}&i=${m.imdbId}&plot=full`).then(res => res.data))
                    Promise.all(promesas)
                        .then(response => {
                                setFavs(response)
                                setIsLoading(false)
                                
                        })
                        .catch((err)=>console.log("ERRORRR", err))
                }
    }, [user])

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" className={classes.pageTitle}>
        {isLoading? "loading":"My favorites:"}
        </Typography>
            {isLoading && <LinearProgress />}
            {favs.length? <MoviesGrid movies={favs}/>:
            <div className={classes.divi}>
                <Typography variant="h5" className={classes.pageTitle}>
                    Wait, ugh... you don't have any favorite movies? 
                    Go watch some!
                </Typography>
                <img src={graphic} className={classes.img}/>
            </div>}
        
        </Container>
    )
}

export default UserFavs
