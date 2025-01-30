import puppeteer from 'puppeteer';

async function login(url: string, username: string, password: string) {
  const browser = await puppeteer.launch({
    headless: false, // Defina como "true" para rodar em modo headless
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-audio'],
  });
  const page = await browser.newPage();

  // Navega até a página de login
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Preenche o campo de nome de usuário
  await page.type('input[name="email"]', username); // Substitua '#username' pelo seletor correto
  console.log('Nome de usuário preenchido.');

  // Preenche o campo de senha
  await page.type('input[name="password"]', password); // Substitua '#password' pelo seletor correto
  console.log('Senha preenchida.');

  // Clica no botão de login
  await page.click('.btn-login'); // Substitua '#btn-login' pelo seletor correto
  console.log('Botão de login clicado.');

  // Espera a navegação para a página seguinte (após o login)
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  console.log('Login realizado com sucesso!');

  // Exibe o HTML da página após o login (para depuração)
  const html = await page.content();
  console.log(html);

  // Fecha o navegador
  await browser.close();
}

// Testando a função
const url = 'https://devportal.newbe.com.br/login'; // URL da página de login
const username = 'email'; // Substitua pelo seu nome de usuário
const password = 'senha'; // Substitua pela sua senha

login(url, username, password);