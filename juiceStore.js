/*   
Required modules :
npm i puppeteer
npm install --save request
npm install --save request-promise
npm install --save request-promise-native
*/
const puppeteer = require('puppeteer');
const request = require('request-promise-native');
const poll = require('promise-poller').default;

const config = {
  sitekey: '6LdCcHYUAAAAAMrUAIBStM6mquuQLbgi_cSWJet9',
  pageurl: 'https://juicestore.com/blogs/editorial/raffle-nike-air-max-1-premium-chinese-new-year',
  apiKey: 'eddb12d5ba17b42d917a5da98443651c',
  apiSubmitUrl :'http://2captcha.com/in.php',
  apiRetrieveUrl:'http://2captcha.com/res.php'
};
const apiKey = ('eddb12d5ba17b42d917a5da98443651c');

const getFirstName = function () {
    return 'luck'
};

const getLastName = function () {
    return 'frankel'
};

const getGender = function () {
    return 'male' 
};

const getMonthOfBirth = function () {
    return '04'
};

const getDayOfBirth = function () {
    return '05'
};

const getYearOfBirth = function () {
    return '2002'
};

const getUsSize = function () {
    return '7'
};

const getPhoneNumber = function () {
    return '0497535789'
};

const getEmail = function () {
    return 'oscar.devos6856@odesha.xyz'
};

const getInsta = function () {
    return 'louislus.09'
};

const chromeOptions = {
  executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless:false, 
  slowMo:50,
  defaultViewport: null
};

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
    key: 'eddb12d5ba17b42d917a5da98443651c',
    pageurl: 'https://juicestore.com/blogs/editorial/raffle-nike-air-max-1-premium-chinese-new-year',
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

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))