// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  "start game test": browser => {
    browser
      .init()
      .waitForElementVisible(".welcome")
      .click("button.start-game")
      .assert.elementPresent("#game")
      .assert.elementCount(".player", 4)
      .end();
  }
};
