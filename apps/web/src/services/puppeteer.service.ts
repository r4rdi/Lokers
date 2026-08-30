import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function generatePdfFromHtml(htmlContent: string): Promise<Buffer> {
  let browser = null;
  try {
    const isLocal = process.env.NODE_ENV === 'development';

    const executablePath = isLocal
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : await chromium.executablePath();

    const chromiumArgs = isLocal 
      ? puppeteer.defaultArgs() 
      : await (chromium as any).args;
      
    const headlessMode = isLocal 
      ? true 
      : await (chromium as any).headless;

    browser = await puppeteer.launch({
      args: chromiumArgs,
      defaultViewport: isLocal ? { width: 800, height: 600 } : (chromium as any).defaultViewport,
      executablePath,
      headless: headlessMode,
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: ['load', 'domcontentloaded'] });

    const pdfUint8Array = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
    });

    return Buffer.from(pdfUint8Array);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
}