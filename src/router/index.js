import React from 'react'
import '../index.css'
import { Route, BrowserRouter as Router, Switch, Redirect, HashRouter } from 'react-router-dom';
import requireAuth from '../components/auth.guard';
import Auth from './layouts/auth.layout';
import Main from './layouts/main.layout';
import LoginComponent from '../pages/auth/login.page';
import Home from '../pages/index.page';
import ComponentNotFound from '../pages/misc/not-found.page';
import Appoinments from '../pages/doctor/appointments.page';
import Patients from '../pages/doctor/patients.page';
import Scheduler from '../pages/doctor/schedule.page';
import Profile from '../pages/doctor/profile.page';
import ChangePassword from '../pages/doctor/changepass.page';
import RegisterComponent from '../pages/auth/register.page';
import AccountCreated from '../pages/misc/accountcreated.page';
export default class
    routing extends React.Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/created' exact component={AccountCreated} />

                    <Route path='/auth/:path?' exact>
                        <Auth>
                            <Switch>
                                <Route path='/auth/login' exact component={LoginComponent} />
                                <Route path='/auth/register' exact component={RegisterComponent} />
                                <Route path='*' exact={true} component={ComponentNotFound} />
                            </Switch>
                        </Auth>
                    </Route>

                    <Route>
                        <Main>
                            <Switch>
                                <Route path='/' exact component={requireAuth(Home)} />
                                <Route path='/appointments' exact activeclassname="active" component={requireAuth(Appoinments)} />
                                <Route path='/patients' exact activeclassname="active" component={requireAuth(Patients)} />
                                <Route path='/scheduler' exact activeclassname="active" component={requireAuth(Scheduler)} />
                                <Route path='/profile' exact activeclassname="active" component={requireAuth(Profile)} />
                                <Route path='/change-password' exact activeclassname="active" component={requireAuth(ChangePassword)} />
                                <Route path='*' exact={true} component={ComponentNotFound} />
                            </Switch>
                        </Main>
                    </Route>


                </Switch>
            </HashRouter>

        )
    }
}