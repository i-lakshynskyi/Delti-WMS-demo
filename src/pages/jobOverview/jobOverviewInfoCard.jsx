import React from 'react';
import {jobOverviewInfoCard} from "../../styles/pages/jobOverviewStyles.js";
import {usePageTranslation} from "../../i18n/hooks/hooks.js";

function JobOverviewInfoCard({currentJob}) {
    // Translations
    const { t: overviewT } = usePageTranslation();

    const {poId, supplier, deliveryNote, dateArrival, gate, expectedTyres} = currentJob;
    return (
        <div className={jobOverviewInfoCard}>
            <div><p>{overviewT("jobInfoCard.po")}</p><span>{poId}</span></div>
            <div><p>{overviewT("jobInfoCard.sup")}</p><span>{supplier}</span></div>
            <div><p>{overviewT("jobInfoCard.delNot")}</p><span>{deliveryNote}</span></div>
            <div><p>{overviewT("jobInfoCard.arrivalDate")}</p><span>{dateArrival}</span></div>
            <div><p>{overviewT("jobInfoCard.gate")}</p><span>{gate ? gate : ".."}</span></div>
            <div><p>{overviewT("jobInfoCard.expTire")}</p><span>{expectedTyres}</span></div>
        </div>
    );
}

export default JobOverviewInfoCard;