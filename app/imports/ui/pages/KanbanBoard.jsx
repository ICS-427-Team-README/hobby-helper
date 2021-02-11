import React from 'react';
import { Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class KanbanBoard extends React.Component {
  render() {
    return (
        <Container id='kanban-page' style={{ display: 'flex', flexDirection: 'column', height: 1000 }}>
          <Container textAlign='left' style={{ padding: 10, alignItems: 'flex-start' }}>
            <p style={{ fontSize: 35, margin: 5 }}>TV Shows</p>
            <p style={{ fontSize: 18, margin: 5, marginLeft: 10 }}>View Statistics</p>
          </Container>
          <Container style={{ display: 'flex', flex: 9, flexDirection: 'row', padding: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 3, padding: 10, height: '100%' }}>
              <div>
                <p>Backlog</p>
              </div>
              <div style={{ backgroundColor: '#F5F5F5', height: '100%', borderRadius: 15, padding: 10, boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.25)' }}>
                <p>hi</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 3, padding: 10, height: '100%' }}>
              <div>
                <p>Current</p>
              </div>
              <div style={{ backgroundColor: '#F5F5F5', height: '100%', borderRadius: 15, padding: 10, boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.25)' }}>
                <p>hi</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 3, padding: 10, height: '100%' }}>
              <div>
                <p>Completed</p>
              </div>
              <div style={{ backgroundColor: '#F5F5F5', height: '100%', borderRadius: 15, padding: 10, boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.25)' }}>
                <p>hi</p>
              </div>
            </div>

          </Container>

        </Container>
    );
  }
}

export default KanbanBoard;
