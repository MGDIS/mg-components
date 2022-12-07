import { newE2EPage, E2EPage } from '@stencil/core/testing';
import { Page as PuppeteerPage } from 'puppeteer';

export type DesignSystemE2EPage = E2EPage & Pick<PuppeteerPage, 'screenshot' | 'viewport'>;

/**
 * Create E2E page
 *
 * @param {string} htmlString html to render
 * @param {object} viewPort custom page viewPort - optional
 * @param {number} viewPort.width viewPort width - optional
 * @param {number} viewPort.height viewPort height - optional
 * @returns {Promise<DesignSystemE2EPage>} page
 */
export async function createPage(htmlString: string, viewPort?: { width?: number; height?: number }): Promise<DesignSystemE2EPage> {
  const defaultSize = 600;
  const page = (await newE2EPage()) as DesignSystemE2EPage;
  await page.setViewport({ width: viewPort?.width || defaultSize, height: viewPort?.height || defaultSize });
  await page.setContent(`<link rel="stylesheet" href="http://localhost:3333/build/variables.css" /><meta charset="UTF-8">${htmlString}`, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // monkey patch screenshot function to add some extra features
  const screenshot = page.screenshot;
  page.screenshot = async () => {
    let width = page.viewport().width;
    let height = page.viewport().height;
    // if viewport has not been redefined
    if (page.viewport().width === defaultSize && page.viewport().height === defaultSize) {
      const htmlElement = await page.$('html');
      const boundingBox = await htmlElement.boundingBox();
      width = Math.round(boundingBox.width);
      height = Math.round(boundingBox.height);
    }

    return screenshot.call(page, {
      clip: { x: 0, y: 0, width, height },
    });
  };

  return page;
}

/**
 * Add a darker background
 * usefull for light rendered element
 *
 * @param {boolean} condition condition to add darker background
 * @param {string} html html to update
 * @returns {string} html to render
 */
export const darkBackground = (condition: boolean, html: string): string =>
  `${condition ? '<span style="background:#999;display:inline-block;">' : ''}${html}${condition ? '</span>' : ''}`;
