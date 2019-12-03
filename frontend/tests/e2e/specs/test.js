// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  "start game test": browser => {
    browser
      .init()
      .waitForElementVisible("#app")
      .assert.elementPresent(".welcome")
      .click("button.start-game")
      .assert.elementCount(".player", 4)
      .end();
  }
};
