import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgMessage } from '../mg-message';
import { variants } from '../mg-message.conf';

const getDefaultContent = () => (
  <p>
    <strong>Strong</strong> content!
  </p>
);

const getPage = (args, content) =>
  newSpecPage({
    components: [MgMessage],
    template: () => <mg-message {...args}>{content}</mg-message>,
  });

describe('mg-message', () => {
  describe.each(variants)('Should render a %s message', variant => {
    test.each([
      { identifier: 'identifier' },
      { identifier: 'identifier', closeButton: true },
      { identifier: 'identifier', closeButton: true, lang: 'fr' },
      { identifier: 'identifier', closeButton: true, lang: 'xx' },
    ])('with args %s', async args => {
      const { root } = await getPage({ ...args, variant }, getDefaultContent());
      expect(root).toMatchSnapshot();
    });
  });

  test('Should replace classes on variant changes', async () => {
    const page = await getPage({ identifier: 'identifier' }, getDefaultContent());
    const element = page.doc.querySelector('mg-message');
    let classInfo = element.shadowRoot.querySelector('.mg-message--info');

    expect(classInfo).not.toBeNull();

    element.variant = 'danger';
    await page.waitForChanges();

    classInfo = element.shadowRoot.querySelector('.mg-message--info');
    const classDanger = element.shadowRoot.querySelector('.mg-message--danger');

    expect(classInfo).toBeNull();
    expect(classDanger).not.toBeNull();
  });

  test.each(['', 'blu'])('Should throw error with invalid variant property : %s', async variant => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', variant }, getDefaultContent());
    } catch (err) {
      expect(err.message).toMatch('<mg-message> prop "variant" must be one of :');
    }
  });

  test('Should throw error with invalid delay property : 50ms', async () => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', delay: 1 }, getDefaultContent());
    } catch (err) {
      expect(err.message).toMatch('<mg-message> prop "delay" must be greater than 2 seconds.');
    }
  });

  test('Should throw error when using prop "close-button" with an action slot', async () => {
    expect.assertions(1);
    try {
      await getPage({ identifier: 'identifier', closeButton: true }, [
        getDefaultContent(),
        <div slot="actions" class="mg-group-elements mg-group-elements--align-right">
          <mg-button>Primary</mg-button>
          <mg-button variant="secondary">Secondary</mg-button>
        </div>,
      ]);
    } catch (err) {
      expect(err.message).toMatch('<mg-message> prop "close-button" can\'t be used with the actions slot.');
    }
  });

  test('Should hide message on close button', async () => {
    const args = { identifier: 'identifier', closeButton: true };
    const page = await getPage(args, getDefaultContent());

    const element = page.doc.querySelector('mg-message');
    const button = element.shadowRoot.querySelector('mg-button');

    jest.spyOn(page.rootInstance.componentHide, 'emit');

    button.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    await page.waitForChanges();

    expect(page.rootInstance.componentHide.emit).toHaveBeenCalledTimes(1);
    expect(page.rootInstance.classList.join()).toContain('mg-message--hide');
  });

  test('Should hide message on delay', async () => {
    const args = { identifier: 'identifier', delay: 2 };
    const page = await getPage(args, getDefaultContent());

    jest.spyOn(page.rootInstance.componentHide, 'emit');
    jest.spyOn(page.rootInstance.componentShow, 'emit');

    expect(page.rootInstance.classList.join()).not.toContain('mg-message--hide');

    jest.advanceTimersByTime(2000);

    expect(page.rootInstance.classList.join()).toContain('mg-message--hide');
    expect(page.rootInstance.componentHide.emit).toHaveBeenCalledTimes(1);

    page.rootInstance.hide = false;
    await page.waitForChanges();

    expect(page.rootInstance.classList.join()).not.toContain('mg-message--hide');
    expect(page.rootInstance.componentShow.emit).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(2000);

    expect(page.rootInstance.classList.join()).toContain('mg-message--hide');
    expect(page.rootInstance.componentHide.emit).toHaveBeenCalledTimes(2);
  });
});
