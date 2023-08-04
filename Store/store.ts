import { configureStore, combineReducers } from "@reduxjs/toolkit";
import quizFeatureSice from "../Features/quizAppFeature/quizAppFeatureSlice";

const rootReducers = combineReducers({
  QuizAppParams: quizFeatureSice,
});

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;