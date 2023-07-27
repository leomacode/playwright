import { expect } from "@playwright/test"

export default class Dropdown {
    constructor(page) {
        this.page = page
        this.sortBtn = page.locator('[data-qa="sort-dropdown"]')
        this.prices = page.locator('[datatype="product-price"]')
    }


    async clickSortBtn() {
        await this.sortBtn.click()
    }

    numConvert(arr) {
        return arr.map(str => Number(str.replace('$', '')))
    }

    isIncline(arr) {
        const len = arr.lenth
        for (let i = 1; i < len; i++) {
            if (arr[i] < arr[i - 1]) {
                return false
            }
        }
        return true
    }

    isDecline(arr) {
        const len = arr.lenth
        for (let i = 1; i < len; i++) {
            if (arr[i] > arr[i - 1]) {
                return false
            }
        }
        return true
    }

    async getPriceList() {
        const priceList = await this.prices.allInnerTexts()
        return this.numConvert(priceList)
    }

    async ascend() {
        await this.sortBtn.waitFor()
        await this.sortBtn.selectOption('price-asc');
        await this.page.waitForFunction((expectation) => {
            const selectedOption = document.querySelector('[data-qa="sort-dropdown"] option:checked').value
            return selectedOption === expectation
        }, 'price-asc')
        const prices = await this.getPriceList()

        expect(this.isIncline(prices)).toBeTruthy()
    }
    async descend() {
        await this.sortBtn.waitFor()
        await this.sortBtn.selectOption('price-desc');
        await this.page.waitForFunction((expectation) => {
            const selectedOption = document.querySelector('[data-qa="sort-dropdown"] option:checked').value
            return selectedOption === expectation
        }, 'price-desc')
        const prices = await this.getPriceList()
        expect(this.isDecline(prices)).toBeTruthy()
    }
}