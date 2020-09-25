import * as React from "react";
import * as ReactDom from "react-dom";
import {
    Dropdown,
    IDropdownProps,
    IPersonaProps
} from 'office-ui-fabric-react';

export interface IDropdownDemoProps {

}

export interface IDropdownDemoState {
    selectedKeys: string[];
}

export class DropdownDemo extends React.Component<IDropdownDemoProps, IDropdownDemoState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: []
        }
    }

    render() {
        const options = [{ key: 'Enter Choice #1', text: 'Enter Choice #1' }, { key: 'Enter Choice #2', text: 'Enter Choice #2' }, { key: 'Enter Choice #3', text: 'Enter Choice #3' }];
        return (<Dropdown
            options={options}
            multiSelect={true}
            selectedKeys={this.state.selectedKeys}
            onChange={(event, option) => {
                if (option.selected) {
                    let temp = this.state.selectedKeys;
                    temp.push(option.key.toString());
                    this.setState({ selectedKeys: temp });
                } else {
                    let temp = this.state.selectedKeys;
                    temp = temp.filter((f) => f != option.key.toString());
                    this.setState({ selectedKeys: temp });
                }

                console.log(option.key);
            }}
        />);
    }
}