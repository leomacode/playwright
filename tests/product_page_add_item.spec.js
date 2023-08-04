import { test, expect } from "@playwright/test"

test('product page add to basket', async ({ page }) => {
    await page.goto("/")
    const addToBucketButon = page.locator('div').filter({ hasText: /^499\$Add to Basket$/ }).getByRole('button')
    await addToBucketButon.waitFor()
    await expect(addToBucketButon).toHaveText("Add to Basket")

    const checkoutButton = page.getByRole('link', { name: 'Checkout' })
    await checkoutButton.waitFor()
    await checkoutButton.click()

    await page.waitForURL("/basket")


}
)