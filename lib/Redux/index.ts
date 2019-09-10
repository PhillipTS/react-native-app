import { createStore, applyMiddleware, Store } from 'redux';
import Thunk, { ThunkMiddleware } from 'redux-thunk';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import RootReducer from './reducers';
import { AppState, AppActions } from '../Types';
import { DEFAULT_STATE } from '../Constants';

/** Redux Configuration */

/** Redux Persist Config */
const persistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['loading'],
} as PersistConfig<AppState>;

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store: Store<AppState, AppActions> = createStore(
  persistedReducer,
  DEFAULT_STATE,
  applyMiddleware(Thunk as ThunkMiddleware<AppState, AppActions>),
);

export const persistor = persistStore(store);

export default store;
