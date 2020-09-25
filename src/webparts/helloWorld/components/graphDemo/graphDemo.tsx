import * as React from 'react';
import { HttpClient, SPHttpClient, MSGraphClient, ISPHttpClientOptions, AadHttpClient } from '@microsoft/sp-http';
import { IWebPartContext, WebPartContext } from '@microsoft/sp-webpart-base';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';


export interface IGraphDemoProps {
    context: WebPartContext;
}

export interface IGraphDemoState {
    message: string;
}

export default class GraphDemo extends React.Component<IGraphDemoProps, IGraphDemoState>{
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    public componentDidMount2() {
        this._getMemberOf().then(() => { console.log('end') });

    }

    private _getMemberOf = async (): Promise<void> => {
        let client: any = await this.props.context.aadHttpClientFactory.getClient("https://graph.microsoft.com");
        client._useCachedToken = false;
        let response = await client
            .get(
                `https://graph.microsoft.com/v1.0/me/memberOf`,
                AadHttpClient.configurations.v1
            );
        let json = await response.json();

        let groups = json.value.map(g => g.id)

        console.log(json);
    }

    public componentDidMount() {

        this.props.context.msGraphClientFactory
            .getClient()
            .then((client: MSGraphClient): void => {
                // get information about the current user from the Microsoft Graph
                client
                    .api('/me')
                    .get((error, user: MicrosoftGraph.User, rawResponse?: any) => {
                        this.setState({ message: user.displayName })
                    });

                client.api('/me/memberOf').get((error, response: any, rawResponse?: any) => {
                    let groups: MicrosoftGraph.Group[] = response.value;
                    groups.forEach(g => { console.log(g.id) })

                    // call request 
                })

                // client
                //     .api('https://graph.microsoft.com/v1.0/groups/{f3f606e2-6ef9-419b-bab1-9ea4009b5060}/members')
                //     .get((error, response: any, rawResponse?: any) => {
                //         let users: MicrosoftGraph.User[] = response.value;
                //         console.log(users);

                //     })
            });
    }

    public componentDidMount3() {
        const userRequestUrl: string = `${this.props.context.pageContext.web.absoluteUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser`;
        const searchBody = {
            queryParams: {
                AllowEmailAddresses: true,
                AllowMultipleEntities: false,
                AllUrlZones: false,
                MaximumEntitySuggestions: 5,
                PrincipalSource: 15,
                PrincipalType: 1,
                QueryString: 'hwliang@M365x367613.onmicrosoft.com'
            }
        };

        searchBody.queryParams["SharePointGroupID"] = 54;

        const httpPostOptions: ISPHttpClientOptions = {
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(searchBody)
        };

        this.props.context.spHttpClient.post(userRequestUrl, SPHttpClient.configurations.v1, httpPostOptions).then((data) => {
            data.json().then(json => {
                console.log(json.value);
                this.setState({ message: json.value });
            });
        });
    }

    public render() {

        return (<div>{this.state.message}</div>)
    }

}