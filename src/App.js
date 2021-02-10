import "./App.css";
import EntityList from "./components/EntityList/EntityList";
import { Stage } from 'react-konva';

function App() {

  return (
    <div className="App">
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <EntityList />
      </Stage>
    </div>
  );
}

export default App;
