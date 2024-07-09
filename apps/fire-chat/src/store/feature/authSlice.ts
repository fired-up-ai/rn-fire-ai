import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth'

interface AuthState {
    user: User | null;
    idToken: string | null;
}

const initialState: AuthState = {
    user: null,
    idToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
            console.log('User set:', state.user);
        },
        setIdToken(state, action: PayloadAction<string | null>) {
            state.idToken = action.payload;
            console.log('ID token set:', state.idToken);
        },
        clearAuth(state) {
            state.user = null;
            state.idToken = null;
        },
    },
});

export const { setUser, setIdToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;