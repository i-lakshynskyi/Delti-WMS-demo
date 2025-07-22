import '../styles/global.css';
import trackLogo from '../assets/track-logo.png';
import {headerImg} from "../styles/components/headerStyle.js";

export default function Header() {
    return (
        <>
            <img className={headerImg} src={`${trackLogo}`} alt="trackLogo"/>
            <span>DeltiStore</span>
        </>
    )
}
