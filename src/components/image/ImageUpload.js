import axios from "axios";
import { defaultImage } from "constants/global";
import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

const ImageUpload = ({ onChange = () => {}, name = "" }) => {
  const [imageObj, setimageObj] = useState({});
  const handleUploadImage = async (e) => {
    // "https://api.imgbb.com/1/upload?key=92acf7a6e235093f750301a9549bee94"
    const file = e.target.files[0];
    if (!file) return;
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    const reponse = await axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload?key=92acf7a6e235093f750301a9549bee94",
      data: bodyFormData,
      headers: {
        "Content-Type": "mutipart/form-data",
      },
    });
    const imageData = reponse.data.data;
    if (!imageData) {
      toast.error("Can not upload image to imgbbAPI");
      return;
    }

    setimageObj({
      medium: imageData.medium.url,
      thumb: imageData.thumb.url,
      url: imageData.url,
    });
    onChange(name, imageObj);
    // console.log(reponse.data.data.url);
    console.log(reponse.data.data);
  };
  const removeImage = (e) => {
    e.stopPropagation();
    setimageObj({});
    onChange(name, imageObj);
  };
  return (
    <label className="w-full h-[200px] border border-gray-200 border-dashed rounded-xl cursor-pointer flex items-center justify-center bg-center relative overflow-hidden group ">
      {/* <input type="file" onChange={handleUploadImage} className="hidden" /> */}
      {!imageObj.url && (
        <span className="absolute z-10 flex items-center justify-center invisible w-16 h-16 transition-all bg-white rounded-full opacity-0 cursor-pointer text-black-500 group-hover:opacity-100 group-hover:visible">
          <input type="file" onChange={handleUploadImage} className="hidden" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
            />
          </svg>
        </span>
      )}
      {imageObj.url && (
        <Fragment>
          <img
            src={imageObj.url}
            className="object-cover w-full h-full"
            alt=""
          />
          <button
            type="button"
            className="absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible"
            onClick={removeImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </Fragment>
      )}
    </label>
  );
};

export default ImageUpload;
