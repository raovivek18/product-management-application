import { FiAlertCircle } from 'react-icons/fi';
import './DeleteModal.css';

const DeleteModal = ({ isOpen, onClose, onConfirm, productName }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-card fade-in">
                <div className="modal-header-icon">
                    <div className="icon-pulse">
                        <FiAlertCircle />
                    </div>
                </div>
                <div className="modal-body">
                    <h2>Delete Product</h2>
                    <p>Are you sure you want to delete the Product ‘{productName}’?</p>
                </div>
                <div className="modal-footer-btns">
                    <button className="modal-btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="modal-btn-primary" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
