export default class PageRegister {
    constructor(page) {
        this.page = page
        this.emailField = page.getByPlaceholder('E-Mail')
        this.passwordField = page.getByPlaceholder('Password')
    }


    async goToRegister() {
        const emailField = this.emailField
        await emailField.waitFor()
        await emailField.fill(process.env.USER_EMAIL);
        const passwordField = this.passwordField
        await passwordField.waitFor()
        await passwordField.fill(process.env.PASSWORD);
    }
}