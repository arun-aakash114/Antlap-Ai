import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  serialNumber: "",
  modelPrefix: "",
  modelPrefixStatus: false,
  serialNoRange: "",
  faultCode: "",
  problemCode: "",
  smcsCode: "",
  complaintDescription: "",
};

export const knowledgeForm = createSlice({
  name: "knowledeForm",
  initialState: {
    serialNumber: "",
    modelPrefix: "",
    modelPrefixStatus: false,
    serialNoRange: "",
    faultCode: "",
    problemCode: "",
    smcsCode: "",
    complaintDescription: "",
  },
  reducers: {
    updateForm: (state, action) => {
      let { field, value } = action.payload;

      switch (field) {
        case "serial_number":
          state.serialNumber = value;
          break;
        case "model_prefix":
          state.modelPrefix = value;
          break;
        case "model_status":
          state.modelPrefixStatus = true;
          break;
        case "serial_no_range":
          state.serialNoRange = value;
          break;
        case "fault_code":
          state.faultCode = value;
          break;
        case "problem_code":
          state.problemCode = value;
          break;
        case "smcs_code":
          state.smcsCode = value;
          break;
        case "complaint_description":
          state.complaintDescription = value;
          break;
        default:
          return state;
      }
    },
    resetForm: () => initialState,
  },
});

export const { updateForm, resetForm } = knowledgeForm.actions;
export default knowledgeForm.reducer;
