import React from "react";
import NoteContent from "./noteContent";

//Se crea la interfaz de las props para el componente padre
interface NoteProps{
    //
    notes: {title: string; description: string} [];
}

//Se crea el componete funcional padre padre que recibe las props
const NoteContainer: React.FC<NoteProps>= ({ notes }) => {

    return (
        <div className="note-content">
            {/* Mapea sobre el arreglo de notas y para cada nota 
            renderiza el NoteContent */}
            {notes.map((note, index) => (
                <NoteContent
                    key={index}
                    title={note.title}
                    description={note.description}
                />
            ))}
        </div>
    )
    
}

export default NoteContainer;