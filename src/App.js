import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import withAuthorization from './hocs/withAuthorization';
import AdminPage from './pages/AdminPage';
import CandidatePage from './pages/CandidatePage';
import EditorPage from './pages/EditorPage';

const Admin = withAuthorization(['admin'])(AdminPage);
const Editor = withAuthorization(['admin', 'editor'])(EditorPage);
const Candidate = withAuthorization(['candidate', 'admin', 'editor'])(CandidatePage);

class App extends Component {
  state = {
    user: {
      role: {
        admin: false,
        editor: false,
        candidate: true
      }
    }
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Route path='/admin' render={() => <Admin user={this.state.user} />} />
          <Route path='/editor' render={() => <Editor user={this.state.user} />} />
          <Route path='/candidate' render={() => <Candidate user={this.state.user} />} />


        </Fragment>
      </Router>
    );
  }
}

export default App;
