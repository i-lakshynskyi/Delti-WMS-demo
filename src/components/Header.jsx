import '../styles/global.css';
import Logo from '../assets/icons/Logo.svg';
import {
    headerLeftRightBlock, headerLeftRounded,
    headerLogoContainer,
    headerLogoImg,
    headerLogoText, headerRightRounded, headerWrap
} from "../styles/components/headerStyle.js";

export default function Header() {
    return (
        <div className={headerWrap}>
            <div className={`${headerLeftRightBlock} ${headerRightRounded}`}></div>
            <div className={headerLogoContainer}>
                <img className={headerLogoImg} src={`${Logo}`} alt="trackLogo"/>
                <span className={headerLogoText}>DeltiStore</span>
            </div>
            <div className={`${headerLeftRightBlock} ${headerLeftRounded}`}></div>
        </div>
    )
}
