import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../auth/types/userTypes";
import UserApi from "./api/UserApi";

type StateUsers = {
    users: User[];
  };
  const initialState: StateUsers = {
    users: [],
  };
  
  export const getUsersThunk = createAsyncThunk('load/users', () => UserApi.getAllUser());

  
  const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getUsersThunk.fulfilled, (state, action) => {
          state.users = action.payload
        })
    }
})

export default usersSlice