import React from 'react';
import {stickyBlock, stickyBlockTitle1, stickyBlockTitle2} from "../styles/components/reusableСomponentsStyle.js";

function StickyTitle({title1, title2, className = ''}) {
    return (
        <div className={`${stickyBlock} ${className}`}>
            <h1 className={stickyBlockTitle1}>{title1}</h1>
            <p className={stickyBlockTitle2}>{title2}</p>
        </div>
    );
}

export default StickyTitle;