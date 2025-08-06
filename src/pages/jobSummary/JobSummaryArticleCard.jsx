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
import {useTranslation} from "react-i18next";

function JobSummaryArticleCard({article, delBtn = false}) {
    // Translations
    const { t: jobSummaryT } = useTranslation("jobSummary");

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
                    <span>{jobSummaryT("jobSummArtCard.status")}</span>
                    <span>
                    {
                        statuses.map((status, index) => (
                            <span className={getStatusArticle(status)} key={index}>{status}{index < statuses.length - 1 ? ', ' : ''}</span>))
                    }
                </span>
                    <span>{jobSummaryT("jobSummArtCard.ean")}</span> <span>{ean}</span>
                    <span>{jobSummaryT("jobSummArtCard.dot")}</span> <span>{dotsUsed.join(", ")}</span>
                    <span>{jobSummaryT("jobSummArtCard.quantity")}</span> <span>{placedQuantity}\{expectedQuantity}</span>
                </div>
            </div>
            {isRecountDisabled &&
                <div className={JobSummaryArticleCardButtonBlock}>
                    <button className={JobSummaryArticleCardButton} onClick={() => handleRecountItem(article)}>{jobSummaryT("btns.recountItems")}</button>
                </div>
            }
        </>
    );
}

export default JobSummaryArticleCard;