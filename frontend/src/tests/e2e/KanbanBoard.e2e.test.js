import { test, expect } from "@playwright/test";

test("User can create a task and see it on the board", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Click Add Task
  await page.getByRole("button", { name: /add task/i }).click();

  // Fill task details
  await page.getByPlaceholder(/task title/i).fill("E2E Test Task");

  // Save task
  await page.getByRole("button", { name: /save/i }).click();

  // Assert task appears on board
  await expect(page.getByText("E2E Test Task")).toBeVisible();
});
