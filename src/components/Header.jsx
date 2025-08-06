import '../styles/global.css';
import Logo from '../assets/icons/Logo.svg';
import {
    headerLeftRightBlock, headerLeftRounded,
    headerLogoContainer,
    headerLogoImg,
    headerLogoText, headerRightRounded, headerWrap
} from "../styles/components/headerStyle.js";
import {useTranslation} from "react-i18next";

export default function Header() {
    const { t } = useTranslation('common');

    return (
        <div className={headerWrap}>
            <div className={`${headerLeftRightBlock} ${headerRightRounded}`}></div>
            <div className={headerLogoContainer}>
                <img className={headerLogoImg} src={`${Logo}`} alt="trackLogo"/>
                <span className={headerLogoText}>{t('mainLogo')}</span>
            </div>
            <div className={`${headerLeftRightBlock} ${headerLeftRounded}`}></div>
        </div>
    )
}
