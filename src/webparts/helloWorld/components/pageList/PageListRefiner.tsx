import * as React from 'react';
import { Checkbox, Stack, Label, ILabelStyleProps } from 'office-ui-fabric-react';

/////////////////////////////////////////
export interface IPageListRefinerProps {
    onChange: (name: string, checked: boolean) => void;
}


export default class PageListRefiner extends React.Component<IPageListRefinerProps, {}> {
    constructor(props: IPageListRefinerProps) {
        super(props);
    }

    public render(): React.ReactElement<IPageListRefinerProps> {
        const stackTokens = { childrenGap: 20 };
        let element = <div style={{ border: '1px solid grey', padding: '20px' }}>
            <Label>Category</Label>
            <Stack horizontal tokens={stackTokens}>
                <Checkbox label="Articles" onChange={(ev, checked) => this.props.onChange('arti', checked)} />
                <Checkbox label="Promotion" onChange={(ev, checked) => this.props.onChange('prom', checked)} />
                <Checkbox label="Announcement" onChange={(ev, checked) => this.props.onChange('anno', checked)} />
                <Checkbox label="News" onChange={(ev, checked) => this.props.onChange('news', checked)} />
            </Stack>
        </div>
        return element;
    }

}