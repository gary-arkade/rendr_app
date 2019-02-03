import axios from 'axios';

// call func
export const LOGIN = 'app/login/LOGIN';
// func returns good
export const LOGIN_SUCCESS = 'app/login/LOGIN_SUCCESS';
// func returns fail
export const LOGIN_FAIL = 'app/login/LOGIN_FAIL';

const initState = {
    username: false,
    loading: false,
    isLogin: false,
    error: false,
};

export const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:

            console.log('-- LOGIN_SUCCESS --');
            console.log(action.payload.data);

            return {
                ...state,
                loading: false,
                username: action.payload.data.username,
                isLogin: action.payload.data.isLogin,
                error: false,
            };
        case LOGIN_FAIL:

            console.log('-- LOGIN_FAIL --');
            console.log(action.payload.data);

            return {
                ...state,
                loading: false,
                username: action.payload.data.username,
                isLogin: action.payload.data.isLogin,
                error: 'Wrong username or password',
            };
        default:
            return state;
    }
}

export const login = () => {
    return {
        type: LOGIN,
        loading: true,
    };
};

export const loginSuccess = (res) => {
    return {
        type: LOGIN_SUCCESS,
        loading: false,
        payload: res
    };
};

export const loginFail = (res) => {
    return {
        type: LOGIN_FAIL,
        loading: false,
        payload: res
    };
};

export const loginApi = (username, password) => {
    return dispatch => {
        dispatch(login());



        /*
        let url = 'http://localhost:5000/api/login';
        axios({
            method: 'post',
            url,
            data: {
                username: username,
                password: password
            }
        }).then(res => {
            let isLogin = res.data.isLogin;
            if(isLogin) {
                dispatch(loginSuccess(res));
            } else {
                dispatch(loginFail(res));
            }

        }).catch(err => {

            console.log('-- login err --');
            console.log(err);

            dispatch(loginFail(err));
        });
        */
    }
}
