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

function JobSummary() {
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
            <StickyTitle title1={"Job Summary"} title2={`GR Job: ${currentJob.grID}`}/>
            <div className={jobSummaryBlocksWrap}>
                <div className={jobOSummaryInfoCard}>
                    <p>Summary Details</p> <p>Completed</p>
                    <p>Total Articles:</p> <p>{scannedArticlesHistory.length > 0 ? scannedArticlesHistory.length : ".."}</p>
                    <p>Assigned Racks:</p> <p>{scannedRacksHistory.length > 0 ? scannedRacksHistory.length : "0"}</p>
                    <p>Completion Time:</p> <p>{completeTimeJob ? completeTimeJob : ".."}</p>
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
                <PrimeButton onClick={() => handleGoTo("completedJob")}>Confirm & Finish GR Job</PrimeButton>
            </div>
        </div>
    );
}

export default JobSummary;