import React from 'react';
import PrimeButton from "../../components/PrimeButton.jsx";
import StickyTitle from "../../components/StickyTitle.jsx";
import useStore from "../../store/useStore.js";
import {
    rackSummaryButtonsBlock,
    rackSummaryConclusionBlock,
    rackSummaryContainer,
    rackSummaryRackCapacityBlock,
    rackSummarySKUsTable,
    rackSummarySKUsTableBody,
    rackSummarySKUsTableThead,
    rackSummarySKUsTableWrap
} from "../../styles/pages/rackSummaryStyles.js";
import CapacityInPercent from "../../components/CapacityInPercent.jsx";
import {getEarliestDot} from "../../utils/functions.js";

function RackSummary() {
    const rackSummary = useStore((state) => state.rackSummary)
    const setCurrentPage = useStore((state) => state.setCurrentPage)

    function handleGoTo(page) {
        setCurrentPage(page);
    }

    function availableCapacity(maxCapacity, totalItems) {
        const max = Number(maxCapacity);
        const total = Number(totalItems);

        if (isNaN(max) || isNaN(total)) {
            return "0";
        }

        const result = max - total;

        if (isNaN(result) || result < 0) {
            return "0";
        }
        return result;
    }

    const availableCapacityRes = availableCapacity(rackSummary.maxCapacity, rackSummary.totalItems);

    return (
        <div className={rackSummaryContainer}>
            <StickyTitle title1={'Rack Summary'} title2={`Rack ID: ${rackSummary.rackID ? rackSummary.rackID : ''}`} />
            <div className={rackSummaryContainer}>
                <div className={rackSummaryRackCapacityBlock}>
                    <CapacityInPercent maxCapacity={rackSummary.maxCapacity} totalItems={rackSummary.totalItems}  title={'Rack Capacity'} type={'Rack'}/>
                </div>
                <div className={rackSummarySKUsTableWrap}>
                    <table className={rackSummarySKUsTable}>
                        <thead className={rackSummarySKUsTableThead}>
                        <tr>
                            <th>SKU</th>
                            <th>Quantity</th>
                            <th>DOT</th>
                        </tr>
                        </thead>
                        <tbody className={rackSummarySKUsTableBody}>
                        {rackSummary.SKUs.map((sku, index) => (
                            <tr key={`${sku.ean}-${index}`}>
                                <td >{`SCU-${sku.ean}`}</td>
                                <td>{sku.quantity}</td>
                                <td>{sku.dot}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={rackSummaryConclusionBlock}>
                    <p>Total Items:</p>  <p>{rackSummary.totalItems ? rackSummary.totalItems : "0"}</p>
                    <p>Available Capacity:</p>  <p>{availableCapacityRes}</p>
                    <p>Total SKUs:</p>   <p>{rackSummary?.SKUs?.length}</p>
                    <p>Earliest DOT:</p> <p>{getEarliestDot(rackSummary.SKUs)}</p>
                </div>
                <div className={rackSummaryButtonsBlock}>
                    <PrimeButton onClick={() => handleGoTo("scanRackQR")}>Go Back</PrimeButton>
                    <PrimeButton onClick={() => handleGoTo("scanArticle")} disabled={!availableCapacityRes}>Add Article</PrimeButton>
                </div>
            </div>
        </div>

    );
}

export default RackSummary;