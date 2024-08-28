import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const apiKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export const getPhotosThunk = createAsyncThunk(
  "photos/getPhotos",
  async (category) => {
    try {
      const photos = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query: category, per_page: 12 },
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
      });
      toast.success("Photos fetched successfully!");
      return photos.data;
    } catch (error) {
      toast.error("Failed to fetch photos. Please try again.");
      console.log(error.message);
    }
  }
);

const getPhotoSlice = createSlice({
  name: "getPhoto",
  initialState: {
    photos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPhotosThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getPhotosThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.photos = action.payload.results;
      })
      .addCase(getPhotosThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default getPhotoSlice.reducer;
