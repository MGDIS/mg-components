import { createPage } from '../../../../utils/test.utils';

const getSlots = ({ content, actions }: { content?: boolean; actions?: boolean }): string => {
  let slots = '';
  if (content) {
    slots += `
    <p slot="content">
      <strong>Strong</strong> content!
    </p>`;
  }
  if (actions) {
    slots += `
   <div slot="actions" class="mg-group-elements mg-group-elements--align-right">
     <mg-button identifier="identifier">Primary</mg-button>
     <mg-button variant="secondary" identifier="identifier">
       Secondary
     </mg-button>
   </div>`;
  }

  return slots;
};

describe('mg-modal', () => {
  describe.each([
    { content: false, actions: false },
    { content: true, actions: false },
    { content: false, actions: true },
    { content: true, actions: true },
  ])('render whith slots %s', slots => {
    test.each([
      { modalTitle: 'Modal Title', closeButton: false, hide: false },
      { modalTitle: 'Modal Title', closeButton: true, hide: false },
      { modalTitle: 'Modal Title', closeButton: true, hide: true },
    ])('Should render', async args => {
      const page = await createPage(`<mg-modal modal-title="${args.modalTitle}" close-button="${args.closeButton}" hide="${args.hide}">${getSlots(slots)}</mg-modal>`);

      const element = await page.find('mg-modal');

      expect(element).toHaveClass('hydrated');

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
