import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Container style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Container style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <p style={{ display: 'flex', flex: 3, backgroundColor: '#87EDBF', fontSize: 52, fontWeight: 600, marginTop: 30, marginLeft: 100, padding: 15 }}>Track Hobbies In One Place</p>
              <Container style={{ display: 'flex', flex: 6 }}/>
            </Container>
          <Container style={{ width: '100%', height: '100%', backgroundColor: '#87EDBF' }}>
            <Grid divided='vertically' style={{ display: 'flex' }}>
              <Grid.Row columns={3} style={{ padding: 50 }}>
                <Grid.Column style={{ padding: 45 }}>
                  <h2>Simple And Easy Kanban Board UI</h2>
                  <div style={{ border: 'solid' }}/>
                  <p style={{ marginTop: 10 }}>Use 3 different columns to filter items according to their current status. When an items' status changes, simply move them to the corresponding column.</p>
                </Grid.Column>
                <Grid.Column style={{ padding: 45 }}>
                  <h2>Switch Between Multiple Hobbies</h2>
                  <div style={{ border: 'solid' }}/>
                  <p style={{ marginTop: 10 }}>Create a list of different hobbies such as TV shows, books, movies, and more. Each hobby has their own boards you can easily switch to and from.</p>
                </Grid.Column>
                <Grid.Column style={{ padding: 45 }}>
                  <h2>View Statistics of Your Hobbies</h2>
                  <div style={{ border: 'solid' }}/>
                  <p style={{ marginTop: 10 }}>See data regarding hobbies such as level of activity for each hobby and time spent in each column for individual items.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>

        </Container>
  );
  }
}

export default Landing;
