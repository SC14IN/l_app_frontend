import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class EditTaskPage extends React.Component {
    constructor(props) {
        super(props);
        const {job} = this.props;
        const copy = {...job};
        this.state = {
            user: {
                title:copy.title,
                description:copy.description,
                duedate:copy.duedate,
                assignee:'',
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectAssignee = this.selectAssignee.bind(this);
        this.prefilledForm = this.prefilledForm.bind(this);
    }
    componentDidMount() {
        this.props.getUsers();
        // this.props.getTasks();
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
        // console.log(user);
    }
    prefilledForm(job){
        const { user } = this.state;
        this.setState({
            user : {
                ...user,
                title:job.title,
                description:job.description,
                duedate:job.duedate
            }
        });
    }
    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.title&&user.description&&user.duedate) {
            // console.log(user);
            // this.props.createTask(user);//call api
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
        const { edit,users,job  } = this.props;
        const { user, submitted } = this.state;
        const copy = {...job};
        
        return (
            <div className='formdiv'>
            {/* <div>{this.prefilledForm(job)}</div> */}
                
                {/* {console.log(job)} */}
                <h2>Edit Task</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.title ? ' has-error' : '')}>
                        <label htmlFor="text">Title</label><br></br>
                        <input type="text"  name="title" value={user.title}  onChange={this.handleChange} />
                        {submitted && !user.title &&
                            <div className="help-block">Title is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.description ? ' has-error' : '')}>
                        <label htmlFor="text">Description</label>
                        <input type="description"  name="description" value={user.description}onChange={this.handleChange} />
                        {submitted && !user.description &&
                            <div className="help-block">Description is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.duedate ? ' has-error' : '')}>
                        <label htmlFor="text">Duedate(Y-m-d H:i:s)<br></br></label><br></br>
                        <input type="text"  name="duedate" value={user.duedate} onChange={this.handleChange} />
                        {submitted && !user.duedate &&
                            <div className="help-block">duedate is required</div>
                        }
                    </div>
                    <div>Assignee<br></br>
                            <select style={{width: "55%",backgroundColor:'#f1f1f1',height:'45px',borderRadius:'4px',border:'1px solid #ccc'}} onChange={this.selectAssignee}>
                                <option >{copy.assigneeName}</option>
                                {users.items && users.items.map((item) => (
                                    
                                    <option value={item.id}>{item.email}</option>
                                ))}
                            </select>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type='submit'>Submit</button>
                        {/* {edit && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        } */}
                        <Link to="/tasks" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}
function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    const { edit,job } = state.edit;
    return { user, users, edit,job};
}
const actionCreators = {
    getTasks: userActions.getjobs,
    createTask: userActions.createtask,
    getUsers: userActions.getAll,
}
const connectedPage = connect(mapState, actionCreators)(EditTaskPage);
export { connectedPage as EditTaskPage };
