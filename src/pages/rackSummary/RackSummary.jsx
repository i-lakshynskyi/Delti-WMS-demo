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

function RackSummary() {
    const rackSummary = useStore((state) => state.rackSummary)
    const setCurrentPage = useStore((state) => state.setCurrentPage)

    function handleGoTo(page) {
        setCurrentPage(page);
    }

    function getEarliestDot(SKUs) {
        if (!Array.isArray(SKUs) || SKUs.length === 0) return "..";

        const dotsWithDates = SKUs.map(item => {
            const dot = item.dot;
            const week = parseInt(dot.slice(0, 2), 10);
            const year = 2000 + parseInt(dot.slice(2), 10);

            const jan4 = new Date(year, 0, 4);
            const dayOfWeek = jan4.getDay() || 7;
            const firstWeekStart = new Date(jan4);
            firstWeekStart.setDate(jan4.getDate() - dayOfWeek + 1);
            const dotDate = new Date(firstWeekStart);
            dotDate.setDate(firstWeekStart.getDate() + (week - 1) * 7);

            return { dot, date: dotDate };
        });

        const earliest = dotsWithDates.reduce((prev, curr) =>
            curr.date < prev.date ? curr : prev
        );

        return earliest.dot;
    }


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
                    <p>Total Items:</p>  <p>{rackSummary.totalItems ? rackSummary.totalItems : ".."}</p>
                    <p>Total SKUs:</p>   <p>{rackSummary.SKUs.length > 0 ? rackSummary.SKUs.length : ".."}</p>
                    <p>Earliest DOT:</p> <p>{getEarliestDot(rackSummary.SKUs)}</p>
                </div>
                <div className={rackSummaryButtonsBlock}>
                    <PrimeButton onClick={() => handleGoTo("scanArticle")}>Add Article</PrimeButton>
                    <PrimeButton onClick={() => handleGoTo("scanRackQR")}>New Rack</PrimeButton>
                </div>
            </div>
        </div>

    );
}

export default RackSummary;