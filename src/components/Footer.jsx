import home from "../assets/home.png";
import jobs from "../assets/jobs.png";
import profile from "../assets/profile.png";
import {footerImg, footerImgWrap} from "../styles/components/footerStyle.js";

export default function Footer() {
    return (
        <>
            <div className={footerImgWrap}>
                <img className={footerImg} src={home} alt="trackLogo"/>
                Home
            </div>
            <div className={footerImgWrap}>
                <img className={footerImg} src={jobs} alt="trackLogo"/>
                Jobs
            </div>
            <div className={footerImgWrap}>
                <img className={footerImg} src={profile} alt="trackLogo"/>
                Profile
            </div>
        </>
    )
}
