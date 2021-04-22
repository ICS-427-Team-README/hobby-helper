import React from 'react';
import { Loader, Grid, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { TextField, LongTextField, SubmitField, ErrorsField } from 'uniforms-semantic';
import { User } from '../../api/user/UserCollection';

class EditProfile extends React.Component {
    submit(data) {
        const { firstName, lastName, description, image, securityQuestion, securityAnswer } = data;
        const owner = Meteor.user().username;
        const username = owner;
        User.collection.insert({ username, firstName, lastName, description, image, securityQuestion, securityAnswer },
            (error) => {
                if (error) {
                    swal('Error', error.message, 'error');
                } else {
                    swal('Success', 'Profile Updated Successfully', 'success');
                }
            });
    }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data, please standby...</Loader>;
  }

  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlilgn="center" inverted>Edit Profile</Header>
            <Segment>
              <TextField name='username'/>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <TextField name='image'/>
              <TextField name='email'/>
              <LongTextField name='description'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </Grid.Column>
        </Grid>
    );
  }
}

EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const userAccount = Meteor.users.findOne(match.params._id);
  const userName = userAccount ? userAccount.username : '';
  const subscription = Meteor.subscribe('UserInfo');
  return {
    doc: User.findOne({ user: userName }) ? User.findOne({ user: userName }) : {},
    ready: subscription.ready(),
  };
})(EditProfile);
