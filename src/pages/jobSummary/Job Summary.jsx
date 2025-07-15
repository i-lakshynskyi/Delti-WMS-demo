import React from 'react';
import useStore from "../../store/useStore.js";

function JobSummary(props) {
    const jobSummary = useStore(state => state.jobSummary);

    function getTotalUniqueUsedRacks(jobSummary) {
        const scannedArticles = jobSummary?.completeArticles?.scannedArticles || [];

        const allRackIDs = scannedArticles.flatMap(article =>
            Array.isArray(article.racksUsed)
                ? article.racksUsed.map(rack => rack.rackID)
                : []
        );

        const uniqueRackIDs = new Set(allRackIDs);
        return uniqueRackIDs.size;
    }


    const totalUsedRacks = getTotalUniqueUsedRacks(jobSummary);
    // console.log("totalUsedRacks: ", totalUsedRacks);



    return (
        <div>Job Summary</div>
    );
}

export default JobSummary;