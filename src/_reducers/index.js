import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import {forgotpassword} from './forgotpassword.reducer';
import {resetting} from './resetting.reducer';
import {createuser} from './createuser.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  forgotpassword,
  resetting,
  createuser,
});

export default rootReducer;