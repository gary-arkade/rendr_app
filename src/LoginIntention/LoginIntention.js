import React, {Component} from 'react';
import { Button, View } from 'react-native';
import { WebView } from "react-native-webview";
import qs from 'qs';
import Config from "react-native-config";

export class LoginIntention extends Component {
    // disable back button
    static navigationOptions = {
        headerLeft: null
    }

    // init
    constructor(props) {
        // super
        super(props);
    }

    // e.g. always call
    _onNavigationStateChange = (event) => {

        const email = this.props.navigation.getParam('email', false);
        const password = this.props.navigation.getParam('password', false);

        // if we have email and password, assume coming from Login.js to here
        if(email && password) {
            if (event.hasOwnProperty('jsEvaluationValue')) {
                const isNotLogin = event.jsEvaluationValue;
                if (isNotLogin === '1') {
                    // test
                    console.log('not able to login');

                    this.props.navigation.navigate('Login', {
                        error: 'Login fail'
                    });

                    // back to login screen
                    this.props.navigation.navigate('Login', {
                        error: 'Username or password is incorrect.'
                    });
                } else {
                    // test
                    console.log('able to login with state:');
                    console.log(isNotLogin);

                    // go to the real display component with user & pass
                    this.props.navigation.navigate('Display', {
                        email,
                        password
                    });
                }
            } else {
                console.log('still waiting jsEvaluationValue');
            }
        } else {

            console.log('-- else --');
        }
    }

    render() {
        const loginUrl = Config.LOGIN_URL;

        // screen param
        const email = this.props.navigation.getParam('email', false);
        const password = this.props.navigation.getParam('password', false);

        // put screen param into the state as well

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
            </View>
        );
    }
}

export default LoginIntention;
