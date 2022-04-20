import { newE2EPage, E2EPage } from '@stencil/core/testing';
import { Page as PuppeteerPage } from 'puppeteer';

export type DesignSystemE2EPage = E2EPage & Pick<PuppeteerPage, 'screenshot' | 'viewport'>;

/**
 * Create E2E page
 *
 * @param {string} htmlString html to render
 * @returns {Promise<DesignSystemE2EPage>} page
 */
export async function createPage(htmlString?: string): Promise<DesignSystemE2EPage> {
  const options = {
    html: `<link rel="stylesheet" href="http://localhost:3333/build/variables.css" /><meta charset="UTF-8">${htmlString}`,
    viewportWidth: 600,
  };

  const page = (await newE2EPage()) as DesignSystemE2EPage;
  const viewport = Object.assign({ height: page.viewport().height }, { width: options.viewportWidth });
  await page.setViewport(viewport);
  await page.setContent(options.html, { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // monkey patch screenshot function to add some extra features
  const screenshot = page.screenshot;
  page.screenshot = async () => {
    return screenshot.call(page, {
      clip: {
        x: 0,
        y: 0,
        width: page.viewport().width,
        height: page.viewport().height,
      },
    });
  };

  return page;
}

/**
 * Clone Deep function
 *
 * @param {unknown} obj object to clone
 * @returns {unknown} cloned json
 */
export const cloneDeep = (obj: unknown): unknown => JSON.parse(JSON.stringify(obj));
