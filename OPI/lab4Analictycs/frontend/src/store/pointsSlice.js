import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.BASE_URL}api/points`.replace('//', '/');

export const fetchPoints = createAsyncThunk('points/fetchPoints', async () => {
    const response = await axios.get(API_URL);
    return response.data;
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
    reducers: {
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPoints.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchPoints.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                if (action.error.message.includes("401")) {
                    window.location.href = import.meta.env.BASE_URL;
                }
            })
            .addCase(addPoint.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(addPoint.rejected, (state, action) => {
                state.error = action.error.message;
                if (action.error.message.includes("401")) {
                    alert("Session expired. Please login again.");
                    window.location.href = import.meta.env.BASE_URL;
                }
            });
    }
});

export const { clearError } = pointsSlice.actions;
export default pointsSlice.reducer;
