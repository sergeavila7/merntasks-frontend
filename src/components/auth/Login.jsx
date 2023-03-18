import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
  // Extraer los valores del context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { message, auth, logIn } = authContext;

  // En caso de que el usuario o password sean incorrectos
  useEffect(() => {
    if (auth) {
      props.history.push('/projects');
    }
    if (message) {
      showAlert(message.msg, message.category);
    }
  }, [message, auth, props.history]);

  //State para Login
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if (email.trim() === '' || password.trim === '') {
      showAlert('Todos los campos son obligatorios', 'alert-error');
    }
    // Pasarlo al action
    logIn({ email, password });
  };
  return (
    <div className='form-user'>
      {alert ? (
        <div className={`alert ${alert.category}`}>
          {/* {alert.msg} */}
          Contraseña o usuario incorrecto
        </div>
      ) : null}
      <div className='container-form shadow-dark'>
        <h1>Login</h1>
        <Form onSubmit={onSubmit}>
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

          <Button className='btn btn-primary btn-block' type='submit'>
            Iniciar Sesión
          </Button>
        </Form>
        <Link to={'/register'} className='link-register'>
          Registrarme
        </Link>
      </div>
    </div>
  );
};

export default Login;
