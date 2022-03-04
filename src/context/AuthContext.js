import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as rootNavigation from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        // case an action of type 'add_error', we update the state object with the payload
        case 'add_error':
            // take all the properties out of that state object and add them into this new one and overwrite the 'errorMessage' property with the payload content
            return { ...state, errorMessage: action.payload };
        case 'clear_error_message':
            return { ...state, errorMessage: '' }
        case 'signin': 
            // when the user signs up/in, we're gonna rebuild the state object from scratch
            return {
                errorMessage: '', 
                token: action.payload,
                isSignout: false
            };
        case 'signout':
            return { 
                token: null, 
                isSignout: true,
                errorMessage: '',
            }
        default:
            return state;
    }
};

// Try to sign the user in automatically using just information on the user's device, as opposed to making an API request 
const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    // If there is a token dispatch an action
    if (token) {
        dispatch({ type: 'signin', payload: token });
        rootNavigation.navigate('TrackListScreen');
    } if (token === null) {
        rootNavigation.navigate('Signup');  
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
};

// an action function is called with 'dispatch' and returns another function
const signup = (dispatch) => async ({ email, password }) => {
    try {
        // sign up process:
        // make an API post request to sign up with that email and password
        const response = await trackerApi.post('/signup', { email, password });
        // 'response.data' is an object that has the token property
        await AsyncStorage.setItem('token', response.data.token);
        // if we sign up, modify our state, and say that we are authenticated
        // dispatch an action to update the 'token' piece of state
        dispatch({ 
            type: 'signin', 
            payload: response.data.token 
        });
    } catch (err) {
        // if signing up fails, we probably need to reflect an error message
        dispatch({ 
            type: 'add_error', 
            payload: 'Something went wrong with sign up' 
        });
    }   
};

const signin = (dispatch) => async ({ email, password }) => {
    try {
        // try to sign in
        const response = await trackerApi.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        // handle success by updating state  
        dispatch({ type: 'signin', payload: response.data.token });     
    } catch (err) {
        // handle failure by showing error message
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
        });
    } 
};


const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    rootNavigation.navigate('Signup');
};

export const { Provider, Context } = createDataContext(
    // reducer
    authReducer,
    // object with the different action functions
    { signin, signout, signup, clearErrorMessage, tryLocalSignin },
    // initial state
    { token: null, errorMessage: '' }
);  