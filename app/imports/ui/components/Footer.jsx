import React from 'react';
import { Grid } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    const footerStyle = { background: '#6FD68B' };
    return (
        <footer style={footerStyle}>
          <Grid divided='vertically' container>
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
          <div style={divStyle} className="ui center aligned container">
            <hr />
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
            <a href="http://ics-software-engineering.github.io/meteor-application-template-react">Template Home Page</a>
          </div>
        </footer>
    );
  }
}

export default Footer;
