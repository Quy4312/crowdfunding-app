import LayoutDashBoard from "layout/LayoutDashboard";
import CampaignAddNew from "modules/campaign/CampaignAddNew";
import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const StartCampaignPage = () => {
  return (
    <Fragment>
      <CampaignAddNew></CampaignAddNew>
    </Fragment>
  );
};

export default StartCampaignPage;
