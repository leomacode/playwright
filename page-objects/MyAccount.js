export default class MyAccount {
    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('/my-account')
    }

    async getLoginCookie() {
        const response = await fetch('/post', { method: "POST", boday: { username: "admin", password: "Admin123" } });
        const body = await response.text();
        return body
    }
}