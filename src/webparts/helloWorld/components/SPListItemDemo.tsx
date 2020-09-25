import * as React from 'react';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { TextField, MaskedTextField } from "office-ui-fabric-react";
///////////////////////////////
import SharePointUtility from "../../../common/SharePointUtility";
import {
    ISPList,
    ISPContentType,
    ISPField, ISPListItem
} from '../../../common/ISharePointUtilityProps';

export interface ISPListItemDemoProps {
    context: IWebPartContext;
    listTitle: string;
}

export interface ISPListItemDemoState {
    formValue: string;
}

export class SPListItemDemo extends React.Component<ISPListItemDemoProps, ISPListItemDemoState> {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleSubmit() {
        console.log('submit click');
        let data = {
            Title: 'JustinItem', // text
            JustinChoice: 'Enter Choice #1',
            JustinChoiceMulti: { results: ['Choice 2', 'Choice 3'] },
            JustinLookup: 1,
            //JustinLookupMulti: { results: [1, 2, 3] }, // item must exist
            JustinDate: new Date(2020, 0, 1),
            JustinHyperlink: {
                Description: "My blog",
                Url: "http://www.baidu.com"
            },

            JusinUserIdId: '6',
            JustinPeopleId: {
                results: [6, 21] // allows multiple users
            },
            // JustinTerm:{
            //     "__metadata": {
            //         "type": "SP.Taxonomy.TaxonomyFieldValue"
            //     },
            //     "TermGuid": "d3ce8903-4b4e-442e-8f19-161bf45be9e8", // <-- Term Id 
            //     "WssId": "-1" // <-- always "-1" 
            // }

            // two steps, get the InternalName
        }


        console.log(data);
        SharePointUtility.CreateListItem(this.props.context, this.props.context.pageContext.web.absoluteUrl,
            this.props.listTitle, data).then((item: ISPListItem) => {
                console.log(item.Id + "/" + item.GUID + "/" + item.Title + "/" + item.ContentTypeId);
                alert(item.Id);
            });
    }
    /**
     *  render: 
     */
    public render(): React.ReactElement<ISPListItemDemoProps> {

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>please enter the following text fields</h3>
                <TextField
                    label={'Data'}
                    required={true}
                    //onGetErrorMessage={_getErrorMessage}
                    onChange={(event, newValue) => console.log(newValue)}
                    validateOnFocusIn
                    validateOnFocusOut
                    //validateOnLoad={true}
                    //deferredValidationTime={200}
                    //errorMessage={''}
                    defaultValue={''}
                //maxLength={1024}
                />
                <input type="submit" value="Submit" />

            </form>
        );
    }
}