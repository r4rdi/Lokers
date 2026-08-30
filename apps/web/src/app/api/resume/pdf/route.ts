import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let browser = null;
  try {
    const { htmlContent } = await req.json();
    const isLocal = process.env.NODE_ENV === 'development';

    // Solusi eksplisit untuk kompatibilitas tipe TypeScript
    const executablePath = isLocal
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : await chromium.executablePath();

    // Mengatasi TS2322 & TS2339 dengan casting aman untuk runtime Chromium
    const chromiumArgs = isLocal
      ? puppeteer.defaultArgs()
      : await (chromium as any).args;

    const headlessMode = isLocal
      ? true
      : await (chromium as any).headless;

    const viewport = isLocal
      ? { width: 800, height: 600 }
      : (chromium as any).defaultViewport;

    browser = await puppeteer.launch({
      args: chromiumArgs,
      defaultViewport: viewport,
      executablePath,
      headless: headlessMode,
    });

    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: ['load', 'domcontentloaded']
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
    });

    const responseBuffer = Buffer.from(pdfBuffer);

    return new NextResponse(responseBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('PDF Generation Error:', error);
    return NextResponse.json(
      { error: 'Gagal membuat file PDF', details: errorMessage },
      { status: 500 }
    );
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
}