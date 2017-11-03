import * as R from 'ramda'
import { User } from '../actions'

const reducer = (state = {}, action) => R.cond([
  [R.equals(User.TYPE.create_success), R.always(action.payload)],
  [R.equals(User.TYPE.create_failed), R.always(action.payload)],
  [R.equals(User.TYPE.login_success), R.always(action.payload)],
  [R.equals(User.TYPE.login_failed), R.always(action.payload)],
  [R.T, R.always(state)]
])(action.type)

export default reducer
