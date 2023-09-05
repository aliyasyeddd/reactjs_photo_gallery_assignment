import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PhotoGallery.css";
import { enqueueSnackbar } from "notistack";
import { Box } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

const PhotoGallery = () => {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const FetchImages = async () => {
    let URL = `https://picsum.photos/v2/list?page=${pageNumber}`;
    try {
      const response = await axios.get(URL);
      const articlesData = response.data;
      const likedImages = articlesData.map((img) => ({
        ...img,
        likes: 0,
      }));
      setImages(likedImages);
    } catch (error) {
      enqueueSnackbar("Couldn't fetch the images, from the API", {
        variant: "error",
      });
    }
  };

  const fetchMoreData = async () => {
    let URL = `https://picsum.photos/v2/list?page=${pageNumber}`;
    setPageNumber(pageNumber + 1);
    try {
      const response = await axios.get(URL);
      const articlesData = response.data;
      const likedImages = articlesData.map((img) => ({
        ...img,
        likes: 0,
      }));
      setImages(images.concat(likedImages));
    } catch (error) {
      enqueueSnackbar("Couldn't fetch the images, from the API", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    FetchImages();
    fetchMoreData();
  }, []);

  const handleLikeCount = (index) => {
    setImages((previousImages) => {
      const increment = [...previousImages];
      increment[index] = {
        ...increment[index],
        likes: increment[index].likes + 1,
      };
      return increment;
    });
  };

  return (
    <div className="main">
      <h1 className="header">Photo gallery</h1>
      {images.length ? (
        images.map((img, index) => {
          return (
            <div key={index} className="gallery-view">
              <img
                src={img.download_url}
                alt={img.author}
                width={190}
                height={170}
              />
              <div className="article-details">
                <h4 className="author">Author: {img.author}</h4>
                <span
                  className="increase-count"
                  onClick={() => handleLikeCount(index)}
                >
                  <i className="fa-solid fa-thumbs-up">{img.likes}</i>
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <Box className="loading">
          <h4>No articles Found</h4>
        </Box>
      )}
      <InfiniteScroll
        dataLength={images.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      ></InfiniteScroll>
    </div>
  );
};
 
export default PhotoGallery;
