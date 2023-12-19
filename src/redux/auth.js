import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  whoLogin: "",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    whoIsLogin: (state, action) => {
      state.whoLogin = action.payload;
    },
  },
})

export default authSlice.reducer
export const { setUser , whoIsLogin} = authSlice.actions
