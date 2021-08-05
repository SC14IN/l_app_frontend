import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
// import SideNav from './Sidebar';
class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.getjobs();
    }
    handleDeleteUser(id) {
        this.props.deletejob(id);
    }
    render() {
        const { jobs } = this.props;
        return (
            <div>
            <div  style={{backgroundColor:'#555',height:'40px' }}>
            </div>
            <div>
                <ul className = 'navbar'>
                    <li><a href="/">Home</a></li>
                    <li><a className="active" href='/dashboard'>Dashboard</a></li>
                    <li><a href="/tasks">Tasks</a></li>
                </ul>
            </div> 
            <div style={{ marginLeft:'20%' }}>
                <h2>Tasks</h2>
                    {/* {jobs.loading && <em>Loading Tasks...</em>}
                    {jobs.error && <span className="text-danger">ERROR: {jobs.error}</span>} */}
                    <div>
                        <ul className='listing' style={{width:'40%',backgroundColor:'#f1f1f1',padding:'20px'}}>
                            {jobs.items && jobs.items.map((item) => {
                            return <li style={{outline:'auto' ,padding:'5px',borderRadius:'0'}} key={item.id}>
                                <div>
                                    <h4>{item.title}</h4>
                                    <div style={{wordWrap:'break-word'}}>-{' '}{item.description}{' '}</div>
                                    <br></br>-{item.assignerName}
                                    <br></br>Duedate:{' '}{item.duedate},{' '}{item.status}
                                    
                                </div>
                            </li>
                            })}
                        </ul>
                        
                    </div>
                    
                </div>
            </div>
        );
    }
}
function mapState(state) {
    const { jobs, authentication } = state;
    const { user } = authentication;
    return { user, jobs };
}
const actionCreators = {
    getjobs:userActions.getjobs,
    deletejob:userActions.deletejob
}
const connectedPage = connect(mapState, actionCreators)(DashboardPage);
export { connectedPage as DashboardPage };