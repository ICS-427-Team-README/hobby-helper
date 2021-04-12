import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class HobbyItemsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'HobbyItemsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      owner: String,
      hobby: String,
      name: String,
      status: {
        type: String,
        allowedValues: ['Backlog', 'Current', 'Completed'],
        defaultValue: 'Current',
      },
      rating: {
        type: String,
        allowedValues: ['Unrated', '1', '2', '3', '4', '5'],
        defaultValue: 'Unrated',
      },
      description: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const HobbyItems = new HobbyItemsCollection();
