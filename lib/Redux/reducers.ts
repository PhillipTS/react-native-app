import { combineReducers } from 'redux';
import { DEFAULT_USER, DEFAULT_LOADING_STATE } from '../Constants';
import {
  SET_USER, SET_ID,
  SET_AUTH_LOADING, SET_LOADING,
} from './actions';
import { UserAction, LoadingAction, User, LoadingState } from '../Types';

/** Redux Reducers */

function user(state: User = DEFAULT_USER, action: UserAction): User {
  switch (action.type) {
    case SET_USER: return { ...state, ...action.user };
    case SET_ID: return { ...state, id: action.id };
    default: return state;
  }
}

function loading(state: LoadingState = DEFAULT_LOADING_STATE, action: LoadingAction): LoadingState {
  switch (action.type) {
    case SET_LOADING: return { ...state, loading: action.status };
    case SET_AUTH_LOADING: return { ...state, authLoading: action.status };
    default: return state;
  }
}

const rootReducer = combineReducers({
  user,
  loading,
});

export default rootReducer;
