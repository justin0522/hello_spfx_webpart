import * as React from 'react';
import {
    PrimaryButton,
    DefaultButton,
    getTheme,
    ITheme,
    Separator,
    Stack,
    IStackProps,
    Text
} from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface IUseThemeColorProps {
    context: WebPartContext;
}

export class UseThemeColor extends React.Component<IUseThemeColorProps, {}>{
    constructor(props) {
        super(props);
    }

    public render() {
        const a = this.props.context.pageContext.listItem;
        console.log(a)
        return <Stack className='UseThemeColor'>
            <PrimaryButton>Primary</PrimaryButton>
            <DefaultButton>Primary</DefaultButton>
            <Separator alignContent='center'>Separator Line</Separator>
            <button className='myButton1'>myButton1</button>
            <button className='myButton2'>myButton2</button>
            <Separator alignContent='center'>Separator Line</Separator>
            <Icon iconName='Mail' />
            <button className='myButton3'>myButton3</button>
        </Stack>
    }
}