import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Stuffs } from '../../api/stuff/Stuff.js';
import { UserHobbies } from '../../api/user/UserHobbies';
import { HobbyItems } from '../../api/HobbyItems/HobbyItems.js';
import { User } from '../../api/user/UserCollection';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

/** Initialize the database with a default data document. */
function addHobby(data) {
  console.log(`  Adding: ${data.hobbyName} (${data.username})`);
  UserHobbies.collection.insert(data);
}

/** Initialize the database with a default data document. */
function addHobbyItems(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  HobbyItems.collection.insert(data);
}

/** Initialize the database with a default data document. */
function addUser(data) {
  console.log(`  Adding: ${data.firstName} (${data.username})`);
  User.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default Stuffs data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the collection if empty. */
if (UserHobbies.collection.find().count() === 0) {
  if (Meteor.settings.defaultHobby) {
    console.log('Creating default UserHobbies.');
    Meteor.settings.defaultHobby.map(data => addHobby(data));
  }
}

/** Initialize the collection if empty. */
if (HobbyItems.collection.find().count() === 0) {
  if (Meteor.settings.defaultHobbyItems) {
    console.log('Creating default HobbyItems.');
    Meteor.settings.defaultHobbyItems.map(data => addHobbyItems(data));
  }
}

/** Initialize the collection if empty. */
if (User.collection.find().count() === 0) {
  if (Meteor.settings.defaultUser) {
    console.log('Creating default UserInfo.');
    Meteor.settings.defaultUser.map(data => addUser(data));
  }
}
