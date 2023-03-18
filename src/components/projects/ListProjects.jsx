import React, { useContext, useEffect } from 'react';
import Project from './Project';
import ProjectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alerts/alertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListProjects = () => {
  // Extraer proyectos del state inicial
  const projectsContext = useContext(ProjectContext);
  const { projects, getProjects, message } = projectsContext;
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    if (message) {
      showAlert(message.msg, message.category);
    }
    getProjects();

    // eslint-disable-next-line
  }, [message]);

  // Verificar que proyectos tenga contenido
  if (projects.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <>
      <ul className='list-projects'>
        {alert ? (
          <div className={`alert ${alert.category}`}>{alert.msg}</div>
        ) : null}
        <TransitionGroup>
          {projects.map((project) => (
            <CSSTransition key={project._id} timeout={200} classNames='project'>
              <Project project={project} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </>
  );
};

export default ListProjects;
