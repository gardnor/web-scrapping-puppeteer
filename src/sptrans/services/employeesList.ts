import * as puppeteer from 'puppeteer'




// Implementar logica para obter a lista de funcionários




export const employeesList = async (page: puppeteer.Page) => {
  // 1. Espera o clique abrir uma nova página
  const [novaPagina] = await Promise.all([
    new Promise<puppeteer.Target>((resolve) =>
      page.browser().once('targetcreated', resolve)
    ), // Captura a nova aba/janela
    page.evaluate(() => {
      const primeiroBotao = document.querySelector(
        'td.botao img[title="Detalhado"]'
      ) as HTMLImageElement
      primeiroBotao?.click()
      console.log('Clique no primeiro botão realizado!')
    }),
  ])

  // 2. Obtém o objeto da nova página
  const popupPage = await novaPagina.page()

  if (!popupPage) {
    console.error('Nova página não encontrada após clique no botão!')
    return
  }
  // 3. Espera que a nova página esteja carregada
  await popupPage.waitForSelector('body', { visible: true }) // Aguarda o carregamento do corpo da nova página

  // 4. Interage com o segundo botão na nova página
  await popupPage.waitForSelector(
    'td.botao img[onclick="javascript:DetalheItem();"]',
    { visible: true }
  )

//   await popupPage.evaluate(() => {
//     const segundoBotao = document.querySelector(
//       'td.botao img[onclick="javascript:DetalheItem();"]'
//     ) as HTMLImageElement
//     if (segundoBotao) {
//       segundoBotao.click()
//       console.log('Segundo botão "DetalheItem" clicado com sucesso!')
//     } else {
//       console.error('Segundo botão "DetalheItem" não encontrado!')
//     }
//   })
}
