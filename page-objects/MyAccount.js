import { expect } from "@playwright/test"

export default class MyAccount {
    constructor(page) {
        this.page = page
        this.account = page.getByRole('heading', { name: 'My Account' })
        this.address = page.getByRole('heading', { name: 'Your addresses' })
    }

    async visit() {
        await this.page.goto('/my-account')
    }

    async confirmLogin() {
        const account = this.account
        await account.waitFor()
        const address = this.address
        await address.waitFor()
        expect(address).toHaveText('Your addresses')
    }

}