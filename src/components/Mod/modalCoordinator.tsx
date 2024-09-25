import { useState } from 'react';
import NoteModal from './createModal';
import NewNoteButton from '../newNote';

const NoteCoordinator = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para abrir el modal
    const openModal = () => setIsModalOpen(true);

    // Función para cerrar el modal
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            {/*Se pasa openModal al botón*/}
            <NewNoteButton openModal={openModal} /> 
            {/*Se pasa el isModalOpen y el CloseModal al MODAL*/}
            <NoteModal isModalOpen={isModalOpen} closeModal={closeModal} />
        </div>
    );
};

export default NoteCoordinator;
