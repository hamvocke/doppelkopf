// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  "start game test": client => {
    client
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible("#app", 5000);

    client.expect.element(".welcome").to.be.present;

    client.click("button.start-game");

    client.assert.elementCount(".player", 4);

    client.end();
  }
};
