/**
 * @name Instagram
 *
 * @desc Logs into Instagram with credentials. Provide your username and password as environment variables when running the script, i.e:
 * `INSTAGRAM_USER=myuser INSTAGRAM_PWD=mypassword node instagram.js`
 *
 */
const puppeteer = require("puppeteer");

const { makeEmailId, makeUserName } = require("./generateAccountEmail");

const main = async () => {
  let email = makeEmailId();
  let userName = makeUserName();

  console.log(email, userName);

  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto("https://www.instagram.com/accounts/emailsignup/", {
    waitUntil: "networkidle2"
  });

  //email
  await page.waitForSelector("[name='emailOrPhone']");
  await page.click("[name='emailOrPhone']");
  await page.type("[name='emailOrPhone']", `${email}`);
  await page.type("[name='password']", "idontgiveitashit");
  await page.type("[name='fullName']", userName);
  await page.type("[name='username']", userName);
  //password
  // await page.keyboard.down("Tab");
  //uncomment the following if you want the passwor dto be visible
  // page.$eval("._2hvTZ.pexuQ.zyHYP[type='password']", (el) => el.setAttribute("type", "text"));
  // await page.keyboard.type(process.env.INSTAGRAM_PWD);

  //the selector of the "Login" button
  // await page.click("._0mzm-.sqdOP.L3NKy>.Igw0E.IwRSH.eGOV_._4EzTm");

  //we find the Login btn using the innerText comparison because the selector used for the btn might be unstable
  await page.evaluate(() => {
    let btns = [...document.querySelectorAll("button")];
    btns.forEach(function(btn) {
      if (btn.innerText == "Sign up") btn.click();
    });
  });

  // page
  //   .waitForSelector("p[role='alert']", {
  //     timeout: 5000
  //   })
  //   .then(() => {
  //     page.$("p[role='alert']").then(el => {
  //       console.log(el);
  //     });
  //     console.log("error found");
  //     // console.log(error);
  //     // console.log(error.innerText);
  //   });

  // console.log(error);
  await page
    .waitForSelector(".glyphsSpriteMobile_nav_type_logo", {
      timeout: 5000
    })
    .then(() => {
      console.log(`Register for ${email} ok.`);
    })
    .catch(err => {
      console.log(`Register for ${email} fail.`);
    });

  await browser.close();
  main();
};

main();
