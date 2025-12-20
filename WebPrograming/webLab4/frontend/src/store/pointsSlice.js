import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/points';

export const fetchPoints = createAsyncThunk('points/fetchPoints', async () => {
    const response = await axios.get(API_URL);
    return response.data; // List<PointResponse>
});

export const addPoint = createAsyncThunk('points/addPoint', async (point) => {
    const response = await axios.post(API_URL, point);
    return response.data;
});

const pointsSlice = createSlice({
    name: 'points',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPoints.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addPoint.fulfilled, (state, action) => {
                state.items.unshift(action.payload); // Add new point to start
            })
            .addCase(addPoint.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export default pointsSlice.reducer;
