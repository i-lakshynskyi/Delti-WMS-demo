import React from 'react';
import {
    jobOverviewSKUsCardInfo,
    jobOverviewSKUsCardsContainer,jobOverviewSKUsCardsWrap,
    jobOverviewSKUsCardsIMG, jobOverviewSKUsCardsName, jobOverviewSKUsCardsRacks
} from "../../styles/pages/jobOverviewStyles.js";

function JobOverviewTyreCard({skuTires}) {
    const {ean, img, name, quantity, size, racks} = skuTires;
    return (
        <div className={jobOverviewSKUsCardsContainer}>
            <div className={jobOverviewSKUsCardsName}>{name}</div>
            <div className={jobOverviewSKUsCardsWrap}>
                <img className={jobOverviewSKUsCardsIMG} src={`${img}`} alt="tire"/>
                <div className={jobOverviewSKUsCardInfo}>
                    <p>Size: {size}</p>
                    <p>EAN: {ean}</p>
                    <p>Quantity: {quantity}</p>
                    <p className={jobOverviewSKUsCardsRacks}>Racks: {racks}</p>
                </div>
            </div>
        </div>
    );
}

export default JobOverviewTyreCard;