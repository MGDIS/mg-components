import { newE2EPage, E2EPage } from "@stencil/core/testing";
import { Page as PuppeteerPage } from "puppeteer";

export type DesignSystemE2EPage = E2EPage & Pick<PuppeteerPage, "screenshot" | "viewport">;

export async function createPage(htmlString?: string) {
  const options = {
    html: `<link rel="stylesheet" href="http://localhost:3333/build/mg-components.css" />${htmlString}`,
    viewportWidth: 600
  };

  const page = (await newE2EPage()) as DesignSystemE2EPage;
  const viewport = Object.assign({ height: page.viewport().height }, { width: options.viewportWidth });
  await page.setViewport(viewport);
  await page.setContent(options.html, { waitUntil: "networkidle0" });
  await page.evaluateHandle('document.fonts.ready');



  // monkey patch screenshot function to add some extra features
  const screenshot = page.screenshot;
  page.screenshot = async function() {
    return screenshot.call(page, {
      clip: {
        x: 0,
        y: 0,
        width: page.viewport().width,
        height: page.viewport().height,
      },
    })
  };

  return page;
}

export const cloneDeep = (el) => JSON.parse(JSON.stringify(el));

export const delay = ms => new Promise<void>(res => setTimeout(() => res(), ms));
