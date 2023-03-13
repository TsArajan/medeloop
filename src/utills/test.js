const iCloud = require('icloud');
const instance = iCloud();
// Replace these with your iCloud account details
const username = 'abjain200@gmail.com';
const password = 'Tristate@123';
const asp = 'oeqz-bfvp-uako-eiqm';

// Log in to iCloud
/* instance.login(username, password, function (err) {
  if (err) return console.log('login failed');
  instance.contacts(function (err, results) {
    if (err) return console.log('failed to fetch contacts');
    console.log(results);
  });
});
 
const icloud = require('icloud');
 
const username = 'your_icloud_username';
const password = 'your_icloud_password'; */

instance
  .login(username, password, function (results, error) {
    if (error) {
      console.log(error)
    } else {
      console.log(results)
    }
  })

/* const { ICloudSession } = require('icloud-session');
(async () => {


  // const session = new ICloudSession();
  await ICloudSession.login(username, password, asp);
})() */