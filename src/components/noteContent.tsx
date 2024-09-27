import React from "react";

//Se crea la interfaz de las props definir el tipo de dato que se espera
interface NoteContentProps {
    //Se espera un titulo de tipo string
    title: string;
    //se espera una descripcion de tipo string
    description: string;
    //función para eliminar las noctas
    onDelete: ()=> void;
    //función para editar
    onEdit: () => void;

}

//Se crea el componente funcional que recibe props de las notas
const NoteContent: React.FC<NoteContentProps> = ({title, description, onDelete, onEdit}) => {
    return (
        <div className="notecontent">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="note-actions">
          <button onClick={onEdit}>Editar</button>
          <button onClick={onDelete}>Eliminar</button>
        </div>
      </div>
    );
}

export default NoteContent;
