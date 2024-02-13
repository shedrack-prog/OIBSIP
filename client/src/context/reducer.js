import { SET_EDIT_JOB } from './actions';
import { initialState } from './appContext';

const reducer = (state, action) => {
  if (action.type === SET_EDIT_JOB) {
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
