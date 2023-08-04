export default class MyAccount {
    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('/my-account')

        //make a request to get login token
        const requestContext = await request.newContext({
            httpCredentials: {
                username: 'admin',
                password: 'Admin123'
            }
        });

        await requestContext.get(`/my-account`);
        //inject the login token into browser 
    }
}