import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */

const Profiles = new Mongo.Collection('Profiles');

const profileSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  email: String,
  image: String,
  description: String,
  privacy: Boolean,
}, { tracker: Tracker });

Profiles.attachSchema(profileSchema);

export { Profiles, profileSchema };
