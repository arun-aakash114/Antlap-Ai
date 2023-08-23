import { createSlice } from "@reduxjs/toolkit";
const initState = []
export const bomData = createSlice({
    name: 'bomData',
    initialState: initState,
    reducers: {
        addData: (state, action) => {
            state.push(action.payload)
        },
        revertState: (state) => {
            state.splice(0, 0)
        }
    }
})


export default bomData.reducer;
export const { addData, revertState } = bomData.actions