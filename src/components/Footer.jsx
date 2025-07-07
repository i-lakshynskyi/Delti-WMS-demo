import home from "../assets/home.png";
import jobs from "../assets/jobs.png";
import profile from "../assets/profile.png";
import {footerImg, footerImgWrap} from "../styles/components/footerStyle.js";
import useStore from "../store/useStore.js";

export default function Footer() {

    const setCurrentPage = useStore((state) => state.setCurrentPage)

    return (
        <>
            <div className={footerImgWrap}>
                <img className={footerImg} src={`${home}`} alt="trackLogo"/>
                Home
            </div>
            <div className={footerImgWrap}>
                <img className={footerImg} src={`${jobs}`} alt="trackLogo" onClick={() => setCurrentPage("jobs")}/>
                Jobs
            </div>
            <div className={footerImgWrap}>
                <img className={footerImg} src={`${profile}`} alt="trackLogo" onClick={() => setCurrentPage("scanRackQR")}/>
                Profile
            </div>
        </>
    )
}
