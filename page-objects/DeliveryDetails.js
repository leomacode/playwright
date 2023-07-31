export default class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstName = page.getByPlaceholder('First name')
        this.lastName = page.getByPlaceholder('Last name')
        this.streetName = page.getByPlaceholder('Street')
        this.post_code = page.getByPlaceholder('Post code')
        this.cityName = page.getByPlaceholder('City')
        this.countryName = page.getByRole('combobox')

    }

    async fillDetails(details) {
        const { first_name, last_name, street, postcode, city, country } = details
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

}