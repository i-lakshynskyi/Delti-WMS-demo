import React from 'react';
import {
    spinnerBackground,
    spinnerContainer,
    spinnerContainerIMG,
    spinnerWrap
} from "../styles/components/SpinnerStyles.js";
import Logo from "../assets/icons/Logo.svg"

function Spinner() {
    return (
        <div className={spinnerContainer}>
            <div className={spinnerBackground}>
                <div className={spinnerWrap}>
                    <img className={spinnerContainerIMG} src={`${Logo}`} alt="logo"/>
                </div>
            </div>
        </div>
    );
}

export default Spinner;