import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {searchReducer} from './search'
import {userReducer} from './user'
import modalReducer from './modal'


const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
      search: searchReducer,
      modal: modalReducer,
      user: userReducer,
    },
  });
  
  export default store;