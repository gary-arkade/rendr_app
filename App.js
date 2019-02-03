import React, {Component} from 'react';
// login with session
import LoginIntention from './src/LoginIntention/LoginIntention';
// account
import Account from './src/Account/Account';
// logout
import Logout from './src/Logout/Logout';
import { createAppContainer, createStackNavigator } from 'react-navigation';

// route
const RootStack = createStackNavigator(
    {
        LoginIntention: {
            screen: LoginIntention,
        },
        Account: {
            screen: Account,
        },
        Logout: {
            screen: Logout,
        }
    },
    {
        initialRouteName: 'LoginIntention',
    }
);

// app_container(stack)
const AppContainer = createAppContainer(RootStack);

// display
export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
