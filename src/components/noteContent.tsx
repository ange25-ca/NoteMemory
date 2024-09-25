//Se crea la interfaz de las props definir el tipo de dato que se espera
interface NoteContentProps {
    //Se espera un titilo de tipo string
    title: string;
    //se espera una descripcion de tipo string
    description: string;
}

//Se crea el componente funcional que recibe props de las notas
const NoteContent: React.FC<NoteContentProps> = (props) => {
    return (
        <div className="notecontent">
            <h1>{props.title}</h1>
            <h4>{props.description}</h4>
        </div>
    );
}

export default NoteContent;
