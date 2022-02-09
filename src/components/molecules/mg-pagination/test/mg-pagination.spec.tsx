import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { MgPagination } from '../mg-pagination';

const getPage = args =>
  newSpecPage({
    components: [MgPagination],
    template: () => <mg-pagination {...args}></mg-pagination>,
  });

describe('mg-pagination', () => {
  describe('Should render', () => {
    test.each([1, 2, 3, 4, 5, 6, 10])('with totalPages %s', async totalPages => {
      const page = await getPage({ totalPages, identifier: 'id' });
      expect(page.root).toMatchSnapshot();

      const actions = [...Array(totalPages - 1).keys()];

      for (const _ of actions) {
        const nextButton = page.root.shadowRoot.querySelector('li:last-child button');
        await nextButton.dispatchEvent(new CustomEvent('click', { bubbles: true }));
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();
      }
    });
  });

  describe('errors', () => {
    it('should throw an error, case totalPages props invalid', async () => {
      try {
        await getPage({ totalPages: 0 });
      } catch ({ message }) {
        expect(message).toBe('<mg-pagination> prop "totalPages" must be greater than 0');
      }
    });
    it('should throw an error, case currentPage props invalid: 0', async () => {
      try {
        await getPage({ currentPage: 0 });
      } catch ({ message }) {
        expect(message).toBe('<mg-pagination> prop "currentPage" must be greater than 0');
      }
    });
    it('should throw an error, case currentPage props invalid: currentPage > totalPages', async () => {
      try {
        await getPage({ currentPage: 2, totalPages: 1 });
      } catch ({ message }) {
        expect(message).toBe('<mg-pagination> prop "currentPage" can not be greater than total page');
      }
    });
  });

  describe('navigation', () => {
    test('navigatte with number 1 to 5 to 1, case totalPages=5', async () => {
      const page = await getPage({ totalPages: 5, identifier: 'id' });
      expect(page.root).toMatchSnapshot();

      const pageFive = page.root.shadowRoot.querySelector('[data-page="5"]');
      await pageFive.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();

      const pageOne = page.root.shadowRoot.querySelector('[data-page="1"]');
      await pageOne.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await page.waitForChanges();

      expect(page.root).toMatchSnapshot();
    });
  });
});
