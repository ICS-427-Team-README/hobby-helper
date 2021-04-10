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
                  {this.props.currentUser === '' ? (<Button floated ='right'><Icon name='lock'/></Button>) : (
                      <Button as={NavLink} exact to={`/EditProfile/${this.props.currentId}`} floated='right'>
                        <Icon name='left chevron'/>Edit Profile
                      </Button>
                  )}
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
  const userName = userAccount ? userAccount.username : '';
  const subscription = Meteor.subscribe('User');
  return {
    userInfo: User.findOne({ user: userName }) ? User.findOne({ user: userName }) : {},
    ready: subscription.ready(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentId: match.params._id,
  };
})(Profile);

    /**
        <Grid>
            <Grid.Column width={6}>
                <Image src='https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80'
     size='medium' circular />
                <Header as='h1'>Kelsen Reeves</Header>
                <p>Aloha! I'm Kelsen and I enjoy various technical hobbies when I'm not working.</p>
                <Button.Group>
                    <Button>Public Profile</Button>
                    <Button>Private Profile</Button>
                </Button.Group>
            </Grid.Column>
            <Grid.Column width={3}>

                <Header as='h1'>Top 3 Hobbies</Header>
                <List ordered>
                    <List.Item as='a'>HAM Radio</List.Item>
                    <List.Item as='a'>Japanese Sports Cars</List.Item>
                    <List.Item as='a'>Cooking</List.Item>
                </List>

            </Grid.Column>
            <Grid.Column width={3}>
                <Header as='h1'>Most Recent Hobbies</Header>
                <List ordered>
                    <List.Item as='a'>Crossfit</List.Item>
                    <List.Item as='a'>HAM Radio</List.Item>
                    <List.Item as='a'>Reading</List.Item>
                </List>
            </Grid.Column>
        </Grid>
        // <Segment placeholder>
        // <Grid columns={2} relaxed='very' stackable>
        //     <Grid.Column>
        //         <Image src='https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80'
     size='medium' circular />
        //         <Header as='h1'>First Header</Header>
        //         <p>testing 3</p>
        //     </Grid.Column>
        //
        //     <Grid.Column>
        //         <p>testing right</p>
        //     </Grid.Column>
        // </Grid>
        //     <Divider vertical></Divider>
        // </Segment>
    );
  }
}
*/
