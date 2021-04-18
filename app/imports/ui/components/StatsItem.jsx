import React from 'react';
import { Icon, Table, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StatsItem extends React.Component {

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stat.name}</Table.Cell>
          <Table.Cell>
            <Rating icon='star' defaultRating={this.props.stat.rating} maxRating={5} disabled/>
          </Table.Cell>
          <Table.Cell>
            {this.props.stat.review}
            <Link to={`/review/${this.props.stat._id}`}><Icon name='edit'/></Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StatsItem.propTypes = {
  stat: PropTypes.object.isRequired,
  StatItems: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StatsItem);
