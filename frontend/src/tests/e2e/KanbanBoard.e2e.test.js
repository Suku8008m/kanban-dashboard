import { test, expect } from "@playwright/test";

test("user creates a task and sees it on the Kanban board", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  // Open task creation
  await page.getByRole("button", { name: /add task/i }).click();

  // Enter task title
  await page.getByPlaceholder(/task title/i).fill("E2E Test Task");

  // Save
  await page.getByRole("button", { name: /save/i }).click();

  // Verify task appears on board
  await expect(page.getByText("E2E Test Task", { exact: true })).toBeVisible();
});

