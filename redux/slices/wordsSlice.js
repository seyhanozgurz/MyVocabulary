import { createSlice } from "@reduxjs/toolkit";
import { fetchThunk } from "../thunks/fetchThunk";

const initialState = {
  words: [],
  loading: false,
  error: null,
};
const wordSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThunk.pending, (state) => {
        state.loading = true;
        //console.log("pending");
      })
      .addCase(fetchThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.words = action.payload;
        //console.log("fulfilled");
      })
      .addCase(fetchThunk.rejected, (state, action) => {
        state.loading = false;
        //console.log("rejected");
      });
  },
});

export default wordSlice.reducer;
