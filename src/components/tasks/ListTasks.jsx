import React, { useContext } from 'react';
import Task from './Task';
import { Button } from 'react-bootstrap';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListTasks = () => {
  // Obtener el state del formulario addProject
  const projectsContext = useContext(ProjectContext);
  const { project, deleteProject } = projectsContext;

  // Obtener el state del formulario addProject
  const TasksContext = useContext(TaskContext);
  const { tasksproject } = TasksContext;
  // Si no hay proyecto seleccionado
  if (!project) return <h2>Selecciona un Proyecto</h2>;

  // Array destructuring para extraer proyecto actual
  const [projectCurrent] = project;

  // Eliminar proyecto
  const onClickDelete = () => {
    deleteProject(projectCurrent._id);
  };

  return (
    <>
      <h2>Proyecto: {projectCurrent.name}</h2>
      <ul className='list-tasks'>
        {tasksproject.length === 0 ? (
          <li className='task'>
            <p className='text-center'>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tasksproject.map((task) => (
              <CSSTransition key={task._id} timeout={200} classNames='task'>
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <Button className='btn btn-secundario' onClick={onClickDelete}>
        Eliminar Proyecto &times;
      </Button>
    </>
  );
};

export default ListTasks;
