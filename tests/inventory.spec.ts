import { test, expect } from './fixtures';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory', () => {

  test('TC-05 se listan exactamente 6 productos', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);

    expect(await inventory.getProductCount()).toBe(6);
  });

  test('TC-06 ordenar por precio menor a mayor', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);

    const before = await inventory.getProductNames();
    await inventory.sortBy('lohi');
    const after = await inventory.getProductNames();

    expect(before).not.toEqual(after);
  });

  test('TC-07 agregar producto muestra badge en carrito', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.addFirstProductToCart();

    expect(await inventory.cartBadgeIsVisible()).toBe(true);
  });

  test('TC-08 badge refleja cantidad correcta', async ({ loggedInPage }) => {
    const inventory = new InventoryPage(loggedInPage);
    await inventory.addFirstProductToCart();

    expect(await inventory.getCartBadgeCount()).toBe(1);
  });

});