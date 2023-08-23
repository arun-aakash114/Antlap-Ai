import { createSlice } from "@reduxjs/toolkit";

export const commonresolutionPath = createSlice({
    name: 'commonresolutionPath',
    initialState: [[
        {
            icon: {

                generalRes: '',
                commonTools: [
                    {
                        checked: false,
                        partNo: '',
                        partDesc: '',
                        qty: ''
                    }
                ],
                commonToolsDoc: [],
                reqSplTools: '',
                supportDoc: [],
                notes: '',
                photo: [],
                video: [],
            }
        }
    ]
    ],
    reducers: {
        commonaddSolution: (state, action) => {
            state.push(
                [
                    {
                        icon: {

                            generalRes: '',
                            commonTools: [
                                {
                                    checked: false,
                                    partNo: '',
                                    partDesc: '',
                                    qty: ''
                                }
                            ],
                            commonToolsDoc: [],
                            reqSplTools: '',
                            supportDoc: [],
                            notes: '',
                            photo: [],
                            video: [],
                        }
                    }
                ]
            )
        },
        commonaddsubStep: (state, action) => {
            state[action.payload.index].push(
                {
                    icon: {
                        generalRes: '',
                        commonTools: [
                            {
                                checked: false,
                                partNo: '',
                                partDesc: '',
                                qty: ''
                            }
                        ],
                        commonToolsDoc: [],
                        reqSplTools: '',
                        supportDoc: [],
                        notes: '',
                        photo: [],
                        video: [],
                    }
                }
            )
        },
        commonaddmoreInCommonTools: (state, action) => {
            let { sollutionIndex, stepIndex } = action.payload;
            state[sollutionIndex][stepIndex].icon.commonTools.push(
                {
                    checked: false,
                    partNo: '',
                    partDesc: '',
                    qty: ''
                }
            )
        },
        commoncheckboxclick: (state, action) => {
            let { sollutionIndex, stepIndex, lineIndex, val } = action.payload
            state[sollutionIndex][stepIndex].icon.commonTools[lineIndex].checked = val
        },

        commondeleteCommonTools: (state, action) => {
            let { sollutionIndex, stepIndex } = action.payload
            state[sollutionIndex][stepIndex].icon.commonTools.forEach((row, i) => {
                if (row.checked) {
                    state[sollutionIndex][stepIndex].icon.commonTools.splice(i, 1)
                }
            })

        },
        commoncommonToolsChange: (state, action) => {
            let { sollutionIndex, stepIndex, lineIndex, val, field } = action.payload
            state[sollutionIndex][stepIndex].icon.commonTools[lineIndex][`${field}`] = val

        },
        commonpathDataChange: (state, action) => {
            let { sollutionIndex, stepIndex, val, field } = action.payload
            state[sollutionIndex][stepIndex].icon[`${field}`] = val
            if (field === 'video') {
                state[sollutionIndex][stepIndex].icon.video.push(val);
            } else if (field === 'photo') {
                state[sollutionIndex][stepIndex].icon.photo.push(val)
            } else if (field === 'commonToolsDoc') {
                state[sollutionIndex][stepIndex].icon.commonToolsDoc.push(val)
            } else {
                state[sollutionIndex][stepIndex].icon.supportDoc.push(val)
            }
        }
    }
})


export const { commonaddSolution, commonpathDataChange, commoncommonToolsChange, commondeleteCommonTools, commonaddsubStep, commoncheckboxclick, commonaddmoreInCommonTools } = commonresolutionPath.actions
export default commonresolutionPath.reducer