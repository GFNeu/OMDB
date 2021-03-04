import {createReducer} from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit'

export const register = createAsyncThunk("REGISTER",(userData, thunkAPI) =>{
    return axios
        .post(`/api/auth/register`,{...userData})
        .then((res) => ({isLogedin: true, userData: res.data})) 
})

export const checkIfLoggedIn = createAsyncThunk("CHECK_LOGIN",(data, thunkAPI) =>{
    return axios
        .get(`/api/auth/me`)
        .then((res) => ({isLogedin: true, userData: res.data})) 
})

export const login = createAsyncThunk("LOGIN",(userData, thunkAPI) =>{
    return axios
        .post(`/api/auth/login`,{...userData})
        .then((res) => ({isLogedin: true, userData: res.data})) 
})

export const logout = createAsyncThunk("LOGOUT",(data, thunkAPI) =>{
    return axios
        .post(`/api/auth/logout`)
        .then((res) => ({isLogedin: false, userData: {}})) 
})

export const userReducer = createReducer({isLogedin: false, userData: {}},{
    //[setUser] : (state, action) => action.payload,
    [checkIfLoggedIn.fulfilled] : (state, action) => action.payload,
    [login.fulfilled] : (state, action) => (action.payload),
    [register.fulfilled] : (state,action) => (action.payload),
    [logout.fulfilled] : (state,action) => (action.payload),
    //[sendLoginRequest.fulfilled]: (state, action) => (action.payload),
    //[removeFromFavorites.fulfilled]: (state,action) => (action.payload)
});