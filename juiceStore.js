/*   
Required modules :
npm i puppeteer
npm install --save request
npm install --save request-promise
npm install --save request-promise-native
npm install hookcord
*/
const puppeteer = require('puppeteer');
const request = require('request-promise-native');
const poll = require('promise-poller').default;
const hookcord = require('hookcord');

const config = {
  sitekey: '6LdCcHYUAAAAAMrUAIBStM6mquuQLbgi_cSWJet9',
  pageurl: document.getElementById("siteUrl").juicestore.html,
  apiKey: document.getElementById("2captchaAPI").settings.html,
  apiSubmitUrl :'http://2captcha.com/in.php',
  apiRetrieveUrl:'http://2captcha.com/res.php'
};

const apiKey = document.getElementById("2captchaAPI").settings.html;

const getFirstName = function () {
    return document.getElementById("firstName").juicestore.html
};

const getLastName = function () {
    return document.getElementById("lastName").juicestore.html
};

const getGender = function () {
    return document.getElementById("gender").juicestore.html 
};

const getMonthOfBirth = function () {
    return document.getElementById("monthOfBirth").juicestore.html
};

const getDayOfBirth = function () {
    return document.getElementById("dayOfBirth").juicestore.html
};

const getYearOfBirth = function () {
    return document.getElementById("yearOfBirth").juicestore.html
};

const getUsSize = function () {
    return document.getElementById("usSize").juicestore.html
};

const getPhoneNumber = function () {
    return document.getElementById("phoneNumber").juicestore.html
};

const getEmail = function () {
    return document.getElementById("email").juicestore.html
};

const getInsta = function () {
    return document.getElementById("instagram").juicestore.html
};

const chromeOptions = {
  executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: document.getElementById("headless").settings.html, 
  slowMo:50,
  defaultViewport: null
};

const hookcord = require('hookcord');
const Hook = new hookcord.Hook()

(async function main() {
  const browser = await puppeteer.launch(chromeOptions);

  const page = await browser.newPage();

  console.log (`Navigation to ${config.pageurl}`);
  await page.goto(config.pageurl);

  const requestId = await initiateCaptchaRequest(config.apiKey);
  
  const firstName = getFirstName();
  console.log(`Typing first name ${firstName}`);
  await page.waitFor('#mce-FNAME');
  await page.click('#mce-FNAME', {delay: 200} );
  await page.type('#mce-FNAME', firstName);
  
  const lastName = getLastName();
  console.log(`Typing last name ${lastName}`);
  await page.click('#mce-LNAME');
  await page.type('#mce-LNAME', lastName);

  const gender = getGender();
  console.log(`Clicking gender ${gender}`);
  await page.click('#mce-MMERGE7');
  await page.type('#mce-MMERGE7', gender,);

  const monthOfBirth = getMonthOfBirth();
  console.log(`Typing month of birth ${monthOfBirth}`);
  await page.waitFor('#mce-MMERGE5-month', {delay: 100} );
  await page.click('#mce-MMERGE5-month');
  await page.type('#mce-MMERGE5-month', monthOfBirth);
  const dayOfBirth = getDayOfBirth();
  console.log(`Typing day of birth ${dayOfBirth}`);
  await page.click('#mce-MMERGE5-day');
  await page.type('#mce-MMERGE5-day', dayOfBirth);
  const yearOfBirth = getYearOfBirth();
  console.log(`Typing year of birth ${yearOfBirth}`);
  await page.click('#mce-MMERGE5-year');
  await page.type('#mce-MMERGE5-year', yearOfBirth);

  const usSize = getUsSize();
  console.log(`Choosing size ${usSize}`);
  await page.click('#mce-MMERGE6');
  await page.type('#mce-MMERGE6', usSize);

  const phoneNumber = getPhoneNumber();
  console.log(`Entering phone number ${phoneNumber}`);
  await page.type('#mce-PHONE', phoneNumber);

  const email = getEmail();
  console.log(`Typing email ${email}`);
  await page.type('#mce-EMAIL', email);

  const instagram = getInsta();
  console.log(`Entering insta ${instagram}`);
  await page.type('#mce-MMERGE3', instagram);

  await page.click('#re-captcha');
  
  const response = await pollForRequestResults(config.apiKey, requestId);

  console.log(`Entering recaptcha response ${response}`);
  await page.evaluate(`document.getElementById("g-recaptcha-response").innerHTML="${response}";`);

  console.log(`Submitting...`);
  await page.click('#recaptcha-verify-button');
  await page.waitFor('#mc-embedded-subscribe');
  await page.click('#mc-embedded-subscribe');
})()

async function initiateCaptchaRequest() {
  const formData = {
    method: 'userrecaptcha',
    googlekey: '6LdCcHYUAAAAAMrUAIBStM6mquuQLbgi_cSWJet9',
    key: document.getElementById("2captchaAPI").profile.html,
    pageurl: document.getElementById("siteUrl").juicestore.html,
    json: 1
  };

  console.log(`Submitting solution request to 2captcha for ${config.pageurl}`);
  const response = await request.post('http://2captcha.com/in.php', {form: formData});
  return JSON.parse(response).request;
}

async function pollForRequestResults(key, id, retries = 30, interval = 1500, delay = 15000) {
  console.log(`Waiting for ${delay} milliseconds...`)
  await timeout(delay);
  return poll({
    taskFn: requestCaptchaResults(key, id),
    interval,
    retries
  });
}

function requestCaptchaResults(apiKey, requestId) {
  const url = `http://2captcha.com/res.php?key=${apiKey}&action=get&id=${requestId}&json=1`;
  return async function() {
    return new Promise(async function(resolve, reject){
      console.log(`Polling for response...`)
      const rawResponse = await request.get(url);
      const resp = JSON.parse(rawResponse);
      console.log(resp);
      if (resp.status === 0) return reject(resp.request);
      console.log(`Response received!`)
      resolve(resp.request);
    });
  }
}

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

Hook.login('668514532364386343', '3ysk8Bjnplh8kWR1zlwPhnXz57odhqhri8PhISG8EAvFwbpcKijm8nzjZeKU7UX7-pO8');
Hook.setPayload({
  "embeds": [{
  "title": "Congrats! Your entry is in.",
  "color": 15257231,
    "fields": [
      {
        "name": "Field",
        "value": "Good Luck."
      }
    ]
  }]
})
