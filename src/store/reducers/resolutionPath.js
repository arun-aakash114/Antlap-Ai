import { createSlice } from "@reduxjs/toolkit";
let initialState = [
    [//solution
        {
            bom: [
                {
                    PartNo: '',
                    qty: '',
                    partDesc: '',
                    supportDoc: [],
                    notes: []
                }
            ],


            step: [//card
                {
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
                    reqSplTools: [
                        {
                            checked: false,
                            partNo: '',
                            partDesc: '',
                            qty: ''
                        }
                    ],
                    reqSplToolsDoc: [],
                    supportDoc: [],
                    notes: '',
                    photo: [],
                    video: [],
                }

            ]
        }


    ]
]

export const resolutionPath = createSlice({
    name: 'resolutionPath',
    initialState: [],
    reducers: {
        addcommonToolsDoc: (state, action) => {
            let { sollutionIndex, stepIndex, val } = action.payload
            state[sollutionIndex][0].step[stepIndex].commonToolsDoc.push(val)
        },
        addSolution: (state, action) => {
            state.push(
                [//solution
                    {
                        bom: [
                            {
                                PartNo: '',
                                qty: '',
                                partDesc: '',
                                supportDoc: [],
                                notes: []
                            }
                        ],


                        step: [//card
                            {
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
                                reqSplTools: [
                                    {
                                        checked: false,
                                        partNo: '',
                                        partDesc: '',
                                        qty: ''
                                    }
                                ],
                                supportDoc: [],
                                notes: '',
                                photo: [],
                                video: [],



                            }

                        ]
                    }


                ]
            )
        },
        addStep: (state, action) => {
            state[action.payload.index][0].step.push(
                {
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
                    reqSplTools: [
                        {
                            checked: false,
                            partNo: '',
                            partDesc: '',
                            qty: ''
                        }
                    ],
                    supportDoc: [],
                    notes: '',
                    photo: [],
                    video: [],
                    substep: []

                }
            )
        },
        addmoreInCommonTools: (state, action) => {
            let { sollutionIndex, stepIndex } = action.payload;
            state[sollutionIndex][0].step[stepIndex].commonTools.push(
                {
                    checked: false,
                    partNo: '',
                    partDesc: '',
                    qty: ''
                }
            )
        },
        addmoreInSpecialTools: (state, action) => {
            let { sollutionIndex, stepIndex } = action.payload;
            state[sollutionIndex][0].step[stepIndex].reqSplTools.push(
                {
                    checked: false,
                    partNo: '',
                    partDesc: '',
                    qty: ''
                }
            )
        },
        checkboxclick: (state, action) => {
            let { sollutionIndex, stepIndex, lineIndex, val } = action.payload
            state[sollutionIndex][0].step[stepIndex].commonTools[lineIndex].checked = val
        },
        checkboxclickSplTools: (state, action) => {
            let { sollutionIndex, stepIndex, lineIndex, val } = action.payload
            state[sollutionIndex][0].step[stepIndex].reqSplTools[lineIndex].checked = val
        },

        deleteCommonTools: (state, action) => {
            let { sollutionIndex, stepIndex } = action.payload
            state[sollutionIndex][0].step[stepIndex].commonTools.forEach((row, i) => {
                if (row.checked) {
                    state[sollutionIndex][0].step[stepIndex].commonTools.splice(i, 1)
                }
            })

        },
        deleteCommonToolsSpl: (state, action) => {
            let { sollutionIndex, stepIndex } = action.payload
            state[sollutionIndex][0].step[stepIndex].reqSplTools.forEach((row, i) => {
                if (row.checked) {
                    state[sollutionIndex][0].step[stepIndex].reqSplTools.splice(i, 1)
                }
            })

        },
        commonToolsChange: (state, action) => {
            let { sollutionIndex, stepIndex, lineIndex, val, field } = action.payload
            state[sollutionIndex][0].step[stepIndex].commonTools[lineIndex][`${field}`] = val

        },
        commonToolsChangeSpl: (state, action) => {
            let { sollutionIndex, stepIndex, lineIndex, val, field } = action.payload
            state[sollutionIndex][0].step[stepIndex].reqSplTools[lineIndex][`${field}`] = val

        },
        pathDataChange: (state, action) => {
            let { sollutionIndex, stepIndex, val, field } = action.payload
            state[sollutionIndex][0].step[stepIndex][`${field}`] = val

        }
    }
})


export const { commonToolsChangeSpl, addmoreInSpecialTools, addSolution, deleteCommonToolsSpl, checkboxclickSplTools, pathDataChange, addcommonToolsDoc, commonToolsChange, deleteCommonTools, addStep, checkboxclick, addmoreInCommonTools } = resolutionPath.actions
export default resolutionPath.reducer