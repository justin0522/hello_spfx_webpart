import { WebPartContext, IWebPartContext } from '@microsoft/sp-webpart-base';
import {ISPField} from '../../common/ISharePointUtilityProps';

export interface IFormFieldsProps {
    context: WebPartContext;
    // listTitle: string;
    data: any
    error: any
    fields: ISPField[];
    lookupOptions: any;
    onChange(fieldName: string, newValue: any): void
}