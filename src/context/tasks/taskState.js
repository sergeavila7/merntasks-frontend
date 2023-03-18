import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';

import clientAxios from '../../config/axios';

import {
  TASKS_PROJECT,
  ADD_TASK,
  VERIFY_TASK,
  DELETE_TASK,
  TASK_CURRENT,
  UPDATE_TASK,
  CLEAN_TASK,
} from '../../types';

const TaskState = (props) => {
  const initialState = {
    tasksproject: [],
    errortask: false,
    taskcurrent: null,
  };

  // Crear dispatch y state
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  // Crear las tareas del proyecto
  const getTasks = async (project) => {
    try {
      const res = await clientAxios.get('/api/tasks', { params: { project } });
      dispatch({
        type: TASKS_PROJECT,
        payload: res.data.tasks,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Agregar tarea al proyecto seleccionado
  const addTask = async (task) => {
    try {
      const res = await clientAxios.post('/api/tasks', task);
      dispatch({
        type: ADD_TASK,
        payload: res.data.task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Valida y muestra un error en caso de ser necesario
  const verifyTask = () => {
    dispatch({
      type: VERIFY_TASK,
    });
  };

  const deleteTask = async (id, project) => {
    try {
      await clientAxios.delete(`/api/tasks/${id}`, { params: { project } });
      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Editar tarea
  const updateTask = async (task) => {
    try {
      const res = await clientAxios.put(`/api/tasks/${task._id}`, task);

      dispatch({
        type: UPDATE_TASK,
        payload: res.data.task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Extraer tarea para editar
  const saveTaskCurrent = (task) => {
    dispatch({
      type: TASK_CURRENT,
      payload: task,
    });
  };
  // Elimina la tareaseleccionada
  const cleanTask = () => {
    dispatch({
      type: CLEAN_TASK,
    });
  };
  return (
    <TaskContext.Provider
      value={{
        tasksproject: state.tasksproject,
        errortask: state.errortask,
        taskcurrent: state.taskcurrent,
        getTasks,
        addTask,
        verifyTask,
        deleteTask,
        saveTaskCurrent,
        updateTask,
        cleanTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
