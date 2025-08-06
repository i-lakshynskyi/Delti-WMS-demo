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
import {usePageTranslation} from "../../i18n/hooks/hooks.js";

function CompletedJob() {
    // Translations
    const { t: completeJobT } = usePageTranslation();

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
                    <h1>{completeJobT("graz1")}</h1>
                    <h1>{completeJobT("graz2")}</h1>
                </div>
            </div>
            <div className={completedJobSummaryWrap}>
                <h1 className={completedJobSummaryWrapTitle}>{completeJobT("titleSumm")}</h1>
                <div className={completedJobSummaryTable}>
                    <div className={completedJobSummaryTableRow}><p>{completeJobT("summary.grID")}</p> <p>{currentJob?.grID ? currentJob.grID : ".."}</p></div>
                    <div className={completedJobSummaryTableRow}><p>{completeJobT("summary.totalTyres")}</p> <p>{sumTotalQuantities(scannedArticlesHistory) ? sumTotalQuantities(scannedArticlesHistory) : ".."}</p></div>
                    <div className={completedJobSummaryTableRow}><p>{completeJobT("summary.racksUsed")}</p> <p>{totalUsedRacks ? totalUsedRacks : ".."}</p></div>
                    <div className={completedJobSummaryTableRow}><p>{completeJobT("summary.timeTaken")}</p> <p>{timeTaken ? timeTaken : timeTaken}</p></div>
                    <div className={completedJobSummaryTableRow}><p>{completeJobT("summary.stockLocation")}</p> <p>{currentJob.gate ? currentJob.gate : ".."}</p></div>
                </div>
            </div>
            <div className={loginInfo}>
                <img className={loginInfoImg} src={`${info}`} alt="info" />
                <span>{completeJobT("info")}</span>
            </div>
            <div className={completedJobButtonBlock}>
                <PrimeButton onClick={handleGoTo}>{completeJobT("btn")}</PrimeButton>
            </div>
        </div>
    );
}

export default CompletedJob;