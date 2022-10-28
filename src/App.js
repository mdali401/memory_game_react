import {Settings, Board} from './components'
import React, {useState} from 'react'
import './index.css'

function App() {
  const [gameOptions, setGameOptions] = useState(null)
  
  function restartGame() {
    setGameOptions(null)
  }

  return (
    <div className="App">
      {gameOptions ?
        <Board gameOptions={gameOptions} restartGame={restartGame} />
        :
        <Settings setGameOptions={setGameOptions}/>
      }
    </div>
  );
}

export default App;
