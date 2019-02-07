import React, {Component} from 'react';
// login with session
import LoginIntention from './src/LoginIntention/LoginIntention';
// display
import Display from './src/Display/Display';
// login
import Login from './src/Login/Login';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { rootReducer } from './src/rootReducer/rootReducer';
import { createAppContainer, createStackNavigator } from 'react-navigation';

// store
const store = createStore(rootReducer, applyMiddleware(thunk));

// route
const RootStack = createStackNavigator(
    {
        LoginIntention: {
            screen: LoginIntention,
        },
        Display: {
            screen: Display,
        },
        Login: {
            screen: Login,
        }
    },
    {
        initialRouteName: 'Login',
    }
);

// app_container(stack)
const AppContainer = createAppContainer(RootStack);

// display
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        )
    }
}
