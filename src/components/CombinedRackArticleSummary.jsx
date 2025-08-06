import React, {useEffect} from 'react';
import {
    combinedRASummaryBtn,
    combinedRASummaryContainer, combinedRASummaryTabs,
    combinedRASummaryWrap
} from "../styles/components/CombinedRackArticleSummaryStyles.js";
import RackSummary from "../pages/rackSummary/RackSummary.jsx";
import ArticleSummary from "../pages/articleSummary/ArticleSummary.jsx";
import useStore from "../store/useStore.js";
import {useTranslation} from "react-i18next";

function CombinedRackArticleSummary() {
    // Translations
    const { t: comboSummaryT } = useTranslation('comboSummaries');

    const [isRackSummaryOpen, setIsRackSummaryOpen] = React.useState(true);
    const currentPage = useStore((state) => state.currentPage);
    const articleSummary = useStore((state) => state.articleSummary);

    function handleGoToSummary(summary) {
        if (summary === "rack") setIsRackSummaryOpen(true);
        if (summary === "article") setIsRackSummaryOpen(false);
    }

    useEffect(() => {
        if (currentPage.page === "articleSummary") setIsRackSummaryOpen(false);
        if (currentPage.page === "rackSummary") setIsRackSummaryOpen(true);
    }, []);

    return (
        <div className={combinedRASummaryContainer}>
            <div className={combinedRASummaryTabs}>
                <button className={combinedRASummaryBtn}
                        onClick={() => {handleGoToSummary("rack")}} disabled={isRackSummaryOpen}>{comboSummaryT("btns.rackSummary")}</button>
                <button className={combinedRASummaryBtn}
                        onClick={() => {handleGoToSummary("article")}} disabled={!isRackSummaryOpen || Object.keys(articleSummary).length === 0}>{comboSummaryT("btns.articSummery")}</button>
            </div>
            <div className={combinedRASummaryWrap}>
                {isRackSummaryOpen ? <RackSummary/> : <ArticleSummary/>}
            </div>
        </div>
    );
}

export default CombinedRackArticleSummary;