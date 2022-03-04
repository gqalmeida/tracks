import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
    baseURL: 'http://9e92-2804-7a60-102-c70-2985-689d-5231-39d2.ngrok.io'
});

// Everytime we make a request through our axios instance and if we have a token, it will be automatically added into our request
instance.interceptors.request.use(
    // Call this function automatically when we are about to make a request
    async (config) => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            // Authenticating ourselves with the backend API
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    // Call this function automatically when there is an error when we make that request
    (err) => {
        // Returning a Promise object that is gonna be rejected
        return Promise.reject(err);
    }
);


export default instance;