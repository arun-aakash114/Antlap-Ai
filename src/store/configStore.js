import { configureStore } from '@reduxjs/toolkit'
import knowledgeFormReducer from './reducers/knowledgeBaseForm'
import toasterReducer from './reducers/toasters'
import apiReducer from './reducers/apiResponces'
import dataForm from './reducers/dataManageForm'
import resolutionPath from './reducers/resolutionPath'
import commonresolutionPath from './reducers/commonresolutionPath'
import documents from './reducers/documents'
import substeps from './reducers/substeps'
import cardData from './reducers/cardData'
import stages from './reducers/stages'
import bomData from './reducers/bomData'

export default configureStore(
    {
        reducer: {
            knowledgeForm: knowledgeFormReducer,
            toaster: toasterReducer,
            apiResponce: apiReducer,
            dataForm: dataForm,
            resolutionPath: resolutionPath,
            commonresolutionPath: commonresolutionPath,
            documents: documents,
            substep: substeps,
            stages: stages,
            bomData: bomData,
            cardData: cardData
        }
    }
)