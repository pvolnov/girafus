import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import './App.css';
import Login from "./components/login";
import Admin from "./components/admin";
import User from "./components/user";

const App = () => (
    <Router history={createBrowserHistory()}>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/admin' component={Admin} />
            <Route path='/user' component={User}/>
            <Redirect to='/' />
        </Switch>
    </Router>
);

export default App;
