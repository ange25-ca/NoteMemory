//Implementación del button para una NewNote

//Creación del componente funcional para el botón de nueva nota
import React from 'react';
//importo la imagen
import noteIcon from '../assets/add_notes_griss.png';

//Se crea una interfaz para la el botón de crear nota
interface NewNoteButtonProps {
    openModal: () => void;
}

// Se crea el componente funcional la cual llama a la funcion openModal
const NewNoteButton: React.FC<NewNoteButtonProps> = ({ openModal }) => {
    //Se cambia el estado del botón a true
    return (
    <button className='buttonAddnote' onClick={openModal}>
        <img src={noteIcon} alt="New Note" style={{ width: '35px', height: '35px', marginRight:'10px',marginLeft: '3px', marginTop: '3px'}}></img>
    </button>
);
};

export default NewNoteButton;
