import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly productItems   = '.inventory_item';
  readonly productNames   = '.inventory_item_name';
  readonly sortDropdown   = "[data-test='product-sort-container']";
  readonly addToCartBtn   = "button[id^='add-to-cart']";
  readonly cartBadge      = '.shopping_cart_badge';

  constructor(page: Page) {
    super(page);
  }

  async getProductCount(): Promise<number> {
    return this.page.locator(this.productItems).count();
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator(this.productNames).allInnerTexts();
  }

  async sortBy(option: string): Promise<void> {
    await this.page.selectOption(this.sortDropdown, option);
  }

  async addFirstProductToCart(): Promise<void> {
    await this.page.locator(this.addToCartBtn).first().click();
  }

  async getCartBadgeCount(): Promise<number> {
    return parseInt(await this.getText(this.cartBadge));
  }

  async cartBadgeIsVisible(): Promise<boolean> {
    return this.isVisible(this.cartBadge);
  }
}
