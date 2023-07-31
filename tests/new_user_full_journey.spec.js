import { test } from "@playwright/test"
import { v4 as uuidv4 } from 'uuid';
import { ProductsPage, Navigation, Checkout, Dropdown, Login, PageRegister } from "../page-objects"


test.only('new user full end to end journey', async ({ page }) => {
    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    const dropdown = new Dropdown(page)
    await dropdown.ascend()
    await dropdown.descend()


    await productsPage.addProductsToBasket(0)
    await productsPage.addProductsToBasket(1)
    await productsPage.addProductsToBasket(2)
    const navigation = new Navigation(page)
    await navigation.goToCheckout()


    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()

    const login = new Login(page)
    await login.moveToSignup()

    const pageRegister = new PageRegister(page)
    const email = `${uuidv4()}@gmail.com`
    const password = uuidv4()
    await pageRegister.signUpAsNewUser(email, password)


    await page.pause()
})