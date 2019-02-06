import React, {Component} from 'react';
import { Button, View, Platform } from 'react-native';
import { WebView } from "react-native-webview";
import qs from 'qs';
import Config from "react-native-config";

const isNotLoginIos = `
    (function() { 
        return document.querySelector("h1").innerHTML === "Login" 
    })()
`;

const isNotLoginAndroid = `
    (function() {
        window.postMessage(document.querySelector("h1").innerHTML === "Login")
    })()
`;

export class LoginIntention extends Component {
    // disable back button
    static navigationOptions = {
        headerLeft: null
    }


    // init
    constructor(props) {
        // super
        super(props);

        //test
        console.log('-- into LoginIntention component --');
    }

    // e.g. always call
    _onNavigationStateChange = (event) => {

        const email = this.props.navigation.getParam('email', false);
        const password = this.props.navigation.getParam('password', false);

        //test
        console.log('-- _onNavigationStateChange --');
        console.log(event);

        // if we have email and password, assume coming from Login.js to here
        if(email && password) {

            // test
            console.log('-- pass in email and pass --');
            console.log(email);
            console.log(password);

            // android does not have this
            if (event.hasOwnProperty('jsEvaluationValue')) {
                const isNotLogin = event.jsEvaluationValue;
                if (isNotLogin === '1') {
                    // test
                    console.log('not able to login');

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


    _onLoad = () => {

        console.log('-- on load --');
        this.webView.injectJavaScript(isNotLoginAndroid);
    }


    render() {
        const loginUrl = Config.LOGIN_URL;

        const email = this.props.navigation.getParam('email', false);
        const password = this.props.navigation.getParam('password', false);

        let header = {
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
            method: 'POST'
        };

        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 20 }} />

                {Platform.OS === 'ios' ?

                    <WebView
                        ref={node => { this.webView = node; }}

                        source={sourceObj}

                        onError={console.error.bind(console, 'error')}

                        bounces={false}

                        onShouldStartLoadWithRequest={() => true}

                        javaScriptEnabledAndroid={true}

                        injectedJavaScript={
                            isNotLoginIos
                        }

                        onNavigationStateChange={this._onNavigationStateChange}

                        startInLoadingState={true}

                        style={{flex: 1}}
                    />

                    :

                    <WebView
                        ref={node => { this.webView = node; }}

                        source={sourceObj}

                        onError={console.error.bind(console, 'error')}

                        bounces={false}

                        onShouldStartLoadWithRequest={() => true}

                        javaScriptEnabledAndroid={true}

                        onNavigationStateChange={this._onNavigationStateChange}

                        onLoad={this._onLoad.bind(this)}

                        // loading
                        startInLoadingState={true}
                        // style
                        style={{flex: 1}}
                    />
                }
            </View>
        );
    }
}

export default LoginIntention;
