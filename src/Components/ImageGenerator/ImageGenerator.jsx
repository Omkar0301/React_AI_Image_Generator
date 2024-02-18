import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import default_image from "../Assets/default_image.svg";
const API_TOKEN = import.meta.env.VITE_APP_API_TOKEN;

export const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current === "") {
      return;
    }
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: '512x512', // prettier-ignore
        }),
      }
    );

    let res = await response.json();

    if (res.data) {
      let data_Array = res.data;
      setImage_url(data_Array[0].url);
    } else {
      alert(res.error.code);
    }
  };
  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
        <div className="image-loading">
          <div className="image">
            <img src={image_url === "/" ? default_image : image_url} alt="" />
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          ref={inputRef}
          className="search-input"
          placeholder="Describe what you want to see"
        />
        <div className="generate-btn" onClick={imageGenerator}>
          Generate
        </div>
      </div>
    </div>
  );
};
