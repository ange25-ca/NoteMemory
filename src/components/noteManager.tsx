//Controlador de estados de la nota 
import { useState } from 'react';

const NoteManager = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notes, setNotes] = useState<{ id: string, title: string; description: string; color:string}[]>([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };      

    // Función para agregar una nueva nota
    const addNote = (title: string, description: string) => {
        const newNote = {
            id: Date.now().toString(), // Genera un id único para cada nota
            color: getRandomColor(), 
            title,
            description,
        };
        setNotes([...notes, newNote]);
        closeModal();
    };

    const handleOnDragEnd = (result: any) => {
        const { destination, source } = result;
    
        // Si no hay destino o no se movió la nota, salir
        if (!destination || destination.index === source.index) {
            return;
        }
    
        // Crea una copia del arreglo de notas
        const updatedNotes = Array.from(notes);
        const [movedNote] = updatedNotes.splice(source.index, 1); // Remueve la nota
        updatedNotes.splice(destination.index, 0, movedNote); // Inserta en la nueva posición
    
        setNotes(updatedNotes); // Actualiza el estado
    };

    return { isModalOpen, notes, openModal, closeModal, addNote, handleOnDragEnd };
};

export default NoteManager;
