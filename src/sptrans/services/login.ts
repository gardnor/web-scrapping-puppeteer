import * as puppeteer from 'puppeteer'
import { SELECTORS } from '../utils/selectors'

export async function login(
  page: puppeteer.Page,
  username: string,
  password: string
) {
  const loginFrame = await page
    .frames()
    .find((frame) => frame.name() === 'Login')
  if (!loginFrame) throw new Error('Frame de login não encontrado!')

  await loginFrame.type(SELECTORS.usernameInput, username)
  await loginFrame.type(SELECTORS.passwordInput, password)

  await Promise.all([
    page
      .waitForNavigation({ waitUntil: 'networkidle2', timeout: 1200 })
      .catch(() =>
        console.warn(
          'Nenhuma navegação detectada após o clique no botão de login.'
        )
      ),
    loginFrame.click(SELECTORS.loginButton),
  ])
}
