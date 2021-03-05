import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import {useHistory} from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    padding: theme.spacing(4),
    with: "100%",
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#273169",
    color: theme.palette.common.white,
    borderRadius: 40,
    boxShadow: theme.shadows[1]
  },
  color: {
    color: theme.palette.common.white,
    fontSize: "3rem"
  }, 
  icon:{
    fontSize: "3rem"
  }
}));

export default function InputWithIcon() {
 
  let history = useHistory();

  const keyPress = (e)=> {
    if(e.charCode === 13){
       let query = e.target.value
       console.log('value', query);
       history.push({
        pathname: '/movies',
        search: `${query}`,  // query string
       })
    }
 } 
 
  const classes = useStyles();

  return (
    <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end" >
          <Grid item>
            <SearchIcon size="medium" className={classes.icon}/>
          </Grid>
          <Grid item lg={10}>
            <TextField size="medium" InputLabelProps={{style: {color: "white", fontSize: "1.5rem"}}} inputProps={{style: {color:"white", fontSize: "2.3rem"}}} color="white" id="input-with-icon-grid" label="Search..." onKeyPress={e=>keyPress(e)} autoFocus fullWidth className={classes.color}/>
          </Grid>
        </Grid>
      </div>
  );
}