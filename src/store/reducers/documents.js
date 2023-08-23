import { createSlice } from "@reduxjs/toolkit";

export const documents = createSlice({
    name: 'document',
    initialState: {
        video: [],
        photo: [],
        bom: [],
        commonToolsDoc: [],
        reqSplToolsDoc: [],
        notes: [],
        supportDoc: []
    },
    reducers: {
        addDocument: (state, action) => {
            let { field, data } = action.payload
            switch (field) {
                case 'video':
                    state.video.push(data)
                    break;
                case 'photo':
                    state.photo.push(data)
                    break;
                case 'bom':
                    state.bom.push(data)
                    break;
                case 'notes':
                    state.notes.push(data)
                    break;
                case 'commonToolsDoc':
                    state.commonToolsDoc.push(data)
                    break;
                case 'reqSplToolsDoc':
                    state.reqSplToolsDoc.push(data)
                    break;
                case 'supportDoc':
                    state.supportDoc.push(data)
                    break;
                default:
                    return state
            }
        }
    }
})

export const { addDocument } = documents.actions;
export default documents.reducer