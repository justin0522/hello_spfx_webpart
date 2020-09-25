import { Guid } from "@microsoft/sp-core-library";

export interface ISPList {
    Id: string;
    Title: string;
    Url: string;
}

export interface ISPContentType {
    Name: string;
    StringId: string;
}

export interface ISPField {
    
    DefaultValue: string;
    Description: string;
    EnforceUniqueValues: boolean;
    Group: string;
    Hidden: boolean;
    Id: string;
    InternalName: string;
    ReadOnlyField: boolean;
    Required: boolean;
    Scope: string;
    StaticName: string;
    Title: string;
    TypeAsString: string;
    // text
    MaxLength: number;
    // note
    NumberOfLines: number;
    // number
    MaximumValue: number;
    MinimumValue: number;
    // choice
    EditFormat: string; // 1.Dropdown 2.RadioButtons
    Choices:string[];
    // datetime 
    //special DefaultValue--"[Today]"
    DisplayFormat: string; // 1.DateOnly 2.DateTime
    // lookup
    LookupField:string;
    LookupList:string;
    LookupWebId:string;
    // taxonomy
    TermSetId:string;
    SelectionMode: number;
    EntityPropertyName: string;
    TextField: string;
}

export interface ISPListItem {
    Id: number;
    ContentTypeId: string;
    Title: string;
    GUID: string;
    /////
    YRequestType: string;
    YContentType: string;
    YSiteUrl: string;
}