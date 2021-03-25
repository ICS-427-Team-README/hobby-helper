import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link, withRouter } from 'react-router-dom';
import { HobbyItems } from '../../../api/HobbyItems/HobbyItems';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class KanbanItemComponent extends React.Component {
  removeItem(docID) {
    swal({
      title: 'Are you sure?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            this.props.HobbyItems.collection.remove(docID);
            swal('Successfully Deleted', {
              icon: 'success',
            });
          } else {
            swal('Delete Cancelled');
          }
        });
  }

  render() {
    /** On successful move, change the status to backlog. */
    function moveBacklog(docID) {
      const status = 'Backlog';
      console.log('1');
      HobbyItems.collection.update(docID, { $set: { status } }, (error) => swal('Error', error.message, 'error'));
    }

    /** On successful move, change the status to backlog. */
    function moveToCurrent(docID) {
      const status = 'Current';
      console.log('2');
      HobbyItems.collection.update(docID, { $set: { status } }, (error) => swal('Error', error.message, 'error'));
    }

    /** On successful move, change the status to backlog. */
    function moveCompleted(docID) {
      const status = 'Completed';
      console.log('3');
      HobbyItems.collection.update(docID, { $set: { status } }, (error) => swal('Error', error.message, 'error'));
    }

    function movingItem(item) {
      switch (item.status) {
        case 'Backlog':
          return <div>
            <Button basic icon style={{ margin: 5 }} onClick={() => moveToCurrent(item._id)}>
              <Icon name='angle right' />
            </Button>
          </div>;
        case 'Completed':
          return <div>
            <Button basic icon style={{ margin: 5 }} onClick={() => moveToCurrent(item._id)}>
              <Icon name='angle left' />
            </Button>
          </div>;
        default:
          return <div>
            <Button basic icon style={{ margin: 5 }} onClick={() => moveBacklog(item._id)}>
              <Icon name='angle left' />
            </Button>
            <Button basic icon style={{ margin: 5 }} onClick={() => moveCompleted(item._id)}>
              <Icon name='angle right' />
            </Button>
          </div>;
      }
    }
    return (
        <Card style={{ width: '100%' }}>
          <Card.Content header={this.props.hobbyItem.name} />
          <Card.Content description={this.props.hobbyItem.description} />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
              {movingItem(this.props.hobbyItem)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Link to={`/kanbanEdit/${this.props.hobbyItem._id}`}>
                <Button basic icon style={{ margin: 5 }}>
                  <Icon name='edit' />
                </Button>
              </Link>
              <Button basic icon style={{ margin: 5 }} onClick={() => this.removeItem(this.props.hobbyItem._id)}>
                <Icon name='trash alternate'/>
              </Button>
            </div>
          </div>
        </Card>
    );
  }
}
KanbanItemComponent.propTypes = {
  hobbyItem: PropTypes.object.isRequired,
  HobbyItems: PropTypes.object.isRequired,
};

export default withRouter(KanbanItemComponent);
