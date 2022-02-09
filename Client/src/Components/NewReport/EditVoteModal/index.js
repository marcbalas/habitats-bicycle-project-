import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import flagReport from "../../../icons/modalBoxIcons/Flag.png";
import dangerLevel from "../../../Data/dangerLevelToVote";
import "./editVoteModal.css";

export default function ModalShowUserInputDetails() {
  const { getReportData, openVoteWindow, createComplain } =
    useGlobalMapContext();

  return (
    <div className="vote-layout">
      <div className="edit-vote-display">
        <p>
          {Number(getReportData.voting).toFixed(2) <= 1.29 ? (
            <div>{dangerLevel[0].icon} </div>
          ) : Number(getReportData.voting).toFixed(2) >= 1.3 &&
            Number(getReportData.voting).toFixed(2) <= 2.29 ? (
            <div>{dangerLevel[1].icon} </div>
          ) : (
            <div>{dangerLevel[2].icon} </div>
          )}
        </p>
        <div className="layout-edit-window">
          <p className="danger-title">
            {Number(getReportData.voting).toFixed(2) <= 1.29
              ? "Low danger"
              : Number(getReportData.voting).toFixed(2) >= 1.3 &&
                Number(getReportData.voting).toFixed(2) <= 2.29
              ? "Medium danger"
              : "High danger"}
          </p>
          <p className="rating-qtt">
            {getReportData.count} ratings || including mine:
            {Number(getReportData.userVoteFound.voting).toFixed(2) <= 1.29 ? (
              <div>{dangerLevel[0].icon} </div>
            ) : Number(getReportData.userVoteFound.voting).toFixed(2) >= 1.3 &&
              Number(getReportData.userVoteFound.voting).toFixed(2) <= 2.29 ? (
              <div>{dangerLevel[1].icon} </div>
            ) : (
              <div>{dangerLevel[2].icon} </div>
            )}
          </p>
        </div>
      </div>
      <div className="center-btn">
        <button
          className="submit-button"
          type="button"
          onClick={openVoteWindow}
        >
          Edit Rating
        </button>
        <button className="flag-btn" type="button" onClick={createComplain}>
          <img src={flagReport} alt="" />
        </button>
      </div>
    </div>
  );
}
