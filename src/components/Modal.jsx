import {modalContainer, modalOverlay} from "../styles/components/reusableСomponentsStyle.js";


function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null

    return (
        <div className={modalOverlay} onClick={onClose}>
            <div className={modalContainer} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal
