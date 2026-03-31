import { test, expect } from './fixtures';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart', () => {

  test('TC-09 producto agregado aparece en carrito', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.addFirstProductToCart();

    const cart = new CartPage(loggedInPage);
    await cart.navigate();

    expect(await cart.getItemCount()).toBe(1);
  });

  test('TC-10 eliminar producto deja carrito vaci­o', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.addFirstProductToCart();

    const cart = new CartPage(loggedInPage);
    await cart.navigate();
    await cart.removeFirstItem();

    expect(await cart.getItemCount()).toBe(0);
  });

});