import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
import assessmentReducer from "./Features/statusSlice";

const store = configureStore({
    reducer: {
        // user: userReducer,
        assessment: assessmentReducer,
    },
});

export default store;
