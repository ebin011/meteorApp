import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

//import AppContainer from '../../ui/containers/AppContainer.jsx';
import App from '../../ui/pages/App.jsx';
import Task from '../../ui/pages/Task.jsx';


export default class Routes extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Task}/>


        </Route>
      </Router>
    );
  }
}
