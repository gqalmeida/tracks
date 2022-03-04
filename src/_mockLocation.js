import * as Location from 'expo-location';

// This represents 10 meters in both longitude and latitude
const tenMetersWithDegrees = 0.0001;

// increment === counter variable
const getLocation = increment => {
    // Fake location reading
    return {
        timestamp: 1000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            // Over time, add 10 meters, 10 meters and so on.
            longitude: -50.2631767 + increment * tenMetersWithDegrees,
            latitude: -29.8952243 + increment * tenMetersWithDegrees
        }
    };
};
// Whenever we import this file into our project, we are gonna emit an event into the location library
let counter = 0;
setInterval(() => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        // 'location' is gonna have our fake location, that is gonna be changing once every second (once every second the location is gonna change by 10 meters)
        location: getLocation(counter)
    });
    counter++;
}, 1000);
// Run this function once every one second (1000 milliseconds)