import gateBlue from '../../assets/gate-blue.png'
import {
    getStatusClass, jobCardGate,
    jobCardGateImg,
    jobCardContainer,
    jobID, jodCardSquare, jodCardSquareBoldText, jodCardSquareSmallText
} from "../../styles/pages/goodsReceivingJobsStyles.js";
import PrimeButton from "../../components/PrimeButton.jsx";

function JobCard({task, handleTakeJob}) {
    const {poId, status, deliveryNote, expectedTyres, gate, skus, supplier} = task;
    const isValid = status === "Pending";

    return (
        <div className={jobCardContainer}>
            <span className={jobID}>{poId}</span>
            <span className={getStatusClass(status)}>{status}</span>

            <span>Supplier:</span>
            <span>{supplier}</span>

            <span>Delivery Note:</span>
            <span>{deliveryNote}</span>

            <div className={jodCardSquare}>
                <p className={jodCardSquareSmallText}>Expected Tyres</p>
                <p className={jodCardSquareBoldText}>{expectedTyres}</p>
            </div>
            <div className={jodCardSquare}>
                <p className={jodCardSquareSmallText}>SKUs</p>
                <p className={jodCardSquareBoldText}>{skus}</p>
            </div>

            <span className={jobCardGate}>
                <img className={jobCardGateImg} src={`${gateBlue}`} alt="gate"/>
                Gate: {gate ? gate : '..'}
            </span>
            <PrimeButton disabled={!isValid} onClick={() => handleTakeJob(task)}>Take job</PrimeButton>
        </div>
    );
}

export default JobCard;