import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/* eslint-disable no-console */

Meteor.methods({
  'newPass'({ _id, newPassword }) {
    // eslint-disable-next-line
    check(_id, String);
    // eslint-disable-next-line
    check(newPassword, String);
    if (Meteor.isServer) {
      Accounts.setPassword(_id, newPassword);
    }
  },
});
