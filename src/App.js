import "./App.css";
import Animate from "./components/Animate/Animate";

function App() {
  return (
    <div className="App" onContextMenu={(e)=>e.preventDefault()}>
        
    <Animate/>
    </div>
  );
}

export default App;
