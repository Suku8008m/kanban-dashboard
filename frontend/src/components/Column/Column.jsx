import { useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";
import CardItem from "../CardItem/CardItem";
import "./index.css";
import { useApp } from "../../Context";

const Column = ({ status }) => {
  const { tasks, move } = useApp();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TASK,
    drop: (item) => {
      move({ id: item.id, status });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  return (
    <div ref={drop} className={`column ${isOver ? "hover" : ""}`}>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <CardItem key={task.id} task={task} />
        ))}
    </div>
  );
};

export default Column;
