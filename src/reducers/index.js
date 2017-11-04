import { combineReducers } from 'redux'
import User                from './user'
import fb                  from './fbReducer'

export default combineReducers({
  fb,
  User
})
