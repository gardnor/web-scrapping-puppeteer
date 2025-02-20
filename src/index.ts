import puppeteer from 'puppeteer'
import dotenv from 'dotenv'

// Carrega as variáveis do arquivo .env
dotenv.config()

const SPTRANS_SCD_USERNAME = process.env.SPTRANS_SCD_USERNAME || ''
const SPTRANS_SCD_PASSWORD = process.env.SPTRANS_SCD_PASSWORD || ''
const SPTRANS_SCD_URL = process.env.SPTRANS_SCD_URL || ''

async function login(url: string, username: string, password: string) {
  const browser = await puppeteer.launch({
    headless: false, // Defina como "true" para rodar em modo headless
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-audio'],
  })
  const page = await browser.newPage()

  // Navega até a página de login
  await page.goto(url, { waitUntil: 'networkidle2' })

  // Preenche o campo de nome de usuário
  const loginFrame = await page
    .frames()
    .find((frame) => frame.name() === 'Login')

  if (!loginFrame) {
    console.error('Frame de login não encontrado!')
    await browser.close()
    return
  }

  // Preenche os campos de login no frame
  await loginFrame.type('input[name="txtLogin"]', username)
  console.log('Nome de usuário preenchido.')

  // Preenche o campo de senha
  await loginFrame.type('input[name="txtSenha"]', password) // Substitua '#password' pelo seletor correto
  console.log('Senha preenchida.')

  // Clica no botão de login e aguarda o novo frame carregar
  await Promise.all([
    page
      .waitForNavigation({ waitUntil: 'networkidle2', timeout: 1200 })
      .catch(() => {
        console.warn(
          'Nenhuma navegação detectada após o clique no botão de login.'
        )
      }),
    loginFrame.click('a[href="javascript:Valida();"]'),
  ])
  console.log('Botão de login clicado e tentativa de navegação concluída.')

  // Agora, captura novamente todos os frames após o clique
  const updatedFrames = page.frames()

  const leftFrame = updatedFrames.find((frame) => frame.name() === 'leftFrame')

  if (!leftFrame) {
    console.error('Frame "leftFrame" não encontrado após login!')
    await browser.close()
    return
  }

  console.log('Left frame acessado com sucesso!')

  await leftFrame.evaluate(() => {
    const tdElement = document.querySelector(
      'td[title="Clique aqui para visualizar os subítens"]'
    )
    if (tdElement) {
      ;(tdElement as HTMLElement).click()
    } else {
      console.error('Elemento <td> não encontrado!')
    }
  })

  await leftFrame.evaluate(() => {
    const aElement = document.querySelector('a[href="p_c_pesquisa.asp"]')
    if (aElement) {
      ;(aElement as HTMLElement).click()
    } else {
      console.error('Elemento <td> não encontrado!')
    }
  })

  page.on('dialog', async (dialog) => {
    console.log('Alerta detectado:', dialog.message())
    await dialog.accept() // Clica no "OK"
  })

  await leftFrame.evaluate(() => {
    const selectElement = document.querySelector('select[name="codigo_canal_comercializacao"]') as HTMLSelectElement
    if (selectElement) {
      selectElement.value = '170' // Define o valor selecionado
      selectElement.dispatchEvent(new Event('change', { bubbles: true })) // Dispara o evento 'change'
    } else {
      console.error('Elemento <select> não encontrado!')
    }
  })
  console.log('Opção 170 selecionada com sucesso!')
    

}

login(SPTRANS_SCD_URL, SPTRANS_SCD_USERNAME, SPTRANS_SCD_PASSWORD)
