import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Projects from './components/projects/Projects';

import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';

import tokenAuth from './config/token';
import PrivateRoute from './components/routes/PrivateRoute';

// Verificar si tenemos un token
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/register' component={Register} />
                <PrivateRoute exact path='/projects' component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
