import React from 'react';
import { Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class About extends React.Component {
  render() {
    return (
        <Container style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Container style={{ display: 'flex', flex: 7, width: '90%', margin: 15, padding: 15, backgroundColor: '#F9F9F9', boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.1)', borderRadius: 7, flexDirection: 'column' }}>
            <h2>About Hobby Helper</h2>
            <p>Hobby Helper was created by a group of UH Manoa students for their ICS 427 class project. It is an online web application that allows the user to create Kanban Boards that provides a simple and easy way to track the user's hobbies.</p>
            <h3>Hobby Helper Pages</h3>
            <p>The Hobby List page can be used to view the user's differenet hobbies or add a new one. From the Hobby List page, the user can access each individual hobby's Kanban Board. The Kanban Board features three columns: "Backlog", "Current", and "Complete". Users can add items to their Kanban Board and move them to the different columns as the item's status changes. From the Hobby List page the user can also access statistics regarding their hobbies. This includes a rating and review system for each item. The user also is able to create and access their own profile.</p>
          </Container>
          <Container style={{ display: 'flex', flex: 2, width: '100%' }}>
            <div style={{ padding: '15px', width: '100%' }} className="ui center aligned container">
              This web application uses the meteor application template react by UH Manoa's <br />
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
              <a href="http://ics-software-engineering.github.io/meteor-application-template-react">Template Home Page</a>
            </div>
          </Container>
        </Container>
    );
  }
}

export default About;
