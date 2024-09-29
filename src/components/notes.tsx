import React, { useState } from "react";
import NoteContent from "./noteContent";
import NoteModal from "./Mod/createModal";
import NewNoteButton from "./newNote";
import { Draggable } from "react-beautiful-dnd";

// Se crea la interfaz de las props para el componente padre
interface NoteProps {
  notes: { id: string; title: string; description: string; color:string }[]; // Ahora incluye 'id'
}

// Se crea el componente funcional padre que recibe las props
const NoteContainer: React.FC<NoteProps> = ({ notes = [] }) => {
  const [noteList, setNoteList] = useState<{ id: string; title: string; description: string; color:string }[]>(notes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>(""); 
  const [editDescription, setEditDescription] = useState<string>(""); 
  
  // Función para abrir el modal
  const openModal = (isNewNote: boolean = false) => {
    if (isNewNote) {
      // Limpiar los valores si se va a crear una nueva nota
      setEditTitle("");
      setEditDescription("");
      setCurrentEditIndex(null); // Resetear índice de edición
    }
    setIsModalOpen(true);
  };
  
  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Función para agregar una nueva nota o editar una existente
  const addNote = (title: string, description: string) => {
    if (currentEditIndex === null) {
      // Crear una nueva nota con un id único
      const newNote = { 
        id: Date.now().toString(),
        title, 
        description,
        color: getRandomColor(), // Asegúrate de incluir el color aquí
      };
      setNoteList((prevNotes) => [...prevNotes, newNote]);
    } else {
      // Actualizar una nota existente
      const updatedNotes = [...noteList];
      updatedNotes[currentEditIndex] = { ...updatedNotes[currentEditIndex], title, description };
      setNoteList(updatedNotes);
    }
    closeModal(); // Cerrar el modal después de crear/editar la nota
  };

  const deleteNote = (index: number) => {
    setNoteList((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };

  const editNote = (index: number) => {
    const noteToEdit = noteList[index];
    setEditTitle(noteToEdit.title);
    setEditDescription(noteToEdit.description);
    setCurrentEditIndex(index);
    openModal(); // Abrir modal para editar
  };

  return (
    <div>
      <div className="panel-create">
        <h2>My notes</h2>
        {/* Pasar true para indicar que se va a crear una nueva nota */}
        <NewNoteButton openModal={() => openModal(true)} />
      </div>
      <div className="note-container">
        <NoteModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          addNote={addNote}
          currentTitle={editTitle}
          currentDescription={editDescription}
        />
        <div className="note-container">
          {/* Mapea sobre el arreglo de notas y renderiza el NoteContent */}
          {noteList.map((note, index) => (
            <Draggable key={note.id} draggableId={note.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="note-item"
                  style={{ backgroundColor: note.color }}
                >
                  <NoteContent
                    title={note.title}
                    description={note.description}
                    onDelete={() => deleteNote(index)}
                    onEdit={() => editNote(index)} 
                    color={note.color}                    
                  />
                </div>
              )}
            </Draggable>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteContainer;
