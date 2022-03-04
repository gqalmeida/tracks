import React, { useContext } from "react";
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

import NavLink from "../components/NavLink";
import AuthForm from "../components/AuthForm";
import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
    // Destructuring out 'state' object and 'signup' action function from AuthContext
    const { state, signup, clearErrorMessage } = useContext(AuthContext);
    
    //Make the sign up screen error message go away when navigating to sign in
    useFocusEffect(
        React.useCallback(() => {
            return () => clearErrorMessage();
        }, [navigation])
    );

    return (
        <View style={styles.container}>
           
            <AuthForm
                headerText="Sign up for Tracker"
                errorMessage={state.errorMessage}
                submitButtonText="Sign up"
                // Anytime the 'onSubmit' prop is called, just call 'signup' and pass in the appropriate arguments
                onSubmit={signup}
                // === onSubmit={({ email, password }) => signup({ email, password })}
            />

            <NavLink
                routeName="Signin"
                text="Already have an account? Sign in instead"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Cause the View to expand and fill up as much vertical space as possible
        flex: 1,
        justifyContent: 'center',
        marginBottom: 257
    },
});

export default SignupScreen;