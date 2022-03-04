import React, { useContext } from "react";
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

import AuthForm from '../components/AuthForm';
import NavLink from "../components/NavLink";
import { Context } from '../context/AuthContext';

const SigninScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(Context);
   
    // Make the sign in screen error message go away when navigating to sign up 
    useFocusEffect(
        React.useCallback(() => {
            return () => clearErrorMessage();
        }, [navigation])
    );

    return (
        <View style={styles.container}>         
            <AuthForm 
                headerText="Sign In to Your Account"
                errorMessage={state.errorMessage}
                submitButtonText="Sign In"
                onSubmit={signin}
            />
            <NavLink 
                text="Don't have an account? Sign up instead"
                routeName="Signup" 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 257
    }
});

export default SigninScreen;