import gateBlue from '../../assets/gate-blue.png'
import {
    getStatusClass, jobCardGate,
    jobCardGateImg,
    jobCardContainer,
    jobID, jodCardSquare, jodCardSquareBoldText, jodCardSquareSmallText
} from "../../styles/pages/goodsReceivingJobsStyles.js";
import PrimeButton from "../../components/PrimeButton.jsx";
import {usePageTranslation} from "../../i18n/hooks/hooks.js";

function JobCard({task, handleTakeJob}) {
    // Translations
    const { t: jobsT } = usePageTranslation();

    const {poId, status, deliveryNote, expectedTyres, gate, skus, supplier} = task;
    const isValid = status === "Pending";

    return (
        <div className={jobCardContainer}>
            <span className={jobID}>{jobsT("jobCard.po")} {poId}</span>
            <span className={getStatusClass(status)}>{jobsT(`statuses.${status}`)}</span>

            <span>{jobsT("jobCard.sup")}</span>
            <span>{supplier}</span>

            <span>{jobsT("jobCard.delNot")}</span>
            <span>{deliveryNote}</span>

            <div className={jodCardSquare}>
                <p className={jodCardSquareSmallText}>{jobsT("jobCard.expTire")}</p>
                <p className={jodCardSquareBoldText}>{expectedTyres}</p>
            </div>
            <div className={jodCardSquare}>
                <p className={jodCardSquareSmallText}>{jobsT("jobCard.sku")}</p>
                <p className={jodCardSquareBoldText}>{skus}</p>
            </div>

            <span className={jobCardGate}>
                <img className={jobCardGateImg} src={`${gateBlue}`} alt="gate"/>
                {jobsT("jobCard.gate")} {gate ? gate : '..'}
            </span>
            <PrimeButton disabled={!isValid} onClick={() => handleTakeJob(task)}>{jobsT("btns.takeJob")}</PrimeButton>
        </div>
    );
}

export default JobCard;