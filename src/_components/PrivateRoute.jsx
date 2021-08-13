import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import {userActions} from '../_actions';

// class PrivateRoute extends React.Component{
//     constructor(props){
//         super(props)
//         this.state= {user:null};
//     }
//     componentDidMount() {
//         userActions.getuser()
//           .then(user => console.log(user) )
//     }
//     render () {
//         const { user } = this.state;
//         // console.log(user);
//         const Component = this.props.component;
//         return user ? <Component/>
//         :<Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//       }
// }
// export default PrivateRoute;