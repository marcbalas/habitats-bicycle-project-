import React from "react";
import { useGlobalMapContext } from "../../../Context/mapContext";
import { VoteModal, EditVoteModal } from "../../index";
import "./boxShowInputDetails.css";
import closeBtn from "../../../icons/modalBoxIcons/close-window-icon.png";

export default function BoxShowInputDetails() {
  const {
    currentUser,
    fetchReportData,
    getReportData,
    isBoxShowInputDetailsOpen,
    closeReportWindow,
    
  } = useGlobalMapContext();
  let user = document.cookie;
  return (
    <div
      className={`${
        isBoxShowInputDetailsOpen ? "show-spot-details" : "spot-box-overlay"
      }`}
    >
      {getReportData.length !== "" ? (
        <div className='open-window-display'>
          <button
            className='close-button'
            type='button'
            onClick={closeReportWindow}
          >
            <img className='close-button-img' src={closeBtn} alt='' />
          </button>

          <p className='title'>{getReportData.name}</p>
          <p className='date-text'>{getReportData.createdAt}</p>
          <img className='open-report-image' src={getReportData.image} alt='' />
          <p className='open-report-description'>{getReportData.information}</p>
          <div className='open-report-btn'>
            {!user ? null :
              (currentUser === getReportData.user_id) ? <EditVoteModal /> : 
              <VoteModal />
            }
          </div>
        </div>
      ) : (
        <div>
          <p>loading</p>
          <button
            onClick={() => {
              fetchReportData();
            }}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
