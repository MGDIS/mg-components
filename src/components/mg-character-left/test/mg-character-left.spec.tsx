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
      const expected = maxlength - characters.length;
      const { root } = await getPage({characters, maxlength});
      expect(root).toEqualHtml(`
        <mg-character-left>
        <p><strong>${expected}</strong> caractères disponibles.</p>
        </mg-character-left>
      `);
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

  // test('Sould update character left counter', async ()=> {
  //   const maxlength = 400;
  //   const characters = "blu blu";
  //   const { root } = await getPage({maxlength});

  //   expect(root).toEqualHtml(`
  //       <mg-character-left>
  //       <p><strong>${maxlength}</strong> caractères disponibles.</p>
  //       </mg-character-left>
  //     `);
  // })



});

