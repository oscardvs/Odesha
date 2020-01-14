const puppeteer = require('puppeteer');
const request = require('request-promise-native');
const poll = require('promise-poller').default;

//not accurate to hanon bcs billing reqired
/*var firstName = [
    'Cox',
    'Burns',
    'Johnston',
    'Lewis',
    'Glenn',
    'Stephenson',
    'Morton',
    'Drake',
    'Bowman',
    'Ross',
    'Henson',
    'Wilkerson',
    'Ryan',
    'Harvey',
    'Brewer',
    'Hamilton',
    'Adams',
    'Zimmerman',
    'Rasmussen',
    'Perkins',
    'Ponce',
    'Sanchez',
    'Greer',
    'Alvarez',
    'Valentine',
    'Walls',
    'Barr',
    'Nash',
    'Rush',
    'Wiley',
    'Walters',
    'Howell',
    'Esparza',
    'Bennett',
    'Mckee',
    'Beard',
    'Klein',
    'Hatfield',
    'Sheppard',
    'Maldonado',
    'Odonnell',
    'Hale',
    'Huynh',
    'Randolph',
    'Arellano',
    'Hardy',
    'Love',
    'Schneider',
    'Patel',
    'Shah',
    'Lowery',
    'Bullock',
    'Acosta',
    'Hood',
    'Carson',
    'Trevino',
    'Mcclain',
    'Cross',
    'Byrd',
    'Garner',
    'Delacruz',
    'Andrews',
    'Cisneros',
    'Graves',
    'Ortiz',
    'Osborne',
    'Strong',
    'George',
    'Oconnell',
    'Miller',
    'Buckley',
    'Monroe',
    'Cole',
    'Farmer',
    'Mayo',
    'Middleton',
    'Adkins',
    'Grimes',
    'House',
    'Reid',
    'Wagner',
    'Schroeder',
    'Carroll',
    'Petty',
    'Mcknight',
    'Gilbert',
    'French',
    'Crawford',
    'Hopkins',
    'Tapia',
    'Calderon',
    'Cooper',
    'Casey',
    'Wu',
    'Macdonald',
    'Payne',
    'Liu',
    'Davila',
    'Herman',
    'Sampson',
    'Mullen',
    'Watson',
    'Rich',
    'Moody',
    'Andrade',
    'Calhoun',
    'Weaver',
    'Floyd',
    'Moon',
    'Short',
    'Gardner',
    'Wyatt',
    'Haney',
    'Melton',
    'Jimenez',
    'Combs',
    'Bradford',
    'Martinez',
    'Moran',
    'Peterson',
    'Montes',
    'Oliver',
    'Mccarty',
    'Navarro',
    'Mcdowell',
    'Hunt',
    'Acevedo',
    'Wade',
    'Avery',
    'Waller',
    'Kennedy',
    'Dunn',
    'Ramsey',
    'Blanchard',
    'Christian',
    'Mann',
    'Mcguire',
    'Hudson',
    'Sandoval',
    'Salazar',
    'Parrish',
    'Friedman',
    'Robles',
    'Hart',
    'Villanueva',
    'Murphy',
    'Rogers',
    'Moore',
    'Johns',
    'Freeman',
    'Meza',
    'Stokes',
    'Nguyen',
    'Pennington',
    'Strickland',
    'Austin',
    'Ibarra',
    'Joseph',
    'Colon',
    'Weeks',
    'Wise',
    'Whitney',
    'Mcdaniel',
    'Yang',
    'Eaton',
    'Atkinson',
    'Warren',
    'Myers',
    'Hays',
    'Wheeler',
    'Gibson',
    'Camacho',
    'Paul',
    'Castillo',
    'Carney',
    'Hill',
    'Marshall',
    'Meyer',
    'Swanson',
    'Lin',
    'Hansen',
    'Bowen',
    'Chandler',
    'Marsh',
    'Robbins',
    'Richards',
    'Hancock',
    'Pace',
    'Maxwell',
    'Patterson',
    'Huffman',
    'Salinas',
    'Lane',
    'Russo',
    'Luna',
];
*/

document.querySelector("#myForm").addEventListener("keyup", function(){
    var profile = {
        accEmail:"your@email.com",
        accPassword:"p@ssword123",
        useNewAddress:"Use a new address",
        firstName: "First Name",
        lastName:"Last Name",
        address:"123 street lane",
        //need to j1g address??
        city:"New York",
        addressLineTwo:"apartment 1",
        country:"USA",
        //need to figure out with data-code. ex:GB=UnitedKingdom
        usSize:"10",
        //need to figure out with value. ex: UK 6.5 : US 7.5 = 31379239174201
        state_province_region:"NeW York",
        zipCode: "00000",
        siteUrl:"https://launches.hanon-shop.com/collections/launch/products/nike-sb-dunk-high-premium-qs-p-rod-ct6680100"
    };

    var payment = {
        cardNumber:"OOOOOOOOOOOO",
        nameOnCard:"Full Name",
        exiprationDate:"MM / YY",
        ccv:"123"
    };

    var inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      data[input.name] = input.value;
    });
    document.querySelector("#text").innerText = JSON.stringify(data); 
});
document.querySelector("#myForm").dispatchEvent(new Event('keyup'));

