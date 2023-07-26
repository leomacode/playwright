import { expect } from "@playwright/test"

export default class Checkout {
    constructor(page) {
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.prices = page.locator('[data-qa="basket-item-price"]')
        this.buttons = page.locator(`[data-qa="basket-card-remove-item"]`)
    }

    get_min_idx(arr) {
        let minIdx = 0, minPrice = arr[0]
        arr.map((price, i) => price < minPrice && ([minIdx, minPrice] = [i, price]))
        return minIdx
    }

    async removeCheapestProduct() {
        const basketCards = this.basketCards
        await this.basketCards.first().waitFor()
        const prices = await this.prices.allInnerTexts()
        const numberBefore = await basketCards.count()
        const priceArr = prices.map(price => Number(price.replace('$', '')))
        const minIdx = this.get_min_idx(priceArr)
        const specificButton = this.buttons.nth(minIdx)
        await specificButton.waitFor()
        await specificButton.click()


        await this.page.waitForFunction((expectedCount) => {
            const actualCount = document.querySelectorAll('[data-qa="basket-card"]').length;
            return actualCount === expectedCount;
        }, {}, numberBefore - 1);

        // Now we can assert that the count has indeed decreased by 1
        const numberAfter = await basketCards.count();
        expect(numberAfter).toBe(numberBefore - 1);

        // expect(basketCards).toHaveCount(numberBefore - 1);

        // await this.page.pause()
    }



}
