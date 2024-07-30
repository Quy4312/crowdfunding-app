import { IconFolder } from "components/icon";
import React from "react";
import { Link } from "react-router-dom";
import CampCategory from "./parts/CampCategory";
import CampMeta from "./parts/CampMeta";
import CampDesc from "./parts/CampDesc";
import CampTitle from "./parts/CampTitle";
import CampAuthor from "./parts/CampAuthor";
import CampImage from "./parts/CampImage";

const CampaignItem = () => {
  return (
    <div>
      <CampImage></CampImage>
      <div className="px-5 py-4">
        <CampCategory></CampCategory>
        <CampTitle className="mb-1 font-semibold text-text1">
          Powered Kits Learning Boxes
        </CampTitle>
        <CampDesc className="mb-4 text-sm text-text3">
          Fun, durable and reusable boxes with eco-friendly options.
        </CampDesc>
        <div className="flex items-start justify-between mb-5 gap-x-5">
          <CampMeta number="$2000" text="Raised of $1,900"></CampMeta>
          <CampMeta number="173" text="Total backers"></CampMeta>
        </div>
        <CampAuthor></CampAuthor>
      </div>
    </div>
  );
};

export default CampaignItem;
