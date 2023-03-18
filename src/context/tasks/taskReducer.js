import {
  TASKS_PROJECT,
  ADD_TASK,
  VERIFY_TASK,
  DELETE_TASK,
  TASK_CURRENT,
  UPDATE_TASK,
  CLEAN_TASK,
} from '../../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case TASKS_PROJECT:
      return {
        ...state,
        tasksproject: action.payload,
      };

    case ADD_TASK:
      return {
        ...state,
        tasksproject: [...state.tasksproject, action.payload],
        errortask: false,
      };

    case VERIFY_TASK:
      return {
        ...state,
        errortask: true,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasksproject: state.tasksproject.filter(
          (task) => task._id !== action.payload
        ),
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasksproject: state.tasksproject.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };

    case TASK_CURRENT:
      return {
        ...state,
        taskcurrent: action.payload,
      };
    case CLEAN_TASK:
      return {
        ...state,
        taskcurrent: null,
      };
    default:
      return state;
  }
};
