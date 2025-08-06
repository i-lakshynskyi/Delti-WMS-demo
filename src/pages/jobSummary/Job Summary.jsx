import React from 'react';
import useStore from "../../store/useStore.js";
import StickyTitle from "../../components/StickyTitle.jsx";
import {
    jobOSummaryInfoCard, jobOSummarySKUs,
    jobSummaryBlocksWrap,
    jobSummaryButtons,
    jobSummaryContainer, jobSummaryH1, jobSummarySKUsTitle
} from "../../styles/pages/jobSummaryStyles.js";
import PrimeButton from "../../components/PrimeButton.jsx";
import JobSummaryArticleCard from "./JobSummaryArticleCard.jsx";
import {sortArticlesByStatus} from "../../utils/functions.js";
import {usePageTranslation} from "../../i18n/hooks/hooks.js";

function JobSummary() {
    // Translations
    const { t: jobSummaryT } = usePageTranslation();

    const jobSummary = useStore(state => state.jobSummary);
    const { currentJob, completeTimeJob} = jobSummary;
    const setCurrentPage = useStore((state) => state.setCurrentPage)
    const scannedArticlesHistory = useStore((state) => state.scannedArticlesHistory);
    const sortedArticles = sortArticlesByStatus(scannedArticlesHistory);
    const scannedRacksHistory = useStore((state) => state.scannedRacksHistory);

    function handleGoTo(page) {
        setCurrentPage(page);
    }



    return (
        <div className={jobSummaryContainer}>
            <StickyTitle title1={jobSummaryT("stickyTitle.title1")} title2={`${jobSummaryT("stickyTitle.title2")} ${currentJob.grID}`}/>
            <div className={jobSummaryBlocksWrap}>
                <div className={jobOSummaryInfoCard}>
                    <p>{jobSummaryT("info.summaryDetails")}</p> <p>{jobSummaryT("info.completed")}</p>
                    <p>{jobSummaryT("info.totalArticles")}</p> <p>{scannedArticlesHistory.length > 0 ? scannedArticlesHistory.length : ".."}</p>
                    <p>{jobSummaryT("info.assignedRacks")}</p> <p>{scannedRacksHistory.length > 0 ? scannedRacksHistory.length : "0"}</p>
                    <p>{jobSummaryT("info.completedTime")}</p> <p>{completeTimeJob ? completeTimeJob : ".."}</p>
                </div>
                <div className={jobSummarySKUsTitle}>
                    <p className={jobSummaryH1}>Received Articles</p>
                </div>
                <div className={jobOSummarySKUs}>
                    {
                        sortedArticles.map((article, i) => {
                            return (<JobSummaryArticleCard key={`${i}-${article.ean}`} article={article}/>)
                        })
                    }
                </div>
            </div>
            <div className={jobSummaryButtons}>
                <PrimeButton onClick={() => handleGoTo("completedJob")}>{jobSummaryT("btns.finishJob")}</PrimeButton>
            </div>
        </div>
    );
}

export default JobSummary;