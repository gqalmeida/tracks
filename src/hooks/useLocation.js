import { useState, useEffect } from "react";
import { 
    Accuracy, 
    requestForegroundPermissionsAsync, 
    watchPositionAsync 
} from "expo-location";

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);

    let subscriber;
    const startWatching = async () => {
        // Requesting permission from the user to track their location
        try {
            const { granted } = await requestForegroundPermissionsAsync();
            subscriber = await watchPositionAsync(
                {
                accuracy: Accuracy.BestForNavigation,
                // Once every second
                timeInterval: 1000,
                // Once every ten meters
                distanceInterval: 10
                }, 
                // Everytime we get an update, we call an action function 'addLocation' inside of LocationProvider
                callback
            );
            if (!granted) {
                throw new Error('Location permission not granted');
            }
        // If they reject it, show an error message
        } catch (e) {
          setErr(e);
        }
    };

    useEffect (() => {
        // If 'shouldTrack' is true, start the watching process
        if (shouldTrack) {
            startWatching();
        } else {
            if (subscriber){
                subscriber.remove();
            }
            subscriber = null;
        }
        return () => {
            // Stop listening to user's location before listening to it again
            if (subscriber){
                subscriber.remove();
            }
        };
    }, [shouldTrack, callback]);
    // Everytime useLocation gets executed(this hook gets executed everytime 'TrackCreateScreen' re renders), React is gonna look at the value of 'shouldTrack'

    return [err];
};