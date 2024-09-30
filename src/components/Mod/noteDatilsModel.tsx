import React from "react";

// Interfaz para las props del modal
interface NoteDetailModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

const NoteDetailModal: React.FC<NoteDetailModalProps> = ({ title, description, isOpen, onClose }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no mostrar nada

  return (
    <div className="modal-info-notes">
      <div className="modal-content-info-notes">
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="buttonexpandir" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default NoteDetailModal;
