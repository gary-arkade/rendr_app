import { loginReducer } from '../Login/reducer';
import { loginIntentionReducer } from '../LoginIntention/reducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    loginReducer,
    loginIntentionReducer
});
