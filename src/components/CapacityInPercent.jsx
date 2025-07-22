import React from 'react';
import {
    capacityInPercentContainer,
    percentBarColor,
    percentBlock, percentBurColorWrap
} from "../styles/components/CapacityInPercentStyle.js";

function CapacityInPercent({maxCapacity, totalItems, title, type}) {
    let percent = 0;
    let label = '';

    if (type === "Rack") {
        percent = Math.min(100, Math.round((totalItems / maxCapacity) * 100));
        label = `${percent || 0}%`;
    } else if (type === "Article") {
        const totalRequiredRacks = maxCapacity; // ← просто беремо як є
        percent = Math.min(100, Math.round((totalItems / totalRequiredRacks) * 100));
        label = (totalItems && totalRequiredRacks) ? `${totalItems} / ${totalRequiredRacks}` : "0/0";
    }

    let barColor = 'bg-green-500';
    if (percent >= 80) barColor = 'bg-[#ff4500]';
    else if (percent >= 50) barColor = 'bg-yellow-400';

    return (
        <div className={capacityInPercentContainer}>
            <div className={percentBlock}>
                <p>{title}</p>
                <p>{label}</p>
            </div>
            <div className={percentBurColorWrap}>
                <div
                    className={`${percentBarColor} ${barColor}`}
                    style={{width: `${percent}%`}}
                ></div>
            </div>
        </div>
    );
}

export default CapacityInPercent;