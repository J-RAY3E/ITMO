import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/auth'; // Relative path, proxy handles domain

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
});

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
    await axios.post(`${API_URL}/login`, credentials);
    return { username: credentials.username }; // API doesn't return user obj on login, so we infer or fetch.
    // Actually /user returns ID. Login returns 200 OK.
    // Better to fetch user after login or just set auth true.
});

export const registerUser = createAsyncThunk('auth/register', async (credentials) => {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    await axios.post(`${API_URL}/logout`);
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
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
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.status = 'succeeded';
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.status = 'failed';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload; // Optimistic
                state.status = 'succeeded';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.status = 'failed';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
