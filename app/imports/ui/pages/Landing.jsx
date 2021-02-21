import React from 'react';
import { Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid id='landing-page' textAlign='left' container>

          <Grid.Column textAlign='left' width={8}>
            <h1>Track Hobbies in One Place</h1>
            {/* eslint-disable-next-line max-len */}
            <h3>Welcome to the Hobby Helper! Here, you can add add and keep track of current hobbies and interests. The Hobby Helper will also recommend shows, movies, items, etc. based on your current interests!</h3>
            <h1> </h1>
            <h1> </h1>
          </Grid.Column>

          <footer>
            <Grid divided='vertically'>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <h2>Simple And Easy Kanban Board UI</h2>
                  < hr/>
                  <p>Use 3 different columns to filter items according to their current status. When an items' status changes, simply move them to the corresponding column.</p>
                </Grid.Column>
                <Grid.Column>
                  <h2>Switch Between Multiple Hobbies</h2>
                  < hr/>
                  <p>Create a list of different hobbies such as TV shows, books, movies, and more. Each hobby has their own boards you can easily switch to and from.</p>
                </Grid.Column>
                <Grid.Column>
                  <h2>View Statistics of Hobbies</h2>
                  < hr/>
                  <p>See data regarding hobbies such as level of activity for each hobby and time spent in each column for individual items.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </footer>
        </Grid>
    );
  }
}

export default Landing;
