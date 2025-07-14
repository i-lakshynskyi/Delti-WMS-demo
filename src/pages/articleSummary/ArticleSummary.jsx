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
    const currentArticle = useStore((state) => state.currentArticle)
    const setCurrentPage = useStore((state) => state.setCurrentPage)

    function handleGoTo(page) {
        setCurrentPage(page);
    }

    return (
        <div className={articleSummaryContainer}>
            <StickyTitle title1={'Article Summary'} title2={`Article: ${currentArticle.ean ? currentArticle.ean : ''}`}/>
            <div className={articleSummaryContainer}>
                <div className={articleSummaryCapacityBlock}>
                    <CapacityInPercent maxCapacity={currentArticle.racks} totalItems={1} title={'Rack used'} type={"Article"}/>
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
                        {/*{rackSummary.SKUs.map((sku) => (
                            <tr key={sku.ean}>
                                <td >{`SCU-${sku.ean}`}</td>
                                <td>{sku.quantity}</td>
                                <td>{sku.dot}</td>
                            </tr>
                        ))}*/}
                        </tbody>
                    </table>
                </div>
                <div className={articleSummaryConclusionBlock}>
                    <p>Total Items:</p>  <p>..</p>
                    <p>Total SKUs:</p>   <p>..</p>
                    <p>Earliest DOT:</p> <p>..</p>
                </div>
                <div className={articleSummaryButtonsBlock}>
                    <PrimeButton onClick={() => handleGoTo("scanRackQR")}>Add Rack</PrimeButton>
                    <PrimeButton disabled={true}>Submit Racks</PrimeButton>
                </div>
            </div>
        </div>

    );
}

export default ArticleSummary;