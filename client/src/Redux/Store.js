import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/userSlice";
import assessmentReducer from "./Features/statusSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        assessment: assessmentReducer,
    },
});

export default store;
