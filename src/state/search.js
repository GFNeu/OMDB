import {createReducer} from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit'
//import { message } from "antd";
import omdbKey from '../omdb-config'

/* export const setUser = createAction("SET_USER"); */



/* export const sendLoginRequest = createAsyncThunk("SEND_LOGIN_REQUEST",()=>{
    return axios.post("/api/login")
    .then(res => res.data)
    
}); */


export const simpleSearch = createAsyncThunk("SIMPLE_SEARCH",(query, thunkAPI) =>{
    console.log(query)
     if (!query) {
    //return message.error(`You need to enter something to search for`);
    }
    return axios
        .get(`https://www.omdbapi.com/?apikey=${omdbKey}&s=${query}`)
        .then((res) => ({query: query, results: res.data})) 
})
   
/* export const removeFromFavorites = createAsyncThunk(
    "REMOVE_FROM_FAVORITES",
    (flightId, thunkAPI) => {
      const { user } = thunkAPI.getState();
      if (!user._id) throw new Error("You need to be logged in"); // this should be imposible
      return axios
        .delete(`/api/favorites?userId=${user._id}&flightId=${flightId}`)
        .then((res) => res.data);
    }
  ); */



export const searchReducer = createReducer({ },{
    //[setUser] : (state, action) => action.payload,
    [simpleSearch.fulfilled] : (state,action) => (action.payload),
    //[sendLoginRequest.fulfilled]: (state, action) => (action.payload),
    //[removeFromFavorites.fulfilled]: (state,action) => (action.payload)
});