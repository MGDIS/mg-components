import { createID } from './utils';

describe('utils', ()=>{
  describe('createID', ()=>{
    test.each([undefined, '', 'blu'])('Should generate a prefixed ID if defined : %s', (prefix)=>{
      const id = createID(prefix);
      let regexp = /^[a-z]{10}$/;
      if(prefix !== undefined) {
        regexp = new RegExp(`^${prefix}-[a-z]{10}$`);
      }
      expect(id).toMatch(regexp);
    })
  })
})
