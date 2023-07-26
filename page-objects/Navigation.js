export default class Navigation {
    constructor(page) {
        this.page = page
        this.basketCounter = page.locator(`[data-qa="header-basket-count"]`)
        this.checkoutBtn = page.locator(`[data-qa="desktop-nav-link"]`).filter({ hasText: /^Checkout$/ })
    }

    async getBasketCount() {
        const counter = this.basketCounter
        await counter.waitFor()
        const texts = await this.basketCounter.innerText();
        return parseInt(texts, 10)
    }

    async goToCheckout() {
        const checkout = this.checkoutBtn
        await checkout.waitFor()
        await checkout.click()
        await this.page.waitForURL('/basket')
    }
} 