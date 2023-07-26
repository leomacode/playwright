import { expect } from '@playwright/test'
import Navigation from './Navigation'

export default class ProductsPage {
    constructor(page) {
        this.page = page
        this.addButtons = page.locator(`[data-qa="product-button"]`)
        this.basketCounter = page.locator(`[data-qa="header-basket-count"]`)
    }

    async visit() {
        await this.page.goto("/")
    }


    async addProductsToBasket(index) {
        const btn = this.addButtons.nth(index)
        await btn.waitFor()
        await expect(btn).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        const basketCountBeforeAdding = await navigation.getBasketCount()
        await btn.click()
        const basketCountAfterAdding = await navigation.getBasketCount()
        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
    }
}

