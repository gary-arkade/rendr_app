import React, {Component} from 'react';
import { Button, View, Platform } from 'react-native';
import { WebView } from "react-native-webview";
import qs from 'qs';
//import Config from "react-native-config";

const isLoginIos = `
    (function() { 
        return document.querySelector("h1").innerHTML === "My Account" 
    })()
`;

const isLoginAndroid = `
    (function() {
        window.postMessage(document.querySelector("h1").innerHTML === "My Account")
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

            // android does not have this
            if (event.hasOwnProperty('jsEvaluationValue')) {
                const isLogin = event.jsEvaluationValue;
                if (isLogin === '1') {
                    // test
                    console.log('able to login');

                    // go to the real display component with user & pass
                    this.props.navigation.navigate('Display', {
                        email,
                        password
                    });
                } else {
                    // test
                    console.log('not able to login with state:');
                    console.log(isLogin);

                    // back to login screen
                    this.props.navigation.navigate('Login', {
                        error: 'Username or password is incorrect.'
                    });
                }
            } else {
                console.log('still waiting jsEvaluationValue');
            }
        } else {
            console.log('-- else --');
        }
    }


    _onLoadAndroid() {
        //test
        console.log('-- _onLoadAndroid --');

        // we inject js, then inside js, we do post msg
        this.webView.injectJavaScript(isLoginAndroid);
    }

    _onMessageAndroid(event) {
        //test
        console.log('-- on msg --');

        if(event.nativeEvent.data === 'true') {
            // test
            console.log('able to login');

            const email = this.props.navigation.getParam('email', false);
            const password = this.props.navigation.getParam('password', false);
            this.props.navigation.navigate('Display', {
                email,
                password
            });
        } else {
            // test
            console.log('not able to login');
            this.props.navigation.navigate('Login', {
                error: 'Username or password is incorrect.'
            });
        }
    }

    render() {
        // will put this into config
        const loginUrl = 'https://rendrtrade.myshopify.com/account/login';

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
                            isLoginIos
                        }

                        onNavigationStateChange={this._onNavigationStateChange}

                        startInLoadingState={true}

                        style={{flex: 1}}
                    />

                    :

                    <WebView
                        ref={node => { this.webView = node; }}

                        source={sourceObj}

                        mixedContentMode={'compatibility'}

                        onLoad={this._onLoadAndroid.bind(this)}

                        onMessage={this._onMessageAndroid.bind(this)}
                    />
                }
            </View>
        );
    }
}

export default LoginIntention;
