import React, {Component} from 'react';
import { Button, View } from 'react-native';
import { WebView } from "react-native-webview";
import Config from "react-native-config";


export default class LoginIntention extends Component {
    // init
    constructor(props) {
        // super
        super(props);
    }

    backHome() {

    }

    render() {
        const cartUrl = Config.CART_URL;

        const sourceObj = {
            uri: cartUrl
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

                <Button onPress={this.backHome} title={'Back home'} />
            </View>
        );
    }
}
