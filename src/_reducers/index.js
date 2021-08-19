import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {forgotpassword} from './forgotpassword.reducer';
import {resetting} from './resetting.reducer';
import {createuser} from './createuser.reducer';
import {jobs} from './jobs.reducer';
import {createtask} from './createtask.reducer';
import {edit} from './edit.reducer';
import { overview } from './overview.reducer';
import {verify} from './verify.reducer';

import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  forgotpassword,
  resetting,
  createuser,
  jobs,
  createtask,
  edit,
  overview,
  verify,
  form:reduxFormReducer,
});

export default rootReducer;