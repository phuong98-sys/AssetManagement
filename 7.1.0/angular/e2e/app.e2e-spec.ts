import { AssetManagementTemplatePage } from './app.po';

describe('AssetManagement App', function() {
  let page: AssetManagementTemplatePage;

  beforeEach(() => {
    page = new AssetManagementTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
