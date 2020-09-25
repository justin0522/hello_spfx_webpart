import * as React from "react";
import * as ReactDom from "react-dom";
import {
  Version,
  Log,
  Environment, EnvironmentType,
  Guid
} from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IWebPartPropertiesMetadata
} from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneLabel,
  PropertyPaneLink,
  PropertyPaneSlider,
  PropertyPaneToggle,
  PropertyPaneDropdown
} from "@microsoft/sp-property-pane";
import {
  PropertyPaneAsyncDropdown
} from '../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown';
import { escape, update, get } from "@microsoft/sp-lodash-subset";
import {
  Label,
  ILabelStyleProps,
  IDropdownOption
} from "office-ui-fabric-react";
import {
  Placeholder,
  IPlaceholderProps
} from "@pnp/spfx-controls-react/lib/Placeholder";
import { sp } from "@pnp/sp";
//////////////////////////////////////////////////
import * as strings from "HelloWorldWebPartStrings";
import StackDemo from "./components/StackDemo";
import DetailDemo from "./components/DetailDemo";
import SinglePageApp from "./components/SPA";
import CustomForm from './components/CustomForm';
import { ICustomFormProps } from './components/ICustomFormProps';
import FlavorForm from './components/FlavorForm';
import Reservation from './components/Reservation';
import { DatePickerDemo, IDatePickerDemoProps } from './components/DatePickerDemo';
import { SPListItemDemo, ISPListItemDemoState } from './components/SPListItemDemo';
import { DropzoneDemo, IDropzoneDemoProps } from './components/DropzoneDemo';
import { PeoplePicker, IPeoplePickerProps } from '../../PeoplePicker';
import { TaxonomyPicker, ITaxonomyPickerProps, IPickerTerms } from '../../TaxonomyPicker';
import { DropdownDemo, IDropdownDemoProps } from './components/DropdownDemo';
import { SpinnerDemo, ISpinnerDemoProps } from './components/SpinnerDemo';
import { PnpDemo, IPnpDemoProps } from './components/PnpDemo';
import SharePointUtility from '../../common/SharePointUtility';
import { UseThemeColor } from './components/useThemeColor/UseThemeColor';
import KanbanBoard from './components/kanban/Board';
import PageList from './components/pageList/PageList';
import BasicPageInfo from './components/basicPageInfo/basicPageInfo';
import PageForm, { IPageFormProps } from './components/pageForm/pageForm';
import { App } from './components/pageList/demo';
import CommonRouter from './components/router/router';
import GraphDemo from './components/graphDemo/graphDemo';
import HooksDemo1 from './components/hooksDemo/Demo1';



