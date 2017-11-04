import { users }              from '../lib/auth'

const TYPE = {
  save_successful: 'SAVE_SUCCESS'
}

const saveInvoice = (data) => (dispatch, getState) =>
  users.child(`/invoices/${getState().User.uid}`).push( data)
    .then( res => dispatch({type: TYPE.save_successful, payload: 'Saved Successfully'}) )
    .catch( err => dispatch({type: TYPE.save_failed, payload: 'There has been an error.'}) )

export default {
  TYPE,
  saveInvoice
}
