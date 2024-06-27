import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserSliceDetails = {
    token?: string | undefined | null,
    isLoggedIn?: boolean
}

let initialState: UserSliceDetails = {
    token: '',
    isLoggedIn: false
}


let userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        setLoginStatus: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setLogout:(state)=>{
            state.token = null;
            state.isLoggedIn = false;
        }

    }
})

export const { setToken, setLoginStatus,setLogout } = userSlice.actions;

export default userSlice.reducer;