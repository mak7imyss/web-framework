import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RatingPage extends Page {

  get Rating() {
    return browser.$('//*[@id="root"]/div/section[2]/div/div/div[2]/div[2]');
  }

  get LikesRating()  {
    return  browser.$$('td[class*=has-text-success]');
  };

  get DisikesRating() {
    return browser.$$('td[class*=has-text-danger]');
  }

  open() {
    return super.open(`rating`);
  }

  waitForLoaded() {
    super.waitForLoaded();
    return browser.waitUntil(async () => {
      return (await this.Rating).isExisting();
    });
  }
}

export default new RatingPage('Страница рейтинга');
