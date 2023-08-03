import { expect } from "@playwright/test"

export default class PaymentPage {
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.submitDiscountBtn = page.getByRole('button', { name: 'Submit discount' })
        this.activatedInfo = page.locator('[data-qa="discount-active-message"]')
        this.cardOwner = page.getByPlaceholder('Credit card owner')
        this.cardNumber = page.getByPlaceholder('Credit card number')
        this.validUntil = page.getByPlaceholder('Valid until')
        this.cvcNumber = page.getByPlaceholder('Credit card CVC')
    }

    async activateDiscount() {
        const discountCode = this.discountCode
        discountCode.waitFor()
        const code = await discountCode.innerText()
        const discountInput = this.discountInput
        await discountInput.waitFor()

        await discountInput.focus()
        await this.page.keyboard.insertText(code);
        expect(discountInput).toHaveValue(code)

        await this.page.waitForFunction(expec =>
            document.querySelector('[data-qa="discount-code-input"]').value === expec, code)

        const submitDiscountBtn = this.submitDiscountBtn
        submitDiscountBtn.waitFor()
        await submitDiscountBtn.click()

        const activatedInfo = this.activatedInfo
        expect(activatedInfo).toHaveText('Discount activated!')
    }

    async fillData(prop, data) {
        console.log(prop, data);
        await prop.fill(data)
        // await prop.insertText(data)
    }

    async fillPaymentDetails(paymentDetails) {
        const { card_owner, card_number, valid_until, cvc } = paymentDetails
        const creditCardDetails = [
            [this.cardOwner, card_owner],
            [this.cardNumber, card_number],
            [this.validUntil, valid_until],
            [this.cvcNumber, cvc]
        ]

        for (const [key, val] of creditCardDetails) {
            await key.fill(val)
        }
    }
}