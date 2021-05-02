import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { HobbyItems } from '../../../api/HobbyItems/HobbyItems';
import AdminHobbyItem from '../../components/Admin/AdminHobbyItem';

class AdminHobbyItemList extends React.Component {

  /** Render the page once subscriptions have been received. */
  render() {
    return (
        <Container>
          <Header as="h2" textAlign="center">All Hobby Items</Header>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Hobby Category</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Rating</Table.HeaderCell>
                <Table.HeaderCell>Remove</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.hobbyItems.map((hobbyItem) => <AdminHobbyItem key={hobbyItem._id} hobbyItem={hobbyItem} HobbyItems={HobbyItems}/>)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AdminHobbyItemList.propTypes = {
  hobbyItems: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(HobbyItems.adminPublicationName);
  return {
    hobbyItems: HobbyItems.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AdminHobbyItemList);