export interface IHelloWorldWebPartProps {
  description: string;
  list: string;
  item: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  private itemsDropDown: PropertyPaneAsyncDropdown;
  //protected propertiesMetadata: IWebPartPropertiesMetadata = { 'description': { isSearchablePlainText: true } }
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        // ie11: true,
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    if (this.properties.description) {

      // const element: React.ReactElement<INumberGenerateProps> = React.createElement(
      //   NumberGenerate,
      //   {
      //     labelTitle: 'Global Document Number',
      //     buttonTitle: 'Generate',
      //     textValue: 'Japan-DEV-A001-S01-20200202-123-US',
      //     btnClick: (date: Date)=>{ }
      //   }
      // );

      // const element: React.ReactElement<ISPListItemDemoState> = React.createElement(
      //   SPListItemDemo,
      //   {
      //     context: this.context,
      //     listTitle: this.properties.description
      //   }
      // );

      // const element: React.ReactElement<IPeoplePickerProps> = React.createElement(
      //   PeoplePicker,
      //   {
      //     context: this.context,
      //     titleText: 'People Picker',
      //     selectedItems: (items: IPersonaProps[]) => {
      //       let user = items[0];
      //       console.log(user);
      //     },
      //     defaultSelectedUsers: [''],
      //     principalTypes: [1, 4],
      //     ensureUser: true
      //   }
      // );

      // let initialValues: IPickerTerms = [{name:'Japan',key:'95c32674-8b86-4b84-92fd-080acaae1484',path:'Japan',termSet:'71101dd9-cfdc-4642-8eb5-5236697ba3ca'}];
      // const element: React.ReactElement<ITaxonomyPickerProps> = React.createElement(
      //   TaxonomyPicker,
      //   {
      //     label:'Region',
      //     panelTitle:'Region',
      //     initialValues: initialValues,
      //     context: this.context,
      //     termsetNameOrID:'71101dd9-cfdc-4642-8eb5-5236697ba3ca',
      //     onChange:(newValue?: IPickerTerms)=>{console.log(newValue)}
      //   }
      // );

      // const element: React.ReactElement<ISpinnerProps> = React.createElement(
      //   Spinner,
      //   {
      //     size: SpinnerSize.large          
      //   }
      // );

      // const element: React.ReactElement<IPnpDemoProps> = React.createElement(PnpDemo,
      //   {
      //     context: this.context,
      //     folderName: ''
      //   });

      const element: React.ReactElement<IDatePickerDemoProps> = React.createElement(DatePickerDemo,
        {
          onChange: (date) => { console.log(date) },
          text: "abc"
        });

      //const element: React.ReactElement<IDropzoneDemoProps> = React.createElement(DropzoneDemo, {});

      //const element: React.ReactElement<{}> = React.createElement(DetailDemo, {});

      // const element: React.ReactElement<ICustomFormProps> = React.createElement(CustomForm, {
      //   context: this.context,
      //   listTitle: this.properties.listTitle
      // });

      //const element = React.createElement(UseThemeColor, {context: this.context});

      //const element = React.createElement(CommonRouter, { context: this.context });

      //const element = React.createElement(GraphDemo, { context: this.context });
      
      //const element = React.createElement(HooksDemo1, { context: this.context });

      ReactDom.render(element, this.domElement);

    }
    else {

      Log.info("HelloWorldWebPart", "here is the place holder");
      const element: React.ReactElement<IPlaceholderProps> = React.createElement(
        Placeholder,
        {
          iconName: "Edit",
          iconText: "Configure your web part",
          description: "Please configure the web part.",
          buttonLabel: "Configure",
          onConfigure: this._onConfigure.bind(this)
        }
      );

      ReactDom.render(element, this.domElement);
    }
  }

  private _onConfigure() {
    // Context of the web part
    this.context.propertyPane.open();
  }

  //protected dataVersion: Version = Version.parse("1.0");

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    this.itemsDropDown = new PropertyPaneAsyncDropdown('item', {
      key: 'asyncUniqueKeyItem',
      label: strings.ListItemFieldLabel,
      loadOptions: this.loadItems.bind(this),
      onPropertyChange: this.onListItemChange.bind(this),
      selectedKey: this.properties.item,
      // should be disabled if no list has been selected
      disabled: !this.properties.list
    });

    return {
      pages: [
        {
          displayGroupsAsAccordion: true,
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              isCollapsed: false,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: strings.CustomGroupName,
              isCollapsed: true,
              groupFields: [
                new PropertyPaneAsyncDropdown('list', {
                  key: 'asyncUniqueKeyList',
                  label: strings.ListFieldLabel,
                  loadOptions: this.loadLists.bind(this),
                  onPropertyChange: this.onListChange.bind(this),
                  selectedKey: this.properties.list
                }),
                this.itemsDropDown
              ]
            }
          ]
        }
      ]
    };
  }

  private loadLists(): Promise<IDropdownOption[]> {
    return new Promise<IDropdownOption[]>(resolve => {
      sp.web.lists.filter("Hidden eq false").get()
        .then((response: any[]) => {
          var options: IDropdownOption[] = [];

          response.forEach((item: any) => {
            options.push({ "key": item.Id, "text": item.Title });
          });

          resolve(options);
        });
    });
  }

  private loadItems(): Promise<IDropdownOption[]> {
    if (!this.properties.list) {
      // resolve to empty options since no list has been selected
      return Promise.resolve();
    }

    return new Promise<IDropdownOption[]>(resolve => {
      sp.web.lists.getByTitle(this.properties.list).items.getAll()
        .then((response) => {
          var options: IDropdownOption[] = [];

          response.forEach((item: any) => {
            options.push({ "key": item.Id, "text": item.Title });
          });

          resolve(options);
        });
    });
  }

  private onListChange(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);

    //update the property value
    update(this.properties, propertyPath, (): any => { return newValue; });

    // trigger that propertyPath was changed
    this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    // reset selected item
    const oldItemValue: any = get(this.properties, 'item');
    this.properties.item = undefined;
    update(this.properties, 'item', (): any => { return this.properties.item; });

    // store selected item reset in web part properties
    this.onPropertyPaneFieldChanged('item', oldItemValue, this.properties.item);

    // reset selected values in item dropdown
    //this.itemsDropDown.properties.selectedKey = this.properties.item;
    this.itemsDropDown.properties.selectedKey = "";

    // allow to load items
    this.itemsDropDown.properties.disabled = false;

    // load items and re-render items dropdown
    this.itemsDropDown.render();
  }

  private onListItemChange(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);

    //update the property value
    update(this.properties, propertyPath, (): any => { return newValue; });

    // store selected item reset in web part properties
    this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  private needsConfiguration(): boolean {
    return this.properties.list === null ||
      this.properties.list === undefined ||
      this.properties.list.trim().length === 0 ||
      this.properties.item === null ||
      this.properties.item === undefined ||
      this.properties.item.toString().trim().length === 0;
  }

  private configureWebPart(): void {
    this.context.propertyPane.open();
  }
}
