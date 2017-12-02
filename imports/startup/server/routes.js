import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import moment from 'moment';
import _ from 'lodash';
import React from 'react';
import {purple50, purple100, purple300, purple500, purple700, purple800, purpleA200, purpleA100,
   grey400, greenA200, greenA100, green500, green800, darkBlack, lightBlack, blue800, orange800,
   pink800, pinkA200, pinkA100} from 'material-ui/styles/colors';

Meteor.startup(() => {


  WebApp.connectHandlers.use("/hello", function(req, res, next) {
    res.writeHead(200);
    res.end("Hello world from: " + Meteor.release);
  });








  WebApp.connectHandlers.use("/users/login", function(req, res, next) {

  });
});