/*var profile = {
    accEmail:"your@email.com",
    accPassword:"p@ssword123",
    useNewAddress:"Use a new address",
    firstName:"First Name",
    lastName:"Last Name",
    address:"123 street lane",
    //need to j1g address??
    city:"New York",
    addressLineTwo:"apartment 1",
    country:"USA",
    //need to figure out with data-code. ex:GB=UnitedKingdom
    usSize:"10",
    //need to figure out with value. ex: UK 6.5 : US 7.5 = 31379239174201
    state_province_region:"NeW York",
    zipCode: "00000",
    siteUrl:"https://launches.hanon-shop.com/collections/launch/products/nike-sb-dunk-high-premium-qs-p-rod-ct6680100
} */

(function () {
    'use strict';

    if (document.getElementsByName == document.getElementsByName("url[sitUrl]"))[0].value = profile.siteUrl 
    {

        document.getElementsByName("profile[usSize]")[0].value = profile.usSize;
        $('div.icheckbox_minimal').iCheck('check');
        document.getElementsByName("Enter Draw")[0].click();
        document.getElementsByName("profile[accEmail]")[0].value = profile.accEmail;
        document.getElementsByName("profile[accPassword]")[0].value = profile.accPassword;
        document.getElementsByName("Sign in")[0].click();
        document.getElementsByName("profile[useNewAddress]")[0].value = profile.useNewAddress;
        document.getElementsByName("Use a new address")[0].click();
        //get random first name (not accurate to hanon bcs billing reqired)
        document.getElementsByName("profile[First name]")[0].value = profile.firstName;//rand = firstName[Math.floor(Math.random() * firstName.length)];
        //get random last name (not accurate to hanon bcs billing reqired)
        document.getElementsByName("profile[Last name]")[0].value = profile.lastName;//rand = lastName[Math.floor(Math.random() * lastName.length)];
        document.getElementsByName("profile[Address]")[0].value = profile.address;
        document.getElementsByName("profile[Apartment, suite, etc.]")[0].value = profile.addressLineTwo;
        document.getElementsByName("profile[City]")[0].value = profile.city;
        document.getElementsByName("profile[country]")[0].value = profile.country;
        document.getElementsByName("Country")[0].click(profile.country);
        document.getElementsByName("profile[State]")[0].value = profile.state_province_region;
        document.getElementsByName("profile[ZIP code]")[0].value = profile.zipCode

        //Captcha

        const config = {
            sitekey:'6LeoeSkTAAAAAA9rkZs5oS82l69OEYjKRZAiKdaF',
            pageurl:'https://launches.hanon-shop.com/8725397561/checkouts/7978e70fb0926a6b5112740eb1b76122?key=7b359fe4183a781eb9f7d41f109bcc66&skip_shopify_pay=true',
            apiKey: require('./import_api_key'),
            apiSubmitUrl: 'https://2captcha.com/in.php',
            apiRetrieveUrl:'http://2captcha.com/res.php'
        }
        //to update: get username and password from the user pool
        const getUsername = function() {
            return 'testUser291823928'
        };
        const getPassword = function(){
            return '';
        }

        const chromeOptions = {
            executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            headless:true,
            sloMo:10,
            defaultViewport: null
        };

        (async function main(){
            const browser = await puppeteer.launch(chromeOptions);

            const page = await browser.newPage();

            console.log(`navigating to ${config.pageurl}`);
            await page.goto(config.pageurl);

            const requestId = await initiateCaptchaRequest(config.apiKey);

            const username = getUsername();
            console.log(`Typing username ${username}`);
            await page.type('#user_reg',username);

            const password = getPassword();
            console.log(`typing password ${password}`);
            await page.type('#passwd_reg', password);
            await page.type('#passwd2_reg', password);

            const response = await pollForRequestResults(config.apiKey, requestId);

            console.log(`Entering recaptcha response ${response}`);
            await page.evaluate(`document.getElementById("g-recaptcha-response").innerHTML="${response}";`);

            console.log(`Submitting...`);
            page.click('#register-form button[]type=submit');

        })()

        async function intiateCaptchaRequest(apiKey) {
            const formData = {
                method :'userrecaptcha',
                googlekey: config.sitekey,
                key: apiKey,
                pageurl: config.pageurl,
                json: 1
            };
            console.log(`Sumitting solution request to 2captcha for ${config.pageurl}`);
            const response = await request.post(config.apiSubmitUrl, {form: fromData});
            return Json.parse(response).request;
        }

        async function pollForRequestResults(key, id, retries = 30, interval = 1500, delay = 15000) {
            console.log(`Waiting for${delay} milliseconds...`)
            await clearTimeout(delay);
            return poll({
                taskFn: requestCaptchaResults(key, id),
                interval,
                retries
            });
        }

        function requestCaptchaResults(apiKey, requestId) {
            const url = `${config.apiRetrieveUrl}?key=${apiKey}&action=get&id=${requestId}&json=1`;
            return async function() {
                return new Promise(async function(resolve, reject){
                const rawResponse = await request.get(url);
                const resp = JSON.parse(rawResponse);
                console.log(resp);
                if (resp.status === 0) return reject(resp.request);
                resolve(resp.request);
                });
        }
        }

        const timeout = ms => new Promise(res => serTimeout(res, ms))

        //end captcha process

        document.getElementsByName("Continue to shipping")[0].click();

        document.getElementsByName("Continue to payment")[0].click();

        document.getElementsByName("payment[cardNumber]")[0].value = payment.cardNumber;
        document.getElementsByName("payment[nameOnCard]")[0].value = profile.nameOnCard;
        document.getElementsByName("payment[expirationDate]")[0].value = payment.exiprationDate;
        document.getElementsByName("payment[ccv]")[0].value = payment.ccv;

        document.getElementsByName("Complete order")[0].click();
        
        
    }
});

// to lanch go to hanon.js in terminal : $node index.js
