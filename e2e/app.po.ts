import { browser, by, element } from 'protractor';

export class SportJSFrontendPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sp-root h1')).getText();
  }
}
