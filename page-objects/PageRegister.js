
export default class PageRegister {
    constructor(page) {
        this.page = page
        this.emailField = page.getByPlaceholder('E-Mail')
        this.passwordField = page.getByPlaceholder('Password')
        this.registerBtn = page.getByRole('button', { name: 'Register' })
    }


    async signUpAsNewUser(email, password) {
        const emailField = this.emailField
        await emailField.waitFor()
        await emailField.fill(email);
        const passwordField = this.passwordField
        await passwordField.waitFor()
        await passwordField.fill(password);
        const registerBtn = this.registerBtn
        await registerBtn.waitFor()
        await registerBtn.click()
    }
}