import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

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
    return (
        <Card style={{ width: '100%' }}>
          <Card.Content header={this.props.hobbyItem.name} />
          <Card.Content description={this.props.hobbyItem.description} />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button basic icon style={{ margin: 5 }}>
              <Icon name='edit' />
            </Button>
            <Button basic icon style={{ margin: 5 }} onClick={() => this.removeItem(this.props.hobbyItem._id)}>
              <Icon name='trash alternate'/>
            </Button>
          </div>
        </Card>
    );
  }
}
KanbanItemComponent.propTypes = {
  hobbyItem: PropTypes.object.isRequired,
  HobbyItems: PropTypes.object.isRequired,
};

export default KanbanItemComponent;
