import { expect } from "@playwright/test";
export default class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstName = page.getByPlaceholder('First name')
        this.lastName = page.getByPlaceholder('Last name')
        this.streetName = page.getByPlaceholder('Street')
        this.post_code = page.getByPlaceholder('Post code')
        this.cityName = page.getByPlaceholder('City')
        this.countryName = page.getByRole('combobox')
        this.saveBtn = page.getByRole('button', { name: 'Save address for next time' })
        this.saveAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]').first()
        this.savedLastName = page.locator('[data-qa="saved-address-lastName"]').first()
        this.savedStreet = page.locator('[saved-address-street"]').first()
        this.savedPostcode = page.locator('[data-qa="saved-address-postcode"]').first()
        this.continueToPaymentBtn = page.getByRole('button', { name: 'Continue to payment' })
    }

    async fillDetails(userAddress) {
        const { first_name, last_name, street, postcode, city, country } = userAddress
        const firstName = this.firstName
        await firstName.waitFor()
        await firstName.fill(first_name)

        const lastName = this.lastName
        await lastName.waitFor()
        await lastName.fill(last_name)

        const streetName = this.streetName
        await streetName.waitFor()
        await streetName.fill(street)

        const post_code = this.post_code
        await post_code.waitFor()
        await post_code.fill(postcode)

        const cityName = this.cityName
        await cityName.waitFor()
        await cityName.fill(city)

        const countryName = this.countryName
        await countryName.waitFor()
        countryName.selectOption(country)
    }

    async saveDetails() {
        const saveBtn = this.saveBtn
        await saveBtn.waitFor()
        const countBefore = await this.saveAddressContainer.count()
        await saveBtn.click()
        await this.saveAddressContainer.waitFor()
        const countAfter = await this.saveAddressContainer.count()
        expect(countAfter).toBeGreaterThan(countBefore)
        const firstName = this.firstName
        firstName.waitFor()
        const firstNameText = await firstName.inputValue();
        const savedFirstName = this.savedFirstName
        savedFirstName.waitFor()
        const savedFirstNameText = await savedFirstName.innerText()
        expect(firstNameText).toBe(savedFirstNameText)
    }

    async continueToPayment() {
        const continueToPaymentBtn = this.continueToPaymentBtn
        await continueToPaymentBtn.waitFor()
        await continueToPaymentBtn.click()

        await this.page.waitForURL(/\/payment/, { setTimeout: 3000 })
    }
}