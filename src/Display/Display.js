import React, {Component} from 'react';
import { Button, View } from 'react-native';
import { WebView } from "react-native-webview";
import Config from "react-native-config";

export default class Display extends Component {
    // init
    constructor(props) {
        // super
        super(props);
    }

    render() {
        const url = Config.INIT_DISPLAY_URL

        // screen param
        const email = this.props.navigation.getParam('email', false);
        const password = this.props.navigation.getParam('password', false);

        // save in key chain?
        console.log('-- display --');
        console.log(email);
        console.log(password);


        const sourceObj = {
            uri: url,
            method:'GET'
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
