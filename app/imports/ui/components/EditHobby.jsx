import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { UserHobbies } from '../../api/user/UserHobbies';

const bridge = new SimpleSchema2Bridge(UserHobbies.schema);

/** Renders the Page for editing a single document. */
class EditHobby extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { _id, hobbyName } = data;
    const date = new Date();
    const lastUpdated = (date.getMonth() + 1) + '-' + date.getDate() + '-' + (date.getFullYear());
    UserHobbies.collection.update(_id, { $set: { hobbyName, lastUpdated } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Hobby updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Hobby</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='hobbyName' label='Hobby Name'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditHobby.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(UserHobbies.userPublicationName);
  return {
    doc: UserHobbies.collection.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditHobby);
