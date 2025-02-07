import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Header from './components/Header';
import Loader from "./components/Progress"
const MarketingLazy = lazy(()=> import("./components/MarketingApp"));
const AuthLazy = lazy(()=> import("./components/AuthApp"));

const  generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  return (
      <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
      <div>
          <Header/>
          <Suspense fallback={<Loader/>}>
            <Switch>
              {/* <Route path="/" component={MarketingLazy} exact={true} />
              <Route path="/pricing" component={MarketingLazy}  />
              <Route path="/auth" component={AuthLazy} /> */}
              <Route path="/auth" component={AuthLazy}></Route>
              <Route path="/" component={MarketingLazy}></Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
        

      </BrowserRouter>
      
  );
};
