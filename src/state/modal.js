import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'SET_MODAL',
  initialState : {open: false, content: ""},
  reducers: {
      setModal : (state, action)=> action.payload
  }
})

export const { setModal } = modalSlice.actions
export default modalSlice.reducer