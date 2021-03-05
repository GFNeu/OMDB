import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SearchField from '../components/HomeSearchField'
import Container from '@material-ui/core/Container';
import image_A from '../assets/undraw_home_cinema_l7yl.svg'
import image_B from '../assets/undraw_movie_night_fldd.svg'
import image_C from '../assets/undraw_Video_streaming_re_v3qg.svg'
import ParticlesBg from "particles-bg";
const useStyles = makeStyles((theme) => ({
    divi: {
      marginTop: theme.spacing(10),
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
      alignContent: 'Center',
      justifyContent: 'center',
      width: "100%",
      height: "100%",
    },
    divSearch: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexGrow: "1",
        marginRight: theme.spacing(2)
    },
    img: {
        marginLeft: theme.spacing(5),
        //position: "relative",
        marginTop: "10%",
        height: "auto",
        maxWidth: "73%"
    }
  }));


const Home = () => {
    const classes = useStyles();
    let images = [image_A, image_B, image_C]
    let randomImage = images[Math.floor(Math.random()*3)]
    return (
        
        <Container maxWidth="sm">
            <div className={classes.divi}>
                <div className={classes.divSearch}><SearchField /></div>
                <div><img src={randomImage} className={classes.img} alt="OMDB"/></div>
            </div>
            <ParticlesBg type="random" bg={true}/>
        </Container>
    )
}

export default Home
