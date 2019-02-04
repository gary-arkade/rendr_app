import * as Keychain from 'react-native-keychain';

export const START_SAVE_LOGIN_DETAIL = 'app/loginIntention/START_SAVE_LOGIN_DETAIL';
export const SAVE_LOGIN_DETAIL = 'app/loginIntention/SAVE_LOGIN_DETAIL';

const initState = {
    email: false,
    isLogin: false,
    loading: false,
    error: false,
};

export const loginIntentionReducer = (state = initState, action) => {
    switch (action.type) {
        case START_SAVE_LOGIN_DETAIL:
            return {
                ...state,
                loading: true,
            };

        case SAVE_LOGIN_DETAIL:
            return {
                ...state,
                email: action.email,
                // we don't store password
                isLogin: true,
                loading: false,
                error: false,
            };
        default:
            return state;
    }
}


export const startSaveLoginDetail = () => {
    return {
        type: START_SAVE_LOGIN_DETAIL,
        loading: true,
    };
};


export const saveLoginDetail = (email, password) => {
    return {
        type: SAVE_LOGIN_DETAIL,
        email: email,
        password: password
    };
};



export const saveLoginDetailAPI = (email, password) => {
    return dispatch => {
        // put email, password into key chain
        async () => {
            dispatch(startSaveLoginDetail());

            await Keychain.setGenericPassword(email, password);

            dispatch(saveLoginDetail(email, password));
        }



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
