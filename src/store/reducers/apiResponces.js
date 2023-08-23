import { createSlice } from "@reduxjs/toolkit";

export const apiResponce = createSlice({
    name: 'apiResponce',
    initialState: {
        directsearchlength: [],
        viewList: [],
        aisearchlength: []
    },
    reducers: {
        updateResponce: (state, action) => {
            let { field, value } = action.payload

            if (field === 'directsearchlength') {
                state.directsearchlength = value
            } else if (field === 'aisearchlength') {
                state.aisearchlength = value
            } else if (field === 'viewList') {
                state.viewList = value
            }
        }
    }
})

export const { updateResponce } = apiResponce.actions
export default apiResponce.reducer