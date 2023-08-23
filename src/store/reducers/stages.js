import { createSlice } from "@reduxjs/toolkit";

export const stages = createSlice({
    name: 'stages',
    initialState: {
        stage: 'starting',
        stepIndex: 0,
        subStepIndex: 0,
        cursor : 0,
        disableSave: true
    },
    reducers: {
        addStep: (state) => {
            state.stage = 'Step';
            state.stepIndex = state.stepIndex + 1
            state.subStepIndex = 0
        },
        addSubStep: (state) => {
            state.stage = 'Sub Step';
            state.subStepIndex = state.subStepIndex + 1

        },
        changeStage: (state, action) => {
            state.stage = action.payload
        },
        revertStepAndSubStep: (state) => {
            state.stepIndex = 0;
            state.subStepIndex = 0
        },
        setCursor: (state,action) => {
            state.cursor = action.payload
        },
        disableSave: (state, action) =>{
            state.disableSave = action.payload
        }
    }
})

export const { addStep, addSubStep, revertStepAndSubStep,changeStage,setCursor, disableSave } = stages.actions
export default stages.reducer