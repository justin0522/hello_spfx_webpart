import * as React from 'react';
import {
    DefaultButton,
    Stack,
    IStackStyles,
    IStackTokens,
    IStackItemStyles,
    IList
} from 'office-ui-fabric-react';

import { sp } from "@pnp/sp";
import { Web } from '@pnp/sp/webs';
import "@pnp/sp/lists";
import "@pnp/sp/folders";
import { IItem } from "@pnp/sp/items";
import "@pnp/sp/files";
import "@pnp/sp/content-types";
import '@pnp/sp/security';
import SharePointUtility from '../../../common/SharePointUtility';
import { ISPField } from '../../../common/ISharePointUtilityProps';
import { IWebPartContext } from '@microsoft/sp-webpart-base';


export interface IPnpDemoProps {
    context: IWebPartContext;
    folderName: string;
}

export class PnpDemo extends React.Component<IPnpDemoProps, {}> {
    constructor(props) {
        super(props);
    }

    public render(): React.ReactElement<IPnpDemoProps> {

        return (<div>
            <DefaultButton text={'click'} onClick={this._clickBtn} />
        </div>);
    }

    private _clickBtn = (event) => {
        //this._getFileStatus().then(() => console.log('ok'))
        this._uploadFile().then(() => console.log('ok'))
        //this._changePermission().then(() => console.log('ok'))
        //this._createFolder().then(() => console.log('ok'))
        //this._getFolderCT().then(() => console.log('ok'));
    }

    private _getFileStatus = async (): Promise<void> => {
        let siteUrl = 'https://m365x489811.sharepoint.com/sites/Contoso';
        let checkoutUser = await SharePointUtility.GetCheckedOutByUser(this.props.context, siteUrl, '50c42652-cfbc-4548-9349-cf105095e63b');
        console.log(checkoutUser);
        let lockedByUser = await SharePointUtility.GetLockedByUser(this.props.context, siteUrl, '50c42652-cfbc-4548-9349-cf105095e63b');
        console.log(lockedByUser);
        let list = sp.web.lists.getByTitle('Documents');
        //let file = await list.rootFolder.files.getByName("Doc1.docx");
        let file = sp.web.getFileById('');
        console.log(file.data);
        console.log(file.versions);
    }

    private _uploadFile = async (): Promise<void> => {
        let folderName = '3333333333333333333333333333344444444444444444444444444444444444444444444444555555555555555555555555';
        let fileName = '我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下我觉得的前台限制一下.txt';

        let list = sp.web.lists.getByTitle('Documents');
        let folderAddResult = await list.rootFolder.folders.add(folderName);
        //let folder = await list.rootFolder.folders.getByName('MyFolder11111111111111111111111111111111111122222222222222222222222222222333333333333333333333333333333333333344444444444444444444444444444444444444444444444555555566666666666666666666');
        //folder.files.add('myfiles111111111111111111111111111111122222222223333333333444444444455555555556666666666.txt', "hello world", true);
        console.log(encodeURI(folderAddResult.data.ServerRelativeUrl + '/' + fileName));
        let fileAddResult = await sp.web.getFolderByServerRelativeUrl("!@p1::" + folderAddResult.data.ServerRelativeUrl).files.add("!@p2::" + fileName, "hello world", true);
        console.log(fileAddResult.data);
    }

    private _changePermission = async (): Promise<void> => {
        let list = sp.web.lists.getByTitle('JustinList');
        let item = list.items.getById(1);
        await item();
        let result = await item.breakRoleInheritance();
        console.log(result);
    }

    private _getFolderCT = async (): Promise<void> => {
        let web = Web('https://avefelab.sharepoint.com/sites/care2');
        let list = web.lists.getByTitle('Documents');
        list.items()
        list.breakRoleInheritance(true);
        let folderCT = list.contentTypes.select('StringId').filter("Name eq 'Folder'");
        // let infos = await folderCT();
        // infos.forEach(ct => console.log(ct));

        console.log();
    }

    private _createFolder = async (): Promise<void> => {
        let web = Web('https://avefelab.sharepoint.com/sites/DeveloperBackWorkSite');
        let list = web.lists.getByTitle('YokogawaDMSRequestHistory'); //('Justin');
        let folderName = 'JustinFolder6';
        //let newFolderResult = await list.rootFolder.folders.add(folderName);
        let newItemResult = await list.items.add({
            Title: folderName,
            //FileLeafRef: folderName,
            //FileSystemObjectType: SP.FileSystemObjectType.folder,
            ContentTypeId: "0x012000D48AD4A9EDDFF44F8CC9F64FFB5F5A84009C97A2EB146A2A49BC2B9BF8333107E3" //"0x0120002C05EA43E3043E49A9E008461E727BD8"
        });
        list.items.getById(newItemResult.data.Id).update({
            FileLeafRef: folderName
        });

        // let item: IItem = await newItemResult.item();
        // item.update({
        //     FileLeafRef: folderName
        // });
        // let newFolderResult = await list.rootFolder.folders.add(folderName);
        // const item = await newFolderResult.folder.listItemAllFields();
        // await list.items.getById(item.ID).update({
        //     ContentTypeId: "0x0120002C05EA43E3043E49A9E008461E727BD8",
        //     //MyFolderField: "field value",
        //     Title: "My New Folder",
        // });
    }
}