import { IWebPartContext, WebPartContext } from '@microsoft/sp-webpart-base';
import {
    ISPList,
    ISPContentType,
    ISPField, ISPListItem
} from '../../../common/ISharePointUtilityProps';

export interface ICustomFormProps {
    context: WebPartContext;
    listTitle: string;
}

export interface ICustomFormState {
    listId: string;
    selectedItem?: { key: string | number | undefined };
    fields: ISPField[];
    contentTypes: any;
    data: any;
    errors: any;
    lookupOptions: any;
    termSetMapping: any;
}

export interface IListFormProps {
    context: WebPartContext;
    // listTitle: string;
    data: any
    error: any
    fields: ISPField[];
    lookupOptions: any;
    termSetMapping: any;
    onChange(fieldName: string, newValue: any): void
}

export interface IListFormState {
    listId: string;
    selectedItem?: { key: string | number | undefined };
    fields: ISPField[];
    //contentTypes:any;
}
