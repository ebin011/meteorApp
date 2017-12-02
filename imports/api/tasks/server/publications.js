import { Meteor } from 'meteor/meteor';
import { Task, Tasks } from '../tasks.js';
import _ from 'lodash';


Meteor.publish('browse.messages', function allMessages() {
  console.log("got it");
  return Tasks.find({});
});
