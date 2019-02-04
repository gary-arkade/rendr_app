// react
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';

// super
//import { connect } from 'react-redux';
//
//import { loginApi } from "./reducer";

class Login extends Component {

    // parent
    constructor(props) {
        super(props);

        this.state = {
            email: false,
            password: false,
            isLogin: false
        }
    }

    onLogin = () => {
        const { email, password } = this.state;

        if (email && password) {
            //this.props.loginApi(email, password);
            this.props.navigation.navigate('LoginIntention', {
                email,
                password
            });

        } else {
            Alert.alert("Error", "Missing username or password");
        }
    }

    onClickListener = (viewId) => {
        Alert.alert("Alert", "Button pressed "+viewId);
    }

    render() {
        let { isLogin } = this.state;
        let error = this.props.navigation.getParam('error', false);

        if(isLogin === false) {
            return (
                // container: center
                // input container: radius stuff
                <View style={styles.container}>

                    {error ?
                        <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>
                        :
                        null
                    }

                    <Text style={{marginBottom: 20}}>RENDR</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Email"
                            underlineColorAndroid='transparent'
                            onChangeText={(val) => {
                                this.setState({email: val})
                            }}/>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Password"
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(val) => {
                                this.setState({password: val})
                            }}/>
                    </View>

                    <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={() => this.onLogin()}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
                        <Text>Forgot your password?</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.buttonContainer}
                        onPress={() => this.onClickListener('register')}>
                        <Text>Register</Text>
                    </TouchableHighlight>
                </View>
            );
        } else {
            return (
                <View>
                    <Text>redirect!</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    // bigger container
    container: {
        // flex
        flex: 1,
        // center
        justifyContent: 'center',
        // center
        alignItems: 'center',
        // bg color
        backgroundColor: '#DCDCDC',
    },

    // input container: radius stuff
    inputContainer: {
        // bottom color
        borderBottomColor: '#F5FCFF',
        // background color
        backgroundColor: '#FFFFFF',
        // radius
        //borderRadius:30,
        // bottom with
        borderBottomWidth: 1,
        // width
        width:250,
        // height
        height:45,
        // margin bottom
        marginBottom:20,
        // flex row
        flexDirection: 'row',
        alignItems:'center'
    },

    // input box style
    inputs:{
        // height
        height:45,
        // margin left
        marginLeft:16,
        // bottom color
        borderBottomColor: '#FFFFFF',
        flex:1,
    },

    // input icon: small
    inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
    },

    // button container
    buttonContainer: {
        // height
        height:45,
        // all the row
        flexDirection: 'row',
        // center
        justifyContent: 'center',
        // center
        alignItems: 'center',
        // margin button
        marginBottom:20,
        // width
        width:250,
        // radius
        //borderRadius:30,
    },

    loginButton: {
        backgroundColor: "#00b5ec",
    },

    // login text white color
    loginText: {
        color: 'white',
    }
});

/*
const mapStateToProps = state => {
    return {
        email: state.loginReducer.email,
        loading: state.loginReducer.loading,
        isLogin: state.loginReducer.isLogin,
        error: state.loginReducer.error,
    };
};

// method
const mapDispatchToProps = dispatch => {
    return {
        loginApi: (email, password) => dispatch(loginApi(email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
*/

export default Login;
