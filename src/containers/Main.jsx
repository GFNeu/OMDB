import React, {useEffect} from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {checkIfLoggedIn } from '../state/user'
import AppBar from './AppBar'
import Home from './Home'
import Movies from './Movies'
import SingleMovie from './SingleMovie'
import ElModal from '../components/ElModal'

const Main = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkIfLoggedIn())
    }, [])

    return (
        <div>
            <AppBar />
            <Switch>
                <Route exact path="/home" render={() => <Home /> } />
                <Route exact path="/movies" render={() => <Movies /> } />
                <Route path="/movies/:id" render={({ match }) => <SingleMovie id={match.params.id}/> } />
                <Redirect from="/" to="/home" />
            </Switch>
            <ElModal />
        </div>
    )
}

export default Main;