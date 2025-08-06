import JobCard from "./JobCard.jsx";
import Modal from "../../components/Modal.jsx";
import {modalTitle} from "../../styles/components/reusableСomponentsStyle.js";
import {usePageTranslation} from "../../i18n/hooks/hooks.js";

function ModalConfirmJob({ job, onConfirm, onClose}) {
    // Translations
    const { t: jobsT } = usePageTranslation();

    return (
        <Modal isOpen={!!job} onClose={onClose}>
            <span className={modalTitle}>{jobsT("modalConfirmJobTitle")}</span>
            <JobCard task={job} handleTakeJob={onConfirm} />
        </Modal>
    )
}

export default ModalConfirmJob
