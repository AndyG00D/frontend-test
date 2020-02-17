import {AppPage} from './app.po';
import {browser, protractor} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should navigate to page', () => {
    page.navigateTo();
    expect(page.getElementByClassName('alert').getText()).toEqual('Input keywords for finding images.');
  });

  it('should insert the text to the input and search', () => {
    const searchInputElement = page.getSearchInputElement();
    searchInputElement.sendKeys('test');
    browser.wait(searchInputElement.sendKeys(protractor.Key.ENTER));

    // check tag badge
    expect(page.getElementByClassName('cs-chip-list-badge').getText()).toContain('test');

    // check items
    page.getElementsByClassName('preview-image').count().then(length => {
      expect(length).toEqual(9);
    });

    // check pagination
    page.getElementByTag('ngb-pagination').isPresent().then(isPresent => {
      expect(isPresent).toBeTruthy();
    });

    browser.sleep(500);
  });

  it('should change pagination', () => {
    const prevValue = page.getElementByClassName('preview-image').getAttribute('src');
    browser.wait(
      page.getElementsByClassName('page-link').get(2).click()
    );
    browser.sleep(500);
    const changedValue = page.getElementByClassName('preview-image').getAttribute('src');
    expect(changedValue).not.toEqual(prevValue);
  });

  it('should clear search', () => {
    browser.wait(page.getElementByClassName('btn-clear').click());
    browser.sleep(500);
    expect(page.getElementByClassName('alert').getText()).toEqual('Input keywords for finding images.');
  });

  it('should insert the text to the input and search empty result', () => {
    const searchInputElement = page.getSearchInputElement();
    searchInputElement.sendKeys('########################################################################################');
    browser.wait(page.getElementByClassName('btn-success').click());
    browser.sleep(500);
    expect(page.getElementByClassName('alert').getText()).toEqual('Sorry, nothing found. Please, try again with some different keyword.');
  });


});
