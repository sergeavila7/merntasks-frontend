import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import NavBar from '../layout/NavBar';
import FormTask from '../tasks/FormTask';
import ListTasks from '../tasks/ListTasks';

import AuthContext from '../../context/auth/authContext';

const Projects = () => {
  // Extraer la informacion de auth
  const authContext = useContext(AuthContext);
  const { userAuth } = authContext;

  // En caso de que el usuario o password sean incorrectos
  useEffect(() => {
    userAuth();
  }, []);

  return (
    <div className='container-app'>
      <Sidebar />
      <div
        className='section-principal
'
      >
        <NavBar />
        <main>
          <FormTask />
          <div className='container-tasks'>
            <ListTasks />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
