import { test, expect } from './fixtures';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {

  test('TC-11 flujo completo de compra', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.addFirstProductToCart();

    const cart = new CartPage(loggedInPage);
    await cart.navigate();
    await cart.goToCheckout();

    const checkout = new CheckoutPage(loggedInPage);
    await checkout.fillForm('Sofi', 'QA', '1900');
    await checkout.continueCheckout();
    await checkout.finishCheckout();

    expect(await checkout.getConfirmHeader()).toBe('Thank you for your order!');
  });

  test('TC-11b back home redirige al inventario', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.addFirstProductToCart();

    const cart = new CartPage(loggedInPage);
    await cart.navigate();
    await cart.goToCheckout();

    const checkout = new CheckoutPage(loggedInPage);
    await checkout.fillForm('Sofi', 'QA', '1900');
    await checkout.continueCheckout();
    await checkout.finishCheckout();
    await checkout.backToHome();

    await expect(loggedInPage).toHaveURL(/inventory\.html/);
  });

  test('TC-12 first name vaci­o muestra error', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.addFirstProductToCart();

    const cart = new CartPage(loggedInPage);
    await cart.navigate();
    await cart.goToCheckout();

    const checkout = new CheckoutPage(loggedInPage);
    await checkout.fillForm('', 'QA', '1900');
    await checkout.continueCheckout();

    expect(await checkout.getErrorMessage()).toContain('First Name is required');
  });

});