import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Test, Tests } from './tasks.js';

export const saveMessage = new ValidatedMethod({
  name: 'save.message',
  // validate({message}) {
  //     console.log("message", message);
  //     message.validate({stopOnFirstError: false});
  //   },
  validate: null,
  run({message}) {
    console.log(message);
     if (Meteor.isServer) {
    return message.save();
  }
  }
});

export const removeMessage = new ValidatedMethod({
  name: 'remove.message',
  validate: null,
  run({message}) {
    return message.remove();
  }
});
