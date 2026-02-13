import KanbanBoard from "./components/KanbanBoard/KanbanBoard.jsx";
import "./app.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useApp } from "./Context.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { IoSunny } from "react-icons/io5";
import { BsFillMoonStarsFill } from "react-icons/bs";
function App() {
  const { isLight, setIsLight } = useApp();
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`${isLight ? "App" : "App light"}`}>
        <div className="app-title">
          <h1 className="title">Real Time Kanban Board</h1>
          <button type="button" onClick={() => setIsLight(!isLight)}>
            {!isLight ? (
              <BsFillMoonStarsFill style={{ color: "#fff" }} />
            ) : (
              <IoSunny />
            )}
          </button>
        </div>
        <KanbanBoard />
        <Footer />
      </div>
    </DndProvider>
  );
}

export default App;
