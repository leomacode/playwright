import { expect } from "@playwright/test"

export default class Checkout {
    constructor(page) {
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.prices = page.locator('[data-qa="basket-item-price"]')
        this.buttons = page.locator(`[data-qa="basket-card-remove-item"]`)
        this.continueBtn = page.locator('[data-qa="continue-to-checkout"]')
    }

    get_min_idx(arr) {
        let minIdx = 0, minPrice = arr[0]
        arr.map((price, i) => price < minPrice && ([minIdx, minPrice] = [i, price]))
        return minIdx
    }

    async removeCheapestProduct() {
        await this.basketCards.first().waitFor()
        const prices = await this.prices.allInnerTexts()
        const priceArr = prices.map(price => Number(price.replace('$', '')))
        const minIdx = this.get_min_idx(priceArr)
        const specificButton = this.buttons.nth(minIdx)
        await specificButton.waitFor()
        await specificButton.click()

        const beforeRemoval = await this.basketCards.count()
        await this.page.waitForFunction((expectation) => {
            const cardNum = document.querySelectorAll('[data-qa="basket-card"]').length;
            return cardNum === expectation
        }, beforeRemoval - 1)

        expect(this.basketCards).toHaveCount(beforeRemoval - 1);

    }

    async continueToCheckout() {
        const continueBtn = this.continueBtn
        await continueBtn.waitFor()
        await continueBtn.click()
        await this.page.waitForURL(/\/login/, { timeout: 3000 })
    }
}
