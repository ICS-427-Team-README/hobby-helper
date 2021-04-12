import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { HobbyItems } from '../../api/HobbyItems/HobbyItems';
import StatsItem from '../components/StatsItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Statistics extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;

  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Statistics</Header>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Hobby Name</Table.HeaderCell>
                <Table.HeaderCell>Hobby Category</Table.HeaderCell>
                <Table.HeaderCell>Rating: Click Star To Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.hobbyItems.map((stat) => <StatsItem key={stat._id} stat={stat} StatItems={HobbyItems}/>)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Statistics.propTypes = {
  hobbyItems: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const hobbyName = match.params.hobbyName;
  const subscription = Meteor.subscribe(HobbyItems.userPublicationName);
  return {
    hobby: hobbyName,
    hobbyItems: HobbyItems.collection.find({ hobby: hobbyName }).fetch(),
    ready: subscription.ready(),
  };
})(Statistics);
