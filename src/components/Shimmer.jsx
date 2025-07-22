import React from 'react';
import {shimmerFull} from "../styles/components/ShimmerStyles.js";

function Shimmer({ rounded = true, className = '' }) {
    return <div className={`${shimmerFull(rounded)} ${className}`}></div>;
}

export default Shimmer;
