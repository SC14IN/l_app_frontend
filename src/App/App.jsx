import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
  
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute,GuestRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ForgotPasswordPage } from '../ForgotPasswordPage';
import { ResetPasswordPage } from '../ResetPasswordPage';
import { CreateUserPage } from '../CreateUserPage';
import { DashboardPage } from '../DashboardPage';
import { TasksPage } from '../TasksPage';
import { CreateTaskPage } from '../CreateTaskPage/CreateTaskPage';
import {EditTaskPage} from '../EditTaskPage';
import {TaskOverviewPage} from '../TaskOverviewPage';
import { UserPage } from '../UserPage';
import { VerifyPage } from '../VerifyPage';
import './styles.scss';
class App extends React.Component {
    
    render() {
        const { alert } = this.props;
        const notify = () => toast("Wow so easy!");

        return (
            <div className="jumbotron">
                <div className="container">
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        />
                        <ToastContainer />
                    
                    
                        <Router history={history}>
                            <Switch>
                                {/* guest route to login which allows to login page when not logged in  */}
                                <GuestRoute path="/login" component={LoginPage} />
                                <GuestRoute path="/register" component={RegisterPage} />
                                <GuestRoute path="/verify" component={VerifyPage} />
                                <GuestRoute path="/forgotpassword" component={ForgotPasswordPage} />
                                <GuestRoute path="/resetpassword" component={ResetPasswordPage} />
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/createUser" component={CreateUserPage} />
                                <PrivateRoute exact path="/dashboard" component={DashboardPage} />
                                <PrivateRoute  path="/tasks" component={TasksPage} />
                                <PrivateRoute exact path="/createTask" component={CreateTaskPage} />
                                <PrivateRoute exact path="/editTask" component={EditTaskPage} />
                                <PrivateRoute exact path="/overview" component={TaskOverviewPage} />
                                <PrivateRoute exact path="/performance" component={UserPage} />
                                <Redirect from="*" to="/" />

                                {/* <Route path="/test" component={TestPage} /> */}
                            </Switch>
                        </Router>
                 </div>
             </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };