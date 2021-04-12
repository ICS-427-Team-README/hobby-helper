import React from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import { Container, Table, Header, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserHobbies } from '../../api/user/UserHobbies';
import HobbyItem from '../components/HobbyItem';

class HobbyList extends React.Component {

  /** Render the page once subscriptions have been received. */
  render() {
    const sort = this.props.hobbyItems.sort((a, b) => {
      const dateA = new Date(a.lastUpdated);
      const dateB = new Date(b.lastUpdated);
      return dateB - dateA;
    });
    return (
        <Container>
          <Header as="h2" textAlign="center">List Hobbies</Header>
              <Button id='addNewHobby' basic labelPosition='right' icon='add' content='Add Hobby' color='green'
                      as={NavLink} activeClassName="active" exact to="/Add" style={{ float: 'right', margin: 10 }}/>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Hobby Name</Table.HeaderCell>
                <Table.HeaderCell>Last Modified</Table.HeaderCell>
                <Table.HeaderCell>View Statistics</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Remove</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sort.map((hobbyItem) => <HobbyItem key={hobbyItem._id} hobbyItem={hobbyItem} HobbyItems={UserHobbies}/>)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
HobbyList.propTypes = {
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
})(HobbyList);
