import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import SideNav from './Sidebar';
class DashboardPage extends React.Component {
    //create user error aithentication 
    componentDidMount() {
        //get tasks
    }

    handleDeleteUser(id) {
        //deletejob
    }
    // filterByName(e){
    //     let input = e.target.value;
    //     // console.log('a');
    //     this.props.filterbyname(input);
    // }
    // filterByEmail(e){
    //     let input = e.target.value;
    //     // console.log('a');
    //     this.props.filterbyemail(input);
    // }
    // filterByRole(e){
    //     let input = e.target.value;
    //     // console.log('a');
    //     this.props.filterbyrole(input);
    // }
    
    render() {
        
        return (
            <br></br>
        );
    }
}

function mapState(state) {
}

const actionCreators = {
}

const connectedPage = connect(mapState, actionCreators)(DashboardPage);
export { connectedPage as DashboardPage };