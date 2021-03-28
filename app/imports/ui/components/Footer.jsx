import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const color = { background: '#6FD68B'};
    const divStyle = { paddingTop: '15px', background: '#6FD68B' };
    return (
        <div style={color}>
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
            <a href="http://ics-software-engineering.github.io/meteor-application-template-react">Template Home Page</a>
          </div>
        </footer>
        </div>
    );
  }
}

export default Footer;
