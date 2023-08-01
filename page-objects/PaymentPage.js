export default class PaymentPage {
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').getByText('c87ef911ceeb')
    }

    async activateDiscount() {
        const discountCode = this.discountCode
        const code = await discountCode.innerText()
        console.log(code);
    }


}