import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import ProjectContext from '../../context/projects/projectContext';

const AddProject = () => {
  // Obtener el state del formulario addProject
  const projectsContext = useContext(ProjectContext);
  const { addprojectform, errorform, showForm, addProject, showError } =
    projectsContext;

  // State del proyecto
  const [project, setProject] = useState({
    name: '',
  });
  // Extraer nombre del proyecto
  const { name } = project;

  const onChangeProject = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitProject = (e) => {
    e.preventDefault();

    // Validar el proyecto
    if (name === '') {
      showError();
      return;
    }

    //Agregar el state
    addProject(project);
    //Reiniciar el State
    setProject({
      name: '',
    });
  };

  // Mostrar Formulario AddProject
  const onClickForm = () => {
    showForm();
  };

  return (
    <>
      <Button className='btn btn-block btn-primary mb-5' onClick={onClickForm}>
        Nuevo Proyecto
      </Button>
      {addprojectform ? (
        <Form className='form-addproject' onSubmit={onSubmitProject}>
          <Form.Control
            className='input-text mb-5'
            type='text'
            name='name'
            placeholder='Nombre Proyecto'
            value={name}
            onChange={onChangeProject}
          />
          <Button className='btn btn-primary btn-block mb-5' type='submit'>
            Agregar Proyecto
          </Button>
        </Form>
      ) : null}
      {errorform ? (
        <p className='message error'>El nombre del Proyecto es Obligatorio</p>
      ) : null}
    </>
  );
};

export default AddProject;
