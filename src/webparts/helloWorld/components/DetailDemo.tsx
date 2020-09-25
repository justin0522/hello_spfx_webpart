import * as React from 'react';
import { Fabric, TextField, asAsync } from 'office-ui-fabric-react';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { DefaultPalette, Stack, IStackStyles, IStackTokens, IStackItemStyles } from 'office-ui-fabric-react';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 }
};
const options: IDropdownOption[] = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' }
];

const oneOptions: IDropdownOption[] = [
    { key: 0, text: 'Fruits', itemType: DropdownMenuItemType.Normal }
];

export default class DetailDemo extends React.Component<{}, {}> {
    public render(): React.ReactElement {
        let demo ={
            aa: "aaa", bb:0
        };
        return (
            <Fabric>
                <a href='#/stack'>go stack</a>
                <h2>Submit a Request</h2>
                <Stack horizontal tokens={{ childrenGap: '10%' }}>
                    <TextField label="Request Title " required />
                    <Dropdown
                        placeholder="place holder"
                        label="Request Type"
                        selectedKey={demo["bb"]}
                        //defaultSelectedKeys={['apple', 'banana', 'grape']}
                        //multiSelect
                        options={oneOptions}
                        styles={dropdownStyles}
                    />
                </Stack>
                <Stack></Stack>
            </Fabric>
        );
    }
}