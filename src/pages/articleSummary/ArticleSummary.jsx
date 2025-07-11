import React from 'react';
import PrimeButton from "../../components/PrimeButton.jsx";
import StickyTitle from "../../components/StickyTitle.jsx";
import useStore from "../../store/useStore.js";
import {rackSummaryContainer} from "../../styles/pages/rackSummaryStyles.js";

function ArticleSummary() {
    const currentArticle = useStore((state) => state.currentArticle)
    const setCurrentPage = useStore((state) => state.setCurrentPage)

    function handleGoTo() {
        setCurrentPage("scanArticle");
    }

    return (
        <div className={rackSummaryContainer}>
            <StickyTitle title1={'Article Summary'} title2={`Article: ${currentArticle.ean ? currentArticle.ean : ''}`}/>
            <PrimeButton onClick={handleGoTo}>go to article page</PrimeButton>
        </div>

    );
}

export default ArticleSummary;