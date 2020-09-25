import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
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

import { sp } from "@pnp/sp";
import '@pnp/sp/webs';
import "@pnp/sp/lists";
import "@pnp/sp/folders";
import "@pnp/sp/items";
import { Web } from '@pnp/sp/webs';
import { ICamlQuery } from "@pnp/sp/lists";
/////////////////////////////////////////
import AveDocumentCard from '../aveDocumentCard/aveDocumentCard';
import PageListRefiner from './PageListRefiner';
import styles from './PageList.module.scss';
import Column, { ColumnLeft } from './Column';

export interface IAveDocumentCardProps {
    previewImageSrc: string;
    category: string;
    description: string;
    modifiedon: string;
    itemId: string;
}

export interface IPageListProps extends RouteComponentProps<any> {
    context: IWebPartContext;
}

export interface IPageListState {
    items: IAveDocumentCardProps[];
    selectedItems: IAveDocumentCardProps[];
    checkedItems: string[];
    rightCheckedItems: string[];
}

const reorder = (list, startIndex, endIndex) => {
    const result = list; //Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export default class PageList extends React.Component<IPageListProps, IPageListState> {
    constructor(props: IPageListProps) {
        super(props);

        this.state = ({
            items: [],
            selectedItems: [],
            checkedItems: [], // only item ids
            rightCheckedItems: [] // only item ids
        });

        this.foobar = this.foobar.bind(this);
    }

    public componentDidMount() {
        this._getPages();
        this._getPagesWithCaml();
    }

    

    public render() {
        // const element = this.state.items.map(item => {
        //     return <AveDocumentCard itemId={item.itemId} category={item.category} previewImageSrc={item.previewImageSrc} description={item.description} modifiedon={item.modifiedon}
        //         onCheckboxChange={this._onCheckboxChange} />
        // });

        return <Stack>
            <div className={styles.grid}>
                <PageListRefiner onChange={(name, checked) => console.log(name)}></PageListRefiner>
                <div className={styles.row}>
                    <div className={styles.column5}>

                        {/* {element.length > 0 ? element : []} */}
                        <ColumnLeft items={this.state.items} onCheckboxChange={this._onCheckboxChange} />

                    </div>
                    <div className={styles.column2}>
                        <Stack tokens={{ childrenGap: 15 }}>
                            <PrimaryButton onClick={(event) => { this._onAddBtnClick(); }}>Add</PrimaryButton>
                            <DefaultButton onClick={(ev) => { this._onRemoveBtnClick(); }}>Remove</DefaultButton>
                        </Stack>
                    </div>
                    <div className={styles.column5}>
                        <Column items={this.state.selectedItems}
                            dragOverHandler={(event) => {
                                event.preventDefault();
                                console.log('abc');
                            }}
                            dropHandler={(result) => {
                                if (!result.destination) {
                                    return;
                                }

                                const selectedItems = reorder(
                                    this.state.selectedItems,
                                    result.source.index,
                                    result.destination.index
                                );

                                this.setState({
                                    selectedItems
                                });
                            }}
                            onCheckboxChange={this._onRightCheckboxChange} />
                    </div>
                </div>
                <div style={{ float: 'right' }}>
                    <Stack horizontal={true} tokens={{ childrenGap: 15 }} styles={{ root: { marginTop: '40px' } }} >
                        <PrimaryButton onClick={(event) => {
                            this.props.history.push({
                                pathname: '/form',
                                search: '',
                                state: {}
                            });
                        }} text={'Next'}></PrimaryButton>
                        <DefaultButton text={'Cancel'}></DefaultButton>
                    </Stack>
                </div>
            </div>
        </Stack>
    }

    private _getPages = async (): Promise<void> => {
        let web = Web(this.props.context.pageContext.web.absoluteUrl);
        //let listTitle = this.props.context.pageContext.list.title;
        //let items = await web.lists.getByTitle('Site Pages').items.getPaged();
        // let datas = items.results.map(item => {
        //     return {
        //         previewImageSrc: item['imge'],
        //         category: item['category'],
        //         description: item['description0'],
        //         modifiedon: item['Modified'],
        //         itemId: item['ID']
        //     }
        // });

        let items = await web.lists.getByTitle('Site Pages').items
            .select('imge', 'category', 'description0', 'Modified')
            .filter('ID Gt 0')
            .orderBy('Modified')
            .top(10)
            .skip(0)
            .get();
        let datas = items.map(item => {
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

    private _getPagesWithCaml = async (): Promise<void> => {
        let web = Web(this.props.context.pageContext.web.absoluteUrl);
        let list = web.lists.getByTitle('Site Pages');
        let caml: ICamlQuery = {
            ViewXml: "<View><ViewFields><FieldRef Name='Title' /></ViewFields><RowLimit>10</RowLimit></View>"
        }
        const r = await list.getItemsByCAMLQuery(caml);
        console.log(r)
    }

    private _onCheckboxChange = (itemId: string, checked: boolean) => {
        if (checked) {
            let temp = this.state.checkedItems;
            temp.push(itemId);
            this.setState({ checkedItems: temp });
        } else {
            let temp = this.state.checkedItems;
            temp = temp.filter(t => t != itemId);
            this.setState({ checkedItems: temp });
        }
    }

    private _onRightCheckboxChange = (itemId: string, checked: boolean) => {
        if (checked) {
            let temp = this.state.rightCheckedItems;
            temp.push(itemId);
            this.setState({ rightCheckedItems: temp });
        } else {
            let temp = this.state.rightCheckedItems;
            temp = temp.filter(t => t != itemId);
            this.setState({ rightCheckedItems: temp });
        }
    }

    private _onAddBtnClick = (): void => {
        let ids = this.state.checkedItems;
        let items = this.state.items;

        items = items.filter(i => {
            if (ids.indexOf(i.itemId) >= 0) {
                return true;
            } else {
                return false;
            }
        });

        this.setState({ selectedItems: items });

        // disable left checkbox
    }

    private _onRemoveBtnClick = (): void => {
        let ids = this.state.rightCheckedItems;
        let items = this.state.selectedItems;
        // disappear
        items = items.filter(i => {
            if (ids.indexOf(i.itemId) >= 0) {
                return false;
            } else {
                return true;
            }
        });
        this.setState({ selectedItems: items });

        // enable left checkbox 
    }

    public foobar (){
        return 'hello'
    }


}