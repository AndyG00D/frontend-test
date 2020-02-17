import {browser, by, element, ElementFinder, ElementArrayFinder} from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl + '/images-search/') as Promise<unknown>;
  }

  getSearchInputElement(): ElementFinder {
    return element(by.className('cs-chip-list-input'));
  }

  getElementByClassName(className: string): ElementFinder {
    return element(by.className(className));
  }

  getElementByTag(tagName: string): ElementFinder {
    return element(by.tagName(tagName));
  }

  getElementsByClassName(className: string): ElementArrayFinder {
    return element.all(by.className(className));
  }
}
