
import { v4 as uuidv4 } from 'uuid';
export default class PageRegister {
    constructor(page) {
        this.page = page
        this.emailField = page.getByPlaceholder('E-Mail')
        this.passwordField = page.getByPlaceholder('Password')
        this.registerBtn = page.getByRole('button', { name: 'Register' })
    }


    async signUpAsNewUser() {
        const emailField = this.emailField
        await emailField.waitFor()
        await emailField.fill(`${uuidv4()}@gmail.com`);
        const passwordField = this.passwordField
        await passwordField.waitFor()
        await passwordField.fill(uuidv4());
        const registerBtn = this.registerBtn
        await registerBtn.waitFor()
        await registerBtn.click()
    }
}