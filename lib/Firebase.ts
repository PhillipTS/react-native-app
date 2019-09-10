import { YellowBox } from 'react-native';

import Firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { User } from './Types';

const firebaseConfig = {
  /** FIREBASE CONFIG HERE */
};

/** Initialization */
Firebase.initializeApp(firebaseConfig);

export const Auth = Firebase.auth();
export const Database: Firebase.firestore.Firestore = Firebase.firestore();

// Firebase uses long timers that cause warnings on Android
YellowBox.ignoreWarnings(['Setting a timer']);

/** Data Paths */
const USER_COLLECTION = 'users';

/** Authentication */

export type AuthUser = Firebase.User | null;

export const getAuthUser: () => AuthUser = () => Auth.currentUser;

export const onAuthChange = (onChange: (user: AuthUser) => void) =>
  Auth.onAuthStateChanged(onChange);

export const signUp = (email: string, password: string) =>
  Auth.createUserWithEmailAndPassword(email, password);

export const signIn = (email: string, password: string) =>
  Auth.signInWithEmailAndPassword(email, password);

export const signOut = () => Auth.signOut();

/** Database */

export const createUser = (user: User) =>
  Database.collection(USER_COLLECTION).doc(user.id).set(user);

export const updateUser = (user: User) =>
  Database.collection(USER_COLLECTION).doc(user.id).update(user);

export const getUserDetails = async (userID: string) =>
  (await Database.collection(USER_COLLECTION).doc(userID).get()).data() as User;

export default {
  getAuthUser,
  onAuthChange,

  signUp,
  signIn,
  signOut,

  createUser,
  updateUser,
  getUserDetails,
};
