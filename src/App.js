import React from 'react';
import './App.css';
import {
  Home as AdminHome,
  Login,
  Layout,
  TopicsPage,
  QuestionsPage,
  CreateQuestionPage,
  UpdateQuestionPage
} from 'pages/admin';
import Hr from 'pages/hr';
import Candidate from 'pages/candidate';
import { PageNotFound, Public } from 'pages/common';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Public} />
        <Route exact path="/hr" component={Hr} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/exam/:examKey" component={Candidate} />
        <Layout exact path="/admin" component={AdminHome} />
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
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
