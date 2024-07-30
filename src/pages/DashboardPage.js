import Gap from "components/common/Gap";
import Heading from "components/common/Heading";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import LayoutDashBoard from "layout/LayoutDashboard";
import CampaignFeature from "modules/campaign/CampaignFeature";
import CampaignGrid from "modules/campaign/CampaignGrid";
import CampaignItem from "modules/campaign/CampaignItem";
import React, { Fragment, useEffect } from "react";
import { v4 } from "uuid";

const DashboardPage = () => {
  const axiosPrivate = useAxiosPrivate();
  // useEffect(() => {
  //   async function fetchCampaigns() {
  //     try {
  //       const response = await axiosPrivate.get("api/campaigns");
  //       console.log("🚀 ~ fetchCampaigns ~ response:", response);
  //     } catch (error) {
  //       console.log("🚀 ~ fetchCampaigns ~ error:", error);
  //     }
  //   }
  //   fetchCampaigns();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <Fragment>
      <Heading number={4}>Your Campaign</Heading>
      <CampaignFeature></CampaignFeature>
      <Gap></Gap>
      <Heading>Popular Campaign</Heading>
      <CampaignGrid>
        {Array(4)
          .fill(0)
          .map((item) => (
            <CampaignItem key={v4()}></CampaignItem>
          ))}
      </CampaignGrid>
      <Gap></Gap>
      <Heading>Recent Campaign</Heading>
      <CampaignGrid>
        {Array(4)
          .fill(0)
          .map((item) => (
            <CampaignItem key={v4()}></CampaignItem>
          ))}
      </CampaignGrid>
    </Fragment>
  );
};

export default DashboardPage;
