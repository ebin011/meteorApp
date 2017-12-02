import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Class } from 'meteor/jagi:astronomy';
import moment from 'moment';

export const Tasks = new Mongo.Collection('tasks')
export const Task = Class.create({
  name: 'Task',
  collection: Tasks,
  fields: {
    owner: String,
    message: String,
    postTime: Date,

  },
  helpers: {
    init() {
     const d = new moment();
      this.owner = "testUser";
      this.postTime = d.startOf('day').toDate();

    }
  },
});

// Deny all client-side updates since we will be using methods to manage this collection
Tasks.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
