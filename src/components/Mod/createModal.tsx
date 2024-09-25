import React, { useState } from 'react';


//Se crea una interfaz para la espera de los componentes de la nota
interface NoteModalProps {
    //Permite saber si el modal está abierto
    isModalOpen: boolean;
    //Función para cerrar el modal
    closeModal: () => void;
}

//Se crea el componente funciona para el modal
const NoteModal: React.FC<NoteModalProps> = ({ isModalOpen, closeModal }) => {
    //Se define de los estados locales 
        //Estado para el titulo de la nota
    const [title, setTitle] = useState(''); 
        //Estado para la descripción de la nota
    const [description, setDescription] = useState('');

    // Función para manejar la creación de la nota
    const handleCreateNote = () => {
        //Por mientras se muestra la nota en la consola
        console.log('Nota creada:', { title, description });
        closeModal(); // Cerrar el modal después de crear la nota
    };

    return (
        <div className='createModal'>
            {/* Se mostrara el modal si es true */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create New Note</h2>
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
                             //Actualizar el estado la descripción de la nota
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className='modal-button'>
                            {/* Botón para crear la nota */}                       
                            <button onClick={handleCreateNote}>Create Note</button>
                            {/* Botón para cerrar el modal */}
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteModal;
