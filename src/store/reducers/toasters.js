
import { createSlice } from '@reduxjs/toolkit'

export const toaster = createSlice({
    name: 'toaster',
    initialState: {
        toast: false,
        loader: false,
        valide: false,
        match: false,
        declineState: false,
        clearForm: false,
        reasonopen: false,
    },
    reducers: {
        updateToast: (state, action) => {
            let { field } = action.payload

            switch (field) {
                case 'model_prefix':
                    state.toast = true;
                    break;
                case 'clearForm':
                    state.clearForm = true;
                    break;
                case 'declineState':
                    state.declineState = true;
                    break;
                case 'loader':
                    state.loader = true;
                    break;
                case 'reasonopen':
                    state.reasonopen = true;
                    break;
                case 'reasonRevert':
                    state.reasonopen = false
                    break;
                case 'revertLoader':
                    state.loader = false
                    break;
                case 'match':
                    state.match = true
                    break;
                case 'revertMatch':
                    state.match = false
                    break;
                case 'valid':
                    state.valide = true
                    break;
                case 'revert_valid':
                    state.valide = false
                    break;
                default:
                    return false
            }

        },
        revertToast: (state) => {
            state.toast = false
        },
        revertDec: (state) => {
            state.declineState = false
        },
        revertDiscard: (state) => {
            state.clearForm = false
        }
    }
});

export const { updateToast,revertDiscard, revertToast, revertDec } = toaster.actions;

export default toaster.reducer