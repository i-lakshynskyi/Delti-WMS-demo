import home from "../assets/home.png";
import jobs from "../assets/jobs.png";
import {footerContainer, footerImg, footerImgWrap} from "../styles/components/footerStyle.js";
import useStore from "../store/useStore.js";
import profile from "../assets/profile.png"

export default function Footer() {
    const currentJob = useStore((state) => state.jobSummary.currentJob);
    const setCurrentPage = useStore((state) => state.setCurrentPage)

    return (
        <div className={footerContainer}>
            <div className={footerImgWrap}>
                <img className={footerImg} src={`${home}`} alt="trackLogo" onClick={() => setCurrentPage("testFetchComponent")}/>
            </div>
            <div className={footerImgWrap}>
                <img className={footerImg} src={`${jobs}`} alt="trackLogo" onClick={() => setCurrentPage("jobs")}/>
            </div>
            <div className={`${footerImg} ${!currentJob ? "opacity-40" : ""}`}>
                <img className={footerImg} src={`${profile}`} alt="trackLogo"/>
            </div>
        </div>
    )
}
