import Firebase, { AuthUser } from './Firebase';
import Store from './Redux';
import {
  setUser,
  setLoading, setAuthLoading,
} from './Redux/actions';
import {
  APIThunkResult, APIThunkDispatch, APIResult,
  Status, User,
} from './Types';
import { DEFAULT_USER } from './Constants';

/**
 * App Api
 * Connection between Firebase and Redux
 *
 * Functions are Redux Thunk async actions
*/

/** Auth Handler */

Firebase.onAuthChange(async (authUser: AuthUser) => {
  if (authUser) {
    try {
      const user = await Firebase.getUserDetails(authUser.uid);
      Store.dispatch(setUser(user));
    } catch (error) { console.warn('User Account doesn\'t exist'); }
  } else { Store.dispatch(setUser(DEFAULT_USER)); }
  Store.dispatch(setAuthLoading(false));
});

export function checkLoginStatus(): boolean {
  return !!Firebase.getAuthUser();
}

/** Helpers */

const apiSuccess = (dispatch: APIThunkDispatch, data: any = null): APIResult<typeof data> => {
  if (data) { console.log(data); }
  dispatch(setLoading(false));
  return { status: Status.SUCCESS, data };
};

const apiError = (dispatch: APIThunkDispatch, error: Error): APIResult => {
  console.warn(error);
  dispatch(setLoading(false));
  return { status: Status.FAILED, error };
};

/** API Actions */

export type SignUpResult = Promise<APIResult<User>>;
export function signUp(user: User, password: string): APIThunkResult<User> {
  return async (dispatch: APIThunkDispatch) => {
    try {
      dispatch(setLoading(true));
      const authUser = await Firebase.signUp(user.email, password);
      const { data: newUser } = await dispatch(createAccount({ ...user, id: authUser.user.uid }));
      dispatch(setUser(newUser));
      return apiSuccess(dispatch, newUser);
    } catch (error) { return apiError(dispatch, error); }
  };
}

export type CreateAccountResult = Promise<APIResult<User>>;
export function createAccount(user?: User): APIThunkResult<User> {
  return async (dispatch: APIThunkDispatch, getState) => {
    const newUser = user || getState().user;
    try {
      dispatch(setLoading(true));
      await Firebase.createUser(newUser);
      dispatch(setUser(newUser));
      return apiSuccess(dispatch, newUser);
    } catch (error) { return apiError(dispatch, error); }
  };
}

export type UpdateAccountResult = Promise<APIResult<User>>;
export function updateAccount(user?: User): APIThunkResult<User> {
  return async (dispatch: APIThunkDispatch, getState) => {
    const newUser = user || getState().user;
    try {
      dispatch(setLoading(true));
      await Firebase.updateUser(newUser);
      dispatch(setUser(newUser));
      return apiSuccess(dispatch, newUser);
    } catch (error) { return apiError(dispatch, error); }
  };
}

export type SignInResult = Promise<APIResult<AuthUser>>;
export function signIn(email: string, password: string): APIThunkResult<AuthUser> {
  return async (dispatch: APIThunkDispatch) => {
    try {
      dispatch(setLoading(true));
      const authUser = await Firebase.signIn(email, password); // Result handled in Auth Handler
      return apiSuccess(dispatch, authUser);
    } catch (error) { return apiError(dispatch, error); }
  };
}

export type SignOutResult = Promise<APIResult>;
export function signOut(): APIThunkResult {
  return async (dispatch: APIThunkDispatch) => {
    try {
      dispatch(setLoading(true));
      await Firebase.signOut();
      return apiSuccess(dispatch);
    } catch (error) { return apiError(dispatch, error); }
  };
}

export default {
  checkLoginStatus,
  signUp,
  createAccount,
  updateAccount,
  signIn,
  signOut,
};
