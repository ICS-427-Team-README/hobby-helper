import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Container, Grid, Loader, Header, Segment } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { User } from '../../api/user/UserCollection';

const formSchema = new SimpleSchema({
  username: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const formSchema2 = new SimpleSchema({
  answer: String,
});

const bridge2 = new SimpleSchema2Bridge(formSchema2);

const formSchema3 = new SimpleSchema({
  password: String,
});

const bridge3 = new SimpleSchema2Bridge(formSchema3);

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
class Security extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reveal: 0,
      correct: 0,
      username: '',
      securityQuestion: '',
      securityAnswer: '',
    };

    this.revealFunction = this.revealFunction.bind(this);
  }

  revealFunction() {
    if (this.state.reveal === 1) {
      return <div style={{ marginTop: 20 }}>
          <h2>Here is your security question:</h2>
          <p>{this.state.securityQuestion}</p>
          <Grid container centered>
            <Grid.Column>
              <AutoForm schema={bridge2} onSubmit={data => this.answering(data)} >
                <Segment>
                  <TextField name='answer' label='Security Answer'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </div>;
    }
    return null;
  }

  reveal2() {
    if (this.state.correct === 1) {
      return <div style={{ marginTop: 20 }}>
        <h2>Choose a new password</h2>
        <Grid container centered>
          <Grid.Column>
            <AutoForm schema={bridge3} onSubmit={data => this.newpassword(data)} >
              <Segment>
                <TextField icon="lock" iconLeft type="password" name='password' label='New Password'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </div>;
    }
    return null;
  }

  submitted(data) {
    const { username } = data;
    const result = User.collection.find({ username: username }).fetch();
    if (result.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Sorry...',
        text: 'There is no account with that email',
      });
    } else {
      this.setState({ reveal: 1, correct: 0, username: username, securityQuestion: result[0].securityQuestion, securityAnswer: result[0].securityAnswer });
    }
  }

  answering(data) {
    const { answer } = data;
    if (answer === this.state.securityAnswer) {
      this.setState({ reveal: 1, correct: 1 });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Sorry...',
        text: 'That is not the correct answer',
      });
    }
  }

  newpassword(data) {
    const { password } = data;
    const account = this.props.accounts.filter((item) => item.username === this.state.username);
    Meteor.call('newPass', {
      _id: account[0]._id,
      newPassword: password,
    }, (err, res) => {
      if (err) {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Sorry...',
          text: 'Unable to change password',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Password changed!',
        });
      }
    });
  }

  render() {

    return (
        <Container style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Container style={{ display: 'flex', flex: 7, width: '90%', margin: 15, padding: 15, backgroundColor: '#F9F9F9',
            boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.1)', borderRadius: 7, flexDirection: 'column' }}>
            <h2>Forgot Your Password?</h2>
            <p>Please enter your email</p>
            <Grid container centered>
              <Grid.Column>
                <AutoForm schema={bridge} onSubmit={data => this.submitted(data)} >
                  <Segment>
                    <TextField name='username' label='Email'/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                  </Segment>
                </AutoForm>
              </Grid.Column>
            </Grid>
            {this.revealFunction()}
            {this.reveal2()}
          </Container>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Security.propTypes = {
  userItems: PropTypes.array.isRequired,
  accounts: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  ready2: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withRouter(withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(User.adminPublicationName);
  const subscription2 = Meteor.subscribe('userData');
  return {
    userItems: User.collection.find({}).fetch(),
    accounts: Meteor.users.find({}).fetch(),
    ready: subscription.ready(),
    ready2: subscription2.ready(),
  };
})(Security));
