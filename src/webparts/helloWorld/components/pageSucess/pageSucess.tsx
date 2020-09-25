import * as React from 'react';
import { PrimaryButton, DefaultButton, Label, Stack, Icon, IconType, Text } from 'office-ui-fabric-react';


export default class PageSucess extends React.Component<{}, {}>{
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <Stack tokens={{ childrenGap: 15 }} >
                <Stack.Item align="center">
                    <Icon iconName={'SkypeCircleCheck'} iconType={IconType.Default} style={{ fontSize: '32px' }} />
                </Stack.Item>
                <Stack.Item align="center">
                    {/* <Label style={{ fontSize: '32px' }}>EDM is sent successfully!</Label> */}
                    <Text block={true} variant={'xxLarge'}>EDM is sent successfully!</Text>
                </Stack.Item>
                <Stack.Item align="center">
                    <PrimaryButton onClick={(ev) => console.log('end')} text={'OK'}></PrimaryButton>
                </Stack.Item>
            </Stack>
        )
    }
}