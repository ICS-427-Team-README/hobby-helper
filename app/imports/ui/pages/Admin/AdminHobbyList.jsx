import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserHobbies } from '../../../api/user/UserHobbies';
import AdminHobbyListItem from '../../components/Admin/AdminHobbyListItem';

class AdminHobbyList extends React.Component {

  /** Render the page once subscriptions have been received. */
  render() {
    const sort = this.props.hobbyItems.sort((a, b) => {
      const dateA = new Date(a.lastUpdated);
      const dateB = new Date(b.lastUpdated);
      return dateB - dateA;
    });
    return (
        <Container>
          <Header as="h2" textAlign="center">All User Hobbies</Header>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Hobby Name</Table.HeaderCell>
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Last Modified</Table.HeaderCell>
                <Table.HeaderCell>Remove</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sort.map((hobbyItem) => <AdminHobbyListItem key={hobbyItem._id} hobbyItem={hobbyItem} HobbyItems={UserHobbies}/>)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AdminHobbyList.propTypes = {
  hobbyItems: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(UserHobbies.adminPublicationName);
  return {
    hobbyItems: UserHobbies.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AdminHobbyList);
