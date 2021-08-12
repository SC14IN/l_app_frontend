import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class VerifyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                token:''
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);/////check
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,//shallow copy and deepcopy
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.token) {
            this.props.verifyuser(user);
        }
    }

    render() {
        const { verifying  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className='formdiv'>
                <h2>Verify</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.token ? ' has-error' : '')}>
                        <label htmlFor="Token">Token<br></br></label>
                        <input type="text" className="form-control" name="token" value={user.token} onChange={this.handleChange} />
                        {submitted && !user.token &&
                            <div className="help-block">Token is required</div>
                        }
                    </div>
                    
                    <div className="form-group">
                        <button className="btn btn-primary" type = 'submit'>Submit</button>
                        {verifying && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <div>
                            Already have an account? 
                            <Link to="/login" className="btn btn-link">Login</Link>
                        </div>
                        {/* <Link to="/login" className="btn btn-link">Cancel</Link> */}
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {//
    const { verifying } = state.verify;
    return { verifying };
}

const actionCreators = {
    verifyuser: userActions.verifyuser
}

const connectedPage = connect(mapState, actionCreators)(VerifyPage);
export { connectedPage as VerifyPage };