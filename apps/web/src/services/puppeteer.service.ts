import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

export async function generatePdfFromTemplate(data: any, styling: any): Promise<Buffer> {
  // 1. Baca dan kompilasi template Handlebars
  const templatePath = path.join(__dirname, '../templates/modern-ats.hbs');
  const templateSource = fs.readFileSync(templatePath, 'utf8');
  const compiledTemplate = handlebars.compile(templateSource);
  const htmlContent = compiledTemplate({ resume: data, styling });

  // 2. Luncurkan Headless Browser
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=none'
    ]
  });

  try {
    const page = await browser.newPage();

    // Perbaikan: gunakan 'domcontentloaded' yang valid untuk setContent()
    await page.setContent(htmlContent, {
      waitUntil: 'domcontentloaded'
    });

    await page.emulateMediaType('print');

    // 3. Cetak ke format A4 PDF Vektor
    const pdfUint8Array = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0px', bottom: '0px', left: '0px', right: '0px' }
    });

    return Buffer.from(pdfUint8Array);
  } finally {
    await browser.close();
  }
}