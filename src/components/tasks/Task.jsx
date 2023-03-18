import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import TaskContext from '../../context/tasks/taskContext';
import ProjectContext from '../../context/projects/projectContext';

const Task = ({ task }) => {
  // Extraer si un proyecto esta activo
  const projectsContext = useContext(ProjectContext);
  const { project } = projectsContext;

  // Obtener la funcion del context de tarea
  const TasksContext = useContext(TaskContext);
  const { deleteTask, getTasks, updateTask, saveTaskCurrent } = TasksContext;

  // Extraer el proyecto
  const [projectCurrent] = project;

  // Funcion que se ejucta cuando el usuario presiona el btn de eliminar tarea
  const taskDelete = (id) => {
    deleteTask(id, projectCurrent._id);
    getTasks(projectCurrent._id);
  };

  // Funcion que modifica el estado de las tareas
  const changeState = (task) => {
    if (task.state) {
      task.state = false;
    } else {
      task.state = true;
    }
    updateTask(task);
  };

  const selectTask = (task) => {
    saveTaskCurrent(task);
  };
  return (
    <li className='task shadow'>
      <p>{task.name}</p>
      <div className='state'>
        {task.state ? (
          <button
            type='button'
            className='completo'
            onClick={() => changeState(task)}
          >
            Completo
          </button>
        ) : (
          <button
            type='button'
            className='incompleto'
            onClick={() => changeState(task)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className='actions'>
        <Button className='btn btn-primary' onClick={() => selectTask(task)}>
          Editar
        </Button>
        <Button
          className='btn btn-primary'
          onClick={() => taskDelete(task._id)}
        >
          Eliminar
        </Button>
      </div>
    </li>
  );
};

export default Task;
