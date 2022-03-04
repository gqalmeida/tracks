import React, { useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { ListItem } from "react-native-elements";
import { useIsFocused } from '@react-navigation/native';
import { Context as TrackContext } from "../context/TrackContext";

const TrackListScreen = ({ navigation }) => {
    const { state, fetchTracks } = useContext(TrackContext);
    const isFocused = useIsFocused();

    console.log(state._id);

    useEffect(() => {
        if(isFocused) {
            fetchTracks();
        }
    },[isFocused]);

    return <>
        <SafeAreaView>
            <Text style={{ fontSize: 48 }}>Track List Screen</Text>
            <FlatList
                data={state}
                keyExtractor={(item) => { return item._id }}
                renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => 
                            navigation.navigate('TrackDetailScreen', { _id: item._id })
                        }
                    >
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                    </TouchableOpacity>
                );
                }}
            />
        </SafeAreaView>
    </>
};

const styles = StyleSheet.create({});

export default TrackListScreen;