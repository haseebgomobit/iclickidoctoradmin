import React,{Suspense} from 'react'
import '../index.css'
import { Route, BrowserRouter as Router, Switch, Redirect, HashRouter } from 'react-router-dom';
import requireAuth from '../components/auth.guard';
import LoaderComponent from '../components/general/loader.component';
const Auth = React.lazy(()=> import('./layouts/auth.layout'));
const Main = React.lazy(()=> import('./layouts/main.layout'));
const LoginComponent = React.lazy(()=> import( '../pages/auth/login.page'));
const Home = React.lazy(()=> import( '../pages/index.page'));
const ComponentNotFound=  React.lazy(()=> import( '../pages/misc/not-found.page'));
const Appoinments = React.lazy(()=> import( '../pages/doctor/appointments.page'));
const Patients = React.lazy(()=> import( '../pages/doctor/patients.page'));
const Scheduler = React.lazy(()=> import( '../pages/doctor/schedule.page'));
const Profile = React.lazy(()=> import( '../pages/doctor/profile.page'));
const ChangePassword = React.lazy(()=> import( '../pages/doctor/changepass.page'));
const RegisterComponent = React.lazy(()=> import( '../pages/auth/register.page'));
const AccountCreated = React.lazy(()=> import( '../pages/misc/accountcreated.page'));
export default class
    routing extends React.Component {

    render() {
        return (
            <div>
                <Suspense fallback={<LoaderComponent/>}>
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
                </Suspense>
                </div>
        )
    }
}