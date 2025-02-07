import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';
// Mount function to start up the app
const mount = (el, { onNavigate, defaultBrowserHistory, initialPath }) => {
  const history = defaultBrowserHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });
  if(onNavigate) {
    history.listen(onNavigate); // call onNavigate whenever mem route changes with location
  }
  
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate: ({ pathname: nextPathName})=>{
      const { pathname } = history.location;
      if(nextPathName !== pathname) {
        history.push(nextPathName);
      }
    }
  }
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultBrowserHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
