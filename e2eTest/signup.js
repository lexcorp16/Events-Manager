const APP_BASE_PATH = 'http://localhost:1234';

module.exports = {
  'User signup': (browser) => {
    browser
      .url(APP_BASE_PATH)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_PATH}/`)
      .assert.visible('body')
      .click('.btn-get-started')
      .waitForElementVisible('.signup-page', 5000)
      .assert.visible('.signup-page')
      .assert.visible('.sign-in-container')
      .setValue('.first-name', 'efosa')
      .pause(1000)
      .setValue('.last-name', 'Baddest')
      .pause(1000)
      .setValue('.email', 'efosa@ymail.com')
      .pause(1000)
      .setValue('.password', 'swampious')
      .pause(1000)
      .click('.btn-submit')
      .waitForElementVisible('.swal-button', 3000)
      .assert.visible('.swal-button')
      .click('.swal-button')
      .pause(1000)
      .setValue('.confirm-password', 'swampious88')
      .click('.btn-submit')
      .waitForElementVisible('.swal-button', 3000)
      .pause(1000)
      .click('.swal-button')
      .clearValue('.confirm-password')
      .pause(1000)
      .setValue('.confirm-password', 'swampious')
      .click('.btn-submit')
      .waitForElementVisible('.all-centers', 5000)
      .assert.visible('.all-centers')
      .pause(3000)
      .end();
  }
};
