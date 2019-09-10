import { User } from '../Types';

/** Redux Actions */

/** Actions */
export const SET_USER = 'SET_USER';
export const SET_ID = 'SET_ID';
export const REMOVE_USER = 'REMOVE_USER';

export const SET_LOADING = 'SET_LOADING';
export const SET_AUTH_LOADING = 'SET_AUTH_LOADING';

/** Action Types */
export interface SetUserAction { type: typeof SET_USER; user: User; }
export interface SetIDAction { type: typeof SET_ID; id: string; }
export interface RemoveUserAction { type: typeof REMOVE_USER; }

export interface SetLoadingAction { type: typeof SET_LOADING; status: boolean; }
export interface SetAuthLoadingAction { type: typeof SET_AUTH_LOADING; status: boolean; }

/** Action Creators */

export function setUser(user: User): SetUserAction {
  return { type: SET_USER, user };
}
export function setID(id: string): SetIDAction {
  return { type: SET_ID, id };
}
export function removeUser(): RemoveUserAction {
  return { type: REMOVE_USER };
}

export function setLoading(status: boolean): SetLoadingAction {
  return { type: SET_LOADING, status };
}
export function setAuthLoading(status: boolean): SetAuthLoadingAction {
  return { type: SET_AUTH_LOADING, status };
}

export default { // Action Creators
  setUser,
  setID,
  removeUser,
  setLoading,
  setAuthLoading,
};
