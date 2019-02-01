import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from "react-native-webview";

// your firebase function || file on your server url to redirect the user to the login page
const LOGIN_URL = 'https://google.com';

export class WebviewRedirect extends Component {

    // basically, check webview url state,
    // if still has login param, stay in login flow
    _onNavigationStateChange(webViewState){

        /*
        // not auth flow
        let authFlow = false;

        // web view state, url, has var
        let condition1 = (webViewState.url.indexOf('some_url_or_its_variable_1') !== -1) : true ? false;
        // web view state, url, has var
        let condition2 = (webViewState.url.indexOf('some_url_or_its_variable_2') !== -1) : true ? false;

        // webview.url = .....
        // go on with the previous logic
        if (condition1 || condition2) {
            // so yes
            authFlow = true;
        }

        // debugging is good.
        console.log(condition1, condition2, authFlow);
        */

        // When the user touches a link on the social media app's login page
        // that could navigate to an unwanted url (ex: clicks on actual social media app's login link on our
        // registered app's login page while the only thing we want is to make them login "over" our app)


        let authFlow = false;


        // not auth flow &&
        // loading
        if(!authFlow && webViewState.loading) {
            // learn some new thingies about some underlying thingies. Note that you'll get each log twice as the function
            // is called once for webViewState.loading: true (new url loading has begun and going on) and
            // webViewState.loading: false (the loading is complete)

            console.log(this.refs["WebView"]);
            console.log(webViewState);

            // redirect user back to your initial login url, BEFORE new navigation url is loaded (see how
            // webViewState.loading is being checked for true. if it's false, then it means the page loading is
            // complete == it's too late!)


            // redirect back to login url
            let redirectCode = `window.location = '${LOGIN_URL}';`;

            // actual magic happens below. you can access the current WebView instance and some of its functions using the
            // ref prop, like injecting good old js redirect code into the page & run instantly while it's still being loaded

            // access the refs
            // refs["webview"]
            // inject js
            // window.loc = xxxxx
            this.refs["WebView"].injectJavaScript(redirectCode);
        }
    }

    render() {
        return(
            <View>
                <WebView
                    // login url
                    source={{uri: LOGIN_URL }}
                    // enable js
                    javaScriptEnabled={true}
                    // no start loading
                    startInLoadingState={false}
                    // no scroll
                    scrollEnabled={false}
                    // nav change
                    onNavigationStateChange={this._onNavigationStateChange.bind(this) }
                    // ref
                    ref="WebView"
                />
            </View>
        );
    }
}
