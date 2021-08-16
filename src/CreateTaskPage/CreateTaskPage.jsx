import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
var qs = require("qs");

class CreateTaskPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                title:'',
                description:'',
                duedate:'',
                assignee:qs.parse(this.props.location.search, {
                    ignoreQueryPrefix: true,
                }).id,
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectAssignee = this.selectAssignee.bind(this);
    }
    componentDidMount() {
        //
        this.props.getUsers();
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.title&&user.description&&user.duedate) {
            // console.log(user);
            this.props.createTask(user);
        }
    }
    selectAssignee(e){
        const { user } = this.state;
        this.setState({
            user:{
                ...user,
                 assignee:e.target.value
                }
        });
        // console.log(user,e.target.value);
    }
    render() {
        const { create,users  } = this.props;
        const { user, submitted } = this.state;
        const id = qs.parse(this.props.location.search, {
			ignoreQueryPrefix: true,
		}).id;
        return (
            <div className='formdiv'>
                <h2>Create Task</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.title ? ' has-error' : '')}>
                        <label htmlFor="text">Title</label><br></br>
                        <input type="text"  name="title" value={user.title}  onChange={this.handleChange} />
                        {submitted && !user.title &&
                            <div className="help-block">Title is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.description ? ' has-error' : '')}>
                        <label htmlFor="text">Description</label><br></br>
                        <input type="text"  name="description" value={user.description} onChange={this.handleChange} />
                        {submitted && !user.description &&
                            <div className="help-block">Description is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.duedate ? ' has-error' : '')}>
                        <label htmlFor="text">Duedate(Y-m-d H:i:s)</label><br></br>
                        <input type="text"  name="duedate" value={user.duedate} onChange={this.handleChange} />
                        {submitted && !user.duedate &&
                            <div className="help-block">duedate is required</div>
                        }
                    </div>
                    <div>Assignee<br></br>
                            <select style={{width: "25%",backgroundColor:'#f1f1f1',height:'45px',borderRadius:'4px',border:'1px solid #ccc'}} onChange={this.selectAssignee}>
                                <option value={user.id} >Me</option>
                                {users.items && users.items.map((item) => (
                                    
                                    (id!=item.id)?(<option value={item.id} key={item.id}>{item.email}</option>):null
                                ))}
                            </select>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type='submit'>Submit</button>
                        {create && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/tasks" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}
function mapState(state) {
    // //reducer
    const { users, authentication } = state;
    const { user } = authentication;
    const { create } = state.createtask;
    return { user, users, create};

}

const actionCreators = {
    //
    createTask: userActions.createtask,
    getUsers: userActions.getAll,
}

const connectedPage = connect(mapState, actionCreators)(CreateTaskPage);
export { connectedPage as CreateTaskPage };
