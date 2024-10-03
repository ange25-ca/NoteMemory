import React, { useState } from "react";

//Se importan las imagenes
import iconEdit from '../assets/edit_note.png';
import iconDelete from '../assets/delete_note.png';
import ConfirmModal from "./Mod/confirmModal";
import NoteDetailModal from "./Mod/noteDatilsModel";

//Se crea la interfaz de las props definir el tipo de dato que se espera
interface NoteContentProps {
    //Se espera un titulo de tipo string
    title: string;
    //se espera una descripcion de tipo string
    description: string;
    //función para eliminar las noctas
    onDelete: ()=> void;
    //función para editar
    onEdit: () => void;
    //cambia el color
    color:string;
}

const NoteContent: React.FC<NoteContentProps> = ({ title, description, onDelete, onEdit, color }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'edit' | 'delete' | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenModal = (type: 'edit' | 'delete') => {
    console.log(`Abriendo modal para: ${type}`);
    setActionType(type);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    console.log(`Confirmando acción: ${actionType}`);
    if (actionType === 'delete') {
      console.log('Ejecutando onDelete');
      onDelete(); // Llama a la función de eliminación
    } else if (actionType === 'edit') {
      console.log('Ejecutando onEdit');
      onEdit(); // Llama a la función de edición
    }
    setIsModalOpen(false); // Cierra el modal
    setActionType(null); // Reinicia el tipo de acción
  };

  const handleCancel = () => {
    console.log('Cancelando acción, cerrando modal');
    setIsModalOpen(false);
    setActionType(null);
  };

  const handleOpenDetailModal = () => {
    console.log('Abriendo modal de detalles');
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    console.log('Cerrando modal de detalles');
    setIsDetailModalOpen(false);
  };

  return (
    <div className="notecontent" style={{ backgroundColor: color }}>
      <div className="note-actions">
        <button className="buttonActions" onClick={() => handleOpenModal('edit')}>
          <img
            src={iconEdit}
            alt="icono de editar nota"
            style={{ width: '22px', height: '22px', marginTop: '15px', marginBottom: '5px' }}
          />
        </button>
        <button className="buttonActions" onClick={() => handleOpenModal('delete')}>
          <img
            src={iconDelete}
            alt="icono de eliminar nota"
            style={{ width: '20px', height: '20px', marginTop: '15px', marginBottom: '5px' }}
          />
        </button>
      </div>

      {/* Contenido de la nota que abre el modal de detalles al hacer clic */}
      <div onClick={handleOpenDetailModal} style={{ cursor: 'pointer' }}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      {/* Modal de Confirmación */}
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message={
          actionType === 'delete'
            ? "¿Estás seguro de que quieres eliminar esta nota?"
            : "¿Estás seguro de que quieres editar esta nota?"
        }
      />

      {/* Modal de Detalles de la Nota */}
      <NoteDetailModal
        title={title}
        description={description}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal} 
        color={color}
        />
    </div>
  );
};

export default NoteContent;
