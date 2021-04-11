import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { UserHobbies } from '../../api/user/UserHobbies';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  hobbyName: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddHobby extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { hobbyName } = data;
    const owner = Meteor.user().username;
    const username = owner;
    const date = new Date();
    const lastUpdated = (date.getMonth() + 1) + '-' + date.getDate() + '-' + (date.getFullYear());
    UserHobbies.collection.insert({ username, hobbyName, lastUpdated },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Hobby added successfully', 'success');
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
            <Header as="h2" textAlign="center">Add Hobby</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
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

export default AddHobby;
