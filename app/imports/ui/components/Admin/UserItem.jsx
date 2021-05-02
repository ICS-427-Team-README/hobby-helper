import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserItem extends React.Component {
  removeItem(docID) {
    swal({
      title: 'Are you sure you want to remove this hobby?',
      text: 'Once deleted, you will not be able to recover the hobby',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            this.props.HobbyItems.collection.remove(docID);
            swal('Delete successful', {
              icon: 'success',
            });
          } else {
            swal('Delete cancelled');
          }
        });
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>
            {this.props.hobbyItem.username}
          </Table.Cell>
          <Table.Cell>{this.props.hobbyItem.firstName}</Table.Cell>
          <Table.Cell>{this.props.hobbyItem.lastName}</Table.Cell>
          <Table.Cell>
            <Button icon onClick={() => this.removeItem(this.props.hobbyItem._id)}>
              <Icon name='remove'/>
            </Button>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
UserItem.propTypes = {
  hobbyItem: PropTypes.object.isRequired,
  HobbyItems: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserItem);
