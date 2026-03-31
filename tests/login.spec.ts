import { test, expect } from './fixtures';
import { LoginPage } from '../pages/LoginPage';
import { ErrorMessages } from '../data/messages';

test.describe('Login', () => {

  test('TC-01 login exitoso con usuario estandar', async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.loginAsStandard();

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TC-02 usuario bloqueado ve mensaje de error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.loginAsLocked();

    expect(await login.getErrorMessage()).toBe(ErrorMessages.LOCKED_USER);
  });

  test('TC-03 credenciales invalidas muestran error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.login('usuario_falso', 'password_falsa');

    expect(await login.getErrorMessage()).toBe(ErrorMessages.INVALID_CREDS);
  });

  test('TC-04 campos vacios muestran error de validacion', async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.login('', '');

    expect(await login.getErrorMessage()).toBe(ErrorMessages.USERNAME_REQUIRED);
  });

});
