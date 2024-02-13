import React, { useReducer } from 'react';
import reducer from './reducer';

const initialState = {
  editJobId: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setEditJob = () => {};
  return (
    <AppContext.Provider value={{ ...state, setEditJob }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return React.useContext(AppContext);
};
export { AppProvider, initialState, useAppContext };
