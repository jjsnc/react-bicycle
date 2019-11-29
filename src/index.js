import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Admin from './Admin';
import Router from './router';
import { Provider } from 'react-redux'
import configureStore from './redux/store/configureStore';
// import Home from './route_demo/route1/Home';
// import Router from './route_demo/route2/router';
// import Router3 from './route_demo/route3/router';

// import * as serviceWorker from './serviceWorker';
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
