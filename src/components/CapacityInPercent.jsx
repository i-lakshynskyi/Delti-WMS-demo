import React from 'react';
import {
    capacityInPercentContainer,
    percentBarColor,
    percentBlock, percentBurColorWrap
} from "../styles/components/CapacityInPercentStyle.js";

function CapacityInPercent({ maxCapacity, totalItems}) {
    const percent = Math.min(100, Math.round((totalItems / maxCapacity) * 100));

    let barColor = 'bg-green-500';
    if (percent >= 80) barColor = 'bg-[#ff4500]';
    else if (percent >= 50) barColor = 'bg-yellow-400';

    return (
        <div className={capacityInPercentContainer}>
            <div className={percentBlock}><p>Rack Capacity:</p>{`${percent ? percent : "0"}%`}</div>
            <div className={percentBurColorWrap}>
                <div
                    className={`${percentBarColor} ${barColor}`}
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    );
}

export default CapacityInPercent;