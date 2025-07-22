import React, {useEffect, useState} from 'react';
import {
    jobOverviewSKUsCardInfo,
    jobOverviewSKUsCardsContainer,
    jobOverviewSKUsCardsWrap,
    jobOverviewSKUsCardsIMG,
    jobOverviewSKUsCardsName,
    jobOverviewSKUsCardsRacks, jobOverviewSKUsCardsIMGWrap,
} from "../../styles/pages/jobOverviewStyles.js";
import Shimmer from "../../components/Shimmer.jsx";
import {preloadImage} from "../../utils/functions.js";
import TyrePlaceholder from "../../components/TyrePlaceholder.jsx";

function JobOverviewTyreCard({skuTires}) {
    const {ean, img, name, quantity, size, racks} = skuTires;
    const [isImgLoaded, setIsImgLoaded] = useState(false);
    const [isErrorIMG, setIsErrorIMG] = useState(false);

    useEffect(() => {
        preloadImage(img)
            .then(() => setIsImgLoaded(true))
            .catch(() => {
                    setIsImgLoaded(true);
                    setIsErrorIMG(true);
                    console.error(`Image ${img} not found. Please check the image path.`);
                }
            );
    }, [img]);

    return (
        <div className={jobOverviewSKUsCardsContainer}>
            <div className={jobOverviewSKUsCardsName}>{name}</div>
            <div className={jobOverviewSKUsCardsWrap}>
                <div className={jobOverviewSKUsCardsIMGWrap}>
                    {!isImgLoaded ?
                        <Shimmer/>
                        :
                        <>
                            {!isErrorIMG ?
                                <img className={jobOverviewSKUsCardsIMG} src={`${img}`} alt="tire"/> :
                                <TyrePlaceholder brand={name} size={size}/>
                            }
                        </>
                    }
                </div>
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