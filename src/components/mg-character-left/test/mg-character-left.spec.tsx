import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgCharacterLeft } from '../mg-character-left';

const getPage = (args) => newSpecPage({
  components: [MgCharacterLeft],
  template: () => (<mg-character-left {...args}></mg-character-left>),
});

describe.each(['blu', 'blublu', 'blu blu blu blu blu'])('mg-character-left for %s', (characters) => {
  test.each([123, 234, 200])('renders', async (maxlength) => {
    const expected = maxlength - characters.length;
    const page = await getPage({characters, maxlength});
    expect(page.root).toEqualHtml(`
      <mg-character-left>
      <p>Reste ${expected} caractères à saisir</p>
      </mg-character-left>
    `);
  });
});
