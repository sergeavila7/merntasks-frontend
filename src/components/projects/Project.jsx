import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';
import { Button } from 'react-bootstrap';

const Project = ({ project }) => {
  // Obtener el state de proyectos
  const projectsContext = useContext(ProjectContext);
  const { projectCurrent } = projectsContext;

  // Obtener la funcion del context de tarea
  const TasksContext = useContext(TaskContext);
  const { getTasks } = TasksContext;

  // Funcion para agregar el proyecto seleccionado actual
  const selectProject = (id) => {
    projectCurrent(id); // Fijar un proyecto actual
    getTasks(id); // Filtrar tareas al seleccionar proyecto
  };
  return (
    <li>
      <Button
        type='button'
        className='btn btn-blank btn-block '
        onClick={() => selectProject(project._id)}
      >
        {project.name}
      </Button>
    </li>
  );
};

export default Project;
