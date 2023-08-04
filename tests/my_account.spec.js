import { test } from '@playwright/test'
import { MyAccount } from '../page-objects'
import { getLoginToken } from '../api-calls'



test.only('my account using cookie injection', async ({ page }) => {
    const myAccount = new MyAccount(page)
    await myAccount.visit()
    //make a request to get login token
    const { USERNAME, PASSWORD } = process.env
    const loginToken = await getLoginToken(USERNAME, PASSWORD)
    //inject the login token into browser 
    await page.evaluate((loginToken) => document.cookie = `token=${loginToken}`, loginToken)
    await myAccount.visit()
    await myAccount.confirmLogin()
    await page.pause()
})