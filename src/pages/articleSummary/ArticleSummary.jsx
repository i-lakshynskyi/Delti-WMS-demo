import React from 'react';
import PrimeButton from "../../components/PrimeButton.jsx";
import StickyTitle from "../../components/StickyTitle.jsx";
import useStore from "../../store/useStore.js";
import CapacityInPercent from "../../components/CapacityInPercent.jsx";
import {
    articleSummaryButtonsBlock, articleSummaryCapacityBlock,
    articleSummaryConclusionBlock, articleSummaryContainer, articleSummaryTable,
    articleSummaryTableBody, articleSummaryTableThead, articleSummaryTableWrap
} from "../../styles/pages/articleSummaryStyles.js";

function ArticleSummary() {
    const articleSummary = useStore((state) => state.articleSummary);
    const setCurrentPage = useStore((state) => state.setCurrentPage)

    function handleGoTo(page) {
        setCurrentPage(page);
    }

    function getTotalQuantityFromUsedRacks(usedRacks) {
        if (!Array.isArray(usedRacks)) return 0;

        const totalQuantity = usedRacks.reduce((total, rack) => {
            const qty = parseInt(rack.quantity, 10);
            return total + (isNaN(qty) ? 0 : qty);
        }, 0);

        return totalQuantity ? totalQuantity : 0;
    }


    return (
        <div className={articleSummaryContainer}>
            <StickyTitle title1={'Article Summary'} title2={`Article: ${articleSummary.ean ? articleSummary.ean : ''}`}/>
            <div className={articleSummaryContainer}>
                <div className={articleSummaryCapacityBlock}>
                    <CapacityInPercent maxCapacity={articleSummary.racks} totalItems={articleSummary?.usedRacks?.length ? articleSummary.usedRacks.length : 0}
                                       title={'Rack used'} type={"Article"}/>
                </div>
                <div className={articleSummaryTableWrap}>
                    <table className={articleSummaryTable}>
                        <thead className={articleSummaryTableThead}>
                        <tr>
                            <th>Rack</th>
                            <th>Quantity</th>
                            <th>DOT</th>
                        </tr>
                        </thead>
                        <tbody className={articleSummaryTableBody}>
                        {articleSummary?.usedRacks?.map((rack) => (
                            <tr key={rack.rackID}>
                                <td >{rack.rackID}</td>
                                <td>{rack.quantity}</td>
                                <td>{articleSummary.dot}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={articleSummaryConclusionBlock}>
                    <p>Total Items:</p>  <p>{getTotalQuantityFromUsedRacks(articleSummary.usedRacks)}</p>
                    <p>Total Racks:</p>   <p>{articleSummary?.usedRacks?.length ? articleSummary.usedRacks.length : '..'}</p>
                    <p>Earliest DOT:</p> <p>{articleSummary.dot}</p>
                </div>
                <div className={articleSummaryButtonsBlock}>
                    <PrimeButton onClick={() => handleGoTo("scanArticle")}>Go Back</PrimeButton>
                    <PrimeButton onClick={() => handleGoTo("scanRackQR")}>Add Rack</PrimeButton>
                </div>
            </div>
        </div>

    );
}

export default ArticleSummary;