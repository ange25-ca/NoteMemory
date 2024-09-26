import React, { useState } from "react";
import NoteContent from "./noteContent";
import NoteModal from "./Mod/createModal";
import NewNoteButton from "./newNote";

//Se crea la interfaz de las props para el componente padre
interface NoteProps{
    //
    notes: {title: string; description: string} [];
}

//Se crea el componete funcional padre que recibe las props
const NoteContainer: React.FC<NoteProps>= ({ notes =[]}) => {
    
    const [noteList, setNoteList] = useState<{ title: string; description: string }[]>(notes); // Estado para almacenar las notas
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Función para abrir el modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        console.log("Cerrando modal...");
        setIsModalOpen(false);
    };

    // Función para agregar una nueva nota
    const addNote = (title: string, description: string) => {
        const newNote = { title, description };
        setNoteList(prevNotes => [...prevNotes, newNote]); // Agregar la nueva nota al estado
        //console.log('Nueva nota añadida:', newNote);
    };

    return (
        <div className="note-container">
            <div>
                <NewNoteButton openModal={openModal} />
            </div>
            <NoteModal 
                isModalOpen={isModalOpen} 
                closeModal={closeModal} 
                addNote={addNote} 
            />
            <div className="note-content">
                {/* Mapea sobre el arreglo de notas y renderiza el NoteContent */}
                {noteList.map((note, index) => (
                    <NoteContent
                        key={index}
                        title={note.title}
                        description={note.description}
                    />
                ))}
            </div>
        </div>
    );
    
}

export default NoteContainer;