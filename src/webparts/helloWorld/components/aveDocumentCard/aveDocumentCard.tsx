import * as React from 'react';
import {
    PrimaryButton,
    DefaultButton,
    Checkbox,
    Stack,
    DocumentCard,
    DocumentCardPreview,
    DocumentCardDetails,
    DocumentCardTitle,
    DocumentCardType,
    DocumentCardActivity,
    IDocumentCardPreviewProps,
    ImageFit,
    IconType,
    Icon,
    Label,
    Text,
    IconButton, ActionButton,
    IconNames
} from 'office-ui-fabric-react';

export interface IAveDocumentCardProps {
    previewImageSrc: string;
    category: string;
    description: string;
    modifiedon: string;
    itemId: string;
    onCheckboxChange?: (itemId: string, checked: boolean) => void;
}

export default class AveDocumentCard extends React.Component<IAveDocumentCardProps, {}>{
    constructor(props: IAveDocumentCardProps) {
        super(props);
    }

    public render() {

        const previewProps: IDocumentCardPreviewProps = {
            previewImages: [
                {
                    previewImageSrc: this.props.previewImageSrc, //'https://m365x367613.sharepoint.com/sites/myteam/SiteAssets/up-up-man.png',
                    //iconSrc: TestImages.iconPpt,
                    imageFit: ImageFit.cover,
                    width: 318,
                    height: 196,
                },
            ],
        };

        return (<div>
            <Stack horizontal={true}>
                <Checkbox label={''} onChange={(ev, checked) => this.props.onCheckboxChange(this.props.itemId, checked)} />

                <div>
                    <Label>{this.props.category}</Label>
                    <DocumentCard type={DocumentCardType.compact} styles={{ root: { maxWidth: '2000px' } }}>
                        <DocumentCardPreview {...previewProps} />
                        <DocumentCardDetails>
                            <DocumentCardTitle title={this.props.description} shouldTruncate={false} />
                            <DocumentCardActivity activity={null} people={[]} />
                            {/* <Icon iconName={'Calendar'} /><Text>Feb 17 2020</Text> */}
                            <ActionButton iconProps={{ iconName: 'Calendar' }} disabled={true} text={this.props.modifiedon} />
                        </DocumentCardDetails>
                    </DocumentCard>
                </div>
            </Stack>
        </div>)
    }

}