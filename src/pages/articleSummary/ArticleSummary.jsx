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
import {getEarliestDot} from "../../utils/functions.js";

function ArticleSummary() {
    const articleSummary = useStore((state) => state.articleSummary);
    const setCurrentPage = useStore((state) => state.setCurrentPage)
    const rackSummary = useStore((state) => state.rackSummary)

    const isToScanArticlePageDisableBtn = articleSummary?.quantity === 0 || rackSummary.statusOfFilling === "Full";


    function handleGoTo(page) {
        setCurrentPage(page);
    }

    function getSummaryFromRacksUsed(racksUsed) {
        if (!Array.isArray(racksUsed)) {
            return {
                totalQuantity: 0,
                uniqueRackCount: 0
            };
        }

        const uniqueIDs = new Set();
        let totalQuantity = 0;

        for (const rack of racksUsed) {
            const qty = parseInt(rack.quantity, 10);
            totalQuantity += isNaN(qty) ? 0 : qty;

            if (rack.rackID) {
                uniqueIDs.add(rack.rackID);
            }
        }

        return {
            totalQuantity,
            uniqueRackCount: uniqueIDs.size
        };
    }

    const summary = getSummaryFromRacksUsed(articleSummary.racksUsed);


    return (
        <div className={articleSummaryContainer}>
            <StickyTitle className={'text-end'} title1={'Article Summary'} title2={`Article: ${articleSummary.ean ? articleSummary.ean : ''}`}/>
            <div className={articleSummaryContainer}>
                <div className={articleSummaryCapacityBlock}>
                    <CapacityInPercent maxCapacity={articleSummary.racks} totalItems={summary.uniqueRackCount}
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
                        {articleSummary?.racksUsed?.map((rack) => (
                            <tr key={`${Math.floor(Math.random() * 1001)}-${rack.rackID}`}>
                                <td >{rack.rackID}</td>
                                <td>{rack.quantity}</td>
                                <td>{rack.dot}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={articleSummaryConclusionBlock}>
                    <p>Total Items:</p>  <p>{summary.totalQuantity}</p>
                    <p>Total Racks:</p>   <p>{articleSummary?.racksUsed?.length ? articleSummary.racksUsed.length : '..'}</p>
                    <p>Earliest DOT:</p> <p>{getEarliestDot(articleSummary.racksUsed)}</p>
                </div>
                <div className={articleSummaryButtonsBlock}>
                    <PrimeButton onClick={() => handleGoTo("scanArticle")} disabled={isToScanArticlePageDisableBtn}>Scan Article</PrimeButton>
                    <PrimeButton onClick={() => handleGoTo("scanRackQR")}>Add Rack</PrimeButton>
                </div>
            </div>
        </div>

    );
}

export default ArticleSummary;