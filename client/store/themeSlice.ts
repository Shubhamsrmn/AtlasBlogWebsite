import { createSlice } from "@reduxjs/toolkit";
import { themeStateType } from "./storeType";
const initialState: themeStateType = {
  theme: "day",
};
const themeSlice = createSlice({
  name: "themeState",
  initialState: initialState,
  reducers: {
    toggleTheme(state: themeStateType) {
      return (state = { theme: state.theme === "day" ? "night" : "day" });
    },
  },
});
export default themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;
