import React, {useEffect} from 'react';
import {
    combinedRASummaryBtn,
    combinedRASummaryContainer, combinedRASummaryTabs,
    combinedRASummaryWrap
} from "../styles/components/CombinedRackArticleSummaryStyles.js";
import RackSummary from "../pages/rackSummary/RackSummary.jsx";
import ArticleSummary from "../pages/articleSummary/ArticleSummary.jsx";
import useStore from "../store/useStore.js";

function CombinedRackArticleSummary() {
    const [isRackSummaryOpen, setIsRackSummaryOpen] = React.useState(true);
    const currentPage = useStore((state) => state.currentPage);
    const articleSummary = useStore((state) => state.articleSummary);

    function handleGoToSummary(summary) {
        if (summary === "rack") setIsRackSummaryOpen(true);
        if (summary === "article") setIsRackSummaryOpen(false);
    }

    useEffect(() => {
        if (currentPage === "articleSummary") setIsRackSummaryOpen(false);
        if (currentPage === "rackSummary") setIsRackSummaryOpen(true);
    }, []);

    return (
        <div className={combinedRASummaryContainer}>
            <div className={combinedRASummaryTabs}>
                <button className={combinedRASummaryBtn}
                        onClick={() => {handleGoToSummary("rack")}} disabled={isRackSummaryOpen}>Rack Summary</button>
                <button className={combinedRASummaryBtn}
                        onClick={() => {handleGoToSummary("article")}} disabled={!isRackSummaryOpen || Object.keys(articleSummary).length === 0}>Article Summery</button>
            </div>
            <div className={combinedRASummaryWrap}>
                {isRackSummaryOpen ? <RackSummary/> : <ArticleSummary/>}
            </div>
        </div>
    );
}

export default CombinedRackArticleSummary;