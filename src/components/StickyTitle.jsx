import React from 'react';
import {stickyBlock, stickyBlockTitle1, stickyBlockTitle2} from "../styles/components/reusableСomponentsStyle.js";

function StickyTitle({title1, title2}) {
    return (
        <div className={stickyBlock}>
            <h1 className={stickyBlockTitle1}>{title1}</h1>
            <p className={stickyBlockTitle2}>{title2}</p>
        </div>
    );
}

export default StickyTitle;