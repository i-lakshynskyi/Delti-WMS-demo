import gateBlue from '../../assets/gate-blue.png'
import {
    getStatusClass, jabCardButton, jabCardButtonDisabled, jabCardGate,
    jabCardGateImg,
    jobCardContainer,
    jobID, jodCardSquare, jodCardSquareBoldText, jodCardSquareSmallText
} from "../../styles/pages/goodsReceivingJobsStyles/goodsReceivingJobsStyles.js";

function JobCard({task, handleTakeJob}) {
    const {id, status, deliveryNote, expectedTyres, gate, skus, supplier} = task;
    const isValid = status === "Pending";

    return (
        <div className={jobCardContainer}>
            <span className={jobID}>{id}</span>
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

            <span className={jabCardGate}>
                <img className={jabCardGateImg} src={`${gateBlue}`} alt="gate"/>
                Gate: {gate}
            </span>
            <button className={isValid ? jabCardButton : jabCardButtonDisabled} disabled={!isValid} onClick={() => handleTakeJob(task)}>Take job</button>
        </div>
    );
}

export default JobCard;