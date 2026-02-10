import { render, screen } from "@testing-library/react";

import KanbanBoard from "../../components/KanbanBoard";

test("renders Kanban board title", () => {
  render(<KanbanBoard />);
  expect(screen.getByText("Kanban Board")).toBeInTheDocument();
});

// TODO: Add more unit tests for individual components
