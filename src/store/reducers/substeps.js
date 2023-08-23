import { createSlice } from "@reduxjs/toolkit";


export const substep = createSlice({
    name: 'substep',
    initialState: [],
    reducers: {
        addSubStep: (state, action) => {
            state.push(action.payload.data)
        },
        commonToolsSubStep: (state, action) => {
            let { value, resolutionIndex, cardIndex, field, lineIndex } = action.payload
            for (let row in state) {
                if (row.resolutionIndex === resolutionIndex && row.cardIndex === cardIndex) {
                    row.data.commonTools[lineIndex][`${field}`] = value
                }
            }
        },
        specialToolSubStep: (state, action) => {
            let { value, resolutionIndex, cardIndex, field, lineIndex } = action.payload
            for (let row of state) {
                if (row.resolutionIndex === resolutionIndex && row.cardIndex === cardIndex) {
                    row.data.reqSplTools[lineIndex][`${field}`] = value
                }
            }
        },
        substepDataChange: (state, action) => {
            let { value, resolutionIndex, cardIndex, field } = action.payload;
            for (let row of state) {
                if (row.resolutionIndex === resolutionIndex && row.cardIndex === cardIndex) {
                    row.data[`${field}`] = value
                }
            }

        }
    }
})

export const { addSubStep } = substep.actions;
export default substep.reducer;