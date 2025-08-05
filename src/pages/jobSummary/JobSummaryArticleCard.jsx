import React from 'react';
import {
    getBorderByStatus,
    getStatusArticle,
    JobSummaryArticleCardButton,
    JobSummaryArticleCardButtonBlock,
    JobSummaryArticleCardContainer,
    JobSummaryArticleCardTitle,
    JobSummaryArticleCardTitle2,
    JobSummaryArticleCardWrap,
    roundedBottom,
} from "../../styles/pages/jobSummaryStyles.js";
import useStore from "../../store/useStore.js";

function JobSummaryArticleCard({article, delBtn = false}) {
    const {statuses, name, ean, size, expectedQuantity, placedQuantity, dotsUsed} = article;
    const isRecountDisabled = !(statuses[0] === "OK" || delBtn);
    const setCurrentPage = useStore((state) => state.setCurrentPage)

    function handleRecountItem(article) {
        setCurrentPage("recountItems", article);
    }

    return (
        <>
            <div className={isRecountDisabled ? JobSummaryArticleCardContainer : `${roundedBottom} ${JobSummaryArticleCardContainer}`}>
                <div className={getBorderByStatus(statuses[0])}>
                    <p className={JobSummaryArticleCardTitle}>{name}</p>
                    <p className={JobSummaryArticleCardTitle2}>{size}</p>
                </div>

                <div className={JobSummaryArticleCardWrap}>
                    <span>Status:</span>
                    <span>
                    {
                        statuses.map((status, index) => (
                            <span className={getStatusArticle(status)} key={index}>{status}{index < statuses.length - 1 ? ', ' : ''}</span>))
                    }
                </span>
                    <span>EAN:</span> <span>{ean}</span>
                    <span>DOT:</span> <span>{dotsUsed.join(", ")}</span>
                    <span>Quantity:</span> <span>{placedQuantity}\{expectedQuantity}</span>
                </div>
            </div>
            {isRecountDisabled &&
                <div className={JobSummaryArticleCardButtonBlock}>
                    <button className={JobSummaryArticleCardButton} onClick={() => handleRecountItem(article)}>Recount
                        Items
                    </button>
                </div>
            }
        </>
    );
}

export default JobSummaryArticleCard;