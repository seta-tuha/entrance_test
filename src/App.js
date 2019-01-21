import React, { Component } from 'react';
import './App.css';
import {
  Login,
  Home,
  TopicsPage,
  QuestionPage,
  QuestionsPage
} from 'pages/admin';
import Layout from 'pages/admin/Layout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const User = () => {
  return (
    <div>User page</div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      currentUser: null,
    };
  }

  setCurrentUser = user => {
    this.setState = {
      currentUser: user,
      isSignedIn: false
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={User} />
          <Route exact path="/login" component={Login} />
          <Layout>
            <Route exact path="/admin" component={Home} />
            <Route exact path="/admin/topics" component={TopicsPage} />
            <Route exact path="/admin/topic/:topic" component={QuestionsPage} />
            <Route exact path="/admin/topic/:topic/questions"
              component={QuestionPage}
            />
            <Route exact path="/admin/:topic/question/:questionId"
              component={QuestionPage}
            />
          </Layout>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
