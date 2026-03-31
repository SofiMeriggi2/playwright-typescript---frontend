import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Users } from '../data/users';

export class LoginPage extends BasePage {
  readonly URL = 'https://www.saucedemo.com';

  readonly usernameInput = '#user-name';
  readonly passwordInput = '#password';
  readonly loginButton   = '#login-button';
  readonly errorMessage  = "[data-test='error']";

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto(this.URL);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async loginAsStandard(): Promise<void> {
    await this.login(Users.STANDARD, Users.PASSWORD);
  }

  async loginAsLocked(): Promise<void> {
    await this.login(Users.LOCKED, Users.PASSWORD);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }
}
