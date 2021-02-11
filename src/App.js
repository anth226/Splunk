import "./App.css";
import EntityList from "./components/EntityList/EntityList";
import { Stage } from 'react-konva';

function App() {
  const width = 1920, height = 1080;

  return (
    <div className="App">
      <Stage width={width} height={height}>
        <EntityList />
      </Stage>
    </div>
  );
}

export default App;
