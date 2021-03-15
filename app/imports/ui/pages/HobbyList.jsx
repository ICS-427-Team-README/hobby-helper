import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserHobbies } from '../../api/user/UserHobbies';
import HobbyItem from '../components/HobbyItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class HobbyList extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Hobbies</Header>
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
              {this.props.hobbyItems.map((hobbyItem) => <HobbyItem key={hobbyItem._id} hobbyItem={hobbyItem} HobbyItems={UserHobbies}/>)}
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
