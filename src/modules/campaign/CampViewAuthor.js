import { defaultImage } from "constants/global";
import React from "react";

const CampViewAuthor = () => {
  return (
    <div className="flex items-center gap-x-5 mb-9">
      <img
        src={defaultImage}
        className="object-cover rounded-full w-[60px] h-[60px]"
        alt=""
      />
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-x-4">
          <h3 className="text-lg font-medium">Saiful Islam</h3>
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((item, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
          </div>
        </div>
        <div className="flex items-center text-sm gap-x-3 text-text3">
          <strong className=" text-primary">02 Campaign</strong>
          <span className="block w-[6px] h-[6px] rounded-full bg-text3 "></span>
          <span className="">Dhaka, Bangladesh</span>
        </div>
      </div>
    </div>
  );
};

export default CampViewAuthor;
