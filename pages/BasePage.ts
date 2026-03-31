import { Page } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page) {}

    async waitForLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async getTitle(): Promise<string> {
        return this.page.title();
    }

    async isVisible(locator: string): Promise<boolean> {
        return this.page.locator(locator).isVisible();
    }

    async getText(locator: string): Promise<string> {
        return this.page.locator(locator).innerText();
    }
}