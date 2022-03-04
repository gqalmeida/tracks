import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_tracks':
            return action.payload;
        default:
            return state;
    }
};

// Fetch tracks tied to some user
const fetchTracks = dispatch => async () => {
    // Inside of 'response' there is the 'data' property - an array of objects, which each object is a track the user has created
    const response = await trackerApi.get('/tracks');
    dispatch({ type: 'fetch_tracks', payload: response.data });
};
// Take a name and list of locations and set them off to the backend API
const createTrack = dispatch => async (name, locations) => {
    await trackerApi.post('/tracks', { name, locations });
};

// Export 'Provider' and 'Context' from 'createDataContext
export const { Provider, Context } = createDataContext(
    // Reducer
    trackReducer,
    // Object with actions functions
    { fetchTracks, createTrack },
    // Initial state value
    []
)
