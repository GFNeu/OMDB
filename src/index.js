import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { SnackbarProvider } from 'notistack';
import "./index.css";
import Main from './containers/Main';
import store from './state/store';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Route path="/" component={Main} />
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
