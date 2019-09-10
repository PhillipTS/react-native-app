import { StyleProp } from 'react-native';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { NavigationScreenProp, NavigationParams, NavigationState } from 'react-navigation';
import RootReducer from './redux/reducers';
import {
  SetUserAction, RemoveUserAction, SetIDAction,
  SetLoadingAction, SetAuthLoadingAction,
} from './Redux/actions';

/** App Wide Types */

export interface User {
  id: string;
  email?: string;
}

/** Redux Types */

/** State Actions */
export type UserAction = SetUserAction
  | SetIDAction
  | RemoveUserAction;
export type LoadingAction = SetLoadingAction | SetAuthLoadingAction;

/** App Actions */
export type AppActions = UserAction | LoadingAction;

/** App State */
export interface LoadingState { loading: boolean; authLoading: boolean; }
export type AppState = ReturnType<typeof RootReducer>;

/** App API */
export enum Status { SUCCESS, FAILED, UNCHANGED }

export type APIResult<T = undefined> = { status: Status, error?: Error, data?: T };
export type APIThunkResult<T = undefined> = ThunkAction<
  Promise<APIResult<T>>,
  AppState,
  undefined,
  AppActions
>;
export type APIThunkDispatch = ThunkDispatch<AppState, undefined, AppActions>;

/** Common Types */

export type Falsy = undefined | null | false;
export function isFalsy(value: any): value is Falsy {
  return value === undefined || value === null || value === false;
}

export type URI = string | null;

export type Style = StyleProp<any>;

export interface ScreenProps<T extends NavigationParams = {}, P extends NavigationState = any> {
  navigation: NavigationScreenProp<P, T>;
}
