// ConfirmModal.tsx
import React from 'react';
import '../../App.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null; // No renderiza nada si el modal no está abierto

  return (
    <div className="modal-overlay-confirm">
      <div className="modal-content-confirm">
        <p>{message}</p>
        <div className="modal-actions-confirm">
          <button className='buttonConfirm' onClick={onConfirm}>Aceptar</button>
          <button className='buttonConfirm' onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
