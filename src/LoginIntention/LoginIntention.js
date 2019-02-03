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

    goToCart() {

    }

    render() {
        const loginUrl = Config.LOGIN_URL;

        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        let loginObj = {
            "form_type": "customer_login",
            "customer[email]": "gary@arkade.com.au",
            "customer[password]": "test1234"
        };

        let loginStr = qs.stringify(loginObj);

        const sourceObj = {
            uri: loginUrl,
            headers: header,
            body: loginStr,
            method:'POST'
        };

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
