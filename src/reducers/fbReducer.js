import * as R from 'ramda'
import { Fb } from '../actions'

const reducer = (state={}, action) => R.cond([
  [R.equals(Fb.TYPE.save_successful), R.always(action.payload)],
  [R.T, R.always(state)]
])(action.type)

export default reducer
