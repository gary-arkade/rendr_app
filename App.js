// react
import React, {Component} from 'react';
// webview
import { WebView } from "react-native-webview";
// qs
import qs from 'qs';

// singleton
import { MyWebview } from './src/MyWebview/MyWebview';
// config
import Config from "react-native-config";

// url
const loginUrl = Config.SITE_LOGIN_URL;

// header
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

console.log('-- test --');
console.log(loginStr);

// header, body, post
const sourceObj = {
    uri: loginUrl,
    headers: header,
    body: loginStr,
    method:'POST'
};


let webviewInstance = <WebView
    source={sourceObj}
    style={{ marginTop: 20 }}
    onLoadProgress={e => console.log(e.nativeEvent.progress)}
/>;

//let webviewInstance = <WebviewRedirect />;

// get empty instance
let myWebview = MyWebview.getInstance();
// inject the instance
myWebview.setWebview(webviewInstance);
// get webview instance
let origWebviewInstance = myWebview.getWebview();


// test
// origWebviewInstance.source = {uri: 'https://google.com'};


type Props = {};
export default class App extends Component<Props> {
    render() {

        return (
            origWebviewInstance
        );
    }
}
