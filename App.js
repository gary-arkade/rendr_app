import React, {Component} from 'react';
import LoginIntention from './src/LoginIntention/LoginIntention';
import Account from './src/Account/Account';
import Logout from './src/Logout/Logout';
import { createAppContainer, createStackNavigator } from 'react-navigation';

// stack
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
