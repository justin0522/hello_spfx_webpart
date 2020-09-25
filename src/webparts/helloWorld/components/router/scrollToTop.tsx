import * as React from 'react';
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.PureComponent {
    private _topElement: HTMLElement;

    constructor(props) {
        super(props);
    }

    public componentDidUpdate() {
        setTimeout(() => this._topElement.scrollIntoView(false), 200);
    }

    public render(): React.ReactElement {
        return (
            <div ref={(topElement) => this._topElement = topElement!}></div>
        )
    }
}

export default withRouter(ScrollToTop);



