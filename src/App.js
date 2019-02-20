import React from 'react';
import './App.css';
import {
  Home as AdminHome,
  Login,
  withDefaultLayout,
  TopicsPage,
  QuestionsPage,
  CreateQuestionPage,
  UpdateQuestionPage
} from 'pages/admin';
import Hr from 'pages/hr';
import Candidate from 'pages/candidate';
import { PageNotFound, Public } from 'pages/common';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getRole } from 'services/authenticate/firebase';
import Firebase from 'services/firebase';
import { UserProvider } from 'context';
import { Loading } from 'components/Common';
import {
  hrAuthorization, adminAuthorization, withAuthentication, withLoggedIn
} from 'pages/routes-config';
import 'react-notifications/lib/notifications.css';

class App extends React.Component {
  state = {
    user: null,
    isLoading: true
  }

  componentDidMount() {
    this.unsubscribe = Firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        const { email, uid } = user;
        getRole(uid, role => this.setState({
          user: { email, uid, role },
          isLoading: false
        }));
      } else {
        this.setState({ user: null, isLoading: false });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { user, isLoading } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <UserProvider value={{ user }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Public} />
            <Route exact path="/hr" component={withAuthentication(hrAuthorization(Hr))} />
            <Route exact path="/login" component={withLoggedIn(Login)} />
            <Route exact path="/exam/:examKey" component={Candidate} />
            <Route exact path="/admin" component={withAuthentication(adminAuthorization(withDefaultLayout(AdminHome)))} />
            <Route exact path="/admin/topics" component={withAuthentication(adminAuthorization(withDefaultLayout(TopicsPage)))} />
            <Route exact path="/admin/topic/:topic" component={withAuthentication(adminAuthorization(withDefaultLayout(QuestionsPage)))} />
            <Route
              exact path="/admin/topic/:topic/questions"
              component={withAuthentication(adminAuthorization(withDefaultLayout(CreateQuestionPage)))}
            />
            <Route
              exact path="/admin/:topic/question/:questionId"
              component={withAuthentication(adminAuthorization(withDefaultLayout(UpdateQuestionPage)))}
            />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    );
  }
}

export default App;

// ToDo refactor this code: withAuthentication(adminAuthorization(withDefaultLayout(Component)))
