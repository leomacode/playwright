export default class Dropdown {
    constructor(page) {
        this.page = page
        this.sortBtn = page.locator('[data-qa="sort-dropdown"]')

    }


    async clickSortBtn() {
        await this.sortBtn.click()
    }

    async ascend() {
        await this.sortBtn.selectOption('price-asc');
        await this.page.waitForFunction((expectation) => {
            const selectedOption = document.querySelector('[data-qa="sort-dropdown"] option:checked').value
            return selectedOption === expectation
        }, 'price-asc')
        await this.page.pause()
    }
    async descend() {
        await this.sortBtn.selectOption('price-desc');
    }
}