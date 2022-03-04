import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);
    useEffect(() => {
        tryLocalSignin();
    }, []);
    // To indicate we want to run this function exactly one time, we put in an empty array
    
    return null;
};

export default ResolveAuthScreen;