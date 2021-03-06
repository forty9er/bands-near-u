describe('Bands-Near-U player', function() {

  beforeEach(function() {
      browser.get('http://localhost:8080');
      browser.sleep(7000);
  });

  describe('On initialization', function() {

    it('has a title and working play/pause buttons', function() {
      expect(browser.getTitle()).toEqual('Bands Near U');
      expect(element(by.css('.jp-play')).isDisplayed()).toBe(false);
      expect(element(by.css('.jp-pause')).isDisplayed()).toBe(true);
      expect(element(by.css('.jp-duration')).getText()).toContain('00:30');
      var currentTime = element(by.css('.jp-current-time')).getText();
      element(by.css('.jp-pause')).click();
      browser.sleep(2000);
      expect(element(by.css('.jp-current-time')).getText()).toContain(currentTime);
      expect(element(by.css('.jp-play')).isDisplayed()).toBe(true);
      expect(element(by.css('.jp-pause')).isDisplayed()).toBe(false);
    });

    it('can be muted', function() {
      expect(element(by.css('.jp-mute')).isDisplayed()).toBe(true);
      expect(element(by.css('.jp-unmute')).isDisplayed()).toBe(false);
      element(by.css('.jp-mute')).click();
      expect(element(by.css('.jp-mute')).isDisplayed()).toBe(false);
      expect(element(by.css('.jp-unmute')).isDisplayed()).toBe(true);
    });

    it('songkick returned data should have multiple list items', function() {
      expect(element(by.css('#event')).getText()).not.toBe('');
    });

  });
});
