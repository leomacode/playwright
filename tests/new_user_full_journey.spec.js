import { test } from "@playwright/test"
import { ProductsPage, Navigation, Checkout, DropDown } from "../page-objects"


test.only('new user full end to end journey', async ({ page }) => {
    const productsPage = new ProductsPage(page)
    await productsPage.visit()
    await productsPage.addProductsToBasket(0)
    await productsPage.addProductsToBasket(1)
    await productsPage.addProductsToBasket(2)
    const navigation = new Navigation(page)
    await navigation.goToCheckout()


    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()

    const dropDown = new DropDown(page)
    page.pause()
})