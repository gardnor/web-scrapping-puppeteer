import * as puppeteer from 'puppeteer';
import { SELECTORS } from '../utils/selectors';

export async function filter(page: puppeteer.Page) {
    await page.waitForFrame((frame) => frame.name() === 'leftFrame'); // Aguarde um tempo extra para garantir a recriação do frame

    const updatedFrames = page.frames();
    const leftFrame = updatedFrames.find((frame) => frame.name() === 'leftFrame');
    if (!leftFrame) throw new Error('Frame "leftFrame" não encontrado após login!');

    await leftFrame.evaluate((selector) => {
        const element = document.querySelector(selector);
        if (element) (element as HTMLElement).click();
    }, SELECTORS.leftFrameItem);

    await leftFrame.evaluate(() => {
        const aElement = document.querySelector('a[href="p_c_pesquisa.asp"]')
        if (aElement) {
          ;(aElement as HTMLElement).click()
        } else {
          console.error('Elemento <td> não encontrado!')
        }
      })
}
