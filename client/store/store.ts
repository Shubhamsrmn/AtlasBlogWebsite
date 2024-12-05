import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
const store = configureStore({
  reducer: {
    themeState: themeReducer,
  },
});
export default store;
