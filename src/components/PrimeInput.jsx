import React from 'react';
import {primeInput, primeInputLabel} from "../styles/components/reusableСomponentsStyle.js";

function PrimeInput({
                        labelText = '', placeholderText = '', idInput, children,
                        type = 'text', value = '', onChange, className = ''
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
                    id={idInput}
                />
                {children}
            </div>
        </>
    );
}

export default PrimeInput;