import React from 'react';
import {jobOverviewInfoCard} from "../../styles/pages/jobOverviewStyles.js";

function JobOverviewInfoCard({currentJob}) {
    const {poId, supplier, deliveryNote, dateArrival, gate, expectedTyres} = currentJob;
    return (
        <div className={jobOverviewInfoCard}>
            <div><p>PO Number</p><span>{poId}</span></div>
            <div><p>Supplier</p><span>{supplier}</span></div>
            <div><p>Delivery Note</p><span>{deliveryNote}</span></div>
            <div><p>Arrival Date</p><span>{dateArrival}</span></div>
            <div><p>Gate Assigned</p><span>{gate ? gate : ".."}</span></div>
            <div><p>Expected Tyres</p><span>{expectedTyres}</span></div>
        </div>
    );
}

export default JobOverviewInfoCard;