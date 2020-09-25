import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch, HashRouter } from 'react-router-dom'; 

import StackDemo from './StackDemo';
import DetailDemo from './DetailDemo';

export default class SinglePageApp extends React.Component<{}, {}> {
    public render(): React.ReactElement{
      return (
      <HashRouter>
        <Switch>
            <Route exact path="/" component={()=> <StackDemo />}/>
            <Route exact path="/detail" component={()=> <DetailDemo />}/>
        </Switch>
    </HashRouter>
    );
    }
  }