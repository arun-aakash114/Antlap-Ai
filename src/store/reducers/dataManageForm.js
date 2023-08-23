import { createSlice } from "@reduxjs/toolkit";

const initState = {
    serialNumber: '',
    modelPrefix: [],
    serialNoRange: '',
    complaintDescripton: '',
    faultCode: [{
        code: '',
        desc: ''
    }],
    problemCode: [{
        code: '',
        desc: ''
    }],
    smcsCode: [{
        desc: ''
    }]
}


export const dataForm = createSlice({
    name: 'dataForm',
    initialState: initState,
    reducers: {
        clearState: (state) => {
            state.complaintDescripton = '';
            state.serialNumber = '';
            state.serialNoRange = '';
            state.modelPrefix = [];
            state.faultCode = [{
                code: '',
                desc: ''
            }];
            state.problemCode = [{
                code: '',
                desc: ''
            }];
            state.smcsCode = [{
                desc: ''
            }];
        },
        updateParams : (state,action) => {
            let { value } = action.payload
            state.serialNoRange = value.serialNoRange
            state.modelPrefix = value.modelPrefix
            state.serialNumber = value.serialNumber
            state.complaintDescripton = value.complaintDescripton
            state.faultCode = value.faultCode
            state.problemCode = value.problemCode
            state.smcsCode = value.smcsCode
        },
        updateForm: (state, action) => {
            let { field, value } = action.payload

            switch (field) {
                case 'serial_number':
                    state.serialNumber = value
                    break;
                case 'model_prefix':
                    state.modelPrefix = value
                    break;
                case 'serial_no_range':
                    state.serialNoRange = value
                    break;
                case 'complaint_desc':
                    state.complaintDescripton = value
                    break;
                default:
                    return state;
            }
        },
        removeElement: (state, action) => {
            switch (action.payload.field) {
                case 'smcs':
                    state.smcsCode.splice(action.payload.index, 1)
                    break;
                case 'faultCode':
                    state.faultCode.splice(action.payload.index, 1)
                    break;
                case 'problemCode':
                    state.problemCode.splice(action.payload.index, 1)
                    break;
                default:
                    return state;
            }
        },
        addElement: (state, action) => {
            switch (action.payload.field) {
                case 'smcs':
                    state.smcsCode.push({ desc: '' })
                    break;
                case 'faultCode':
                    state.faultCode.push({
                        code: '',
                        desc: ''
                    })
                    break;
                case 'problemCode':
                    state.problemCode.push({
                        code: '',
                        desc: ''
                    })
                    break;
                default:
                    return state;
            }
        },
        updateFaultCode: (state, action) => {
            let { index, field, val } = action.payload
            if (field === 'code') {

                state.faultCode[index].code = val;
            } else {
                state.faultCode[index].desc = val;
            }
        },
        updateProblemCode: (state, action) => {
            let { index, field, val } = action.payload
            if (field === 'code') {
                state.problemCode[index].code = val
            } else {
                state.problemCode[index].desc = val;
            }
        },
        updateSMCSCode: (state, action) => {
            let { index, desc } = action.payload
            state.smcsCode[index].desc = desc;
        }
    }
})

export const { updateForm, addElement, removeElement, updateFaultCode, clearState,updateParams, updateProblemCode, updateSMCSCode } = dataForm.actions
export default dataForm.reducer