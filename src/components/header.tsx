import '../App.css';
import NoteModal from './Mod/createModal';
import NoteContainer from './notes';
import NoteManager from './noteManager';

// Creación del componente funcional para la barra de visualización
const Header = () => {
    const { isModalOpen, notes, closeModal, addNote } = NoteManager(); 
    
    return (
        <>
            <div>
                <NoteContainer notes={notes} />
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
