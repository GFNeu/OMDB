import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import {useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {simpleSearch} from '../state/search'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function InputWithIcon() {
 
  let history = useHistory();
  let dispatch = useDispatch();

  const keyPress = (e)=> {
    if(e.charCode === 13){
       let query = e.target.value
       console.log('value', query);
        dispatch(simpleSearch(query)).then(()=> history.push("/movies"))
    }
 } 
 
 
  const classes = useStyles();

  return (
    <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchIcon />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Search..." onKeyPress={e=>keyPress(e)}/>
          </Grid>
        </Grid>
      </div>
  );
}