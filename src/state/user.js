import {createReducer} from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit'

export const register = createAsyncThunk("REGISTER",(userData, thunkAPI) =>{
    return axios
        .post(`/api/auth/register`,{...userData})
        .then((res) => res.data) 
})

export const checkIfLoggedIn = createAsyncThunk("CHECK_LOGIN",(data, thunkAPI) =>{
    return axios
        .get(`/api/auth/me`)
        .then((res) => res.data) 
})

export const login = createAsyncThunk("LOGIN",(userData, thunkAPI) =>{
    return axios
        .post(`/api/auth/login`,{...userData})
        .then((res) => {
            console.log(res)
            return res.data})
         
})

export const logout = createAsyncThunk("LOGOUT",(data, thunkAPI) =>{
    return axios
        .post(`/api/auth/logout`)
        .then((res) => res.data) 
})

export const addToFavorites = createAsyncThunk("ADD_FAV",(imdbId, thunkAPI) =>{
    const {user} = thunkAPI.getState();
    if(!user.id) throw new Error("noUser")
    return axios
        .post(`/api/user/${user.id}/favs`,{imdbId})
        .then((res) => res.data) 
})

export const removeFromFavorites = createAsyncThunk("REMOVE_FAV",(imdbId, thunkAPI) =>{
    const { user } = thunkAPI.getState();
    if(!user.id) throw new Error("noUser")
    return axios
        .delete(`/api/user/${user.id}/favs/${imdbId}`,{imdbId})
        .then((res) => res.data) 
})

export const userReducer = createReducer({id:""},{
    [checkIfLoggedIn.fulfilled] : (state, action) => action.payload,
    [login.fulfilled] : (state, action) => (action.payload),
    [register.fulfilled] : (state,action) => (action.payload),
    [logout.fulfilled] : (state,action) => (action.payload),
    [addToFavorites.fulfilled] : (state,action) => (action.payload),
    [removeFromFavorites.fulfilled] : (state, action) => (action.payload)
});