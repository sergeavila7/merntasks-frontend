import React, { useReducer } from 'react';
import clientAxios from '../../config/axios';

import ProjectContext from './projectContext';
import projectReducer from './projectReducer';
import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROJECT,
  PROJECT_ERROR,
  VALIDATE_FORM,
  PROJECT_CURRENT,
  DELETE_PROJECT,
} from '../../types';

const ProjectState = (props) => {
  const initialState = {
    projects: [],
    addprojectform: false,
    errorform: false,
    project: null,
    message: null,
  };

  // Dispatch para ejecutar acciones
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Funciones del CRUD
  const showForm = () => {
    dispatch({
      type: FORM_PROJECT,
    });
  };

  // Obtener los proyectos
  const getProjects = async () => {
    try {
      const res = await clientAxios.get('/api/projects');
      dispatch({
        type: GET_PROJECTS,
        payload: res.data.projects,
      });
    } catch (error) {
      const alert = {
        msg: 'Hubo un error',
        category: 'alert-error',
      };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  // Agregar nuevo proyecto
  const addProject = async (project) => {
    try {
      const res = await clientAxios.post('/api/projects', project);
      dispatch({
        type: ADD_PROJECT,
        payload: res.data,
      });
    } catch (error) {
      const alert = {
        msg: 'Hubo un error',
        category: 'alert-error',
      };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  // Validar formulario
  const showError = () => {
    dispatch({
      type: VALIDATE_FORM,
    });
  };

  // Seleccionar proyecto
  const projectCurrent = (projectId) => {
    dispatch({
      type: PROJECT_CURRENT,
      payload: projectId,
    });
  };

  // Eliminar proyecto
  const deleteProject = async (projectId) => {
    try {
      await clientAxios.delete(`/api/projects/${projectId}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    } catch (error) {
      const alert = {
        msg: 'Hubo un error',
        category: 'alert-error',
      };
      dispatch({
        type: PROJECT_ERROR,
        payload: alert,
      });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        addprojectform: state.addprojectform,
        errorform: state.errorform,
        project: state.project,
        message: state.message,
        showForm,
        getProjects,
        addProject,
        showError,
        projectCurrent,
        deleteProject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
