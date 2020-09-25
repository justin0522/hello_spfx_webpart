import * as React from 'react';

import { DefaultPalette } from 'office-ui-fabric-react';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Label, ILabelProps } from 'office-ui-fabric-react/lib/Label';
import {
    Stack,
    IStackStyles,
    IStackTokens,
    IStackItemStyles
} from 'office-ui-fabric-react/lib/Stack';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';

export default class StackDemo extends React.Component<{}, {}> {
    private stackTokens: IStackTokens = {
        childrenGap: '10%'
    };
    private stackStyles: IStackStyles = {
        root: {
            background: DefaultPalette.themeTertiary
        }
    };

    private stackItemStyles: IStackItemStyles = {
        root: {
            width: 130
        }
    };

    private addIcon: IIconProps = { iconName: 'CheckboxComposite' };
    public render(): React.ReactElement {
       
        return (
            <Stack>
                
                <a href='#/detail'>go detail</a>
                <ActionButton iconProps={{ iconName: 'CheckboxComposite' }} onClick={() => { alert('approve button'); }}>
                    Approve
                </ActionButton>
                <ActionButton iconProps={this.addIcon}>
                    Reject
                </ActionButton>
                <ActionButton iconProps={this.addIcon}>
                    Clarify
                </ActionButton>
                <h2>View Request Details</h2>
                <Stack horizontal styles={this.stackStyles} tokens={this.stackTokens}>
                    <Stack.Item styles={this.stackItemStyles}><Text>Request Title</Text></Stack.Item>
                    <Stack.Item styles={this.stackItemStyles}><Text>Lorem ipsum dolor sit amet</Text></Stack.Item>
                    <Stack.Item styles={this.stackItemStyles}><Text>Request Type</Text></Stack.Item>
                    <Stack.Item styles={this.stackItemStyles}><Text>Document Review</Text></Stack.Item>
                </Stack>
                <Stack horizontal tokens={this.stackTokens}>
                    <Stack.Item styles={this.stackItemStyles}><Text>Current Status</Text></Stack.Item>
                    <Stack.Item styles={this.stackItemStyles}><Text>Pending</Text></Stack.Item>
                </Stack>
                <Stack horizontal tokens={this.stackTokens}>
                    <Stack.Item styles={this.stackItemStyles}>
                        <Text>Request Comments</Text>
                    </Stack.Item>
                    <Stack.Item>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                            in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                    </Stack.Item>
                </Stack>
                <h5>Document Properties</h5>
                <Stack horizontal styles={this.stackStyles} tokens={this.stackTokens}>
                    <Stack.Item styles={this.stackItemStyles}><Text>Title</Text></Stack.Item>
                    <Stack.Item styles={this.stackItemStyles}><Text>Lorem ipsum dolor sit amet</Text></Stack.Item>
                    <Stack.Item styles={this.stackItemStyles}><Text>Global Number</Text></Stack.Item>
                    <Stack.Item styles={this.stackItemStyles}><Text>A0001</Text></Stack.Item>
                </Stack>
                <Stack horizontal styles={this.stackStyles} tokens={this.stackTokens}>
                    <Stack.Item styles={this.stackItemStyles}><Text>Title</Text></Stack.Item>
                    <Stack.Item styles={this.stackItemStyles}><Text>Lorem ipsum dolor sit amet</Text></Stack.Item>
                    <Stack.Item styles={this.stackItemStyles}><Text>Global Number</Text></Stack.Item>
                    <Stack.Item styles={this.stackItemStyles}><Text>A0001</Text></Stack.Item>
                </Stack>
            </Stack>
        );
    }
}