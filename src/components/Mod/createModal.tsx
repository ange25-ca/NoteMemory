import React, { useState, useEffect } from 'react';
import iconSave from '../../assets/save_note.png';
import iconCancel from '../../assets/cancel_note.png';

interface NoteModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  addNote: (title: string, description: string) => void;
  currentTitle?: string; // Para edición
  currentDescription?: string; // Para edición
}
//Se crea el componente funciona para el modal
const NoteModal: React.FC<NoteModalProps> = ({
  isModalOpen,
  closeModal,
  addNote,
  currentTitle = '', // Si no se edita, usar un string vacío
  currentDescription = ''
}) => {
  //Estado para el titulo de la nota
  const [title, setTitle] = useState(currentTitle);
  //Estado para la descripcion de la nota
  const [description, setDescription] = useState(currentDescription);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Estado para confirmar la acción
  const [actionToConfirm, setActionToConfirm] = useState<'save' | 'cancel' | null>(null); // Estado para saber qué acción confirmar

  // Efecto para actualizar los estados cuando el modal se abre en modo de edición
  useEffect(() => {
    if (isModalOpen) {
      setTitle(currentTitle);
      setDescription(currentDescription);
    }
  }, [isModalOpen, currentTitle, currentDescription]);

  const handleCreateNote = () => {
    addNote(title, description);
    closeModal(); // Cerrar el modal después de crear/editar la nota
    setTitle('');
    setDescription('');
  };

  const handleOpenConfirmModal = (action: 'save' | 'cancel') => {
    setActionToConfirm(action); // Establece la acción a confirmar
    setIsConfirmModalOpen(true); // Abre el modal de confirmación
  };

  const handleConfirmAction = () => {
    if (actionToConfirm === 'save') {
      handleCreateNote(); // Guarda la nota si la acción es "guardar"
    } else if (actionToConfirm === 'cancel') {
      closeModal(); // Cierra el modal si la acción es "cancelar"
    }
    setIsConfirmModalOpen(false); // Cierra el modal de confirmación
  };

  return (
    <div className='createModal'>
      {/* Se mostrara el modal si es true */}
      {isModalOpen && (
        <div className='Overlay'>
          <div className="modal">
            <div className="modal-content">
              <h2>{currentTitle ? "Edit Note" : "Create New Note"}</h2>
              <div className='info-modal'>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  //Actualizar el estado del titulo de la nota

                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className='modal-button'>
                  {/* Botón para crear la nota */}
                  <button className="buttonedit" onClick={() => handleOpenConfirmModal('save')}>
                    <img 
                      src={iconSave}
                      alt="icono de crear nota"
                      style={{ width: '35px', height: '35px'}} 
                    />
                  </button>
                  {/*Botón para cerrar el modal */}
                  <button className="buttonedit" onClick={() => handleOpenConfirmModal('cancel')}>
                    <img
                      src={iconCancel}
                      alt="icono de cancelar la nota"
                      style={{ width: '35px', height: '35px' }} 
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {isConfirmModalOpen && (
        <div className='Overlay'>
          <div className="modal">
            <div className="modal-content">
              <h3>{actionToConfirm === 'save' ? '¿Guardar la nota?' : '¿Cancelar la creación?'}</h3>
              <div className='modal-button'>
                <button className="buttonedit" onClick={handleConfirmAction}>
                  Confirmar
                </button>
                <button className="buttonedit" onClick={() => setIsConfirmModalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteModal;
