
//Creación del componente funcional para el botón de nueva nota
import React from 'react';

//Se crea una interfaz para la el botón de crear nota
interface NewNoteButtonProps {
    openModal: () => void;
}

// Se crea el componente funcional la cual llama a la funcion openModal
const NewNoteButton: React.FC<NewNoteButtonProps> = ({ openModal }) => {
    //Se cambia el estado del botón a true
    return <button onClick={openModal}>New note</button>;
};

export default NewNoteButton;
