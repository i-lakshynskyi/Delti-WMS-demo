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
import {usePageTranslation} from "../../i18n/hooks/hooks.js";

function JobOverviewTyreCard({skuTires}) {
    // Translations
    const { t: overviewT } = usePageTranslation();

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
                    <p>{overviewT("skuCard.size")}</p> <p>{size}</p>
                    <p>{overviewT("skuCard.ean")}</p> <p>{ean}</p>
                    <p>{overviewT("skuCard.quantity")}</p> <p>{quantity}</p>
                    <p className={jobOverviewSKUsCardsRacks}>{overviewT("skuCard.racks")}</p> <p className={jobOverviewSKUsCardsRacks}>{racks}</p>
                </div>
            </div>
        </div>
    );
}

export default JobOverviewTyreCard;