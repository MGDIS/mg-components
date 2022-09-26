import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgCharacterLeft } from '../mg-character-left';
import messages from '../../../../locales/en/messages.json';

const getPage = args =>
  newSpecPage({
    components: [MgCharacterLeft],
    template: () => <mg-character-left {...args}></mg-character-left>,
  });

describe('mg-character-left', () => {
  describe.each(['blu', 'blublu', 'blu blu blu blu blu'])('Should render nb char left for %s', characters => {
    test.each([123, 234, 200])('renders', async maxlength => {
      const { root } = await getPage({ characters, maxlength });
      expect(root).toMatchSnapshot();
    });
  });

  test('Should throw error without maxlength', async () => {
    expect.assertions(1);
    try {
      await getPage({});
    } catch (err) {
      expect(err.message).toMatch('<mg-character-left> prop "maxlength" is required.');
    }
  });

  test('Should update character left counter', async () => {
    const maxlength = 400;
    const characters = 'blu blu';
    const page = await getPage({ characters: '', maxlength });

    const element = page.doc.querySelector('mg-character-left');
    expect(element.textContent).toContain(messages.nbCharLeft.replace('{counter}', `${maxlength}`));

    element.setAttribute('characters', characters);
    await page.waitForChanges();
    expect(element.textContent).toContain(messages.nbCharLeft.replace('{counter}', `${maxlength - characters.length}`));
  });

  test.each(['fr', 'xx'])('Should render component with locale: %s', async lang => {
    const maxlength = 400;
    const characters = 'blu blu';
    const { root } = await getPage({ characters, maxlength, lang });
    expect(root).toMatchSnapshot();
  });
});
