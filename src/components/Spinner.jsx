import React from 'react';
import {
    spinnerBackground,
    spinnerContainer, spinnerImgCart,
    spinnerImgGear, spinnerOpacityLayer,
    spinnerWrap
} from "../styles/components/SpinnerStyles.js";
import LogoSpin from "../assets/icons/Logo-spiner.svg"
import cartSpin from "../assets/icons/cart-spin.svg"

function Spinner() {
    return (
        <div className={spinnerContainer}>
            <div className={spinnerBackground}>
                <div className={spinnerWrap}>
                    <div className={spinnerOpacityLayer}/>
                    <img className={spinnerImgCart} src={`${cartSpin}`} alt="logo"/>
                    <img className={spinnerImgGear} src={`${LogoSpin}`} alt="logo"/>
                </div>
            </div>
        </div>
    );
}

export default Spinner;