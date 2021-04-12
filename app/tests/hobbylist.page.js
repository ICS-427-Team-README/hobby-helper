import { Selector } from 'testcafe';

class HobbyListPage {
  constructor() {
    this.pageId = '#hobbylist';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async listPage(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.click('#addNewHobby');
    await testController.typeText('#signin-form-email', username);


  }


}

export const hobbyList = new HobbyListPage();
