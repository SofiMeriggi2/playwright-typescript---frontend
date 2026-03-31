import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput  = "[data-test='firstName']";
  readonly lastNameInput   = "[data-test='lastName']";
  readonly postalCodeInput = "[data-test='postalCode']";
  readonly continueBtn     = "[data-test='continue']";
  readonly finishBtn       = "[data-test='finish']";
  readonly confirmHeader   = '.complete-header';
  readonly backHomeBtn     = "[data-test='back-to-products']";
  readonly errorMessage    = "[data-test='error']";

  constructor(page: Page) {
    super(page);
  }

  async fillForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  async continueCheckout(): Promise<void> {
    await this.page.click(this.continueBtn);
  }

  async finishCheckout(): Promise<void> {
    await this.page.click(this.finishBtn);
    await this.page.waitForURL('**/checkout-complete.html');
  }

  async backToHome(): Promise<void> {
    await this.page.click(this.backHomeBtn);
    await this.page.waitForURL('**/inventory.html');
  }

  async getConfirmHeader(): Promise<string> {
    return this.getText(this.confirmHeader);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }
}
