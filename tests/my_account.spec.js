import { test } from '@playwright/test'
import { MyAccount } from '../page-objects'

test.only('my account using cookie injection', async ({ page }) => {
    const myAccount = new MyAccount(page)
    await myAccount.visit()
    await page.pause()
})