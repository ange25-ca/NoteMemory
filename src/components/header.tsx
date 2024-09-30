import '../App.css';
import NoteModal from './Mod/createModal';
import NoteContainer from './notes';
import NoteManager from './noteManager';

// Creación del componente funcional para la barra de visualización
const Header = () => {
    const { isModalOpen, notes, closeModal, addNote } = NoteManager(); // Usa el NoteManager sin drag and drop
    
    return (
        <>
            <div>
                <NoteContainer notes={notes} /> {/* Renderiza el contenedor de notas sin DragDropContext */}
            </div>
            <NoteModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                addNote={addNote} // Pasar la función addNote
            />
        </>
    );
};

export default Header;
