import React, { useState } from 'react';
import { Stage } from 'react-konva';
import Routes from 'route';
import { ObjectContextProvider } from 'context/ObjectContext';
import './App.css';

function App() {
  const [width] = useState(window.innerWidth);
  const [height] = useState(window.innerHeight);

  return (
    <div className='App'>
      <Stage width={width} height={height}>
        <ObjectContextProvider>
          <Routes />
        </ObjectContextProvider>
      </Stage>
    </div>
  );
}

export default App;
