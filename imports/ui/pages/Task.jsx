import React from 'react';
import { Meteor } from 'meteor/meteor';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Send from 'material-ui/svg-icons/content/send';
import Close from 'material-ui/svg-icons/navigation/close';
import {createContainer} from 'meteor/react-meteor-data';
import { ValidationError } from 'meteor/jagi:astronomy';
import update from 'react-addons-update';


//import { withTracker } from 'meteor/react-meteor-data';
import { saveMessage, removeMessage } from '../../api/tasks/methods.js';
import { Tasks,Task } from '../../api/tasks/tasks.js';


// Task component - represents a single todo item
class TaskPage extends React.Component {
  constructor(props) {
   super(props);
   const minStartDate = new Date();
   this.state = {
     message: undefined,
     flag:false,
     disable:false,
     newTask:{},
     errors: {}
   };
   this.handleMessageChange = this.handleMessageChange.bind(this);
   this.handleMessagePost = this.handleMessagePost.bind(this);
   this.removeMessageFromDB = this.removeMessageFromDB.bind(this);
   this.saveMessage = this.saveMessage.bind(this);
 }
 componentWillMount() {
   this.setState({newTask: this.emptyTask()});
 }
 emptyTask() {
   const ib = new Task();
   ib.init();
   return ib;
 }
 handleMessageChange(event) {
 this.setState({message:event.target.value})

 this.handleChangeAndValidate("message", event.target.value);
  }

  handleChangeAndValidate(name, value) {
    if (typeof value == "string") {
      value = value.trim();
      if (value == "") {
        value = undefined;
      }
    }
    let ib = this.state.newTask;
    const options = {};
    ib[name] = value;
    options.stopOnFirstError = true;
    options.fields = [name];

    console.log("handleChangeAndValidate", name, value, ib);
    ib.validate(options, err => {
      //console.log("handleChangeAndValidate", err);
      if (ValidationError.is(err)) {
        const da = err.details;
        for (d in da) {
          if (da[d].name == name) {
            const errors = update(this.state.errors, {[name]: {$set: da[d].message}});
            this.setState({errors});
          }
        }
      } else {
        const errors = update(this.state.errors, {[name]: {$set: ""}});
        this.setState({errors});

      }
    });
  }

 removeMessageFromDB(event,data){
console.log(event,data);
removeMessage.call({message: data}, (err, res) => {
      if (err) {
        console.log("An error has occurred. Please try again.");
      } else {
        console.log("Removed successfully.");
      };
      setTimeout(() => {
        console.log("Time Out");
      }, 4000);
    });
 }
 handleMessagePost(event){
   this.setState({flag:true})
    {this.saveMessage()}
 }
 saveMessage(){
   const message = this.state.newTask;
   console.log(message);
  saveMessage.call({message}, (err, res) => {

        if (err) {
          console.log("Error ",err);

        } else {
         console.log("events saved successfully.");
        };
        setTimeout(() => {
          console.log("Time Out");
        }, 4000);
      });
 }
  render() {
 const {messages} = this.props;

   messages.map(message => (console.log(message)))
    return (
      <div>
      {this.state.flag?
      <Card>
      <h4 className="flex-80" >{this.state.message}</h4>
      <FloatingActionButton mini={true} className="flex-20">
          <Close />
     </FloatingActionButton>
      </Card>:null}
      {messages.length == 0?null:
        messages.map((message,index) => (
          <Card key={index}>
          <h4   style={{width:'90%'}} >{message}</h4>
          <FloatingActionButton mini={true}
                     onTouchTap={(event) => this.removeMessageFromDB(event, message)}>
                      <Close />
         </FloatingActionButton>
          </Card>
        ))
      }
      <Card>
      <TextField
            hintText="Type Your Message"
            floatingLabelText="Type Your Message"
            onChange={this.handleMessageChange}
            fullWidth={true}
            style={{width:'90%'}}
             />
    <FloatingActionButton  mini={true}   disabled={this.state.disable} onClick={this.handleMessagePost}>
      <Send />
    </FloatingActionButton>
    </Card>
      </div>
    );
  }
}

const TaskPageHoC = createContainer(({}) => {
  //HoC - Higher order Component for loading events matching the criteria

  let messages = [];
    const taskHandle = Meteor.subscribe('browse.messages');
    loading = !taskHandle.ready();

    if(taskHandle.ready()) {
      messages = Task.find({},{sort: {postTime: 1}}).fetch();
    }
    console.log("messages"+messages,loading);
  return {
    messages
  };
}, TaskPage);

export default class TaskPageContainer extends React.Component {
  //the container for the whole event manage page

  render() {
    let ev = true;
    // if (Meteor.user().username=='testName') {
    //
    //       ev = true;
    //
    // };
      // Meteor.user().username=='testName'?<h3>Not an Authorized user</h3>
    console.log("TaskPageContainer", Meteor.user(), ev);
    //const IntlPolyfill = require('intl');
    //DateTimeFormat = IntlPolyfill.DateTimeFormat;

    return (

       ev ?
         <div className="page task">

           <TaskPageHoC  />
         </div>

         : <h3>No Messages</h3>
    );
  }
}
