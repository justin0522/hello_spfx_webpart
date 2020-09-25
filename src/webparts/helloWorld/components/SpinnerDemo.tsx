import * as React from 'react';
import { Modal, IModalProps } from 'office-ui-fabric-react/lib/Modal'
import {
    Spinner,
    ISpinnerProps,
    SpinnerType,
    SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { DefaultButton } from 'office-ui-fabric-react';


export interface ISpinnerDemoProps {

}

export interface ISpinnerDemoState {
    isLoading: boolean;
}

export class SpinnerDemo extends React.Component<ISpinnerDemoProps, ISpinnerDemoState>{
    constructor(props: ISpinnerDemoProps) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    public componentDidMount() {

    }

    public render(): React.ReactElement<ISpinnerDemoProps> {
        const contentStyles = mergeStyleSets({
            container: {
                display: 'flex',
                flexFlow: 'column nowrap',
                alignItems: 'stretch',
                backgroundColor: 'transparent',
                boxShadow: 'unset'
            },
            spinner: {
                height: 80,
                width: 80
            }
        });
        return (
            <div>
                <DefaultButton secondaryText="Opens the Sample Modal" onClick={event => this.setState({ isLoading: true })} text="Open Modal" />
                <Modal
                    // titleAriaId={this._titleId}
                    // subtitleAriaId={this._subtitleId}
                    isOpen={this.state.isLoading}
                    //onDismiss={event => this.setState({ isLoading: false })}
                    isBlocking={false}
                    containerClassName={contentStyles.container}
                //dragOptions={this.state.isDraggable ? this._dragOptions : undefined}
                >
                    <Spinner
                        type={SpinnerType.large}
                        size={SpinnerSize.large}
                        label={'loading'}
                        labelPosition={'top'}
                        className={contentStyles.spinner}
                    />
                </Modal>
            </div>);
    }

}