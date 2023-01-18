import { createPage, darkBackground } from '../../../../utils/e2e.test.utils';
import { BadgeVariantType, variants } from '../mg-badge.conf';

const addCustomTextColor = (variant: BadgeVariantType): string =>
  `${
    variant === 'text-color'
      ? `<style>
    mg-badge {
      --mg-badge-text-color: 40 80% 60%;
      color: hsl(260 80% 50%);
    }
  </style>`
      : ''
  }`;

describe('mg-badge', () => {
  test('Should render', async () => {
    const html = variants
      .map(variant => {
        const template = [true, false]
          .map(outline =>
            [1, 99, '*', '!', '99+']
              .map(value =>
                darkBackground(
                  variant === 'secondary',
                  `<mg-badge value="${value}" label="${variant}" variant="${variant}" outline="${outline}"></mg-badge>${addCustomTextColor(variant)}`,
                ),
              )
              .join(''),
          )
          .join('');
        return `<h2>${variant}<h2/><div>${template}<div>`;
      })
      .join('');

    const page = await createPage(html, { width: 250, height: 700 });

    const element = await page.find('mg-badge');
    expect(element).toHaveClass('hydrated');

    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
