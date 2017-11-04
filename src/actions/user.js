import Bluebird   from 'bluebird'
import firebase   from 'firebase'
import { logout } from '../lib/auth'

const TYPE = {
  create_success : 'CREATE_USER_SUCCESS',
  create_failed  : 'CREATE_USER_FAILED',
  login_success  : 'LOGIN_SUCCESS',
  login_failed   : 'LOGIN_FAILED',
  logout_pending : 'LOGOUT_PENDING',
  logout_success : 'LOGOUT_SUCCESS',
}

const createUser = credentials => dispatch => {
  firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then( res => dispatch({type: TYPE.create_success, payload: res.uid}) )
    .catch( err => dispatch({type: TYPE.create_failed, payload: err.message}) )
}

const emailLogin = credentials => dispatch => {
  firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(res => dispatch({type: TYPE.login_success, payload: res}))
    .catch(err => dispatch({type: TYPE.login_failed, payload: err.message}))
}

const logoutStart = () => ({ type: TYPE.logout_pending })
const logoutSuccessfully = () => ({ type: TYPE.logout_success })
const logoutUser = (dispatch, getState) =>
  Bluebird.resolve(dispatch(logoutStart()))
  .then( () => logout() )
  .then( () => dispatch(logoutSuccessfully()))


export default {
  TYPE,
  createUser,
  emailLogin,
  logoutUser
}
