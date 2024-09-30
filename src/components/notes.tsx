import React, { useState } from "react";
import NoteContent from "./noteContent";
import NoteModal from "./Mod/createModal";
import NewNoteButton from "./newNote";
import chroma from "chroma-js";
import ConfirmModal from "./Mod/confirmModal";

// Se crea la interfaz de las props para el componente padre
interface NoteProps {
  notes: {
    id: string; 
    title: string;
    description: string; 
    color: string;
  }[];
}
// Se crea el componente funcional padre que recibe las props
const NoteContainer: React.FC<NoteProps> = ({ notes = [] }) => {
  const [noteList, setNoteList] = useState<{ id: string; title: string; description: string; color: string }[]>(notes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // Estado para el modal de confirmación
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>(""); 
  const [editDescription, setEditDescription] = useState<string>(""); 
  
  // Función para abrir el modal de confirmación
  const openConfirmModal = () => {
    setIsConfirmOpen(true);
  };

  // Función para confirmar y abrir el modal de creación de notas
  const confirmAndOpenModal = () => {
    setIsConfirmOpen(false);
    openModal(true); // Abrir el modal de creación de notas
  };

  // Función para cerrar el modal de confirmación
  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
  };

  const openModal = (isNewNote: boolean = false) => {
    if (isNewNote) {
      // Limpiar los valores si se va a crear una nueva nota
      setEditTitle("");
      setEditDescription("");
      setCurrentEditIndex(null); //Resetea índice de edición
    }
    setIsModalOpen(true);
  };
    // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getRandomColor = () => {
    // Genera un color aleatorio pastel utilizando chroma.js
    const randomColor = chroma.random().set('hsl.s', 0.3).set('hsl.l', 0.8).hex();
    return randomColor;
  };

  // Función para agregar una nueva nota o editar una existente
  const addNote = (title: string, description: string) => {
    if (currentEditIndex === null) {
      // Crear una nueva nota con un id único
      const newNote = { 
        id: Date.now().toString(),
        title, 
        description,
        color: getRandomColor(),
      };
      setNoteList((prevNotes) => [...prevNotes, newNote]);
    } else {
      // Actualizar una nota existente
      const updatedNotes = [...noteList];
      updatedNotes[currentEditIndex] = { ...updatedNotes[currentEditIndex], title, description };
      setNoteList(updatedNotes);
    }
    closeModal();
  };

  const deleteNote = (index: number) => {
    setNoteList((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };

  const editNote = (index: number) => {
    const noteToEdit = noteList[index];
    setEditTitle(noteToEdit.title);
    setEditDescription(noteToEdit.description);
    setCurrentEditIndex(index);
    openModal();
  };

  return (
    <div>
      <div className="panel-create">
        <h2>My notes</h2>
        {/* Abrir el modal de confirmación antes de crear una nueva nota */}
        <NewNoteButton openModal={openConfirmModal} />
      </div>
      <div className="note-container">
        {/* Modal de confirmación */}
        <ConfirmModal
          isOpen={isConfirmOpen}
          onConfirm={confirmAndOpenModal}
          onCancel={closeConfirmModal} 
          message={"¿Está seguro que quiere crear una nota? "}        />
        {/* Modal para crear o editar una nota */}
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
            <div
              key={note.id}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteContainer;

