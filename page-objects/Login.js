export default class Login {
    constructor(page) {
        this.page = page
        this.signupBtn = page.locator('[data-qa="go-to-signup-button"]')
    }

    async moveToSignup() {
        const signupBtn = this.signupBtn
        await signupBtn.waitFor()
        await signupBtn.click()
        await this.page.waitForURL(/\/signup/, { timeout: 3000 })
    }
}