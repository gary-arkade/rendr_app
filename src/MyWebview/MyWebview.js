import React from "react";

// Singleton
export class MyWebview {

    // 1st time
    static myInstance = null;

    // one attr
    _webview = false;

    // static get instance
    static getInstance() {
        // not there, created
        if (MyWebview.myInstance == null) {
            MyWebview.myInstance = new MyWebview();
        }

        // instance
        return this.myInstance;
    }

    // get webview
    getWebview() {
        return this._webview;
    }

    // set webview
    setWebview(webview) {
        this._webview = webview;
    }
}
