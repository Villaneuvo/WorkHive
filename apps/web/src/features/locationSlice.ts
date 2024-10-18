import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to handle reverse geocoding
export const fetchReverseGeocode = createAsyncThunk(
    'location/fetchReverseGeocode',
    async ({ lat, lng }: { lat: number; lng: number }, { rejectWithValue }) => {
        try {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
            );
            const data = await response.json();
            if (data.status === 'OK') {
                const city = data.plus_code.compound_code.split(',')[1].trim();
                return city;
            } else {
                return rejectWithValue('Failed to get location details');
            }
        } catch (error) {
            return rejectWithValue('Reverse geocoding failed');
        }
    }
);

type LocationState = {
    location: { lat: number; lng: number } | null;
    error: string | null;
    city: string | null;
    isLoading: boolean;
};

const initialState: LocationState = {
    location: null,
    error: null,
    city: null,
    isLoading: false,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation(state, action) {
            state.location = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReverseGeocode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchReverseGeocode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.city = action.payload;
            })
            .addCase(fetchReverseGeocode.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setLocation, setError } = locationSlice.actions;
export default locationSlice.reducer;
