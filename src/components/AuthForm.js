import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';

import Spacer from './Spacer';

// Props for contents that we want to customize 
const AuthForm = ({ headerText, errorMessage, submitButtonText, onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            <Input
                label="Email"
                value={email}
                // Anytime 'onChangeText' is called, react is gonna take that new text is pass it into 'setEmail'
                onChangeText={setEmail}
                // === onChangeText={(newEmail) => setEmail(newEmail)}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Spacer/>
            <Input
                secureTextEntry
                label="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text> 
            ) : null}
            <Spacer>
                <Button
                    // Whenever the user presses the 'sign up' button, we are gonna call 'signup' passing in the current 'email' and 'password' pieces of state we set up above
                    title={submitButtonText}
                    onPress={
                        () => onSubmit({ email, password })
                    }
                />
            </Spacer>
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
    },
});

export default AuthForm;