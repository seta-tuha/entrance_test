import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { adminRoute, editorRoute } from 'hocs/withAuthorization';
import withAuthentication from 'hocs/withAuthentication';
import LoginPage from 'pages/Login';
import AdminPage from 'pages/AdminPage';
import CandidatePage from 'pages/CandidatePage';
import EditorPage from 'pages/EditorPage';

const Admin = adminRoute(AdminPage);
const Editor = editorRoute(EditorPage);
const TestPage = withAuthentication(CandidatePage);

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route path='/admin' component={Admin} />
          <Route path='/editor' component={Editor} />
          <Route path='/login' component={LoginPage} />
          <Route path='/test' component={TestPage} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
