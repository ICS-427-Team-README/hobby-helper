import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import PropTypes from 'prop-types';
import _ from 'lodash';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { UserHobbies } from '../../../api/user/UserHobbies';
import { HobbyItems } from '../../../api/HobbyItems/HobbyItems';

/** Renders the Page for adding a document. */
class KanbanItemAdd extends React.Component {

  /** Create a schema to specify the structure of the data to appear in the form. */
  buildSchema() {
    const hobbyItems = _.map(this.props.hobbyItems, (item) => item.hobbyName);
    const formSchema = new SimpleSchema({
      hobby: {
        type: String,
        allowedValues: hobbyItems,
      },
      name: String,
      status: {
        type: String,
        allowedValues: ['Backlog', 'Current', 'Completed'],
        defaultValue: 'Current',
      },
      description: String,
    });
    return new SimpleSchema2Bridge(formSchema);
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { hobby, name, status, description } = data;
    const owner = Meteor.user().username;
    HobbyItems.collection.insert({ owner, hobby, name, status, description },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const bridge = this.buildSchema();
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Item</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <SelectField name='hobby'/>
                <TextField name='name'/>
                <TextField name='description'/>
                <SelectField name='status'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
KanbanItemAdd.propTypes = {
  hobbyItems: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(UserHobbies.userPublicationName);
  return {
    hobbyItems: UserHobbies.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(KanbanItemAdd);
