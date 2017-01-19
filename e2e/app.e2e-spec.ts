import { FerretsBlogPage } from './app.po';

describe('ferrets-blog App', function() {
  let page: FerretsBlogPage;

  beforeEach(() => {
    page = new FerretsBlogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
