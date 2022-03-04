import '../_mockLocation';
import React, { useContext, useCallback } from "react";
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements'
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from '@react-navigation/native';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const TrackCreateScreen = () => { 
    const { state: { recording }, addLocation } = useContext(LocationContext);
    const callback = useCallback((location) => {
        // Calling 'addLocation'
        addLocation(location, recording)
        // Only give a new version of the callback function whenever 'recording' changes
    }, [recording]);
    // Communicating 'useIsFocused' into 'useLocation' hook
    // 'useIsFocused' and 'recording': if it's true, we want to start off location tracking, if it's false, stop tracking altogether
    // Pass in the resulting callback into 'useLocation' 
    const [err] = useLocation(useIsFocused() || recording, callback);

    return (
        <SafeAreaView>
            <Text h2>
                Create a Track
            </Text>
            <Map />
            {err && <Text>Please enable location services</Text>}
            <TrackForm />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default TrackCreateScreen;