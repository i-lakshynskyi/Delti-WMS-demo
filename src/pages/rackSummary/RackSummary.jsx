import React from 'react';
import PrimeButton from "../../components/PrimeButton.jsx";
import StickyTitle from "../../components/StickyTitle.jsx";
import useStore from "../../store/useStore.js";
import {rackSummaryContainer} from "../../styles/pages/rackSummaryStyles.js";

function RackSummary() {
    const rackSummary = useStore((state) => state.rackSummary)
    const setCurrentPage = useStore((state) => state.setCurrentPage)

    function handleGoTo() {
        setCurrentPage("scanRackQR");
    }

    return (
        <div className={rackSummaryContainer}>
            <StickyTitle title1={'Rack Summary'} title2={`Rack ID: ${rackSummary.rackID ? rackSummary.rackID : ''}`} />
            <PrimeButton onClick={handleGoTo}>go to Scan QR-code Rack</PrimeButton>
        </div>

    );
}

export default RackSummary;