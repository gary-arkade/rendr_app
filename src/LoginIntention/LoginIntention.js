import React, {Component} from 'react';
import { Button, View } from 'react-native';
import { WebView } from "react-native-webview";
import qs from 'qs';
import Config from "react-native-config";
import Account from "../Account/Account";


export default class LoginIntention extends Component {
    // init
    constructor(props) {
        // super
        super(props);
    }

    // e.g. web view change?
    _onNavigationStateChange = (event) => {
        if(event.hasOwnProperty('jsEvaluationValue')) {
            const isNotLogin = event.jsEvaluationValue;
            if(isNotLogin === '1') {
                // test
                console.log('not able to login');

                this.props.navigation.navigate('Login', {
                    error: 'Login fail'
                });

            } else {
                // test
                console.log('able to login');
                console.log(isNotLogin);
            }
        } else {
            console.log('still waiting jsEvaluationValue');
        }
    }

    render() {
        const loginUrl = Config.LOGIN_URL;
        const email = this.props.navigation.getParam('email', false);
        const password = this.props.navigation.getParam('password', false);

        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        let loginObj = {
            "form_type": "customer_login",
            "customer[email]": email,
            "customer[password]": password
        };

        let loginStr = qs.stringify(loginObj);

        const sourceObj = {
            uri: loginUrl,
            headers: header,
            body: loginStr,
            method:'POST'
        };

        // still equal login, so login fail
        const isNotLogin = `
            (function() { 
                return document.querySelector("h1").innerHTML === "Login" }
            )()
        `;

        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 20 }} />
                <WebView
                    // ref
                    ref={ref => (this.webview = ref)}
                    // source
                    source={sourceObj}
                    // error
                    onError={console.error.bind(console, 'error')}
                    // no bounce
                    bounces={false}
                    // load with req
                    onShouldStartLoadWithRequest={() => true}
                    // yes, js
                    javaScriptEnabledAndroid={true}

                    injectedJavaScript={
                        isNotLogin
                    }

                    onNavigationStateChange={this._onNavigationStateChange}

                    // loading
                    startInLoadingState={true}
                    // style
                    style={{ flex: 1 }}
                />

                <Button
                    title="Go to Account"
                    onPress={() => this.props.navigation.navigate('Account')}
                />
                <Button
                    title="Go to Logout"
                    onPress={() => this.props.navigation.navigate('Logout')}
                />
            </View>
        );
    }
}
