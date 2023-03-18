import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  // Extraer los valores del context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { message, auth, registerUser } = authContext;

  // En caso de que el usuario se haya auth o registrado o sea un registro duplicdo
  useEffect(() => {
    if (auth) {
      props.history.push('/projects');
    }
    if (message) {
      showAlert(message.msg, message.category);
    }
  }, [message, auth, props.history]);

  //State para iniciar sesión
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    verify: '',
  });

  // Extraer el usuario
  const { name, email, password, verify } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      verify.trim() === ''
    ) {
      showAlert('Todos los campos son obligatorios', 'alert-error');
      return;
    }
    // Password min de 6 caracteres
    if (password.length < 6) {
      showAlert('El password debe tener al menos 6 caracteres', 'alert-error');
      return;
    }
    // Verificar password
    if (password !== verify) {
      showAlert('Los passwords no son iguales', 'alert-error');
      return;
    }
    // Pasarlo al action
    registerUser({
      name,
      email,
      password,
    });
  };

  return (
    <div className='form-user'>
      {alert ? (
        <div className={`alert ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <div className='container-form shadow-dark'>
        <h1>Register</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group className='mb-3 field-form'>
            <Form.Label htmlFor='name'>Nombre</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className='mb-3 field-form'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className='mb-3 field-form'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className='mb-3 field-form'>
            <Form.Label htmlFor='verify'>Confirmar Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Repite tu Password'
              id='verify'
              name='verify'
              value={verify}
              onChange={onChange}
            />
          </Form.Group>

          <Button className='btn btn-primary btn-block' type='submit'>
            Registrarme
          </Button>
        </Form>
        <Link to={'/'} className='link-register'>
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default Register;
