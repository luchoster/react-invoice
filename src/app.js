import * as R                       from 'ramda'
import React, { Component }         from 'react';
import { BrowserRouter, Switch }    from 'react-router-dom'
import { connect }                  from 'react-redux'
import { RouteActor, RouteFunctor } from './routes'
import { firebaseApp }              from './lib/auth'
import MenuIcon                     from 'material-ui-icons/Menu'
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Toolbar,
  withStyles
}               from 'material-ui'
import { User } from './actions'

class Invoice extends Component {
  state = {
    open: false,
    form: {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    // eslint-disable-next-line
    firebaseApp
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  updateForm = e => {
    this.setState({
      form: R.merge(this.state.form, {[e.target.name]: e.target.value})
    })
  }

  loginByProvider = (provider) => {
    return e => {
      e.preventDefault()
      provider()
    }
  }

  submit = e => {
    this.props.emailLogin({
      email: this.state.form.email,
      password: this.state.form.password
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className={styles.root}>
            <AppBar position="fixed">
              <Toolbar>
                <IconButton className={styles.menuButton} color="contrast" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" className="flex">
                  Invoicing
                </Typography>
                {
                  R.isEmpty(this.props.user) ?
                    <Button color="contrast" onTouchTap={this.handleOpen}>Login</Button>
                  :
                    <Button color="contrast" onTouchTap={this.handleOpen}>Logout</Button>
                }
              </Toolbar>
            </AppBar>
          </div>
          <Dialog open={R.isEmpty(this.props.user) ? this.state.open : false} onRequestClose={this.handleRequestClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                fullWidth
                id="email"
                label="Email Address"
                margin="dense"
                name="email"
                type="email"
                onChange={this.updateForm}
                value={this.state.form.email}
              />
              <TextField
                autoFocus
                fullWidth
                id="password"
                label="Password"
                margin="dense"
                name="password"
                type="password"
                onChange={this.updateForm}
                value={this.state.form.password}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleRequestClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.submit} color="primary">
                Login
              </Button>
            </DialogActions>
          </Dialog>
          <Switch>
            {
              RouteFunctor.map( (route,key) => (
                <RouteActor
                  key={key}
                  user={this.props.user}
                  {...route}
                />
              ))
            }
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
})

const mapStateToProps = state => ({
  user: state.User
})

const mapDispatchToProps = dispatch => ({
  emailLogin: request_body => dispatch(User.emailLogin(request_body))
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Invoice))
