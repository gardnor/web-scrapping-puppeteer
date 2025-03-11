import puppeteer from 'puppeteer'
import { login } from './services/login'

import {
  SPTRANS_SCD_URL,
  SPTRANS_SCD_USERNAME,
  SPTRANS_SCD_PASSWORD,
} from './config/env'
import { filter } from './services/filter'
import { search } from './services/search'
import { employeesList } from './services/employeesList'

export const sptrans = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-audio'],
  })

  const page = await browser.newPage()
  await page.goto(SPTRANS_SCD_URL, { waitUntil: 'networkidle2' })

  await login(page, SPTRANS_SCD_USERNAME, SPTRANS_SCD_PASSWORD)
  await filter(page)
  await search(page)
  await employeesList(page)

  console.log('Processo concluído com sucesso.')
}
