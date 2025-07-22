import JobCard from "./JobCard.jsx";
import Modal from "../../components/Modal.jsx";
import {modalTitle} from "../../styles/components/reusableСomponentsStyle.js";

function ModalConfirmJob({ job, onConfirm, onClose}) {
    return (
        <Modal isOpen={!!job} onClose={onClose}>
            <span className={modalTitle}>Confirm Job</span>
            <JobCard task={job} handleTakeJob={onConfirm} />
        </Modal>
    )
}

export default ModalConfirmJob
