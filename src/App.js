import React from 'react';
import './App.css';
import {
  Home,
  Login,
  Layout,
  TopicsPage,
  QuestionsPage,
  CreateQuestionPage,
  UpdateQuestionPage
} from 'pages/admin';
import Hr from 'pages/hr';
import Candidate from 'pages/candidate';
import NotFound from 'pages/notFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/hr" component={Hr} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/exam/:examKey" component={Candidate} />
        <Layout exact path="/admin" component={Home} />
        <Layout exact path="/admin/topics" component={TopicsPage} />
        <Layout exact path="/admin/topic/:topic" component={QuestionsPage} />
        <Layout
          exact path="/admin/topic/:topic/questions"
          component={CreateQuestionPage}
        />
        <Layout
          exact path="/admin/:topic/question/:questionId"
          component={UpdateQuestionPage}
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
