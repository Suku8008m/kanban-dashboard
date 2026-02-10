import { render, screen } from "@testing-library/react";
import KanbanBoard from "../../components/KanbanBoard";

test("renders tasks in correct columns", () => {
  const mockTasks = [
    { id: "1", title: "Todo Task", status: "todo" },
    { id: "2", title: "Done Task", status: "done" },
  ];

  render(<KanbanBoard initialTasks={mockTasks} />);

  expect(screen.getByText("Todo Task")).toBeInTheDocument();
  expect(screen.getByText("Done Task")).toBeInTheDocument();
});

