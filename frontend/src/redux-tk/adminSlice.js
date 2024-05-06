import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
  name: 'admin',
  initialState:{admin:JSON.parse(localStorage.getItem('adminTkn')) ?? null},
  reducers: {
    loginAdmin: (state, action) => {
        state.admin = action.payload
        localStorage.setItem("adminTkn", JSON.stringify(action.payload))
    },
    logoutAdmin: (state, action) => {
        state.admin = action.payload
        localStorage.setItem("adminTkn", JSON.stringify(action.payload))
    },
  },
})

export const { loginAdmin, logoutAdmin } = adminSlice.actions

export default adminSlice.reducer