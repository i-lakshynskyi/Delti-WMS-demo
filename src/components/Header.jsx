import '../styles/global.css';
import trackLogo from '../assets/track-logo.png';

export default function Header() {
    return (
        <>
            <img src={trackLogo} alt="trackLogo"/>
            <span>DeltiStore</span>
        </>
    )
}
