import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Landing from '../pages/Landing';
import AdminHobbyList from '../pages/Admin/AdminHobbyList';
import AdminHobbyItemList from '../pages/Admin/AdminHobbyItemList';
import UserList from '../pages/Admin/UserList';
import HobbyList from '../pages/HobbyList';
import AddHobby from '../components/AddHobby';
import EditHobby from '../components/EditHobby';
import NotFound from '../pages/NotFound';
import AddProfile from '../pages/AddProfile';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import KanbanBoard from '../pages/KanbanBoard';
import KanbanItemAdd from '../components/KanbanBoard/KanbanItemAdd';
import KanbanItemEdit from '../components/KanbanBoard/KanbanItemEdit';
import Profile from '../pages/Profile';
import Statistics from '../pages/Statistics';
import EditRating from '../components/EditRating';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
              <div style={{ height: '100%', minHeight: '100%' }}>
                <Switch>
                  <Route exact path="/" component={Landing}/>
                  <Route path="/signin" component={Signin}/>
                  <Route path="/signup" component={Signup}/>
                  <Route path="/signout" component={Signout}/>
                  <Route path="/profile" component={Profile}/>
                  <ProtectedRoute path="/list" component={HobbyList}/>
                  <ProtectedRoute path="/add" component={AddHobby}/>
                  <ProtectedRoute path="/addProfile" component={AddProfile}/>
                  <ProtectedRoute path="/edit/:_id" component={EditHobby}/>
                  <ProtectedRoute path="/kanban/:hobbyName" component={KanbanBoard}/>
                  <ProtectedRoute path="/kanbanAdd" component={KanbanItemAdd}/>
                  <ProtectedRoute path="/kanbanEdit/:_id" component={KanbanItemEdit}/>
                  <ProtectedRoute path="/stats/:hobbyName" component={Statistics}/>
                  <ProtectedRoute path="/rating/:_id" component={EditRating}/>
                  <AdminProtectedRoute path="/adminHobbyList" component={AdminHobbyList}/>
                  <AdminProtectedRoute path="/adminHobbyItemList" component={AdminHobbyItemList}/>
                  <AdminProtectedRoute path="/userList" component={UserList}/>
                  <Route component={NotFound}/>
                </Switch>
              </div>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
