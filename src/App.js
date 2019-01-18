import React, { Component } from 'react';
import './App.css';
import {
  Login,
  Home,
  Topic,
  UpdateQuestion,
  TopicQuestions,
  CreateQuestion,
} from './routes/admin';
import Layout from './routes/admin/layout';
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
            <Route exact path="/admin/topics" component={Topic} />
            <Route exact path="/admin/topic/:topic" component={TopicQuestions} />
            <Route exact path="/admin/topic/:topic/questions" component={CreateQuestion} />
            {/* <Route exact path="/admin/questions" component={CreateQuestion} /> */}
            <Route exact path="/admin/:topic/question/:id" component={UpdateQuestion} />
          </Layout>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
