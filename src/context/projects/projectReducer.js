import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROJECT,
  VALIDATE_FORM,
  PROJECT_CURRENT,
  DELETE_PROJECT,
  PROJECT_ERROR,
} from '../../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case FORM_PROJECT:
      return {
        ...state,
        addprojectform: true,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        addprojectform: false,
        errorform: false,
      };
    case VALIDATE_FORM:
      return {
        ...state,
        errorform: true,
      };
    case PROJECT_CURRENT:
      return {
        ...state,
        project: state.projects.filter(
          (project) => project._id === action.payload
        ),
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
        project: null,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        message: action.payload,
      };

    default:
      return state;
  }
};
