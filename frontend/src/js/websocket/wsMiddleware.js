import * as types from '../constants/ActionTypes';
import * as messageCreators from './messageCreators';
import socket from './socket';
import throttle from './throttle';

const socketSendAsync = (message) => {
  setTimeout(() => socket.send(message), 0);
};

const throttledChangeCardsSend = throttle(cards => {
  socket.send(messageCreators.changeCards(cards));
}, 2000);


export default store => next => action => {
  const result = next(action);
  
  switch (action.type) {
    case types.SIGN_IN_SUCCESS: {
      socket.send(messageCreators.userLogin(action.response.tokenId));
      const projectId = store.getState().currentProject.present.id;
      if (projectId) socketSendAsync(messageCreators.openProject(projectId));
      break;
    }
    case types.MOVE_PROJECT_CARD:
    case types.EDIT_PROJECT_CARD:
    case types.REDO_CARDS:
    case types.UNDO_CARDS: {
      const cards = store.getState().cards.present.list;
      throttledChangeCardsSend(cards);
      break;
    }
    case types.CREATE_PROJECT_CARD:
    case types.REMOVE_PROJECT_CARD: {
      const cards = store.getState().cards.present.list;
      socketSendAsync(messageCreators.changeCards(cards));
      break;
    }
    case types.SIGN_OUT_SUCCESS: {
      socket.send(messageCreators.userLogout());
      break;
    }
    case types.CREATE_TASK:
    case types.EDIT_TASK:
    case types.MOVE_TASK_INSIDE_COLUMN:
    case types.REMOVE_TASK:
    case types.CREATE_TASK_COLUMN:
    case types.EDIT_TASK_COLUMN:
    case types.MOVE_TASK_COLUMN:
    case types.REMOVE_TASK_COLUMN:
    case types.UNDO_CURRENT_PROJECT:
    case types.REDO_CURRENT_PROJECT: {
      const project = store.getState().currentProject.present;
      socketSendAsync(messageCreators.changeProject(project));
      break;
    }
    case types.OPEN_PROJECT: {
      socket.send(messageCreators.openProject(action.projectId));
      break;
    }
    case types.CLOSE_PROJECT: {
      socketSendAsync(messageCreators.closeProject(action.projectId));
      break;
    }
    default:
      break;
  }
  
  return result;
};