import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isReady: false,
    isTestComplete: false,
};

export const assessmentSlice = createSlice({
    name: "assessment",
    initialState,
    reducers: {
        setReady: (state) => {
            state.isReady = true;
        },
        setTestComplete: (state) => {
            state.isTestComplete = true;
        },
    },
});

export const { setReady, setTestComplete } = assessmentSlice.actions;

export const selectIsReady = (state) => state.assessment.isReady;
export const selectIsTestComplete = (state) => state.assessment.isTestComplete;

export default assessmentSlice.reducer;
