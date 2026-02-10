import KanbanBoard from "./components/KanbanBoard/KanbanBoard.jsx";
import "./app.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1 className="title">Real Time Kanban Board</h1>
        <KanbanBoard />
      </div>
    </DndProvider>
  );
}

export default App;
