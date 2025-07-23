import React from 'react';
import {spinnerBackground, spinnerContainer, spinnerContainerIMG} from "../styles/components/SpinnerStyles.js";
import gear from "../assets/icons/gear.svg";

function Spinner() {
    return (
        <div className={spinnerBackground}>
            <div className={spinnerContainer}>
                <img className={spinnerContainerIMG} src={`${gear}`} alt="logo"/>
            </div>
        </div>
    );
}

export default Spinner;