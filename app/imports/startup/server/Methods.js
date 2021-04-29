import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/* eslint-disable no-console */

Meteor.methods({
  'newPass'({ _id, newPassword }) {
    check(_id, String);
    check(newPassword, String);
    console.log('hi');
    if (Meteor.isServer) {
      Accounts.setPassword(_id, newPassword);
    }
  },
});
