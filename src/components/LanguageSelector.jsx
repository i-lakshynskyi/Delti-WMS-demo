import React, {useState, useEffect, useRef} from 'react';
import i18n from 'i18next';
import useStore from "../store/useStore.js";
import {
    languageSelectorIcon, languageSelectorLi,
    languageSelectorUl,
    languageSelectorWrap
} from "../styles/components/LanguageSelectorStyles.js";

const locales = [
    {code: 'en', label: 'English'},
    {code: 'de', label: 'Deutsch'},
    {code: 'fr', label: 'Français'},
    {code: 'ro', label: 'Română'},
];

function getFlagPath(code) {
    return `/icons/locales/flag-${code.toUpperCase()}.svg`;
}

export default function LanguageSelector() {
    const currentLocale = useStore(state => state.currentLocale);
    const setLocale = useStore(state => state.setLocale);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const savedLocale = localStorage.getItem('i18nextLng');
        if (savedLocale && savedLocale !== currentLocale) {
            setLocale(savedLocale);
            i18n.changeLanguage(savedLocale).then();
        }
    }, []);


    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleChange = (code) => {
        setLocale(code);
        i18n.changeLanguage(code).then();
        localStorage.setItem('i18nextLng', code);
        setOpen(false);
    };

    const selectedLocale = locales.find(l => l.code === currentLocale) || locales[0];

    return (
        <div ref={dropdownRef} className={languageSelectorWrap}>
            <div onClick={() => setOpen(!open)}>
                <img className={languageSelectorIcon} src={getFlagPath(selectedLocale.code)} alt={`${selectedLocale.label} flag`}/>
            </div>

            {open && (
                <ul className={languageSelectorUl}>
                    {locales
                        .filter(({code}) => code !== currentLocale)
                        .map(({code, label}) => (
                            <li className={languageSelectorLi} key={code} onClick={() => handleChange(code)} onMouseDown={e => e.preventDefault()}>
                                <img className={languageSelectorIcon} src={getFlagPath(code)} alt={`${label} flag`}/>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}

