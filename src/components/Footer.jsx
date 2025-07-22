import home from "../assets/home.png";
import jobs from "../assets/jobs.png";
import {footerContainer, footerImg, footerImgWrap} from "../styles/components/footerStyle.js";
import useStore from "../store/useStore.js";
import qrSvg from "../assets/icons/qr-colored.svg";
import Summary from "../assets/icons/statistics.svg";
import barCodeSvg from "../assets/icons/barcode.svg";

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
                <img className={footerImg} src={`${qrSvg}`} alt="trackLogo" onClick={() => currentJob && setCurrentPage("scanRackQR")}/>
            </div>
            <div className={`${footerImg} ${!currentJob ? "opacity-40" : ""}`}>
                <img className={footerImg} src={`${barCodeSvg}`} alt="trackLogo" onClick={() => currentJob && setCurrentPage("scanArticle")}/>
            </div>
            <div className={`${footerImg} ${!currentJob ? "opacity-40" : ""}`}>
                <img className={footerImg} src={`${Summary}`} alt="trackLogo" onClick={() => currentJob && setCurrentPage("jobSummary")}/>
            </div>
        </div>
    )
}
