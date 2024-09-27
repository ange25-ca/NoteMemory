import { useState } from 'react';
import NoteModal from './createModal';
import NewNoteButton from '../newNote';
import NoteContent from '../noteContent';

// Definición de la interfaz para las props
interface NoteCoordinatorProps {
    notes: { title: string; description: string }[];
    addNote: (title: string, description: string) => void;
    closeModal: () => void;
    isModalOpen: boolean;
}

const NoteCoordinator: React.FC<NoteCoordinatorProps> = ({ notes, addNote, closeModal, isModalOpen }) => {
    const [isModalOpenState, setIsModalOpen] = useState(isModalOpen); // Estado local para el modal

    // Función para abrir el modal
    const openModal = () => setIsModalOpen(true);

    return (
        <div>
            <NewNoteButton openModal={openModal} />
            <NoteModal 
                isModalOpen={isModalOpenState} 
                closeModal={closeModal} 
                addNote={addNote} 
            />
            <div className="note-content">
                {/* Mapea sobre el arreglo de notas y renderiza el NoteContent */}
                {notes.map((note, index) => (
                    <NoteContent
                        key={index}
                        title={note.title}
                        description={note.description} onDelete={function (): void {
                            throw new Error('Function not implemented.');
                        } } onEdit={function (): void {
                            throw new Error('Function not implemented.');
                        } }                    />
                ))}
            </div>
        </div>
    );
};

export default NoteCoordinator;

