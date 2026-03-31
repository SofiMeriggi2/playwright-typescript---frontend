# Playwright + TypeScript — Frontend Automation

Functional test automation project for [SauceDemo](https://www.saucedemo.com) using Playwright with TypeScript, Page Object Model (POM) pattern, and custom fixtures.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Playwright](https://img.shields.io/badge/Playwright-latest-green)
![CI](https://github.com/SofiMeriggi2/playwright-typescript---frontend/actions/workflows/tests.yml/badge.svg)

---

## Tech Stack

- **TypeScript 5.x**
- **Playwright Test** — browser automation and test runner
- **GitHub Actions** — CI/CD

---

## Project Structure

```
playwright-typescript---frontend/
├── pages/
│   ├── BasePage.ts           # Shared methods inherited by all Page Objects
│   ├── LoginPage.ts          # Login screen Page Object
│   ├── InventoryPage.ts      # Product listing Page Object
│   ├── CartPage.ts           # Shopping cart Page Object
│   └── CheckoutPage.ts       # Checkout flow Page Object
├── data/
│   ├── users.ts              # Test user credentials (as const)
│   └── messages.ts           # Expected error messages (as const)
├── tests/
│   ├── fixtures.ts           # Custom fixtures (loggedInPage)
│   ├── login.spec.ts         # TC-01 to TC-04
│   ├── inventory.spec.ts     # TC-05 to TC-08
│   ├── cart.spec.ts          # TC-09 to TC-10
│   └── checkout.spec.ts      # TC-11 to TC-12
├── .github/
│   └── workflows/
│       └── tests.yml         # CI/CD pipeline
├── playwright.config.ts      # Playwright config (baseURL, headless, slowMo)
├── tsconfig.json             # TypeScript config
└── package.json              # Dependencies
```

---

## Test Cases

| ID | Module | Description |
|---|---|---|
| TC-01 | Login | Successful login with standard user |
| TC-02 | Login | Blocked user sees error message |
| TC-03 | Login | Invalid credentials show error |
| TC-04 | Login | Empty fields show validation error |
| TC-05 | Inventory | Exactly 6 products are listed |
| TC-06 | Inventory | Sort by price low to high reorders list |
| TC-07 | Inventory | Adding product shows cart badge |
| TC-08 | Inventory | Cart badge reflects correct count |
| TC-09 | Cart | Added product appears in cart |
| TC-10 | Cart | Removing product leaves cart empty |
| TC-11 | Checkout | Full end-to-end purchase flow |
| TC-11b | Checkout | Back Home redirects to inventory |
| TC-12 | Checkout | Empty First Name shows validation error |

---

## Key Design Decisions

**Custom fixtures** — `fixtures.ts` extends Playwright's base `test` with a `loggedInPage` fixture. Tests that don't test login receive an already-authenticated page, keeping them focused on what they actually validate.

**`as const`** — `users.ts` and `messages.ts` use TypeScript's `as const` assertion, making values immutable literals. TypeScript catches accidental overwrites at compile time.

**`protected page`** — `BasePage` declares `page` as `protected`, meaning only the class and its subclasses can access it. External code can't manipulate the browser directly.

---

## Installation

```bash
git clone https://github.com/SofiMeriggi2/playwright-typescript---frontend.git
cd playwright-typescript---frontend

npm install
npx playwright install chromium
```

---

## Running Tests

```bash
# All tests
npx playwright test

# Single spec
npx playwright test tests/login.spec.ts

# UI mode (visual debugger)
npx playwright test --ui
```

In CI the browser runs headless. Locally it runs with visible UI and `slowMo: 500ms`.

---

## Part of an Automation Portfolio

| # | Stack | Type |
|---|---|---|
| 1 | Playwright + Python | Frontend |
| 2 | Playwright + Python | API/Backend |
| 3 | Playwright + TypeScript | Frontend ← this one |
| 4 | Playwright + TypeScript | API/Backend |
| 5 | Selenium | Mobile |