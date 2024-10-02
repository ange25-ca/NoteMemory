import React, { useState } from "react";
import NoteContent from "./noteContent";
import NoteModal from "./Mod/createModal";
import NewNoteButton from "./newNote";
import chroma from "chroma-js";
import ConfirmModal from "./Mod/confirmModal";
import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import NoteDetailModal from "./Mod/noteDatilsModel";

// Se crea la interfaz de las props para el componente padre
interface NoteProps {
  notes: {
    id: string;
    title: string;
    description: string;
    color: string;
  }[];
}

const NoteContainer: React.FC<NoteProps> = ({ notes = [] }) => {
  const [noteList, setNoteList] = useState<{ id: string; title: string; description: string; color: string }[]>(notes);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de creación
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // Modal de confirmación
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>(""); 
  const [editDescription, setEditDescription] = useState<string>("");

  // Modal de detalles de nota
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Modal de detalles
  const [selectedNote, setSelectedNote] = useState<{ title: string; description: string } | null>(null);

  const openConfirmModal = () => setIsConfirmOpen(true);

  const confirmAndOpenModal = () => {
    setIsConfirmOpen(false);
    openModal(true);
  };

  const closeConfirmModal = () => setIsConfirmOpen(false);

  const openModal = (isNewNote: boolean = false) => {
    setIsDetailModalOpen(false); // Asegura que el modal de detalles esté cerrado
    if (isNewNote) {
      setEditTitle("");
      setEditDescription("");
      setCurrentEditIndex(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const openDetailModal = (note: { title: string; description: string }) => {
    setIsModalOpen(false); // Asegura que el modal de creación esté cerrado
    setSelectedNote(note);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedNote(null);
  };

  const getRandomColor = () => chroma.random().set("hsl.s", 0.3).set("hsl.l", 0.8).hex();

  const addNote = (title: string, description: string) => {
    if (currentEditIndex === null) {
      const newNote = {
        id: Date.now().toString(),
        title,
        description,
        color: getRandomColor(),
      };
      setNoteList((prevNotes) => [...prevNotes, newNote]);
    } else {
      const updatedNotes = [...noteList];
      updatedNotes[currentEditIndex] = { ...updatedNotes[currentEditIndex], title, description };
      setNoteList(updatedNotes);
    }
    closeModal();
  };

  const deleteNote = (index: number) => setNoteList((prevNotes) => prevNotes.filter((_, i) => i !== index));

  const editNote = (index: number) => {
    const noteToEdit = noteList[index];
    setEditTitle(noteToEdit.title);
    setEditDescription(noteToEdit.description);
    setCurrentEditIndex(index);
    openModal();
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setNoteList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Configuración de sensores
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <div>
      <div className="panel-create">
        <h2>My notes</h2>
        <NewNoteButton openModal={openConfirmModal} />
      </div>
      <div className="note-container">
        {/* Modal de confirmación para crear una nueva nota */}
        <ConfirmModal isOpen={isConfirmOpen} onConfirm={confirmAndOpenModal} onCancel={closeConfirmModal} message={"¿Está seguro que quiere crear una nota?"} />

        {/* Modal de creación/edición de notas */}
        {isModalOpen && (
          <NoteModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            addNote={addNote}
            currentTitle={editTitle}
            currentDescription={editDescription}
          />
        )}

        {/* Modal de detalles de la nota */}
        {isDetailModalOpen && selectedNote && (
          <NoteDetailModal
            title={selectedNote.title}
            description={selectedNote.description}
            isOpen={isDetailModalOpen}
            onClose={closeDetailModal}
          />
        )}

        {/* Drag and Drop context */}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext items={noteList}>
            <div className="note-container">
              {noteList.map((note, index) => (
                <SortableNote
                  key={note.id}
                  id={note.id}
                  note={note}
                  onDelete={() => deleteNote(index)}
                  onEdit={() => editNote(index)}
                  onView={() => openDetailModal(note)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

const handleClick = (event: React.MouseEvent) => {
  event.stopPropagation();
  onView();
};


// Componente para notas con funcionalidad drag and drop
interface SortableNoteProps {
  id: string;
  note: {
    id: string;
    title: string;
    description: string;
    color: string;
    style?: React.CSSProperties;
  };
  onDelete: () => void;
  onEdit: () => void;
  onView: () => void;
}

const SortableNote: React.FC<SortableNoteProps> = ({ id, note, onDelete, onEdit}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    ...note.style,
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners} // Le da la propiedad para que se mueva
      className="note-item"
      onClick={handleClick}
    >
      <NoteContent
        title={note.title}
        description={note.description}
        color={note.color}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
};

export default NoteContainer;
function onView() {
  throw new Error("Function not implemented.");
}

