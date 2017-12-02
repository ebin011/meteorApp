import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Accounts } from 'meteor/accounts-base';
import Routes from '../imports/startup/client/Routes.jsx'

Meteor.startup(() => {
  Accounts.config({
      loginExpirationInDays: 0.32
  });
  render(<Routes />, document.getElementById('app'));
});
