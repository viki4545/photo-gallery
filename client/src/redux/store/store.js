// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import getPhotos from "../features/photoSlice";

const store = configureStore({
  reducer: {
    getPhotos: getPhotos,
  },
});

export default store;
