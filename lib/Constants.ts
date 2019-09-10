import { Dimensions } from 'react-native';
import { scale } from 'react-native-size-matters';
import { User, LoadingState, AppState } from './Types';

const { width, height } = Dimensions.get('window');

/** App Constants */

export const DEFAULT_USER: User = {
  id: null,
};

export const DEFAULT_LOADING_STATE: LoadingState = { loading: true, authLoading: true };

export const DEFAULT_STATE: AppState = {
  user: DEFAULT_USER,
  loading: DEFAULT_LOADING_STATE,
};

export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;
export const CONTENT_HEIGHT = SCREEN_HEIGHT - (scale(15) * 2);
export const CONTENT_WIDTH = SCREEN_WIDTH - (scale(15) * 2);

export const COLOURS = {
  primary: 'red',
  secondary: 'blue',

  facebook: '#3B5998',
  google: '#E0493B',

  black: '#000000',
  white: '#ffffff',
};

export default {
  DEFAULT_USER,
  DEFAULT_LOADING_STATE,
  DEFAULT_STATE,

  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  CONTENT_HEIGHT,
  CONTENT_WIDTH,

  COLOURS,
};
