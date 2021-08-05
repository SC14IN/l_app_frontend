import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
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
// import './styles.scss';
class App extends React.Component {
    // constructor(props) {
    //     super(props);

    //     history.listen((location, action) => {
    //         // clear alert on location change
    //         this.props.clearAlerts();
    //     });
    // }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                {/* guest route to login which allows to login page when not logged in  */}
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/forgotpassword" component={ForgotPasswordPage} />
                                <Route path="/resetpassword" component={ResetPasswordPage} />
                                {/* <Route path="/createUser" component={CreateUserPage} /> */}
                                <PrivateRoute exact path="/createUser" component={CreateUserPage} />
                                <PrivateRoute exact path="/dashboard" component={DashboardPage} />
                                <PrivateRoute exact path="/tasks" component={TasksPage} />
                                <PrivateRoute exact path="/createTask" component={CreateTaskPage} />
                                <PrivateRoute exact path="/editTask" component={EditTaskPage} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
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