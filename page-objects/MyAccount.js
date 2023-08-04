export default class MyAccount {
    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('/my-account')
    }
}