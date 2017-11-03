import * as R                 from 'ramda'
import React                  from 'react'
import Qs                     from 'qs'
import { Route, Redirect }    from 'react-router-dom'
import { notNil, nilOrEmpty } from './lib/helpers'
import Login                  from './containers/login'
import Home                   from './containers/home'

const FROM_INDEX = 1

const userNotLogin  = R.compose(nilOrEmpty, R.prop('user'))
const dashboardPath = R.compose(R.test(/^\/private/), R.prop('path'))
const requiredLogin = R.allPass([userNotLogin, dashboardPath])

const parseQuery = props => R.compose(
  R.when(
    notNil,
    R.compose(
      R.merge(props),
      R.objOf('query'),
      Qs.parse,
      R.slice(FROM_INDEX, Infinity)
    )
  ),
  R.path(['location', 'search'])
)(props)

const RouteFunctor = [
  { path: '/', component: Home, exact: true },
  { path: '/private/:id', component: Home },
  { path: '/private/', component: Home },
  { path: '/login', component: Login },
]

const RouteActor = route => {
  return(
    <Route
      path={route.path}
      exact={route.exact}
      render={
        props => {
          const _props = parseQuery(props)

          // props.history.listen(() => window.scroll(0, 0))

          // return <route.component {..._props} routes={route.sub_routes} />
          return (
            requiredLogin(route) ?
              <Redirect to='/login' />
            :
              <route.component {..._props} routes={route.sub_routes} />
          )
        }
      }
    />
  )
}

export {
  RouteActor,
  RouteFunctor
}
