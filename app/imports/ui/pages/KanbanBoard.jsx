import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Container, Button } from 'semantic-ui-react';
import KanbanBoardComponent from '../components/KanbanBoard/KanbanBoardComponent';
import { HobbyItems } from '../../api/HobbyItems/HobbyItems';

/** A simple static component to render some text for the landing page. */
class KanbanBoard extends React.Component {
  render() {
    const hobbyItems = this.props.hobbyItems.filter(item => item);
    console.log(hobbyItems);
    return (
        <Container id='kanban-page' style={{ display: 'flex', flexDirection: 'column', height: 800 }}>
          <Container textAlign='left' style={{ padding: 10, alignItems: 'flex-start' }}>
            <Container style={{ display: 'flex' }}>
              <p style={{ fontSize: 35, margin: 5 }}>TV Shows</p>
              <Button labelPosition='left' icon='left chevron' content='Back' color='green' style={{ height: '50%', alignSelf: 'center', marginLeft: 25 }}/>
            </Container>
            <p style={{ fontSize: 18, margin: 5, marginLeft: 10 }}>View Statistics</p>
          </Container>
          <Container style={{ display: 'flex', flexDirection: 'row', padding: 20, height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 3, padding: 10, height: '100%' }}>
              <KanbanBoardComponent boardTitle={'Backlog'} hobbyItemArray={hobbyItems}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 3, padding: 10, height: '100%' }}>
              <KanbanBoardComponent boardTitle={'Current'} hobbyItemArray={hobbyItems}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 3, padding: 10, height: '100%' }}>
              <KanbanBoardComponent boardTitle={'Completed'} hobbyItemArray={hobbyItems}/>
            </div>

          </Container>

        </Container>
    );
  }
}

KanbanBoard.propTypes = {
  hobbyItems: PropTypes.array.isRequired,
};

export default withTracker(() => {
  // Get access to HobbyItem documents.
  const subscription = Meteor.subscribe(HobbyItems.userPublicationName);
  return {
    hobbyItems: HobbyItems.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(KanbanBoard);
