import React  from 'react';
import { withRouter } from 'react-router';
import * as Cookie from "js-cookie";
export default function requireAuth(Component,history) {
class AuthenticatedComponent extends React.Component {
 constructor(props) {
  super(props);
 }
 componentDidMount() {
  this.checkAuth();
 }
 checkAuth() {
  const location = this.props.location;
  const redirect = location.pathname + location.search;
  if ( ! Cookie.get('auth')) {
   this.props.history.push(`/auth/login?redirect=${redirect}`);
  }
 }
render() {
  return Cookie.get('auth')
   ? <Component { ...this.props } />
   : null;
  }
 }
 return  withRouter(AuthenticatedComponent)
}