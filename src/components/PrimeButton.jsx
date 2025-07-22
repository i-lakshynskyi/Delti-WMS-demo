import React from 'react'
import {primeButton, primeButtonDisabled} from "../styles/components/reusableСomponentsStyle.js";

function Button({ onClick, disabled = false, children, className = '', type = 'button' }) {
    const baseClass = disabled ? primeButtonDisabled : primeButton
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClass} ${className}`}
        >
            {children}
        </button>
    )
}

export default Button
