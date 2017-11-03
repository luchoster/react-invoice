import * as R                                    from 'ramda'
import React                                     from 'react'
import { render }                                from 'react-dom'
import { Provider }                              from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import Thunk                                     from 'redux-thunk'
import { MuiThemeProvider, createMuiTheme }      from 'material-ui/styles'
import ReactTouchTap                             from 'react-tap-event-plugin'
import App                                       from './app';
import registerServiceWorker                     from './registerServiceWorker'
import Reducers                                  from './reducers/'
import { getCurrentUser }                        from './lib/auth'
import './styles/index.css';

ReactTouchTap()

let composeEnhancers = compose

const myTheme = createMuiTheme({
  fontFamily: 'TruenoLt, sans-serif',
  palette: {
    primary1Color: '#00AD4C',
    primary2Color: '#005870',
    primary3Color: '#F7911E',
    accent1Color: '#3DB659',
    // accent2Color: grey100,
    // accent3Color: grey500,
    textColor: '#000000',
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack,
  },
})

getCurrentUser()
  .then( user => {
    const User = R.defaultTo({}, user)
    let store = createStore(
      Reducers,
      {User},
      composeEnhancers(applyMiddleware(Thunk))
    )

    render(
      <Provider store={store}>
        <MuiThemeProvider theme={myTheme}>
          <App />
        </MuiThemeProvider>
      </Provider>,
      document.getElementById('root')
    )
  })

registerServiceWorker();
