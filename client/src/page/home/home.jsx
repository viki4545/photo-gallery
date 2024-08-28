import React, { useEffect, useState } from "react";
import "./home.css";
import { getPhotosThunk } from "../../redux/features/photoSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");

  const photos = useSelector((state) => state.getPhotos.photos);

  const searchPhotos = () => {
    if (category) {
      dispatch(getPhotosThunk(category));
    }
  };

  return (
    <div className="gallery-container">
      <h1>Picture Gallery</h1>
      <div className="search-box">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category (e.g., food, landscape)"
        />
        <button onClick={searchPhotos}>Search</button>
      </div>
      <div className="photo-container">
        {photos?.map((photo) => (
          <div key={photo?.id} className="photo-card">
            <img src={photo?.urls?.small} alt={photo?.alt_description} />
            <div className="photo-info">
              <p>Author: {photo?.user?.name}</p>
              <p>{photo?.alt_description}</p>
              <a href={photo?.links?.html}>View on Unsplash</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
