import { Button } from "components/button";
import Overlay from "components/common/Overlay";
import CampaignPerk from "modules/campaign/CampaignPerk";
import DashboardSidebar from "modules/dashboard/DashboardSidebar";
import DashboardTopbar from "modules/dashboard/DashboardTopbar";
import RequiredAuthPage from "pages/RequiredAuthPage";
import React from "react";
import ReactModal from "react-modal";
import { Outlet } from "react-router-dom";

const LayoutDashBoard = ({ children }) => {
  return (
    <>
      <div className="p-10 bg-lite">
        <ReactModal
          isOpen={false}
          overlayClassName={
            "modal-overlay fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          }
          className="modal-content w-full max-w-[521px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-auto scroll-hidden"
        >
          <button className="absolute z-10 cursor-pointer right-10 top-[10px] text-text1">
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
          <h2 className="font-bold text-[25px] mb-10 text-center ">
            Back this project
          </h2>
          <p className="mb-3 text-sm">Enter the contribute amount</p>
          <input
            type="text"
            placeholder="$10"
            name="pedge"
            className="w-full px-5 py-3 text-lg font-medium border rounded border-strock "
          ></input>
          <p className="my-5 text-sm text-text3">
            Contribution are not associatied with perks
          </p>
          <Button className="text-white bg-primary">Continue</Button>
          <div className="mt-[60px]">
            <CampaignPerk showButton={true}></CampaignPerk>
          </div>
        </ReactModal>
        <Overlay></Overlay>
        <DashboardTopbar></DashboardTopbar>
        <div className="flex items-start gap-x-10">
          <DashboardSidebar></DashboardSidebar>
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutDashBoard;
