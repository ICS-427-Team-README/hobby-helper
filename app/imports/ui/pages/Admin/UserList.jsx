import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { User } from '../../../api/user/UserCollection';
import UserItem from '../../components/Admin/UserItem';

class UserList extends React.Component {

  /** Render the page once subscriptions have been received. */
  render() {
    console.log(this.props.userItems);
    return (
        <Container>
          <Header as="h2" textAlign="center">List of Users</Header>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>Remove</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.userItems.map((userItem) => <UserItem key={userItem._id} hobbyItem={userItem} HobbyItems={User}/>)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserList.propTypes = {
  userItems: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(User.adminPublicationName);
  return {
    userItems: User.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserList);
