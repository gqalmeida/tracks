import { useContext } from "react";
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { useNavigation } from '@react-navigation/native';

export default () => {
    const { createTrack } = useContext(TrackContext);
    const navigation = useNavigation();
    
    const { 
        state: { locations, name },
        reset
    } = useContext(LocationContext);

    // A function to take the name, locations of the track and make a request to the backend API
    const saveTrack = async () => {
        // Wait for the request to be made successfully
        await createTrack(name, locations);
        reset();
        navigation.navigate('TrackListScreen');
    };

    // Convention: from a hook, return an array that has some value inside of it
    return[saveTrack];
};