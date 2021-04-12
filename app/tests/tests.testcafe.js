import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { signupPage } from './signup.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme', reenter: 'changeme', firstName: 'john', lastName: 'foo' };

fixture('meteor-application-template-react localhost test with default db')
    .page('http://localhost:3000');


test('Test that sign up works', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, credentials.username, credentials.password, credentials.reenter, credentials.firstName, credentials.lastName);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
