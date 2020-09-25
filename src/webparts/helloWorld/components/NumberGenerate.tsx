import * as React from "react";

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import {
    Stack,
    IStackProps
} from "office-ui-fabric-react/lib/Stack";
import { mergeStyles, DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import {
    TextField,
    MaskedTextField,
    ITextFieldProps,
    ITextFieldStyleProps,
    ITextFieldStyles
} from "office-ui-fabric-react/lib/TextField";
import {
    Label,
    ILabelStyleProps
} from "office-ui-fabric-react/lib/Label";
////////////////////////////////////////////////////////

export interface INumberGenerateProps {
    labelTitle: string;
    buttonTitle: string;
    textValue: string;
    btnClick(date: Date): void
}

export class NumberGenerate extends React.Component<INumberGenerateProps, {}> {
    constructor(props: INumberGenerateProps) {
        super(props);
    }
    private getStyles = (props: ITextFieldStyleProps): Partial<ITextFieldStyles> => {
        const { disabled } = props;
        return {
            wrapper: [
                { display: "flex" },
                { width: "100%" },
                { marginRight: 5 }
            ]
        };
    }
    public render(): React.ReactElement {

        return (
            <Stack horizontal>
                <Label>{this.props.labelTitle}</Label>
                <div style={{ display: "flex" }}>
                    <TextField value={this.props.textValue} disabled styles={this.getStyles} />
                    <PrimaryButton text={this.props.buttonTitle} onClick={event => this.props.btnClick(new Date)} />
                </div>
            </Stack>
        );
    }
}