import React, {useEffect} from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {checkIfLoggedIn } from '../state/user'
import AppBar from './AppBar'
import Home from './Home'
import Movies from './Movies'
import SingleMovie from './SingleMovie'
import ElModal from '../components/ElModal'
import UserFavs from './UserFavs'


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
                <Route exact path="/movies" render={() => <Movies /> } /> {/* Para la búsqueda desde home */}
                <Route exact path="/moviess" render={() => <Movies /> } /> {/* para labúsqueda desde appBar */}
                <Route path="/movies/:id" render={({ match }) => <SingleMovie id={match.params.id}/> } />
                <Route path="/user/favs" render={() => <UserFavs />}/>
                <Redirect from="/" to="/home" />
            </Switch>
            <ElModal />
        </div>
    )
}

export default Main;