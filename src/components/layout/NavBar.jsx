import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const NavBar = () => {
  // Extraer la informacion de auth
  const authContext = useContext(AuthContext);
  const { user, userAuth, logOut } = authContext;

  // En caso de que el usuario o password sean incorrectos
  useEffect(() => {
    userAuth();
  }, []);
  return (
    <header className='app-header'>
      {user ? (
        <p className='name-user'>
          Hola <span>{user.name} </span>
        </p>
      ) : null}

      <nav className='nav-principal'>
        <button
          className='btn btn-blank cerrar-sesion'
          onClick={() => logOut()}
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
