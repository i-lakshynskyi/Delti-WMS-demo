import React from 'react';
import {
    jobOverviewSKUsCardInfo,
    jobOverviewSKUsCardsContainer,
    jobOverviewSKUsCardsWrap,
    jobOverviewSKUsCardsIMG,
    jobOverviewSKUsCardsName,
    jobOverviewSKUsCardsRacks,
} from "../../styles/pages/jobOverviewStyles.js";

function JobOverviewTyreCard({skuTires}) {
    const {ean, img, name, quantity, size, racks} = skuTires;
    return (
        <div className={jobOverviewSKUsCardsContainer}>
            <div className={jobOverviewSKUsCardsName}>{name}</div>
            <div className={jobOverviewSKUsCardsWrap}>
                <img className={jobOverviewSKUsCardsIMG} src={`${img}`} alt="tire"/>
                <div className={jobOverviewSKUsCardInfo}>
                    <p>Size:</p> <p>{size}</p>
                    <p>EAN:</p> <p>{ean}</p>
                    <p>Quantity:</p> <p>{quantity}</p>
                    <p></p> <p className={jobOverviewSKUsCardsRacks}>Racks: {racks}</p>
                </div>
            </div>
        </div>
    );
}

export default JobOverviewTyreCard;