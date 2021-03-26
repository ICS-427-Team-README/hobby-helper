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
        </Grid>
    );
  }
}

export default Landing;
