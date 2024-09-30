import React, { useState } from "react";

//Se importan las imagenes
import iconEdit from '../assets/edit_note.png';
import iconDelete from '../assets/delete_note.png';
import ConfirmModal from "./Mod/confirmModal";

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

//Se crea el componente funcional que recibe props de las notas
const NoteContent: React.FC<NoteContentProps> = ({ title, description, onDelete, onEdit, color }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'edit' | 'delete' | null>(null);

  //La funcion puede tomar un valor edit o delete
  const handleOpenModal = (type: 'edit' | 'delete') => {
    //Actualiza el estado
    setActionType(type);
    //Dice que el modal esta abierto
    setIsModalOpen(true);
  };

  //Se crea una función para que interactue el modal
  const handleConfirm = () => {
    if (actionType === 'delete') {
      onDelete(); // Llama a la función de eliminación
    } else if (actionType === 'edit') {
      onEdit(); // Llama a la función de edición
    }
    setIsModalOpen(false); // Cierra el modal
    setActionType(null); // Reinicia el tipo de acción
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Solo cierra el modal
    setActionType(null); // Reinicia el tipo de acción
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
        <h3>{title}</h3>
        <p>{description}</p>

        {/* Modal de Confirmación */}
        <ConfirmModal
            isOpen={isModalOpen}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            message={actionType === 'delete' ? /* Dependiendo de la acción saldra el mensaje*/
              "¿Estás seguro de que quieres eliminar esta nota?" : 
              "¿Estás seguro de que quieres editar esta nota?"}
        />
    </div>
);
}


export default NoteContent;
