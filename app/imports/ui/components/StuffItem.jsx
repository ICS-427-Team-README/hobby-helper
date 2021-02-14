import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {
  removeItem(docID) {
    this.props.Stuffs.collection.remove(docID);
  }
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.name}</Table.Cell>
          <Table.Cell>{document.lastModified}</Table.Cell>
          <Table.Cell>
            <Link to={`/NotFound`}><Icon name='chart bar'/></Link>
          </Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.stuff._id}`}><Icon name='edit'/></Link>
          </Table.Cell>
          <Table.Cell>
            <Button icon onClick={() => this.removeItem(this.props.stuff._id)}>
              <Icon name='remove'/>
            </Button>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StuffItem.propTypes = {
  stuff: PropTypes.object.isRequired,
  Stuffs: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StuffItem);
