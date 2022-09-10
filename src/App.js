import './App.css';
import AppLayout from './layouts';
import Game from './game/Game';

function App() {
  return (
    <AppLayout className='mainLayout'>
      <Game />
    </AppLayout>
  );
}

export default App;
