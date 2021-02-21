import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { HobbyItems } from '../../../api/HobbyItems/HobbyItems';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  hobby: String,
  name: String,
  status: {
    type: String,
    allowedValues: ['Backlog', 'Current', 'Completed'],
    defaultValue: 'Current',
  },
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class KanbanItemAdd extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { hobby, name, status, description } = data;
    let statusNumber = 0;
    switch (status) {
      case 'Backlog':
        statusNumber = 1;
        break;
      case 'Current':
        statusNumber = 2;
        break;
      case 'Completed':
        statusNumber = 3;
        break;
      default:
        break;
    }
    const owner = Meteor.user().username;
    HobbyItems.collection.insert({ owner, hobby, name, status: statusNumber, description },
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
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Item</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='hobby'/>
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

export default KanbanItemAdd;
