import React from 'react';
import {primeInput, primeInputLabel} from "../styles/components/reusableСomponentsStyle.js";

function PrimeInput({
                        labelText = '', placeholderText = '', idInput, children, onFocus, required = false,
                        type = 'text', value = '', onChange, className = '', ...rest
                    }) {
    return (
        <>
            {labelText && <label className={primeInputLabel} htmlFor={idInput}>{labelText}</label>}
            <div className={'relative w-full'}>
                <input
                    className={`${primeInput} ${className}`}
                    type={type}
                    placeholder={placeholderText}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={onFocus}
                    id={idInput}
                    required={required}
                    pattern="\d*"
                    {...rest}
                />
                {children}
            </div>
        </>
    );
}

export default PrimeInput;