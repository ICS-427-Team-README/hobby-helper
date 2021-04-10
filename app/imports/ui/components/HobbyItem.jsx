import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class HobbyItem extends React.Component {
  removeItem(docID) {
    this.props.HobbyItems.collection.remove(docID);
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>
            <Link to={`/kanban/${this.props.hobbyItem.hobbyName}`}>{this.props.hobbyItem.hobbyName}</Link></Table.Cell>
          <Table.Cell>{this.props.hobbyItem.lastUpdated}</Table.Cell>
          <Table.Cell>
            <Link to={`/stats/${this.props.hobbyItem.hobbyName}`}><Icon name='chart bar'/></Link>
          </Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.hobbyItem._id}`}><Icon name='edit'/></Link>
          </Table.Cell>
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
HobbyItem.propTypes = {
  hobbyItem: PropTypes.object.isRequired,
  HobbyItems: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(HobbyItem);
