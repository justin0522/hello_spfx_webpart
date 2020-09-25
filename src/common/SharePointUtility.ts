import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { ISPList, ISPContentType, ISPField, ISPListItem } from './ISharePointUtilityProps';

export default class SharePointUtility {
    constructor() { }

    public static async createList(context: IWebPartContext,
        listTitle: string,
        listDescription: string,
        baseTemplate: number,
        enableApproval: boolean = true,
        enableVersioning: boolean = false): Promise<any> {
        const reqJSON: any = JSON.parse(
            `{
            "@odata.type": "#SP.List",
            "AllowContentTypes": true,
            "BaseTemplate": ${baseTemplate},
            "ContentTypesEnabled": true,
            "Description": "${listDescription}",
            "Title": "${listTitle}"
        }`);

        if (enableApproval) {
            reqJSON.EnableModeration = true;
        }

        if (enableVersioning) {
            reqJSON.EnableVersioning = true;
        }

        const response: SPHttpClientResponse = await context.spHttpClient.post(
            context.pageContext.web.absoluteUrl + "/_api/web/lists",
            SPHttpClient.configurations.v1,
            {
                body: JSON.stringify(reqJSON),
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json"
                }
            });
        const json = await response.json();
        return json;
    }

    public static async GetWebLists(context: IWebPartContext): Promise<ISPList[]> {
        const response = await context.spHttpClient.get(context.pageContext.web.absoluteUrl +
            `/_api/web/lists?$filter=hidden eq false&$select=Title,Id,Url,BaseTemplate&$orderby=Title`,
            SPHttpClient.configurations.v1);

        const json = await response.json();
        return json.value;
    }

    public static async CheckListExists(context: IWebPartContext, listTitle: string): Promise<boolean> {
        const response = await context.spHttpClient.get(context.pageContext.web.absoluteUrl +
            `/_api/web/lists/GetByTitle('${listTitle}')?$select=Title`,
            SPHttpClient.configurations.v1);
        if (response.status === 404) {
            return false;
        }
        else {
            return true;
        }
    }

    public static async GetListInfo(context: IWebPartContext, listTitle: string): Promise<ISPList> {
        const response = await context.spHttpClient.get(context.pageContext.web.absoluteUrl +
            `/_api/web/lists/GetByTitle('${listTitle}')?$select=Title,Id`,
            SPHttpClient.configurations.v1);

        const json = await response.json();
        return json;
    }

    public static async GetListContentTypes(context: IWebPartContext, listId: string): Promise<ISPContentType[]> {
        const response = await context.spHttpClient.get(context.pageContext.web.absoluteUrl +
            `/_api/web/lists('${listId}')/contenttypes?$select=Name,StringId`,
            SPHttpClient.configurations.v1);

        const json = await response.json();
        return json.value;
    }

    public static async GetListContentTypeByName(context: IWebPartContext, siteUrl: string, listTitle: string, ctName: string): Promise<ISPContentType[]> {
        const response = await context.spHttpClient.get(siteUrl +
            `/_api/web/lists/GetByTitle('${listTitle}')/contenttypes?$filter=name eq '${ctName}'&$select=Name,StringId`,
            SPHttpClient.configurations.v1);

        const json = await response.json();
        return json.value;
    }

    public static async GetFieldsOfListContentType(context: IWebPartContext, siteUrl: string, listTitle: string, ctId: string): Promise<ISPField[]> {
        let FieldProperties = `$select=DefaultValue,Description,Group,Id,Required,EntityPropertyName,InternalName,StaticName,Title,TypeAsString,MaxLength,
    NumberOfLines,MaximumValue,MinimumValue,EditFormat,Choices,DisplayFormat,SelectionMode,LookupField,LookupList,LookupWebId,TermSetId,SspId,TextField`;
        const response = await context.spHttpClient.get(siteUrl +
            `/_api/web/lists/GetByTitle('${listTitle}')/contenttypes('${ctId}')/fields?$filter=hidden eq false&` + FieldProperties,
            SPHttpClient.configurations.v1);

        const json = await response.json();
        return json.value;
    }

    public static async GetFieldsByContentTypeName(context: IWebPartContext, siteUrl: string, listTitle: string, ctName: string): Promise<ISPField[]> {
        const cts = await SharePointUtility.GetListContentTypeByName(context, siteUrl, listTitle, ctName);

        return SharePointUtility.GetFieldsOfListContentType(context, siteUrl, listTitle, cts[0].StringId);
    }

    public static async GetWebContentTypes(context: IWebPartContext): Promise<ISPContentType[]> {
        const response = await context.spHttpClient.get(context.pageContext.web.absoluteUrl +
            '/_api/web/contenttypes?$select=Name,StringId',
            SPHttpClient.configurations.v1);

        const json = await response.json();
        return json.value;
    }

    public static async GetFieldsOfWebContentType(context: IWebPartContext, ctId: string): Promise<ISPField[]> {
        const response = await context.spHttpClient.get(context.pageContext.web.absoluteUrl +
            `/_api/web/contenttypes('${ctId}')/fields`,
            SPHttpClient.configurations.v1);

        const json = await response.json();
        return json.value;
    }

    public static async GetListFieldByName(context: IWebPartContext, siteUrl: string, listTitle: string, fieldName: string): Promise<ISPField[]> {
        const response = await context.spHttpClient.get(siteUrl +
            `/_api/web/lists/GetByTitle('${listTitle}')/fields?$filter=StaticName eq '${fieldName}'&select=DefaultValue,Description,Group,Id,Required,StaticName,Title,TypeAsString,MaxLength`,
            SPHttpClient.configurations.v1);

        const json = await response.json();
        return json.value;
    }

    public static async GetListFieldByGuid(context: IWebPartContext, siteUrl: string, listTitle: string, fieldGuid: string): Promise<ISPField[] | any> {
        let FieldProperties = `$select=DefaultValue,Description,Group,Id,Required,EntityPropertyName,InternalName,StaticName,Title,TypeAsString,MaxLength,
        NumberOfLines,MaximumValue,MinimumValue,EditFormat,Choices,DisplayFormat,SelectionMode,LookupField,LookupList,LookupWebId,TermSetId,SspId,TextField`;
        const response: SPHttpClientResponse = await context.spHttpClient.get(siteUrl +
            `/_api/web/lists/GetByTitle('${listTitle}')/fields/getbyid(guid'${fieldGuid}')?${FieldProperties}`,
            SPHttpClient.configurations.v1);

        if (response && !response.ok) {
            console.log(await response.json());
            let errMsg: Error = { name: 'client', message: '' }
            if (response.status == 403) {
                //errMsg.message = strings.NoPermission;
                throw errMsg;
            } else {
                //errMsg.message = strings.CommonError;
                throw errMsg;
            }
        }

        const json = await response.json();
        return json;
    }

    public static async CreateListItem(context: IWebPartContext, siteUrl: string, listTitle: string, item: any): Promise<any> {
        // const response1: SPHttpClientResponse = await context.spHttpClient.get(context.pageContext.web.absoluteUrl +
        //     `/_api/web/lists/GetByTitle('${listTitle}')/ListItemEntityTypeFullName`,
        //     SPHttpClient.configurations.v1);
        // const json1 = await response1.json();
        // item["__metadata"] = { "type": json1.value };

        let options: ISPHttpClientOptions = {
            body: JSON.stringify(item),
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            }
        };
        const response: SPHttpClientResponse = await context.spHttpClient.post(siteUrl +
            `/_api/web/lists/GetByTitle('${listTitle}')/items`,
            SPHttpClient.configurations.v1,
            options);

        const json = await response.json();
        return json;
    }

    public static async CreateListItemOfSerialNo(context: IWebPartContext, siteurl: string, listTitle: string, item: any): Promise<any> {
        let options: ISPHttpClientOptions = {
            body: JSON.stringify(item),
            headers: {
                "accept": "application/json",
                "content-type": "application/json"
            }
        };
        const response: SPHttpClientResponse = await context.spHttpClient.post(siteurl +
            `/_api/web/lists/GetByTitle('${listTitle}')/items`,
            SPHttpClient.configurations.v1,
            options);

        const json = await response.json()
        return json;
    }

    public static async GetLookupListItem(context: IWebPartContext, siteUrl: string, lookupList: string, lookupField: string): Promise<any> {
        const response: SPHttpClientResponse = await context.spHttpClient.get(siteUrl +
            `/_api/web/lists('${lookupList}')/items?$select=Id,${lookupField}`,
            SPHttpClient.configurations.v1);

        const json = await response.json()
        return json.value;
    }

    public static async GetRequestTypes(context: IWebPartContext, listTitle: string): Promise<ISPListItem[]> {
        const response: SPHttpClientResponse = await context.spHttpClient.get(context.pageContext.web.absoluteUrl +
            `/_api/web/lists/GetByTitle('${listTitle}')/items?$select=Id,YRequestType,YContentType,YSiteUrl`,
            SPHttpClient.configurations.v1);

        const json = await response.json();
        return json.value;
    }

    public static async GetRequestDetails(context: IWebPartContext, listTitle: string, itemId: string): Promise<any> {
        const response: SPHttpClientResponse = await context.spHttpClient.get(context.pageContext.web.absoluteUrl +
            `/_api/web/lists/GetByTitle('${listTitle}')/items('${itemId}')?$select=YRequestTitle,YRequestTypeText,YRequestor/Title,YLanguage,
            YRegion,YDepartment,YStartDate,YEndDate,YDueDateofRequestorExpected,YDueDateofReviewerConfirmed,YCC/Title,YRSecurityLevel/Title,YRequestStatusText,YClassCode,
            YSubClassCode,YGlobalDocumentNumber,YLocalDocumentNumber,YFinalizedByU/Title,YFinalizedByG/Title,YLastReviewedBy/Title,YLastFinalizedBy/Title,
            YRequestComment,TaxCatchAll/Id,TaxCatchAll/Term
            &$expand=YRequestor,YCC,YRSecurityLevel,YFinalizedByU,YFinalizedByG,YLastReviewedBy,YLastFinalizedBy,TaxCatchAll`,
            SPHttpClient.configurations.v1);

        const json = response.json();
        return json;
    }

    public static async GetDocuments(context: IWebPartContext, docFolder: string): Promise<any> {
        const response: SPHttpClientResponse = await context.spHttpClient.get(context.pageContext.web.absoluteUrl +
            `/_api/web/getFolderByServerRelativeUrl('YokogawaDMSDocuments/Forms/${docFolder}')/Files`,
            SPHttpClient.configurations.v1);

        const json = response.json()
        return json;
    }


    public static async GetRequestHistory(context: IWebPartContext, listTitle: string, filterField: string, fieldValue: string): Promise<any> {
        const response: SPHttpClientResponse = await context.spHttpClient.get(context.pageContext.web.absoluteUrl +
            `/_api/web/lists/GetByTitle('${listTitle}')/items?$select=Id,YActionUser/Title,YActionName,Modified,YActionDetail&$expand=YActionUser
            &$filter= ${filterField} eq ${fieldValue}`,
            SPHttpClient.configurations.v1);

        const json = response.json()
        return json;
    }

    public static async UpdateListItem(context: IWebPartContext, listTitle: string, itemId: string, item: any): Promise<any> {

        let options: ISPHttpClientOptions = {
            body: JSON.stringify(item),
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "IF-MATCH": "*",
                "X-Http-Method": "MERGE"
            }
        };
        const response: SPHttpClientResponse = await context.spHttpClient.post(context.pageContext.web.absoluteUrl +
            `/_api/web/lists/GetByTitle('${listTitle}')/items('${itemId}')`,
            SPHttpClient.configurations.v1,
            options);

        const json = await response.status;
        return json;
    }

    public static async GetCheckedOutByUser(context: IWebPartContext, siteUrl: string, fileId: string): Promise<any> {
        const response: SPHttpClientResponse = await context.spHttpClient.get(siteUrl +
            `/_api/web/getFileById('${fileId}')/CheckedOutByUser`,
            SPHttpClient.configurations.v1);

        const json = await response.json();
        return json;
    }

    public static async GetLockedByUser(context: IWebPartContext, siteUrl: string, fileId: string): Promise<any> {
        const response: SPHttpClientResponse = await context.spHttpClient.get(siteUrl +
            `/_api/web/getFileById('${fileId}')/LockedByUser`,
            SPHttpClient.configurations.v1);

        const json = await response.json();
        return json;
    }

    public static async GetListItemDemo(context: IWebPartContext, siteUrl: string, listTitle: string): Promise<any> {

    }

    public static async CreateListItemDemo(context: IWebPartContext, siteUrl: string, listTitle: string): Promise<any> {

    }

    public static async UpdateListItemDemo(context: IWebPartContext, siteUrl: string, listTitle: string): Promise<any> {

    }

}