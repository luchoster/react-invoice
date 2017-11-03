import firebase from 'firebase'

const TYPE = {
  create_success: 'CREATE_USER_SUCCESS',
  create_failed: 'CREATE_USER_FAILED',
  login_success: 'LOGIN_SUCCESS',
  login_failed: 'LOGIN_FAILED'
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

const logout = () => firebase.auth().signOut()

export default {
  TYPE,
  createUser,
  emailLogin,
  logout
}
