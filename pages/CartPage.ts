import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItems    = '.cart_item';
  readonly itemNames    = '.inventory_item_name';
  readonly removeBtn    = "button[id^='remove']";
  readonly checkoutBtn  = "[data-test='checkout']";

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  async getItemCount(): Promise<number> {
    return this.page.locator(this.cartItems).count();
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator(this.itemNames).allInnerTexts();
  }

  async removeFirstItem(): Promise<void> {
    await this.page.locator(this.removeBtn).first().click();
  }

  async goToCheckout(): Promise<void> {
    await this.page.click(this.checkoutBtn);
  }
}
