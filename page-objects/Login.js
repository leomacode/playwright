export default class Login {
    constructor(page) {
        this.page = page
        this.accountBtn = page.getByRole('link', { name: 'My Account' })
        this.signupBtn = page.locator('[data-qa="go-to-signup-button"]')
    }

    async moveToSignup() {
        const accountBtn = this.accountBtn
        await accountBtn.waitFor()
        await accountBtn.click()
        await this.page.waitForURL(/\/login/, { timeout: 3000 })
        const signupBtn = this.signupBtn
        await signupBtn.waitFor()
        await signupBtn.click()
        await this.page.waitForURL(/\/signup/, { timeout: 3000 })
    }
}