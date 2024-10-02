import './App.css'
import Apptitle from './components/apptitle';
import Header from './components/header';
import NoteModal from './components/Mod/createModal';
import NoteContainer from './components/notes';
//import NoteContainer from './components/notes';

function App() {
    return (
        <div className='app'>
            <div className='title'>
               <Apptitle /> 
            </div>
            <div className='general-content'>
                <Header />
                <NoteContainer notes={[]} />
                <NoteModal isModalOpen={false} closeModal={function (): void {
                    throw new Error('Function not implemented.');
                } } addNote={function (): void {
                    throw new Error('Function not implemented.');
                } } />
            </div>
        </div>
    );
}
export default App
