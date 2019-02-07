import React, {Component} from 'react';
import { Button, View } from 'react-native';
import { WebView } from "react-native-webview";
import Config from "react-native-config";
import * as Keychain from 'react-native-keychain';

export default class Display extends Component {
    // disable back button
    static navigationOptions = {
        headerLeft: null
    }

    // init
    constructor(props) {
        // super
        super(props);

        //test
        console.log('-- into Display component --');
    }

    render() {
        const url = 'https://rendrtrade.myshopify.com/account';

        // screen param
        const email = this.props.navigation.getParam('email', false);
        const password = this.props.navigation.getParam('password', false);

        // async
        if(email && password) {
            // test
            console.log('-- doing key chain stuff --');

            Keychain.setGenericPassword(email, password).then((res) => {
                // test
                //console.log('-- res --');
                //console.log(res);

                // now we reset the params
                Keychain.getGenericPassword().then(res1 => {
                    // test
                    //console.log('-- cred store good --');
                    //console.log(res1);
                });
            }).catch(err => {
                console.log('-- cred store error --');
                console.error(err);
            });
        }

        const sourceObj = {
            uri: url,
            method: 'GET'
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
            </View>
        );
    }
}
