import home from "../assets/home.png";
import jobs from "../assets/jobs.png";
import profile from "../assets/profile.png";
import '../styles/global.css';

export default function Footer() {
    return (
        <>
            <div className="f-img-wrap">
                <img src={home} alt="trackLogo"/>
                Home
            </div>
            <div className="f-img-wrap">
                <img src={jobs} alt="trackLogo"/>
                Jobs
            </div>
            <div className="f-img-wrap">
                <img src={profile} alt="trackLogo"/>
                Profile
            </div>
        </>
    )
}
