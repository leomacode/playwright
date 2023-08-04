import { test } from '@playwright/test'
import { MyAccount } from '../page-objects'
import fetch from 'node-fetch';

test.only('my account using cookie injection', async ({ page, request }) => {
    const myAccount = new MyAccount(page)
    await myAccount.visit()
    //make a request to get login token
    const cookie = myAccount.getLoginCookie()
    console.log(cookie);
    //inject the login token into browser 
    await page.pause()
})