import React from 'react';
import {
    completedJobButtonBlock,
    completedJobContainer,
    completedJobImgPrize,
    completedJobImgPrizeWrap,
    completedJobSummaryTable, completedJobSummaryTableRow,
    completedJobSummaryWrap, completedJobSummaryWrapTitle,
    completedJobTitleBlock,
    completedJobTitleMain,
} from "../../styles/pages/completedJobStyles.js";
import prize from "../../assets/icons/prize.svg"
import {loginInfo, loginInfoImg} from "../../styles/pages/loginStyle.js";
import info from "../../assets/icons/information.svg";
import PrimeButton from "../../components/PrimeButton.jsx";
import useStore from "../../store/useStore.js";
import {getTotalUniqueUsedRacks, sumTotalQuantities} from "../../utils/functions.js";

function CompletedJob() {
    const jobSummary = useStore(state => state.jobSummary);
    const {currentJob, timeTaken} = jobSummary;
    const scannedArticlesHistory = useStore((state) => state.scannedArticlesHistory);
    const totalUsedRacks = getTotalUniqueUsedRacks(scannedArticlesHistory);
    const resetAppState = useStore((state) => state.resetAppState);


    function handleGoTo() {
        resetAppState();
    }

    return (
        <div className={completedJobContainer}>
            <div className={completedJobImgPrizeWrap}>
                <img className={completedJobImgPrize} src={`${prize}`} alt="prize"/>
            </div>
            <div className={completedJobTitleBlock}>
                <div className={completedJobTitleMain}>
                    <h1>Congratulations!</h1>
                    <h1>Job Completed Successfully</h1>
                </div>
            </div>
            <div className={completedJobSummaryWrap}>
                <h1 className={completedJobSummaryWrapTitle}>Job Summary</h1>
                <div className={completedJobSummaryTable}>
                    <div className={completedJobSummaryTableRow}><p>GR Job ID:</p> <p>{currentJob?.grID ? currentJob.grID : ".."}</p></div>
                    <div className={completedJobSummaryTableRow}><p>Total Tyres:</p> <p>{sumTotalQuantities(scannedArticlesHistory) ? sumTotalQuantities(scannedArticlesHistory) : ".."}</p></div>
                    <div className={completedJobSummaryTableRow}><p>Racks Used:</p> <p>{totalUsedRacks ? totalUsedRacks : ".."}</p></div>
                    <div className={completedJobSummaryTableRow}><p>Time Taken:</p> <p>{timeTaken ? timeTaken : timeTaken}</p></div>
                    <div className={completedJobSummaryTableRow}><p>Stock Location:</p> <p>{currentJob.gate ? currentJob.gate : ".."}</p></div>
                </div>
            </div>
            <div className={loginInfo}>
                <img className={loginInfoImg} src={`${info}`} alt="info" />
                <span>Stock Recorded in System</span>
            </div>
            <div className={completedJobButtonBlock}>
                <PrimeButton onClick={handleGoTo}>Back to Job List</PrimeButton>
            </div>
        </div>
    );
}

export default CompletedJob;