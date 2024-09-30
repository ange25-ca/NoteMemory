import React from "react";

//Se importan las imagenes
import iconEdit from '../assets/edit_note.png';
import iconDelete from '../assets/delete_note.png';

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
    //cambia el color
    color:string;
}

//Se crea el componente funcional que recibe props de las notas
const NoteContent: React.FC<NoteContentProps> = ({ title, description, onDelete, onEdit, color }) => {
  return (
      <div className="notecontent" style={{ backgroundColor: color }}> {/* Añade el color aquí */}
            <div className="note-actions">
              <button className="buttonActions" onClick={onEdit}>
                  <img
                      src={iconEdit}
                      alt="icono de crear nota"
                      style={{ width: '22px', height: '22px',marginTop: '15px' ,marginBottom: '5px'}}
                    />
                </button>
              <button className="buttonActions" onClick={onDelete}>
                    <img
                      src={iconDelete}
                      alt="icono de crear nota"
                      style={{ width: '20px', height: '20px', marginTop: '15px' ,marginBottom: '5px' }}
                    />
                </button>
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
      </div>
  );
}


export default NoteContent;
