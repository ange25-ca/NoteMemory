import React from "react";
import iconExpandir from '../../assets/visibility.png';

// Interfaz para las props del modal
interface NoteDetailModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  color: string;
}

const NoteDetailModal: React.FC<NoteDetailModalProps> = ({ title, description, isOpen, onClose, color }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no mostrar nada

  return (
    <div className="modal-info-notes" >
      <div className="modal-content-info-notes" style={{ backgroundColor: color }}>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="buttonexpandir" onClick={onClose}>
          <img
            src={iconExpandir}
            alt="icono de crear nota"
            style={{ width: '35px', height: '35px' }}
          />
          </button>
      </div>
    </div>
  );
};

export default NoteDetailModal;
