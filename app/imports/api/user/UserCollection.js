import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */

const UserCollection = new Mongo.Collection('UserCollection');

const UserCollectionSchema = new SimpleSchema({
      username: String,
      firstName: String,
      lastName: String,
      email: String,
      image: String,
      description: String,
      privacy: Boolean,
    }, { tracker: Tracker });

UserCollection.attachSchema(UserCollectionSchema);

export { UserCollection, UserCollectionSchema };
