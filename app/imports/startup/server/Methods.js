import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/* eslint-disable no-console */

Meteor.methods({
  'newPass'({ _id, newPassword }) {
    check(_id, String);
    check(newPassword, String);
    if (Meteor.isServer) {
      Accounts.setPassword(_id, newPassword);
    }
  },
});
