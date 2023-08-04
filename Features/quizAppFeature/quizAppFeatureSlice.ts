import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  name: string;
  email: string;
  phoneNo: number | string;
  preferedLanguage: number;
  cofq1: boolean;
  cofq2: boolean;
  cofq3: boolean;
  cofq4: boolean;
  cofq5: boolean;
  marksScored: number;
  TotalMarks: number;
  idReceived: number;
  receiveString: string;
};
const initialState: initialStateType = {
  name: "",
  email: "",
  phoneNo: 0,
  preferedLanguage: 0,
  cofq1: false,
  cofq2: false,
  cofq3: false,
  cofq4: false,
  cofq5: false,
  marksScored: 0,
  TotalMarks: 11,
  idReceived: 0,
  receiveString: "",
};

// Number({preferedLanguage})
const quizAppSlice = createSlice({
  name: "locationmapView",
  initialState,
  reducers: {
    addCandidateInfo(
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        phoneNo: string;
        preferedLanguage: string;
      }>
    ) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phoneNo = action.payload.phoneNo;
      state.preferedLanguage = Number(action.payload.preferedLanguage);
      // console.log(state)
    },
    viewResults() {},
    questionAttempted(
      state,
      action: PayloadAction<{ idReceived: number; receiveString: string }>
    ) {
      const str: string = action.payload.receiveString;
      if (str == "Badminton" || str == "badminton") {
        state.marksScored = state.marksScored + 1;
        state.cofq3 = true;
      }

      switch (action.payload.idReceived) {
        case 0:
          state.cofq1 = true;
          // console.log(state.cofq1)
          break;
        case 1:
          state.cofq2 = true;
          break;
        case 2:
          state.cofq3 = true;
          break;
        case 3:
          state.cofq4 = true;
          break;
        case 4:
          state.cofq5 = true;
          break;
        default:
          break;
      }
      console.log("Current scored marks", state.marksScored);
      // if (action.payload.idReceived==0) {
      //  state.cofq1 = true
      //  console.log('hey im here', state.cofq1)
      // }
    },
    updateMarksScored(
      state,
      action: PayloadAction<{ idReceived: number; receiveString: string }>
    ) {
      switch (action.payload.idReceived) {
        case 0:
          state.cofq1 = true;
          // console.log(state.cofq1)
          break;
        case 1:
          state.cofq2 = true;
          break;
        case 2:
          state.cofq3 = true;
          break;
        case 3:
          state.cofq4 = true;
          state.marksScored= state.marksScored +4;
          break;
        case 4:
          state.cofq5 = true;
          break;
        default:
          break;
      }
      state.marksScored = state.marksScored + 1;
      console.log("Current scored marks", state.marksScored);
    },
  },
});

export default quizAppSlice.reducer;
export const {
  addCandidateInfo,
  viewResults,
  questionAttempted,
  updateMarksScored,
} = quizAppSlice.actions;
