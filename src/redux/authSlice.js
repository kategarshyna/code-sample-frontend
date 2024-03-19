import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const logoutAPI = async () => {
    //TODO call logout API
    return true;
};

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    try {
        await logoutAPI();
        dispatch({ type: 'auth/logout' });
    } catch (error) {
        console.error('Logout failed:', error.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        loginSuccess: (state) => {
            state.isLoggedIn = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
        });
    },
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
