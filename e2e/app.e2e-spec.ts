import { HwCalendarPage } from './app.po';

describe('hw-calendar App', () => {
  let page: HwCalendarPage;

  beforeEach(() => {
    page = new HwCalendarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
