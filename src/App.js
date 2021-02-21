import React, { useState } from 'react';
import { Stage } from 'react-konva';
import EntityList from 'components/EntityList';
import './App.css';

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleSize = ((size) => {
    if ((size.wrapWidth && (size.wrapWidth !== width)) || (size.wrapHeight && (size.wrapHeight !== height))) {
      setWidth(parseInt(size.wrapWidth));
      setHeight(parseInt(size.wrapHeight));
    }
  });

  return (
    <div className='App'>
      <Stage width={width} height={height}>
        <EntityList handleSize={handleSize} />
      </Stage>
    </div>
  );
}

export default App;
