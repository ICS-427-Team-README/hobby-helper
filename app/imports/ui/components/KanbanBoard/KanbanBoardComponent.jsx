import React from 'react';
import PropTypes from 'prop-types';
import KanbanItemComponent from '../../components/KanbanBoard/KanbanItemComponent';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class KanbanBoardComponent extends React.Component {
  render() {
    let status = 0;
    switch (this.props.boardTitle) {
      case 'Backlog':
        status = 1;
        break;
      case 'Current':
        status = 2;
        break;
      case 'Completed':
        status = 3;
        break;
      default:
        break;
    }
    const filteredHobbyItems = this.props.hobbyItemArray.filter(item => item.status === status);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: 10, height: '100%', width: '100%' }}>
          <div>
            <p style={{ margin: 5, fontWeight: 'bold', fontSize: 23 }}>{this.props.boardTitle}</p>
          </div>
          <div style={{ backgroundColor: '#F5F5F5', height: '100%', borderRadius: 15,
            padding: 15, boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.25)', justifyContent: 'center' }}>
            {filteredHobbyItems.map((item) => <KanbanItemComponent key={item._id} hobbyItem={item} />)}
          </div>
        </div>
    );
  }
}
KanbanBoardComponent.propTypes = {
  boardTitle: PropTypes.string.isRequired,
  hobbyItemArray: PropTypes.array.isRequired,
};

export default KanbanBoardComponent;
