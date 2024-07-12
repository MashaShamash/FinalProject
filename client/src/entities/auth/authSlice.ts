import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserWithoutIdWithPassword, UserWithoutName } from "./types/userTypes";
import AuthApi from "./api/AuthApi";



type initialStateType = {
    user: User | undefined;
    accessToken: string | undefined;
    error: string | undefined;
    loading: boolean;
}

const initialState: initialStateType = {
    user: undefined,
    accessToken: undefined,
    error: undefined,
    loading: true,
}

export const getRegistrationThunk = createAsyncThunk('registration/user', (body:UserWithoutIdWithPassword) => AuthApi.registration(body))

export const getAuthorizationThunk = createAsyncThunk('authorization/user', (body:UserWithoutName) => AuthApi.authorization(body))

export const getRefreshTokensThunk = createAsyncThunk('refreshTokens/user', () => AuthApi.refreshTokens())

export const getLogoutThunk = createAsyncThunk('logout/user', () => AuthApi.logout())


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (bilder) => {
        bilder
            .addCase(getRegistrationThunk.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
                state.loading = false
                state.error = undefined
            })
            .addCase(getRegistrationThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getRegistrationThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(getAuthorizationThunk.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
                state.loading = false
                state.error = undefined
            })
            .addCase(getAuthorizationThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getAuthorizationThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(getRefreshTokensThunk.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
            })
            .addCase(getRefreshTokensThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getRefreshTokensThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(getLogoutThunk.fulfilled, (state) => {
                state.user = undefined;
                state.accessToken = undefined
            })
            .addCase(getLogoutThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getLogoutThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export default authSlice