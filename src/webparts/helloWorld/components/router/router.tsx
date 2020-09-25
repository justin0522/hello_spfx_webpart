import * as React from 'react';
import { HashRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { CommonConstants } from './constants';
import PageList from '../pageList/PageList';
import PageNav from '../pageNav/pageNav';
import { IRouterProps } from './IRouterProps';
import ScrollToTop from './scrollToTop';
import styles from './YokogawaEdmsSystem.module.scss';

class CommonRouter extends React.Component<IRouterProps, any> {
    _v: { router: any; };
    //state: {};
    constructor(props) {
        super(props);
        this.state = {

        }
        this._v = { router: CommonConstants.router };
    }

    public render(): React.ReactElement<IRouterProps> {
        return (
            <React.Fragment>
                <Router>
                    <ScrollToTop />
                    <div>
                        <PageNav></PageNav>
                        <div className={styles.EMDSBoby}>
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={(props) => <PageList {...props} context={this.props.context} />}
                                />
                                {
                                    this._v.router.map((r) => {
                                        return (r.exact ? <Route
                                            exact
                                            key={r.key}
                                            path={r.url}
                                            render={(props) => <r.component {...props} context={this.props.context} />}
                                        /> : <Route
                                                key={r.key}
                                                path={r.url}
                                                render={(props) => <r.component {...props} context={this.props.context} />}
                                            />)
                                    })
                                }
                                <Redirect to="/" />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </React.Fragment>
        );
    }
}
export default CommonRouter;
