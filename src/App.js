import React, { Component } from 'react';
import Layout from './routes/admin/layout';
import {
  Login,
  Home,
  Topic,
  TopicQuestions,
  Question,
  CreateQuestion,
} from './routes/admin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MyEditor from './MyEditor';
import './App.css';

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
      authenticated: true
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={User} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/editor" component={MyEditor} />
          <Layout>
            <Route exact path="/admin" component={Home} />
            <Route exact path="/admin/topics" component={Topic} />
            <Route exact path="/admin/topic/:id" component={TopicQuestions} />
            <Route exact path="/admin/topic/:id/questions" component={CreateQuestion} />
            {/* <Route exact path="/admin/questions" component={CreateQuestion} /> */}
            <Route exact path="/admin/question/:id" component={Question} />
          </Layout>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
