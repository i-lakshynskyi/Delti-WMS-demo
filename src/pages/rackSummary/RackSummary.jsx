import React from 'react';
import PrimeButton from "../../components/PrimeButton.jsx";
import StickyTitle from "../../components/StickyTitle.jsx";
import useStore from "../../store/useStore.js";
import {rackSummaryContainer} from "../../styles/pages/rackSummaryStyles.js";

function RackSummary() {
    const currentRack = useStore(state => state.currentRack);
    const setCurrentPage = useStore((state) => state.setCurrentPage)

    function handleGoTo() {
        setCurrentPage("scanArticle");
    }

    return (
        <div className={rackSummaryContainer}>
            <StickyTitle title1={'Rack Summary'} title2={`Rack ID: ${currentRack}`}/>
            <PrimeButton onClick={handleGoTo}>go to article page</PrimeButton>
        </div>

    );
}

export default RackSummary;