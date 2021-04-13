import React from 'react';
import { Loader, Container, Segment, Item, Button, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { User } from '../../api/user/UserCollection';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
class Profile extends React.Component {
  render() {

    return (this.props.ready) ? this.renderPage() : <Loader active> Getting data, please hold on... </Loader>;
  }

  renderPage() {
    return (
        <Container>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image size='medium' src={this.props.userInfo.image}
                    // eslint-disable-next-line
                            onError={(i) => i.target.src = '/images/default_image.png'}/>
                <Item.Content>
                  {this.props.currentUser === '' ? (<Button floated='right'><Icon name='lock'/></Button>) : (
                      <Button as={NavLink} exact to={`/EditProfile/${this.props.currentId}`} floated='right'>
                        <Icon name='left chevron'/>Edit Profile
                      </Button>
                  )}
                  <Item.Header as='a'>{this.props.userInfo.firstName} {this.props.userInfo.lastName}</Item.Header>
                  <Item.Meta>{this.props.userInfo.username}</Item.Meta>
                  <Item.Meta>{this.props.userInfo.number}</Item.Meta>
                  <Item.Description>
                    <Item.Meta>{this.props.userInfo.description}</Item.Meta>
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Container>
    );
  }
}

Profile.propTypes = {
  userInfo: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
  currentId: PropTypes.string,
};

export default withTracker(({ match }) => {
  const userAccount = Meteor.users.findOne(match.params._id);
  const username = userAccount ? userAccount.username : '';
  const subscription = Meteor.subscribe(User.userPublicationName);
  return {
    userInfo: User.collection.findOne({ user: username }) ? User.collection.findOne({ user: username }) : {},
    ready: subscription.ready(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentId: match.params._id,
  };
})(Profile);
