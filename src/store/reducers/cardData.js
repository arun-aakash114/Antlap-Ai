import { createSlice } from "@reduxjs/toolkit";
const initState = {
    Resolutions: '',
    CommonTools: [
        {
            checked: false,
            PartsNo: '',
            PartsDescription: '',
            Quantity: ''
        }
    ],
    PartNumberSupportingDocument: [],
    PartNumberSupportingDocumentURL: [],
    RequiredSpecialTools: [
        {
            checked: false,
            PartsNo: '',
            PartsDescription: '',
            Quantity: ''
        }
    ],
    PartNumberSupportingDocumentRspl: [],
    PartNumberSupportingDocumentRsplURL: [],
    SupportingDocument: [],
    SupportingDocumentURL: [],
    Note: '',
    Photo: [],
    PhotoURL: [],
    Video: [],
    VideoURL: [],
    NoteDocument: [],
    NoteDocumentURL: []
}
// NOSONAR Start
export const cardData = createSlice({
    name: 'commonresolutionPath',
    initialState: initState,
    reducers: {
        addData: (state, action) => {
            let { field, value, } = action.payload;

            if (field === "Resolutions") {
                state.Resolutions = value
            }
            else if (field === 'Note') {
                state.Note = value
            }
            else if (field === 'Photo') {
                if (value.length !== 0) {
                    value.forEach((arr) => {
                        state.Photo.push(arr)
                    })
                }
            }
            else if (field === 'PhotoURL') {
                if (value.length !== 0) {
                    value.forEach((arr) => {
                        state.PhotoURL.push(arr)
                    })
                }
            }
            else if (field === 'NoteDocument') {
                if (value.length !== 0) {
                    value.forEach((arr) => {
                        state.NoteDocument.push(arr)
                    })
                }
            }
            else if (field === 'NoteDocumentURL') {
                if (value.length !== 0) {
                    value.forEach((arr) => {
                        state.NoteDocumentURL.push(arr)
                    })
                }
            }
            else if (field === 'SupportingDocument') {
                if (value.length !== 0) {
                    value.forEach((arr) => {
                        state.SupportingDocument.push(arr)
                    })
                }
            }
            else if (field === 'SupportingDocumentURL') {
                if (value.length !== 0) {
                    value.forEach((arr) => {
                        state.SupportingDocumentURL.push(arr)
                    })
                }
            }
            else if (field === 'PartNumberSupportingDocumentRspl') {
                if (value.length !== 0) {
                    value.forEach((arr) => {
                        state.PartNumberSupportingDocumentRspl.push(arr)
                    })
                }
            }
            else if (field === 'PartNumberSupportingDocumentRsplURL') {
                if (value.length !== 0) {
                    value.forEach((arr) => {
                        state.PartNumberSupportingDocumentRsplURL.push(arr)
                    })
                }
            }
            else if (field === 'PartNumberSupportingDocument') {
                if (value.length !== 0) {
                    value.forEach((arr) => {
                        state.PartNumberSupportingDocument.push(arr)
                    })
                }
            }
            else if (field === 'PartNumberSupportingDocumentURL') {
                if (value.length !== 0) {
                    value.forEach((arr) => {
                        state.PartNumberSupportingDocumentURL.push(arr)
                    })
                }
            }
            else if (field === 'VideoURL') {
                if (value.length !== 0) {
                    value.forEach((arr) => {
                        state.VideoURL.push(arr)
                    })
                }
            }
            else {
                if (value.length !== 0) {
                    value.forEach((arr) => {
                        state.Video.push(arr)
                    })
                }
            }

        },
        addRow: (state, action) => {
            let { field } = action.payload
            if (field === 'CommonTools') {
                state.CommonTools.push(
                    {
                        checked: false,
                        PartsNo: '',
                        PartsDescription: '',
                        Quantity: ''
                    }
                )
            } else {
                state.RequiredSpecialTools.push(
                    {
                        checked: false,
                        PartsNo: '',
                        PartsDescription: '',
                        Quantity: ''
                    }
                )
            }
        },
        deleteRow: (state, action) => {
            let { field } = action.payload
            if (field === 'CommonTools') {
                const filteredData = state.CommonTools.filter((item) => item.checked !== true);
                state.CommonTools = filteredData

            } else {
                const filteredData = state.RequiredSpecialTools.filter((item) => item.checked !== true);
                state.RequiredSpecialTools = filteredData

            }
        },
        updateData: (state, action) => {
            let { value } = action.payload
            state.Resolutions = value[0].Resolutions
            state.Note = value[0].Note
            state.NoteDocumentURL = value[0].NoteDocument.length ? value[0].NoteDocument : []
            state.PhotoURL = value[0].Photo
            state.VideoURL = value[0].Video
            state.SupportingDocumentURL = value[0].SupportingDocument
            state.PartNumberSupportingDocumentURL = value[0].PartNumberSupportingDocument ? value[0].PartNumberSupportingDocument : []
            state.CommonTools = value[0].CommonTools !== "" ? value[0].CommonTools : state.CommonTools
            state.PartNumberSupportingDocumentRsplURL = value[0].PartNumberSupportingDocumentRspl ? value[0].PartNumberSupportingDocumentRspl : []
            state.RequiredSpecialTools = value[0].RequiredSpecialTools !== "" ? value[0].RequiredSpecialTools : state.RequiredSpecialTools
        },
        deleteURL: (state, action) => {
            let { name, index } = action.payload
            state[name].splice(index, 1)
        },
        checkboxclick: (state, act) => {
            let { lineIndex, value, field } = act.payload;
            if (field === 'CommonTools') {
                state.CommonTools[lineIndex].checked = value
            } else {
                state.RequiredSpecialTools[lineIndex].checked = value
            }
        },
        commonToolsData: (state, action) => {
            let { value, rowIndex, column } = action.payload;

            state.CommonTools[rowIndex][`${column}`] = value
        },
        specialToolsData: (state, action) => {
            let { value, rowIndex, column } = action.payload

            state.RequiredSpecialTools[rowIndex][`${column}`] = value
        },
        clearData: (state) => {
            state.CommonTools = initState.CommonTools;
            state.Note = initState.Note;
            state.NoteDocument = initState.NoteDocument;
            state.PartNumberSupportingDocument = initState.PartNumberSupportingDocument;
            state.PartNumberSupportingDocumentRspl = initState.PartNumberSupportingDocumentRspl;
            state.Photo = initState.Photo;
            state.RequiredSpecialTools = initState.RequiredSpecialTools;
            state.Resolutions = initState.Resolutions;
            state.SupportingDocument = initState.SupportingDocument;
            state.Video = initState.Video;
            state.PartNumberSupportingDocumentURL = initState.PartNumberSupportingDocumentURL;
            state.PartNumberSupportingDocumentRsplURL = initState.PartNumberSupportingDocumentRsplURL;
            state.SupportingDocumentURL = initState.SupportingDocumentURL;
            state.PhotoURL = initState.PhotoURL;
            state.VideoURL = initState.VideoURL;
            state.NoteDocumentURL = initState.NoteDocumentURL;
        },
        getDataForApi: (state) => {
            state.CommonTools.forEach((row) => {
                delete row.checked
            });
            state.RequiredSpecialTools.forEach((row) => {
                delete row.checked
            })
        },
        updateFiles: (state, action) => {
            const data = state[action.payload.key1];
            const dataURL = state[action.payload.key2];
            const index = data.findIndex((e) => e === action.payload.file);
            data.splice(index, 1);
            dataURL.splice(index, 1);
            state[action.payload.key1] = data;
            state[action.payload.key2] = dataURL;
        },
    }
})
// NOSONAR End

export const { addData, addRow, getDataForApi, deleteRow, checkboxclick, commonToolsData, specialToolsData, clearData, updateData, deleteURL, updateFiles } = cardData.actions
export default cardData.reducer