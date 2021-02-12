import React, { useState, useCallback } from 'react';
import { Stage } from 'react-konva';
import EntityList from "./components/EntityList/EntityList";
import "./App.css";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleSize = useCallback((size) => {
    console.log('here', size);
    setWidth(size.wrapWidth);
    setHeight(size.wrapHeight);
  });

  return (
    <div className="App">
      <Stage width={width} height={height}>
        <EntityList handleSize={handleSize} />
      </Stage>
    </div>
  );
}

export default App;
