import * as R                       from 'ramda'
import React, { Component }         from 'react';
import { BrowserRouter, Switch }    from 'react-router-dom'
import { connect }                  from 'react-redux'
import { RouteActor, RouteFunctor } from './routes'
import { firebaseApp, users }       from './lib/auth'
import { notNilOrEmpty }            from './lib/helpers'
import MenuIcon                     from 'material-ui-icons/Menu'
import IconButton                   from 'material-ui/IconButton'
import CloseIcon                    from 'material-ui-icons/Close'
import { Fb, User }                 from './actions'
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
  Toolbar,
  withStyles
}               from 'material-ui'


class Invoice extends Component {
  state = {
    open: false,
    snackbar: false,
    save_response: "",
    form: {
      email: '',
      password: ''
    },
    invoice: {
      id: Math.random(),
      number: 179,
      total: 85
    },
    userInvoices:[]
  }

  componentDidMount() {
    // eslint-disable-next-line
    firebaseApp

    users.once('value')
      .then( snap => {
        let snapshotArray = []
        const childKey = snap.child(`invoices/${this.props.user.uid}`)
        R.forEach( item => {
          let itemVal = item.val()
          snapshotArray.push(itemVal);
          this.setState({userInvoices: snapshotArray})
        })(childKey)
      })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  openSnackbar = () => {
    this.setState({ snackbarn: true })
  }

  closeSnackbar = () => {
    this.setState({ snackbar: false })
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

  saveInvoice = () => {
    this.props.addInvoice(this.state.invoice)
    this.setState({
      snackbar: true,
      save_response: notNilOrEmpty(this.props.save_response) && this.props.save_response
    })
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
                    <Button color="contrast" onTouchTap={this.handleOpen}>
                        <i className="fa fa-sign-in fa-2x" />
                    </Button>
                  :
                    <div>
                      <Button color="contrast" onTouchTap={this.saveInvoice}>
                      <i className="fa fa-floppy-o fa-2x" />
                      </Button>
                      <Button color="contrast" onTouchTap={this.props.logout}>
                        <i className="fa fa-sign-out fa-2x" />
                      </Button>
                  </div>
                }
              </Toolbar>
            </AppBar>
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snackbar}
            autoHideDuration={6000}
            onRequestClose={this.closeSnackbar}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={
              <span id="message-id">
                Saved Successfully
              </span>
            }
            action={[
              <Button key="undo" color="accent" dense onClick={this.closeSnackbar}>
                OK
              </Button>,
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onTouchTap={this.closeSnackbar}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
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
    )
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
  user: state.User,
  save_response: state.fb
})

const mapDispatchToProps = dispatch => ({
  addInvoice: (data) => dispatch(Fb.saveInvoice(data)),
  emailLogin: request_body => dispatch(User.emailLogin(request_body)),
  logout: () => dispatch(User.logoutUser)
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Invoice))
