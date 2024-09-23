import './App.css'
import Apptitle from './components/apptitle';
import Header from './components/header';

function App() {
    return (
        <div className='app'>
            <div className='title'>
               <Apptitle /> 
            </div>
            <div className='general-content'>
                <Header />
            </div>
        </div>
    );
}

export default App
