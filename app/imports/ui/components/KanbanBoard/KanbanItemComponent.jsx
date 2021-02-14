import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class KanbanItemComponent extends React.Component {
  render() {
    return (
        <Card style={{ width: '100%' }}>
          <Card.Content header={this.props.hobbyItem.name} />
          <Card.Content description={this.props.hobbyItem.description} />
        </Card>
    );
  }
}
KanbanItemComponent.propTypes = {
  hobbyItem: PropTypes.object.isRequired,
};

export default KanbanItemComponent;
