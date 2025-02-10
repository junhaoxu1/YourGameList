import { test, expect } from '@playwright/test';

test.describe("Home page", () => {
  test("Should have correct components", async ( { page } ) => {
    // Makes the test file go to specific URL
    await page.goto("http://localhost:5173/")

    // Check the components of the page to make sure it's there.
    await expect(page).toHaveTitle("MyGameList");
    await expect(page.getByText("YGL")).toBeVisible();
    await expect(page.getByText("Welcome To YourGameList!")).toBeVisible();

    await expect(page.getByText("Search")).toBeVisible();
    await expect(page.getByText("Please Login or Sign up for a better experience!")).toBeVisible();
  })
})