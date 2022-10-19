import { createPage } from '../../../../utils/test.utils';

describe('mg-illustrated-message', () => {
  describe.each(['regular', 'small'])('renders size %', size => {
    test.each(['vertical', 'horizontal'])('renders direction %', async direction => {
      const page = await createPage(`<mg-illustrated-message size="${size}" direction="${direction}">
    <svg slot="illustration" width="190" height="350" viewBox="0 0 190 350" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 0H15C23.2843 0 30 6.71573 30 15V290H40V15C40 6.71573 46.7157 0 55 0C63.2843 0 70 6.71573 70 15V275C70 277.761 67.7615 280 65 280H60V40H50V340H60V290H65C67.7615 290 70 292.239 70 295V340H80V295C80 291.158 78.5558 287.654 76.1805 285C78.5558 282.346 80 278.842 80 275V0H95C103.284 0 110 6.71573 110 15V25C110 28.8418 108.556 32.3462 106.181 35C108.556 37.6538 110 41.1582 110 45V305C110 307.761 107.761 310 105 310H100V45C100 42.2386 97.7615 40 95 40H90V325C90 333.284 96.7157 340 105 340H120V330H105C102.239 330 100 327.761 100 325V320H105C113.284 320 120 313.284 120 305V15C120 6.71573 126.716 0 135 0C143.284 0 150 6.71573 150 15V330H140V15C140 12.2386 137.761 10 135 10C132.239 10 130 12.2386 130 15V340H165C173.284 340 180 333.284 180 325V15C180 12.2386 177.761 10 175 10H170V325C170 327.761 167.761 330 165 330H160V0H175C183.284 0 190 6.71573 190 15V350H0V0ZM10 325C10 333.284 16.7157 340 25 340C33.2843 340 40 333.284 40 325V300H30V325C30 327.761 27.7615 330 25 330C22.2385 330 20 327.761 20 325V15C20 12.2386 17.7615 10 15 10H10V325ZM60 15V30H50V15C50 12.2386 52.2385 10 55 10C57.7615 10 60 12.2386 60 15ZM95 30H90V10H95C97.7615 10 100 12.2386 100 15V25C100 27.7614 97.7615 30 95 30Z"
        fill="black"
      />
    </svg>
    <h2 slot="title">Lorem Ipsum</h2>
    <h3 slot="details">The standard Lorem Ipsum passage, used since the 1500s</h3>
    <div slot="details">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
  </mg-illustrated-message>`);

      const element = await page.find('mg-illustrated-message');
      expect(element).toHaveClass('hydrated');

      await page.setViewport({ width: 800, height: 800 });

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot();
    });
  });
});
