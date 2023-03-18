import React, { useState, useContext, useEffect } from 'react';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

import { Form, Container, Row, Col } from 'react-bootstrap';

const FormTask = () => {
  // Extraer si un proyecto esta activo
  const projectsContext = useContext(ProjectContext);
  const { project } = projectsContext;

  // Obtener la funcion del context de tarea
  const TasksContext = useContext(TaskContext);
  const {
    errortask,
    taskcurrent,
    addTask,
    verifyTask,
    getTasks,
    updateTask,
    cleanTask,
  } = TasksContext;

  // Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    if (taskcurrent !== null) {
      saveTask(taskcurrent);
    } else {
      saveTask({
        name: '',
      });
    }
  }, [taskcurrent]);

  // State del Form

  const [task, saveTask] = useState({
    name: '',
  });

  // Extraer el nombre del proyecto
  const { name } = task;

  // Si no hay proyecto seleccionado
  if (!project) return null;

  // Array destructuring para extraer proyecto actual
  const [projectCurrent] = project;

  // Leer los valores del formulario
  const handleChange = (e) => {
    saveTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  // Validar Form de tarea
  const onSubmit = (e) => {
    e.preventDefault();
    // Validar
    if (name.trim() === '') {
      verifyTask();
      return;
    }

    if (taskcurrent === null) {
      // Agregar la nueva tarea al state
      task.project = projectCurrent._id;
      addTask(task);
    } else {
      // Actualizar tarea seleccionada
      updateTask(task);
      // Elimina tareaseleccionada del state
      cleanTask();
    }
    // Obtener y filtrar las tareas del proyecto actual
    getTasks(projectCurrent._id);
    // Reinicar el form
    saveTask({
      name: '',
    });
  };
  return (
    <>
      <Form className='formulario' onSubmit={onSubmit}>
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form.Control
                className='input-text mb-5'
                type='text'
                name='name'
                placeholder='Nombre Tarea...'
                value={name}
                onChange={handleChange}
              />
              <input
                className='btn btn-primary btn-block btn-submit mb-5'
                type='submit'
                value={taskcurrent ? 'Editar Tarea' : 'Agregar Tarea'}
              />
            </Col>
          </Row>
        </Container>
      </Form>
      {errortask ? (
        <p className='message error'>El nombre de la Tarea es Obligatorio</p>
      ) : null}
    </>
  );
};

export default FormTask;
