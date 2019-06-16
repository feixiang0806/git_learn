import React from 'react';
import {
  connect
} from 'dva';
import {
    Switch, Route,Redirect
  } from 'dva/router';
import { getSessionStore} from '../utils/storage';
const UnauthRoute = ({path, exact, component: Component}) =>(
       <Route
      exact={exact}
      key={path}
      path={path}
      location = {location}
      render ={
        props => {
            const { location } = props;
            const pathname = location.pathname;
            if(getSessionStore('userToken')){
                return <Redirect to={{ pathname: '/home', prevPath: pathname }} />;
              }
            return <Component {...props} />;
          }
      }/>
)

const AuthRoute =({path, exact, component: Component}) =>(
    <Route
    exact={exact}
    key={path}
    path={path}
    location = {location}
    render ={
      props => {
          const { location } = props;
          const pathname = location.pathname;
          if(!getSessionStore('userToken')){
              return <Redirect to={{ pathname: '/login', prevPath: pathname }} />;
            }
          return <Component {...props} />;
        }
    }/>
)
@connect(stat=>{
  return {}
})
export default class Index extends React.Component{
  render(){
    const {getRouteData, location} = this.props;
    return (
    <div className='container'>     
        <Switch>
            {
                getRouteData().map(item =>
                (
                    item.auth?
                    <AuthRoute
                    exact={item.exact}
                    key={item.path}
                    path={item.path}
                    component={item.component}
                    location = {location}
                    />: <UnauthRoute
                    exact={item.exact}
                    key={item.path}
                    path={item.path}
                    component={item.component}
                    location = {location}
                    />
                )
                )
            }
           <Redirect exact from="/" to="/home" />
        </Switch>    
    </div>
        );
}
}