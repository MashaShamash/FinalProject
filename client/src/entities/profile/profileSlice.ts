import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Profile, ProfileId, ProfileWhizautIdAndWhizautUserId } from "./types/profileTypes";
import ProfileApi from "./api/profileApi";




type initialStateType = {
    profiles: Profile[]
}

const initialState:initialStateType = {
    profiles: []
}


export const getAllProfileThunk = createAsyncThunk('read/profile', () => ProfileApi.getAllProfile())

export const getUpdateProfileThunk = createAsyncThunk('update/profile', (obj: {id:ProfileId, body:ProfileWhizautIdAndWhizautUserId}) => ProfileApi.getUpdateProfile(obj))


const profileSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {},
    extraReducers: (bilder) => {
        bilder
            .addCase(getAllProfileThunk.fulfilled, (state, action) => {
                state.profiles = action.payload
            })
            .addCase(getUpdateProfileThunk.fulfilled, (state, action) => {
                state.profiles = state.profiles.map(el => el.id === action.payload.id ? action.payload : el)
            })
    }
})


export default profileSlice