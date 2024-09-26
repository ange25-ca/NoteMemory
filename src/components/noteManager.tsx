//Controlador de
import { useState } from 'react';

const NoteManager = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notes, setNotes] = useState<{ title: string; description: string }[]>([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Función para agregar una nueva nota
    const addNote = (title: string, description: string) => {
        setNotes([...notes, { title, description }]);
        closeModal();
    };

    const handleOnDragEnd = (result: any) => {
        const { destination, source } = result;

        if (!destination || destination.index === source.index) {
            return;
        }

        const updatedNotes = Array.from(notes);
        const [movedNote] = updatedNotes.splice(source.index, 1);
        updatedNotes.splice(destination.index, 0, movedNote);

        setNotes(updatedNotes);
    };

    return { isModalOpen, notes, openModal, closeModal, addNote, handleOnDragEnd };
};

export default NoteManager;
