import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';
import KanbanBoardComponent from '../components/KanbanBoard/KanbanBoardComponent';
import { HobbyItems } from '../../api/HobbyItems/HobbyItems';

/** A simple static component to render some text for the landing page. */
class KanbanBoard extends React.Component {

  render() {
    const hobbyItems = this.props.hobbyItems.filter(item => item);

    return (
        <Container id='kanban-page' style={{ display: 'flex', flexDirection: 'column', height: 800 }}>
          <Container textAlign='left' style={{ padding: 10, alignItems: 'flex-start' }}>
            <Container style={{ display: 'flex' }}>
              <p style={{ fontSize: 35, margin: 5 }}>{this.props.hobby}</p>
              <Button basic labelPosition='left' icon='left chevron' content='Back' color='blue' style={{ height: '50%', alignSelf: 'center', marginLeft: 25 }}
                      as={NavLink} activeClassName="active" exact to="/list" key='list'/>
            </Container>
            <Container style={{ display: 'flex', justifyContent: 'space-between', padding: 10 }}>
              <p style={{ fontSize: 18, margin: 5, marginLeft: 10 }}>View Statistics</p>
              <Button basic labelPosition='right' icon='add' content='Add Item' color='green'
                      style={{ height: '50%', alignSelf: 'right', marginLeft: 25 }}
                      as={NavLink} activeClassName="active" exact to="/kanbanAdd" key='kanbanAdd' />
            </Container>
          </Container>
          <Container style={{ display: 'flex', flexDirection: 'row', padding: 10, height: '100%' }}>
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
  hobby: PropTypes.string.isRequired,
  hobbyItems: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const KanbanBoardContainer = withTracker(({ match }) => {
  // Get access to HobbyItem documents.
  const hobbyName = match.params.hobbyName;
  const subscription = Meteor.subscribe(HobbyItems.userPublicationName);
  return {
    hobby: hobbyName,
    hobbyItems: HobbyItems.collection.find({ hobby: hobbyName }).fetch(),
    ready: subscription.ready(),
  };
})(KanbanBoard);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(KanbanBoardContainer);
