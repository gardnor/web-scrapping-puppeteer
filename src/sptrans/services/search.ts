import * as puppeteer from 'puppeteer'
import { SELECTORS } from '../utils/selectors'

export async function search(page: puppeteer.Page) {
  const updatedFrames = page.frames()
  const mainFrame = updatedFrames.find((frame) => frame.name() === 'mainFrame')
  if (!mainFrame)
    throw new Error('Frame "mainFrame" não encontrado após login!')

  await mainFrame.waitForSelector(SELECTORS.mainFrameSelect1, { visible: true })
  await mainFrame.evaluate((selector) => {
    const selectElement = document.querySelector(selector) as HTMLSelectElement
    if (selectElement) {
      selectElement.value = '170'
      selectElement.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }, SELECTORS.mainFrameSelect1)

  await mainFrame.waitForSelector(SELECTORS.mainFrameSelect2, { visible: true })
  await mainFrame.evaluate((selector) => {
    const selectElement = document.querySelector(selector) as HTMLSelectElement
    if (selectElement) {
      selectElement.value = '170'
      selectElement.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }, SELECTORS.mainFrameSelect2)

  await mainFrame.waitForSelector(SELECTORS.detailedButton, { visible: true })
  await mainFrame.evaluate((selector) => {
    const button = document.querySelector(selector) as HTMLImageElement
    if (button) button.click()
  }, SELECTORS.detailedButton)

  await mainFrame.waitForSelector(SELECTORS.detailItemButton, { visible: true })
  await mainFrame.evaluate((selector) => {
    const button = document.querySelector(selector) as HTMLImageElement
    if (button) button.click()
  }, SELECTORS.detailItemButton)
}
