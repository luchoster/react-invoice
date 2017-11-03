// import * as R         from 'ramda'
import React          from 'react'
import { connect }    from 'react-redux'
// import { IconButton } from 'material-ui'
import { User }       from '../actions'

class Login extends React.Component {

  loginByProvider = (provider) => {
    return e => {
      e.preventDefault()
      provider()
    }
  }

  submit = e => {
    e.preventDefault(e)
    this.props.emailLogin({
      email: e.target.email.value,
      password: e.target.password.value
    })
  }

  render() {
    return(
      <div className="login-form row">
        <form
          className='d-flex flex-column'
          onSubmit={this.submit}
        >
          <div className='form-group'>
            <input className='form-control'
              placeholder='*Email'
              name='email'
              type='text'
              required
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              placeholder='*Password'
              name='password'
              type='password'
              required
            />
          </div>
          <button type='submit' className='btn btn-primary text-center'>
            LOGIN
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user: state.User,
  show_class: props.show_login ? ' show' : null
})
const mapDispatchToProps = dispatch => ({
  emailLogin: request_body => dispatch(User.emailLogin(request_body))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
