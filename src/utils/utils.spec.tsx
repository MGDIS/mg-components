import { createID, formatDate } from './utils';

describe('utils', ()=>{
  describe('createID', ()=>{
    test.each([undefined, '', 'blu'])('Should generate a prefixed ID if defined : %s', (prefix)=>{
      const id = createID(prefix);
      let regexp = /^[a-z]{10}$/;
      if(prefix !== undefined && prefix !== '') {
        regexp = new RegExp(`^${prefix}-[a-z]{10}$`);
      }
      expect(id).toMatch(regexp);
    })
  })

  describe('formatDate', ()=>{
    test.each([undefined, '', 'blu'])('Should return empty string : %s', (date)=>{
      const formatedDate = formatDate(date);
      expect(formatedDate).toEqual('');
    });

    test('Should return formated date', ()=> {
      const formatedDate = formatDate("2021-10-14");
      expect(formatedDate).toEqual('14/10/2021');
    })

  })
})
