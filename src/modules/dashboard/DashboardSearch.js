import { defaultImage } from "constants/global";
import React, { useState } from "react";

const DashboardSearch = () => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="relative z-50">
      <div className="bg-white rounded-full shadow-[10px_10px_20px_0px_rgba(218,213,213,0.15)] p-2  flex items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Do fundrise now"
            className="w-full px-5 text-sm bg-transparent placeholder:text-text4 text-text1"
          />
        </div>
        <button className="w-[72px] h-10 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {showSearch && (
        <div className="search-results w-full lg:w-[843px] bg-white absolute z-50 translate-y-5 top-full left-0 pb-6 rounded-3xl">
          <div className="flex items-center justify-between p-3 bg-graySoft rounded-3xl">
            <h4 className="pl-4 text-sm font-medium underline">
              See all 10,124 fundraisier
            </h4>
            <button className="flex items-center justify-center w-[72px] h-[50px] rounded-xl bg-error bg-opacity-20 text-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-6 pb-0">
            <div className="flex flex-col mb-6 gap-y-5 ">
              <SearchItem></SearchItem>
              <SearchItem></SearchItem>
              <SearchItem></SearchItem>
              <SearchItem></SearchItem>
              <SearchItem></SearchItem>
            </div>
            <h3 className="mb-4 text-sm font-semibold">Related searchs</h3>
            <div className="flex flex-col gap-y-3">
              <p className="text-sm font-medium text-text2">
                {" "}
                <strong>education</strong> fund
              </p>
              <p className="text-sm font-medium text-text2">schoralship fund</p>
              <p className="text-sm font-medium text-text2">
                <strong>education</strong> and schools fund
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const SearchItem = () => (
  <div className="flex items-center gap-x-5">
    <img
      src={defaultImage}
      className="w-[50px] h-[50px] rounded-lg object-cover "
      alt=""
    />
    <div className="flex-1 text-sm">
      <h3 className="mb-1 ">
        <strong>Education</strong> fund for Durgham Family
      </h3>
      <p className="text-text3">By Durgham Family</p>
    </div>
  </div>
);

export default DashboardSearch;
