import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { Text, TextField, ITextFieldStyles, PrimaryButton, DefaultButton, Stack } from 'office-ui-fabric-react';
import { sp } from '@pnp/sp';
import { Web } from '@pnp/sp/webs'
import "@pnp/sp/lists";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import '@pnp/sp/security';
import "@pnp/sp/site-users";
import { IItem } from '@pnp/sp/items';
import { IFileInfo } from '@pnp/sp/files';
import AveDocumentCard, { IAveDocumentCardProps } from '../aveDocumentCard/aveDocumentCard';
import { resultContent } from 'office-ui-fabric-react/lib/components/ExtendedPicker/PeoplePicker/ExtendedPeoplePicker.scss';


export interface IPageFormProps extends RouteComponentProps<any> {
    context: IWebPartContext;
}

export interface IPageFormState {
    emailSubject: string;
    emailTo: string;
    items: IAveItemInfo[];
}

export interface IAveItemInfo {
    previewImageSrc: string;
    category: string;
    description: string;
    modifiedon: string;
    itemId: string;
}

export default class PageForm extends React.Component<IPageFormProps, IPageFormState>{
    constructor(props: IPageFormProps) {
        super(props);

        this.state = {
            emailSubject: '',
            emailTo: '',
            items: []
        };
    }

    public componentDidMount() {
        this._getAllPages().then(() => { console.log('end') });
    }

    public render(): React.ReactElement<IPageFormProps> {
        let myStyle: Partial<ITextFieldStyles> = {
            root: { marginTop: '20px' }
        };

        let elements = this.state.items.map(item => {
            return <AveDocumentCard itemId={item.itemId} category={item.category} previewImageSrc={item.previewImageSrc} description={item.description} modifiedon={item.modifiedon} />
        });

        return (
            <div>
                <TextField value={this.state.emailSubject ? this.state.emailSubject : ''} onChange={(event, newValue) => this.setState({ emailSubject: newValue })} placeholder={'Mail subject'} styles={myStyle} />
                <TextField value={this.state.emailTo ? this.state.emailTo : ''} onChange={(event, newValue) => this.setState({ emailTo: newValue })} placeholder={'Mail to'} styles={myStyle} />
                <div>
                    {elements}
                </div>
                <div style={{ float: 'right' }}>
                    <Stack horizontal={true} tokens={{ childrenGap: 15 }} styles={{ root: { marginTop: '20px' } }} >
                        <PrimaryButton onClick={e => this._postItem().then(() => console.log('end'))}>Send news Digest</PrimaryButton>
                        <DefaultButton>Back</DefaultButton>
                        <DefaultButton>Cancel</DefaultButton>
                    </Stack>
                </div>
            </div>
        )
    }

    private _getAllPages = async (): Promise<void> => {
        let web = Web(this.props.context.pageContext.web.absoluteUrl);
        //let listTitle = this.props.context.pageContext.list.title;
        let allItems = await web.lists.getByTitle('site pages').items.getAll();
        let datas = allItems.map(item => {
            return {
                previewImageSrc: item['imge'],
                category: item['category'],
                description: item['description0'],
                modifiedon: item['Modified'],
                itemId: item['ID']
            }
        });

        this.setState({ items: datas });
    }

    private _postItem = async (): Promise<void> => {
        let itemInfo = {
            subject: this.state.emailSubject,
            mailto: this.state.emailTo,
            ids: this.state.items.map(item => item.itemId).join(';')
        };
        let web = Web(this.props.context.pageContext.web.absoluteUrl);
        //let listTitle = this.props.context.pageContext.list.title;
        let newItem = await web.lists.getByTitle('pageform').items.add(itemInfo);
        alert(newItem.data.Id);
        this.props.history.push({
            pathname: '/sucess',
            search: '',
            state: {}
        })
    }

}