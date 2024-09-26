import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import '../App.css';
import NoteModal from './Mod/createModal';
import NoteContainer from './notes';
import NoteManager from './noteManager';

//Creación del componente funcional para la barra
// de visualización
const Header = () => {
    const { isModalOpen, notes, closeModal, addNote, handleOnDragEnd, } = NoteManager(); // Usa el NoteManage
    
    return (
        <>
            <div className="panel-create">
                <h4>My Notes</h4>
            </div>
            <div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="notes">
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <NoteContainer notes={notes} />
                                {provided.placeholder} {/* Placeholder para el droppable */}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
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