import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
   
  },
})

export default authSlice.reducer
export const { setUser } = authSlice.actions
