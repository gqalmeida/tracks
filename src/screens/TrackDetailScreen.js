import React, { useContext } from "react";
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as TrackContext } from '../context/TrackContext';

const TrackDetailScreen = ({ navigation }) => {
    const { state } = useContext(TrackContext);

    return <>
    <SafeAreaView>
        <Text style={{ fontSize: 48 }}>hihi</Text>
    </SafeAreaView>
    </>
};

const styles = StyleSheet.create({});

export default TrackDetailScreen;