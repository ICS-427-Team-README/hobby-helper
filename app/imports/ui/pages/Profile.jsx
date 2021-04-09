import React from 'react';
import { Item, Container, Segment, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { UserCollection } from '/api/user/UserCollection';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
class Profile extends React.Component {
  render() {
    return (
        <Container>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image size='medium' src={this.props.User.image}
                    /* eslint-disable-next-line no-return-assign,no-param-reassign */
                            onError={(i) => i.target.src = '/images/default_image.png'}/>
                <Item.Content>
                </Item.Content>
                {this.props.currentUser === '' ? (<Button floate='right'><Icon name='lock'/></Button>) : (
                    <Button as={NavLink} exact to={`/editProfile/${this.props.currentId}`} floated='right'>
                      <Icon name='left chevron'/>Edit
                    </Button>
                )
                }
                <Item.Header as='a'>{this.props.User.firstName} {this.props.User.lastName}</Item.Header>
                <Item.Meta>{this.props.User.username}</Item.Meta>
                <Item.Meta>{this.props.User.number}</Item.Meta>
                <Item.Description>{this.props.User.description}</Item.Description>
              </Item>
            </Item.Group>
          </Segment>
        </Container>
    );
  }
}

Profile.propTypes = {
  User: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
  currentId: PropTypes.string,
};

export default withTracker(({ match }) => {
  const userAccount = Meteor.users.findOne(match.params._id);
  const username = userAccount ? userAccount.username : '';
  const subscription = Meteor.subscribe('UserCollection');
  return {
    User: UserCollection.findOne({ User: username }) ? UserCollection.findOne({ User: username }) : {},
    ready: subscription.ready(),
    currentUser: Meteor.user() ? Meteor.user().username : '',
    currentId: match.params._id,
  };
})(Profile);

/**
        <Grid>
            <Grid.Column width={6}>
 // eslint-disable-next-line max-len
 <Image src='https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' size='medium' circular />
                <Header as='h1'>Kelsen Reeves</Header>
                <p>Aloha! I'm Kelsen and I enjoy various technical hobbies when I'm not working.</p>
                <p>Edit Profile</p>
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
} */
