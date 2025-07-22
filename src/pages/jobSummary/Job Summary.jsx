import React from 'react';
import useStore from "../../store/useStore.js";
import StickyTitle from "../../components/StickyTitle.jsx";
import {
    jobOSummaryInfoCard, jobOSummarySKUs,
    jobSummaryBlocksWrap,
    jobSummaryButtons,
    jobSummaryContainer, jobSummaryH1, jobSummarySKUsTitle
} from "../../styles/pages/jobSummaryStyles.js";
import JobOverviewTyreCard from "../jobOverview/JobOverviewTyreCard.jsx";
import PrimeButton from "../../components/PrimeButton.jsx";
import {getTotalUniqueUsedRacks} from "../../utils/functions.js";

function JobSummary() {
    const jobSummary = useStore(state => state.jobSummary);
    const { currentJob, completeArticles, completeTimeJob} = jobSummary;
    const {scannedArticles, totalIQuantity} = completeArticles;
    const setCurrentPage = useStore((state) => state.setCurrentPage)
    const totalUsedRacks = getTotalUniqueUsedRacks(jobSummary);

    function handleGoTo(page) {
        setCurrentPage(page);
    }



    return (
        <div className={jobSummaryContainer}>
            <StickyTitle title1={"Job Summary"} title2={`GR Job: ${currentJob.grID}`}/>
            <div className={jobSummaryBlocksWrap}>
                <div className={jobOSummaryInfoCard}>
                    <p>Summary Details</p> <p>Completed</p>
                    <p>Total Articles:</p> <p>{scannedArticles.length > 0 ? scannedArticles.length : ".."}</p>
                    <p>Total Quantity:</p> <p>{totalIQuantity ? totalIQuantity : ".."}</p>
                    <p>Assigned Racks:</p> <p>{totalUsedRacks}</p>
                    <p>Completion Time:</p> <p>{completeTimeJob ? completeTimeJob : ".."}</p>
                </div>
                <div className={jobSummarySKUsTitle}>
                    <h1 className={jobSummaryH1}>Received Articles</h1>
                </div>
                <div className={jobOSummarySKUs}>
                    {
                        scannedArticles.map((sku, i) => {
                            return (<JobOverviewTyreCard key={`${i}-${sku.ean}`} skuTires={sku}/>)
                        })
                    }
                </div>
            </div>
            <div className={jobSummaryButtons}>
                <PrimeButton disabled={true}>Recount Items</PrimeButton>
                <PrimeButton onClick={() => handleGoTo("completedJob")}>Confirm & Finish GR Job</PrimeButton>
            </div>
        </div>
    );
}

export default JobSummary;