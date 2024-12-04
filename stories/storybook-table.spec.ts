import { test, expect } from "@playwright/test";

test.describe("Table Component in Storybook", () => {
  // Adjust this to your Storybook URL
  const storybookUrl = "http://localhost:6006";

  test("should render the Default Table correctly", async ({ page }) => {
    // Navigate to Storybook
    await page.goto(`${storybookUrl}/?path=/story/components-table--default`);

    // Wait for the table to load
    const table = page.locator("table");
    await expect(table).toBeVisible();

    // Verify the table caption
    const caption = page.locator("caption");
    await expect(caption).toHaveText("A simple example table");

    // Verify the table headers
    const headers = page.locator("thead th");
    await expect(headers).toHaveCount(3);
    await expect(headers.nth(0)).toHaveText("Header 1");
    await expect(headers.nth(1)).toHaveText("Header 2");
    await expect(headers.nth(2)).toHaveText("Header 3");

    // Verify the table rows
    const rows = page.locator("tbody tr");
    await expect(rows).toHaveCount(2);
    await expect(rows.nth(0).locator("td").nth(0)).toHaveText("Row 1, Cell 1");
    await expect(rows.nth(1).locator("td").nth(2)).toHaveText("Row 2, Cell 3");

    // Verify the footer
    const footer = page.locator("tfoot td");
    await expect(footer).toHaveText("Footer Information");
  });

  test("should render the Table without footer correctly", async ({ page }) => {
    // Navigate to the "WithoutFooter" story
    await page.goto(
      `${storybookUrl}/?path=/story/components-table--without-footer`
    );

    // Verify footer is not present
    const footer = page.locator("tfoot");
    await expect(footer).not.toBeVisible();
  });
});
