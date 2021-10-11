import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MgCharacterLeft } from '../mg-character-left';

const getPage = (args) => newSpecPage({
  components: [MgCharacterLeft],
  template: () => (<mg-character-left {...args}></mg-character-left>),
});

describe('mg-character-left',()=> {

  describe.each(['blu', 'blublu', 'blu blu blu blu blu'])('Should render nb char left for %s', (characters) => {
    test.each([123, 234, 200])('renders', async (maxlength) => {
      const { root } = await getPage({characters, maxlength});
      expect(root).toMatchSnapshot();
    });
  });

  test('Should not render without maxlength', async () => {
    try {
      await getPage({});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-character-left> prop "maxlength" is required')
    }
  });

  test.each(["without mustache", undefined])('Sould not renter with template %S', async (template)=> {
    try {
      await getPage({characters:'blu', maxlength:400, template});
    }
    catch (err){
      expect(err.message).toContain('<mg-character-left> prop "template" must contain "{counter}"')
    }
  });

  test('Should not render without maxlength', async () => {
    try {
      await getPage({});
    }
    catch (err) {
      expect(err.message).toMatch('<mg-character-left> prop "maxlength" is required')
    }
  });

  test('Should update character left counter', async ()=> {
    const maxlength = 400;
    const characters = "blu blu";
    const page = await getPage({characters : "", maxlength});

    const element = await page.doc.querySelector('mg-character-left');
    expect(element.textContent).toEqual(`${maxlength} caractères disponibles.`);

    element.setAttribute('characters', characters);
    await page.waitForChanges();
    expect(element.textContent).toEqual(`${maxlength - characters.length} caractères disponibles.`);
  })

});

