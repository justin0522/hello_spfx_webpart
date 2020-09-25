import * as React from 'react';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { Text, Label, ILabelStyles } from 'office-ui-fabric-react';
import { sp } from '@pnp/sp';
import { Web, Webs } from '@pnp/sp/webs';
import "@pnp/sp/lists";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import '@pnp/sp/security';
import "@pnp/sp/site-users";

import { IItem } from '@pnp/sp/items';
import { IFileInfo } from '@pnp/sp/files';

import styles from './basicPageInfo.modules.scss'

export interface IPageInfoProps {
    context: IWebPartContext;
}

export interface IPageInfoState {
    createdon: string;
    modifiedon: string;
    author: string;
    editor: string;
}

export default class PageInfo extends React.Component<IPageInfoProps, IPageInfoState> {
    constructor(props: IPageInfoProps) {
        super(props);
        this.state = {
            createdon: '',
            modifiedon: '',
            author: '',
            editor: ''
        }
    }

    public componentDidMount() {
        this._getPageInfo().then(() => console.log('end'));
    }

    public render(): React.ReactElement<IPageInfoProps> {
        let myStyle: ILabelStyles = { root: { color: 'red' } };

        return (<div>
            <Label className={'styles.myClass'} style={{ color: 'red' }} styles={myStyle}>Created at {this.state.createdon} by {this.state.author}</Label>
            <Label>Last modified at {this.state.modifiedon} by {this.state.editor}</Label>
        </div>)

    }

    private _getPageInfo = async (): Promise<void> => {
        let listItem = this.props.context.pageContext.listItem;
        if (!listItem) {
            let web = Web(this.props.context.pageContext.web.absoluteUrl);
            //let listTitle = this.props.context.pageContext.list.title;
            let item: IItem = await web.lists.getByTitle('site pages').items.getById(1).get();

            let author = await web.siteUsers.getById(item['AuthorId']).get();
            let editor = await web.siteUsers.getById(item['EditorId']).get();

            this.setState({
                createdon: item['Created'],
                modifiedon: item['Modified'],
                author: author.Title,
                editor: editor.Title
            });
        }
    }
}