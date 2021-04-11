import React from 'react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import { Container, Table, Header, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserHobbies } from '../../api/user/UserHobbies';
import HobbyItem from '../components/HobbyItem';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class HobbyList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sort: this.props.hobbyItems,
    };
  }

  /** Render the page once subscriptions have been received. */
  render() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Hobbies</Header>
          <Container style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: 18, alignSelf: 'flex-start' }}>Sort Hobbies: </p>
            <Container style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Container>
                <Button basic style={{ margin: 5 }} onClick={() => this.setState({ sort: this.props.hobbyItems.sort((a, b) => {
                    const upperA = a.hobbyName.toUpperCase();
                    const upperB = b.hobbyName.toUpperCase();
                    if (upperA < upperB) {
                      return -1;
                    }
                    return 1;
                  }) })}>Name</Button>
                <Button basic style={{ margin: 5 }} onClick={() => this.setState({ sort: this.props.hobbyItems.sort((a, b) => {
                    const dateA = new Date(a.lastUpdated);
                    const dateB = new Date(b.lastUpdated);
                    return dateA - dateB;
                  }) })}>Last Modified</Button>
              </Container>
              <Button basic labelPosition='right' icon='add' content='Add Hobby' color='green'
                      style={{ alignSelf: 'flex-end' }}
                      as={NavLink} activeClassName="active" exact to="/Add" />
            </Container>
          </Container>
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
              {this.state.sort.map((hobbyItem) => <HobbyItem key={hobbyItem._id} hobbyItem={hobbyItem} HobbyItems={UserHobbies}/>)}
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
