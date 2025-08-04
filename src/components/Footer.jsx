import {footerContainer, footerImg, footerImgWrap} from "../styles/components/footerStyle.js";
import useStore from "../store/useStore.js";
import bug from "../assets/icons/bug.svg"
import home from "../assets/icons/Home.svg"
import jobs from "../assets/icons/Menu.svg"
import profile from "../assets/icons/profile.svg"

export default function Footer() {
    const setCurrentPage = useStore((state) => state.setCurrentPage)

    return (
        <div className={footerContainer}>
            <div className={footerImgWrap}>
                <img className={footerImg} src={`${home}`} alt="trackLogo" onClick={() => setCurrentPage("testFetchComponent")}/>
            </div>
            <div className={footerImgWrap}>
                <img className={footerImg} src={`${jobs}`} alt="trackLogo" onClick={() => setCurrentPage("jobs")}/>
            </div>
            <div className={footerImgWrap}>
                <img className={footerImg} src={`${bug}`} alt="trackLogo" onClick={() => setCurrentPage("damageReport")}/>
            </div>
            <div className={footerImg}>
                <img className={footerImg} src={`${profile}`} alt="trackLogo"/>
            </div>
        </div>
    )
}
