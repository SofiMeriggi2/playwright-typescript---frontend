import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Users } from '../data/users';
import { Page } from '@playwright/test';

type Fixtures = {
  loggedInPage: Page;
};

export const test = base.extend<Fixtures>({
  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.loginAsStandard();
    await page.waitForURL('**/inventory.html');
    await use(page);
  },
});

export { expect } from '@playwright/test';