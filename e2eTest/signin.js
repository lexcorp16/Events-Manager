const APP_BASE_PATH = 'http://localhost:1234';

module.exports = {
  'User signin': (browser) => {
    browser
      .url(APP_BASE_PATH)
      .waitForElementVisible('body', 5000)
      .assert.urlEquals(`${APP_BASE_PATH}/`)
      .assert.visible('body')
      .click('.sign-in-lk')
      .waitForElementVisible('.signin-page', 5000)
      .assert.visible('.signin-page')
      .assert.visible('.sign-in-container')
      .setValue('.email', 'efosa@gmail.com')
      .pause(1000)
      .click('.btn-submit')
      .waitForElementVisible('.swal-button', 3000)
      .assert.visible('.swal-button')
      .click('.swal-button')
      .setValue('.password-signin', 'tester')
      .pause(1000)
      .click('.btn-submit')
      .waitForElementVisible('.swal-button', 3000)
      .assert.visible('.swal-button')
      .click('.swal-button')
      .clearValue('.password-signin')
      .pause(1000)
      .setValue('.password-signin', 'testers')
      .click('.btn-submit')
      .waitForElementVisible('.all-centers', 10000)
      .assert.visible('.all-centers')
      .pause(3000)
      .end();
  }
};
