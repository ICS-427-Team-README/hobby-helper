import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class KanbanItemComponent extends React.Component {
  render() {
    return (
        <Card style={{ width: '100%' }}>
          <Card.Content header={this.props.hobbyItem.name} />
          <Card.Content description={this.props.hobbyItem.description} />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button basic icon style={{ margin: 5 }}>
              <Icon name='edit' />
            </Button>
            <Button basic icon style={{ margin: 5 }}>
              <Icon name='trash alternate'/>
            </Button>
          </div>
        </Card>
    );
  }
}
KanbanItemComponent.propTypes = {
  hobbyItem: PropTypes.object.isRequired,
};

export default KanbanItemComponent;
